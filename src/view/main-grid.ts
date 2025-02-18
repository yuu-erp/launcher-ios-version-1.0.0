import { styleElement } from "@core/helpers";
import { DappResponse } from "src/modules/dapp/domain/entities/dapp.type";
import { LayoutProps } from "src/modules/layout/domain/types/layout.type";
import { createDapp } from "./components/dapp";

export function createMainGrid(totalPage: number = 0) {
  const mainGrid = document.createElement("div");
  mainGrid.id = "main-grid";

  const mainGridContainer = document.createElement("div");
  mainGridContainer.classList.add("main-grid_container");
  styleElement(mainGridContainer.style, {
    width: totalPage * innerWidth + "px",
  });

  mainGrid.appendChild(mainGridContainer);

  return mainGrid;
}

export function renderListDapp(dapps: DappResponse[], layout: LayoutProps) {
  const {
    itemWidth,
    itemHeight,
    heightStatusBar,
    screenCheckPoint,
    outerPadding,
  } = layout;
  const fragment = document.createDocumentFragment();
  dapps.forEach((dapp) => {
    const left = Math.round(
      dapp.position.x * itemWidth +
        dapp.page * innerWidth +
        outerPadding +
        (innerWidth - screenCheckPoint) / 2
    );
    const top = Math.round(dapp.position.y * itemHeight + heightStatusBar);
    const dappElement = createDapp({
      dapp,
      ...layout,
      left: left,
      top: top,
    });
    fragment.appendChild(dappElement);
  });
  const mainElementContainer = document.querySelector(".main-grid_container");
  if (!mainElementContainer)
    throw new Error("CLASS .main-grid_container not found!");
  while (mainElementContainer.firstChild) {
    mainElementContainer.removeChild(mainElementContainer.firstChild);
  }
  mainElementContainer.appendChild(fragment);
}
