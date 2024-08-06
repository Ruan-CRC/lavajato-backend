import ServicoRepository from '@/modules/servicos/infra/repositories/servicosRepositorie';

async function calculaTempoTotalServicos(servicosIds: number[]): Promise<number> {
  const serv = new ServicoRepository();
  const servicos = await serv.getById(servicosIds);

  return servicos
    .map((servico) => servico.servicoValor.map((valor) => valor.tempo))
    .flat()
    .reduce((acc, valor) => acc + valor, 0);
}

export default calculaTempoTotalServicos;
