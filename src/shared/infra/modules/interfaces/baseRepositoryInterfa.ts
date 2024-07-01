export interface BaseRepositoryInterface {
  index(): Promise<any>
  show(id: number): Promise<any>
  store(data: any): Promise<any>
  update(id: number, data: any): Promise<any>
  delete(id: number): Promise<any>
}
