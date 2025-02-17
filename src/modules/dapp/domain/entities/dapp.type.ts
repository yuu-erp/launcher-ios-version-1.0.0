import { DappPosition } from "../value-objects/dapp-position.value-object";

export enum DappTypeEnum {
  DAPP = 1,
  FRAME = 2,
  GROUP = 3,
}

export interface IDappPosition {
  width: number;
  height: number;
  x: number;
  y: number;
}

export interface DappProps {
  id: number;
  name: string;
  logo: string;
  url: string;
  type: DappTypeEnum;
  page: number;
  position: DappPosition;
}
export interface DappResponse {
  id: number;
  name: string;
  logo: string;
  url: string;
  page: number;
  position: IDappPosition;
  type: DappTypeEnum;
}
