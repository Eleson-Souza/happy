import { Request, Response } from 'express';
import Orphanages from '../models/Orphanages';
import Images from '../models/Images';
import { QueryTypes } from 'sequelize';

export default {

    async index(req: Request, res: Response) {
        const orphanages = await Orphanages.findAll({ include: Images });

        // adaptando retorno da consulta antes de enviar como resposta.
        const serializedOrphanages = orphanages.map((orphanage, i) => {
            return {
                id: orphanage.id,
                name: orphanage.name,
                latitude: orphanage.latitude,
                longitude: orphanage.longitude,
                instructions: orphanage.instructions,
                opening_hours: orphanage.opening_hours,
                open_on_weekends: orphanage.open_on_weekends,
                createdAt: orphanage.createdAt,
                updatedAt: orphanage.updatedAt,
                images: orphanage.images.map((image) => {
                    return {
                        id: image.id,
                        url: `http://localhost:3333/uploads/${image.path}`,
                        createdAt: image.createdAt,
                        updatedAt: image.updatedAt,
                        orphanage_id: image.orphanage_id
                    }
                })
            }
        });

        return res.json(orphanages);
    },

    async show(req: Request, res: Response) {
        const id = req.params.id;

        const orphanage = await Orphanages.findOne({
            where: {id},
            include: Images
        });

        const serializedOrphanages = {
                id: orphanage?.id,
                name: orphanage?.name,
                latitude: orphanage?.latitude,
                longitude: orphanage?.longitude,
                instructions: orphanage?.instructions,
                about: orphanage?.about,
                opening_hours: orphanage?.opening_hours,
                open_on_weekends: orphanage?.open_on_weekends,
                createdAt: orphanage?.createdAt,
                updatedAt: orphanage?.updatedAt,
                images: orphanage?.images.map((image) => {
                    return {
                        id: image.id,
                        url: `http://localhost:3333/uploads/${image.path}`,
                        createdAt: image.createdAt,
                        updatedAt: image.updatedAt,
                        orphanage_id: image.orphanage_id
                    }
                })
            }

        return res.json(serializedOrphanages);
    },

    async create(req: Request, res: Response) {
        const { 
            name, 
            latitude, 
            longitude, 
            about, 
            instructions, 
            opening_hours, 
            open_on_weekends
         } = req.body;

         try {
             // insert tabela de orfanatos
            const orphanages = await Orphanages.create({
                name,
                latitude,
                longitude,
                about,
                instructions,
                opening_hours,
                open_on_weekends,
            });
            
            const requestImages = req.files as Express.Multer.File[];
            // percorrendo array de imagens e inserindo na tabela imagens
            requestImages.forEach(async (image) => {                
                await Images.create({
                    path: image.filename,
                    orphanage_id: orphanages.id
                });                
             });

            // status 201: Created
            return res.status(201).json(orphanages);
         } catch(error) {
            console.log(error);
            return res.status(500).json({message: "Error Internal Server"});
         }
    
    }

}