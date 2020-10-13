import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import orphanateView from '../views/orphanates_view';

import Orphanate from '../models/Orphanate';

export default {
    async index(request: Request, response: Response) {
        const orphanatesRepositoty = getRepository(Orphanate);

        const orphanates = await orphanatesRepositoty.find({
            relations: ['images'],
        });

        return response.json(orphanateView.renderMany(orphanates));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;
        const orphanatesRepositoty = getRepository(Orphanate);

        const orphanate = await orphanatesRepositoty.findOneOrFail(id, {
            relations: ['images'],
        });

        return response.json(orphanateView.render(orphanate));
    },

    async create(request: Request, response: Response) {
        // Desestrutura corpo da requisição
        const { name, latitude, longitude, about, instructions, opening_hours, open_on_weekend } = request.body;
        
        const orphanatesRepositoty = getRepository(Orphanate);

        const requestImages = request.files as Express.Multer.File[];

        const images = requestImages.map(image => {
            return { path: image.filename };
        })
        
        const orphanate = orphanatesRepositoty.create({
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekend,
            images
        });
    
        await orphanatesRepositoty.save(orphanate);
    
        return response.status(201).json(orphanate);
    }
};