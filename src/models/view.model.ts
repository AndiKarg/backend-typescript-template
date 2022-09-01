import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Viewaction } from './viewaction.model';

@Entity()
export class View extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  ranking: number;

  @ManyToMany(type => Viewaction)
  @JoinTable()
  viewactions: Viewaction[];
}
