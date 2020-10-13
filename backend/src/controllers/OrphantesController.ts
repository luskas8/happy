import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Orphanate from '../models/orphanate';

export default {
    async index(request: Request, response: Response) {
        const orphanatesRepositoty = getRepository(Orphanate);

        const orphanates = await orphanatesRepositoty.find();

        return response.json(orphanates);
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;
        const orphanatesRepositoty = getRepository(Orphanate);

        const orphanate = await orphanatesRepositoty.findOneOrFail({id});

        return response.json(orphanate);
    },

    async create(request: Request, response: Response) {
        console.log(request.files);

        // Desestrutura corpo da requisição
        const { name, latitude, longitude, about, instructions, opening_hours, open_on_weekend } = request.body;
        
        const orphanatesRepositoty = getRepository(Orphanate);

        // const requestImages = request.files as Express.Multer.File[];

        // const images = requestImages.map(image => {
        //     return { path: image.filename };
        // })
        
        const orphanate = orphanatesRepositoty.create({
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekend,
            // images
        });
    
        await orphanatesRepositoty.save(orphanate);
    
        return response.status(201).json(orphanate);
    }
};