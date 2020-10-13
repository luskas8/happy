import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn} from 'typeorm';
import Image from './Image';

@Entity('orphanates')
export default class Orphanate {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    about: string;

    @Column()
    instructions: string;

    @Column()
    opening_hours: string;

    @Column()
    open_on_weekend: boolean;

    @OneToMany(() => Image, image => image.orphanate, {
        cascade: ['insert', 'update'],
    })
    @JoinColumn({ name: 'orphanate_id' })
    images: Image[]; 
}