import { Router } from 'express';
import multer from 'multer';

import OrfanatesController from './controllers/OrphantesController';
import uploadConfig from './config/upload';

const routes = Router();
const upload = multer(uploadConfig);

/* ORFANATOS */
// create
routes.post('/orphanates', upload.array('images'), OrfanatesController.create);
// list
routes.get('/orphanates', OrfanatesController.index);
routes.get('/orphanates/:id', OrfanatesController.show);

export default routes;