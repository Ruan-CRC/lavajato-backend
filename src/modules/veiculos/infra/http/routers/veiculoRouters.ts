import { Router } from 'express';

import VeiculoFactory from '@/modules/veiculos/utils/factory';

const veiculoRouter = Router();
const veiculoController = VeiculoFactory.createVeiculoController();

veiculoRouter.post('/', (req, res) => veiculoController.create(req, res));
veiculoRouter.get('/:id([0-9]|[1-9][0-9]|100)', (req, res) => veiculoController.findById(req, res));
veiculoRouter.get('/all', (req, res) => veiculoController.all(res));

export default veiculoRouter;
