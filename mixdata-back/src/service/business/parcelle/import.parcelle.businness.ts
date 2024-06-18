
import { configs } from "../../../data/constants/configs";
import {
  readJsonFile,
} from "../../../common/technical/file.technical";
import {
  landRepository,
  LandRepository,
} from "../../../repository/land.repository";
import {LandFactory} from "../../../common/factory/land/land.factory";
import {PopetyDelegate} from "../../delegate/popety.delegate";
const { promisify } = require('util');
const { resolve } = require('path');
const fs = require('fs');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

export class ImportParcelleBusinness {

  private indexName = 'lands'

  private landRepository;

  constructor(
    landRepo: LandRepository,
  ) {
    this.landRepository = landRepo;
  }

  async execute(dir: string =  null) {
    if (! dir) {
      dir = `${configs.dataStoredDir}/parcelle`;
    }
    const subdirs = await readdir(dir);
    for (const subdir of subdirs) {
      const filepath =  resolve(dir, subdir);
      const isDirectory = (await stat(filepath)).isDirectory();
      if (isDirectory) {
        await this.execute(filepath);
      } else {
        const filename = filepath.substring(filepath.lastIndexOf('/') + 1);
        if (filename.match(/^page-[0-9]+.json$/i)) {
          const json = await readJsonFile(filepath);
          const dataSets = [];
          json?.map((row) => {
            dataSets.push({
              id: row.land_id,
              rdppfs: [],
              ...row,
              owner_nb: row.owners?.length,
              type: row.public_property === null ? null : (row.public_property ? 'public' : 'private'),
            });
          });

          if (dataSets && dataSets.length) {
            await this.landRepository.save(this.landRepository.indexName, dataSets);
          }
        }
      }
    }
  }

  async delete() {
    await this.landRepository.delete(this.landRepository.indexName)
  }
}

export const importParcelleBusinness = new ImportParcelleBusinness(landRepository);
