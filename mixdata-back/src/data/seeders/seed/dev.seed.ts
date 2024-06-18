import { LandDO, OwnedLandDO } from "@/data/domain_object/crm/land.do";
import { ContactDO } from "@/data/domain_object/crm/contact.do";
import { landIds } from "../factory/land.factory";
import { userRepository } from "@/repository/user.repository";
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { rand } from "@ngneat/falso";
import { landMapping } from "@/data/mappings/crm/land";
import { contactMapping } from "@/data/mappings/crm/contact";
import { logger } from "@/common/logger";

export default class DevDataSeeder implements Seeder {
    /**
     * Track seed execution
     */
    track = false;

    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        // tenants
        const users = (await userRepository.findAll('users', [])).results.map((user) => user?._source?.id);
        
        // lands
        const landRepository = dataSource.getRepository<LandDO>(landMapping);
        const landsFactory = await factoryManager.get(LandDO);
        const landRequests = landIds.map((id) => landsFactory.make(
            { tenantId: rand(users), }
        ));
        
        const landDO = await Promise.all(landRequests);
        const newLands = await landRepository.save(landDO);

        logger.debug(`Lands: ${newLands.length}`);

        // contacts
        const contactRepository = dataSource.getRepository<ContactDO>(contactMapping);
        const contactsFactory = await factoryManager.get(ContactDO);
        const contactsRequests = [...Array(500).keys()].map(() => contactsFactory.make(
            {
                tenantId: rand(users),
                lands: rand(newLands, { length: 3 }).map((land: LandDO) => {
                    return { ...land, type: rand(["owner", "prospect"]) } as OwnedLandDO;
                })
            }
        ))

        const contactsDO = await Promise.all(contactsRequests);
        const newContacts = await contactRepository.save(contactsDO);

        logger.debug(`Contacts: ${newContacts.length}`);
    }
}