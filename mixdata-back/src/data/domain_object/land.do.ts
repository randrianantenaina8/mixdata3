
// import {
//     BeforeInsert,
//     BeforeUpdate,
//     Column,
//     Entity,
//     OneToMany,
//     PrimaryGeneratedColumn,
// } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { logger } from '../../common/logger';
// import { ContratRetraiteDO } from '../contrat/contrat-retraite.do';

// @Entity('land')
export class LandDO {

  // @PrimaryGeneratedColumn('uuid')
  id: string;

  // @Column({ length: 50 })
  code: string;

//   @Column({ length: 100, nullable: true })
//   prenom: string;

//   @Column()
//   imageUrl: string;

//   @Column({ length: 10, nullable: true, unique: true })
//   telephone: string;

//   @Column({ unique: true })
//   email: string;

//   @Column({ length: 25 })
//   ville: string;

//   @Column({ length: 50 })
//   adresse: string;

//   @Column()
//   password: string;

//   @OneToMany(() => PaiementDO, (paiement) => paiement.utilisateur)
//   payments: PaiementDO[];

//   @BeforeInsert()
//   async beforeInsert() {
//     try {
//       this.dateInscription = new Date();
//       this.password = await bcrypt.hashSync(this.password, 10);
//     } catch (error) {
//       logger.error(error);
//     }
//   }

//   @BeforeUpdate()
//   async hashPasswordUpdate() {
//     if (!this.password.includes('$2a$')) {
//       this.password = await bcrypt.hashSync(this.password, 10);
//     }

//     this.dateModification = new Date();
//   }
}