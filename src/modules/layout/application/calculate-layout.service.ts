import { useResponsiveValue } from "@core/helpers";
import {
  CHECKPOINT_COLUMN,
  CHECKPOINT_COLUMN_DOCK,
  CHECKPOINT_DEVICE,
  HEIGHT_DOCK,
  HEIGHT_DOCK_CONTAINER,
  HEIGHT_PAGINATION,
  HEIGHT_STATUS_BAR,
  SIZE_ICON,
} from "../constants";
import { IPosition, LayoutProps, Device } from "../domain/types/layout.type";

export class CalculateLayoutService {
  static calculateLayout(): LayoutProps {
    const screenCheckPoint =
      this.device() === Device.MOBILE ? innerWidth : innerWidth * 0.7;
    const heightStatusBar = useResponsiveValue(HEIGHT_STATUS_BAR, 60);
    const heightPagination = useResponsiveValue(HEIGHT_PAGINATION, 40);
    const heightDock = useResponsiveValue(HEIGHT_DOCK, 120);
    const heightDockContainer = useResponsiveValue(HEIGHT_DOCK_CONTAINER, 96);
    const sizeIcon = useResponsiveValue(SIZE_ICON, 60);
    const columnNumber = useResponsiveValue(CHECKPOINT_COLUMN, 4);
    const columnDockNumber = useResponsiveValue(CHECKPOINT_COLUMN_DOCK, 4);

    const { itemWidth, outerPadding } = this.calculateGridDimensions(
      screenCheckPoint,
      columnNumber
    );
    const itemHeight = this.calculateItemHeight(itemWidth);
    const rowsNumber = this.calculateRowsNumber(
      heightStatusBar,
      heightPagination,
      heightDock,
      itemHeight
    );

    const widthDock = this.calculateDockWidth(
      sizeIcon,
      outerPadding,
      columnDockNumber
    );

    const grids = this.createGrid({
      columnNumber,
      rowsNumber,
      itemWidth,
      outerPadding,
      itemHeight,
      heightStatusBar,
    });

    return {
      device: this.device(),
      screenCheckPoint,
      heightStatusBar,
      heightPagination,
      heightDock,
      heightDockContainer,
      widthDock,
      columnDockNumber,
      columnNumber,
      rowsNumber,
      sizeIcon,
      itemWidth,
      itemHeight,
      outerPadding,
      grids,
    };
  }

  private static device(): Device {
    return useResponsiveValue(CHECKPOINT_DEVICE, Device.MOBILE);
  }

  private static calculateItemHeight(itemWidth: number): number {
    return itemWidth * 1.1;
  }

  private static calculateRowsNumber(
    heightStatusBar: number,
    heightPagination: number,
    heightDock: number,
    itemHeight: number
  ): number {
    return Math.floor(
      (innerHeight - heightStatusBar - heightPagination - heightDock) /
        itemHeight
    );
  }

  private static calculateDockWidth(
    sizeIcon: number,
    outerPadding: number,
    columnDockNumber: number
  ): number {
    return this.device() === Device.MOBILE
      ? innerWidth - outerPadding * 2
      : columnDockNumber * sizeIcon +
          columnDockNumber * outerPadding +
          outerPadding;
  }

  private static calculateGridDimensions(
    screenCheckPoint: number,
    columnNumber: number
  ): { itemWidth: number; outerPadding: number } {
    const factor = 20;
    const outerPadding = screenCheckPoint / (columnNumber * factor);
    const gridGap = outerPadding;
    const totalPadding = 2 * outerPadding + (columnNumber - 1) * gridGap;
    const itemWidth = (screenCheckPoint - totalPadding) / columnNumber;
    return {
      itemWidth,
      outerPadding: totalPadding / 2,
    };
  }

  private static createGrid({
    columnNumber,
    rowsNumber,
    itemWidth,
    outerPadding,
    itemHeight,
    heightStatusBar,
  }: {
    columnNumber: number;
    rowsNumber: number;
    itemWidth: number;
    outerPadding: number;
    itemHeight: number;
    heightStatusBar: number;
  }) {
    const result: IPosition[] = [];
    for (let y = 0; y < rowsNumber; y++) {
      for (let x = 0; x < columnNumber; x++) {
        const idx = y * columnNumber + x;
        result[idx] = {
          left: x * itemWidth + outerPadding,
          top: y * itemHeight + heightStatusBar,
        };
      }
    }
    return result;
  }
}
