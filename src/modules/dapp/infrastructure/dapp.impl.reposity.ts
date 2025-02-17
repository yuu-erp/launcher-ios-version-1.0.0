import { StoragePort } from "@core/infrastructure/system-core/system-core.port";
import { IDappRepository } from "../domain/repositories/dapp.repository";
import { Mapper } from "@core/application/mappers/mapper.base";
import { DappEntity } from "../domain/entities/dapp.entity";
import { DappResponse } from "../domain/entities/dapp.type";
import { EntityId, StringEnum } from "@techmely/types";

export class DappRepositoryImpl implements IDappRepository {
  protected readonly key: string = "applications";
  constructor(
    protected readonly storage: StoragePort,
    protected readonly mapper: Mapper<DappEntity, DappResponse>
  ) {}

  findAll(): DappEntity[] {
    const dapps = this.getAllDappEntity();
    return dapps.map(this.mapper.toDomain);
  }
  findById(id: EntityId): DappEntity | null {
    const dapps = this.getAllDappEntity();
    const dapp = dapps.find((item) => item.id === id);
    return dapp ? this.mapper.toDomain(dapp) : null;
  }
  insert(entity: DappEntity): DappEntity {
    const dapps = this.storage.get(this.key) || [];
    const newDapp = this.mapper.toResponse(entity);
    dapps.push(newDapp);
    this.storage.set(this.key, dapps);
    return entity;
  }
  insertMany(entities: DappEntity[]): DappEntity[] {
    const dapps = this.getAllDappEntity();
    const newDapps = entities.map(this.mapper.toResponse);
    this.storage.set(this.key, [...dapps, ...newDapps]);
    return entities;
  }
  update(entity: DappEntity): DappEntity {
    let dapps = this.getAllDappEntity();
    dapps = dapps.map((item) =>
      item.id === entity.getProps().id ? this.mapper.toResponse(entity) : item
    );
    this.storage.set(this.key, dapps);
    return entity;
  }

  // 🚀 Các method khác...
  findByKey(_key: StringEnum<keyof DappEntity>): DappEntity {
    throw new Error("Method not implemented.");
  }
  updateMany(_entities: DappEntity[]): DappEntity[] {
    throw new Error("Method not implemented.");
  }
  delete(_entity: DappEntity): boolean {
    throw new Error("Method not implemented.");
  }
  deleteById(_id: string): boolean {
    throw new Error("Method not implemented.");
  }
  transaction<T>(_handler: () => T): T {
    throw new Error("Method not implemented.");
  }

  private getAllDappEntity(): DappResponse[] {
    return this.storage.get(this.key) || [];
  }
}
