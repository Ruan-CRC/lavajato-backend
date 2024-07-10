export default interface BaseRepositoryInterface {
  index(id: string | number): Promise<any>
  all(): Promise<any>
  create(data: any): Promise<any>
  update(id: number, data: any): Promise<any>
  delete(id: number): Promise<any>
}
