import { RepositoryPort } from "@core/domain/repositories/repository.port";
import { DappEntity } from "../entities/dapp.entity";

export interface IDappRepository extends RepositoryPort<DappEntity> {}
