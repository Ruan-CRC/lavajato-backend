import { Router } from 'express';

import VeiculoFactory from '@/modules/veiculos/utils/factory';

const router = Router();
const veiculoController = VeiculoFactory.createVeiculoController();

router.post('/create', (req, res) => veiculoController.create(req, res));
router.get('/find/:id', (req, res) => veiculoController.findById(req, res));

export default router;
