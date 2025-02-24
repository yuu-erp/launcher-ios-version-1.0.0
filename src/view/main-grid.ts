import { styleElement } from "@core/helpers";
import { DappResponse } from "src/modules/dapp/domain/entities/dapp.type";
import { LayoutProps } from "src/modules/layout/domain/types/layout.type";
import { createDapp } from "./components/dapp";
import { calculateTranslate, calculateTranslateDock } from "./hooks/position";

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

export function renderListDataDapp(dapps: DappResponse[], layout: LayoutProps) {
  const fragment = document.createDocumentFragment();
  dapps.forEach((dapp) => {
    const dappElement = createDapp({
      dapp,
      ...layout,
      ...calculateTranslate(dapp, layout),
    });
    fragment.appendChild(dappElement);
  });
  const mainElementContainer = document.querySelector(".main-grid_container");
  if (!mainElementContainer)
    throw new Error("CLASS .main-grid_container not found!");
  mainElementContainer.replaceChildren(fragment);
}

export function renderListDockDapp(dapps: DappResponse[], layout: LayoutProps) {
  const fragment = document.createDocumentFragment();
  dapps.forEach((dapp) => {
    const dappElement = createDapp({
      dapp,
      ...layout,
      ...calculateTranslateDock(dapp, layout, dapps),
    });
    fragment.appendChild(dappElement);
  });
  const mainElementContainer = document.querySelector(".main-grid_container");
  if (!mainElementContainer)
    throw new Error("CLASS .main-grid_container not found!");
  mainElementContainer.appendChild(fragment);
}
