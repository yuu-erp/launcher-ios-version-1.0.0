import { DappTypeEnum, IDappPosition } from "../../domain/entities/dapp.type";

export interface UpdateDappDto {
  id: number;
  name?: string;
  logo?: string;
  url?: string;
  type?: DappTypeEnum;
  page?: number;
  position?: IDappPosition;
}
