type Entity = any;
type Id = string;

export default interface RepositoryInterface {
  create(E: Entity): Promise<Id | boolean>
  findById(id: string): Promise<Entity | boolean>
  update(E: Entity): Promise<void | boolean>
  delete(id: string): Promise<void | boolean>
}
