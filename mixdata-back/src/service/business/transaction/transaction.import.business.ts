
import {transactionRepository, TransactionRepository} from "../../../repository/transaction.repository";
import {configs} from "../../../data/constants/configs";
import {readJsonFile} from "../../../common/technical/file.technical";
const { promisify } = require('util');
const { resolve } = require('path');
const fs = require('fs');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

export class TransactionImportBusiness {
  private repository: TransactionRepository;

  constructor(
    repository: TransactionRepository,
  ) {
    this.repository = repository;
  }

  async execute(dir: string =  null) {
    if (! dir) {
      dir = `${configs.dataStoredDir}/transaction`;
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
              ...row
            });
          });

          if (dataSets && dataSets.length) {
            await this.repository.save(this.repository.indexName, dataSets);
          }
        }
      }
    }
  }

  async delete() {
    await this.repository.delete(this.repository.indexName)
  }
}

export const transactionImportBusiness = new TransactionImportBusiness(transactionRepository);