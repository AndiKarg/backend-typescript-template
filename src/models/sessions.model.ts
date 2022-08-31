// src/domain/Session/Session.ts

import { ISession } from "connect-typeorm";
import { Column, DeleteDateColumn, Entity, Index, PrimaryColumn } from "typeorm";

@Entity()
export class Session implements ISession {
    @Index()
    @Column()
    expiredAt: number;

    @PrimaryColumn()
    id: string;

    @Column()
    json: string;

    @DeleteDateColumn()
    destroyedAt?: Date;
}