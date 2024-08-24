import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { container } from 'tsyringe';
import ServicoVeiculoController from '../controller/servicoVeiculoController';

const agendaController = container.resolve(ServicoVeiculoController);
const agendaRouters = Router();

agendaRouters.get('/servicos-agendos', asyncHandler(async (req, res) => {
  await agendaController.servicosEmAgendamento(req, res);
}));
agendaRouters.post('/create', asyncHandler(async (req, res) => {
  await agendaController.addServico(req, res);
}));

export default agendaRouters;
