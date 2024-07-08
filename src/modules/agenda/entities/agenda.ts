export type AgendaType = {
  veiculoId: number;
  servicoId: number;
  dataInicio?: string | Date;
  dataFim?: string | Date;
};

export class Agenda {
  public protected id: uuid;
  constructor(public props: AgendaType) {
    this.props.servicoId = props.servicoId;
    this.props.veiculoId = props.veiculoId;
    this.props.dataInicio = props.dataInicio ?? new Date();
    this.props.dataFim = props.dataFim ?? null;
  }

  create(veiculoId: number, servicoId: number) {
    const dataInicio = new Date();

    this.props = {
      veiculoId,
      servicoId,
      dataInicio,
    };
  }
}
