import { Router } from 'express';

import ServicoVeiculoFactory from '@/modules/servico-veiculo/utils/factory';

const router = Router();
const ServicoVeiculo = ServicoVeiculoFactory.createServicoVeiculoController();

router.put('/update', (req, res) => ServicoVeiculo.update(req, res));

export default router;
