import { DappResponse } from "src/modules/dapp/domain/entities/dapp.type";
import { LayoutProps } from "src/modules/layout/domain/types/layout.type";

export function calculateTranslate(
  dapp: DappResponse,
  layout: LayoutProps
): { left: number; top: number } {
  const { page, position, isFavorite } = dapp;
  const {
    itemWidth,
    itemHeight,
    outerPadding,
    screenCheckPoint,
    heightStatusBar,
    sizeIcon,
    heightDock,
  } = layout;
  const { x, y } = position;

  if (isFavorite) {
    return {
      left: 0,
      top: innerHeight - sizeIcon - (heightDock - sizeIcon) / 2,
    };
  }

  return {
    left: Math.round(
      x * itemWidth +
        page * innerWidth +
        outerPadding +
        (innerWidth - screenCheckPoint) / 2
    ),
    top: Math.round(y * itemHeight + heightStatusBar),
  };
}

export function calculateTranslateDock(x: number, y: number, page: number) {}
