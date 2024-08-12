import { Router } from 'express';
import { container } from 'tsyringe';
import asyncHandler from 'express-async-handler';
import ServicoVeiculoController from '../controller/servicoVeiculoController';

const agendaRouters = Router();
const agendaController = container.resolve(ServicoVeiculoController);

agendaRouters.get('/servicos-agendos', asyncHandler(async (req, res) => {
  await agendaController.servicosEmAgendamento(req, res);
}));
agendaRouters.post('/create', asyncHandler(async (req, res) => {
  await agendaController.addServico(req, res);
}));

export default agendaRouters;
