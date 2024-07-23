import { Router } from 'express';

import VeiculoFactory from '@/modules/veiculos/utils/factory';

const router = Router();
const veiculoController = VeiculoFactory.createVeiculoController();

router.post('/', (req, res) => veiculoController.create(req, res));
router.get('/:id([0-9]|[1-9][0-9]|100)', (req, res) => veiculoController.findById(req, res));
router.get('/all', (req, res) => veiculoController.all(res));

export default router;
