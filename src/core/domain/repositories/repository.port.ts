import type { EntityId, StringEnum } from "@techmely/types";

export interface RepositoryPort<Entity> {
  findById(id: EntityId): Entity | null;
  findAll(): Entity[];
  findByKey(key: StringEnum<keyof Entity>): Entity | null;

  insert(entity: Entity): Entity;
  insertMany(entities: Entity[]): Entity[];

  update(entity: Entity): Entity;
  updateMany(entities: Entity[]): Entity[];

  delete(entity: Entity): boolean;
  deleteById(id: string): boolean;

  transaction<T>(handler: () => T): T;
}
