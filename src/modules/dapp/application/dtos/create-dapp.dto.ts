import { DappTypeEnum, IDappPosition } from "../../domain/entities/dapp.type";

export interface CreateDappDto {
  id: number;
  name: string;
  logo: string;
  url: string;
  type: DappTypeEnum;
  page: number;
  position: IDappPosition;
  isFavorite: number;
}
