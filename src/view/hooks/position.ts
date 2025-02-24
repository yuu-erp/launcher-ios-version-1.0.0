import { DappResponse } from "src/modules/dapp/domain/entities/dapp.type";
import { LayoutProps } from "src/modules/layout/domain/types/layout.type";

export function calculateTranslate(
  dapp: DappResponse,
  layout: LayoutProps
): { left: number; top: number } {
  const { page, position } = dapp;
  const {
    itemWidth,
    itemHeight,
    outerPadding,
    screenCheckPoint,
    heightStatusBar,
  } = layout;
  const { x, y } = position;
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

export function calculateTranslateDock(
  dapp: DappResponse,
  layout: LayoutProps,
  dappDocks: DappResponse[]
) {
  const { position } = dapp;
  const { sizeIcon, heightDock, widthDock, prePaddingDock, columnDockNumber } =
    layout;
  const { x } = position;

  const dockGap =
    (widthDock - columnDockNumber * sizeIcon) / (columnDockNumber + 1);
  const preDock = (columnDockNumber - dappDocks.length) * (sizeIcon + dockGap);

  return {
    left: preDock / 2 + prePaddingDock + dockGap + x * (sizeIcon + dockGap),
    top: innerHeight - sizeIcon - (heightDock - sizeIcon) / 2,
  };
}
