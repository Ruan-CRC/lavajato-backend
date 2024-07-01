import { Router } from 'express';

import ServicoVeiculoFactory from '@/modules/agenda/utils/factory';

const router = Router();
const ServicoVeiculo = ServicoVeiculoFactory.createServicoVeiculoController();

router.get('/servicos-agendos', (req, res) => ServicoVeiculo.servicosEmAgendamento(req, res));
router.put('/update', (req, res) => ServicoVeiculo.update(req, res));
router.post('/addServico', (req, res) => ServicoVeiculo.addServico(req, res));

export default router;
