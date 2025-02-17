import { Device } from "./domain/types/layout.type";

export const CHECKPOINT_DEVICE: Record<number, Device> = {
  768: Device.TABLET,
  1024: Device.DESKTOP,
};

export const CHECKPOINT_SCREEN: Record<number, number> = {
  768: 768,
  1024: 1024,
};

export const SIZE_ICON: Record<number, number> = {
  768: 60,
  1024: 60,
};

export const CHECKPOINT_COLUMN: Record<number, number> = {
  768: 4,
  1024: 6,
};
export const CHECKPOINT_COLUMN_DOCK: Record<number, number> = {
  768: 6,
  1024: 8,
};
export const HEIGHT_STATUS_BAR: Record<number, number> = {
  768: 60,
  1024: 60,
};

export const HEIGHT_PAGINATION: Record<number, number> = {
  768: 40,
  1024: 30,
};

export const HEIGHT_DOCK: Record<number, number> = {
  768: 120,
  1024: 100,
};

export const HEIGHT_DOCK_CONTAINER: Record<number, number> = {
  768: 96,
  1024: 76,
};
