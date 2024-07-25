import { Router } from 'express';

import asyncHandler from 'express-async-handler';
import ServicoVeiculoFactory from '@/modules/agenda/utils/factory';

const router = Router();
const ServicoVeiculo = ServicoVeiculoFactory.createServicoVeiculoController();

router.get('/servicos-agendos', asyncHandler(async (req, res) => {
  await ServicoVeiculo.servicosEmAgendamento(req, res);
}));
router.put('/update', (req, res) => ServicoVeiculo.update(req, res));
router.post('/create', asyncHandler(async (req, res) => {
  await ServicoVeiculo.addServico(req, res);
}));

export default router;
