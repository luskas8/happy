import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Orphanate from './orphanate';

@Entity('images')
export default class Image {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;

    @ManyToOne(() => Orphanate, orphanate => orphanate.images)
    @JoinColumn({ name: 'orphanate_id' })
    orphanate: Orphanate;
}