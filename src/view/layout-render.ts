import { LayoutProps } from "src/modules/layout/domain/types/layout.type";
import { createStatusBar } from "./status-bar";
import { createMainGrid } from "./main-grid";
import { createPagination } from "./pagination";
import { createDock } from "./dock";
import { styleElement } from "@core/helpers";

function getRootElement(): HTMLDivElement {
  const rootElement = document.querySelector<HTMLDivElement>("#app");
  if (!rootElement) throw new Error("Không tìm thấy phần tử #app");
  return rootElement;
}

export function layoutRender(layout: LayoutProps): void {
  const rootElement = getRootElement();
  // Create sections using separate functions
  const statusBar = createStatusBar(layout);
  const main = createMainGrid();
  const pagination = createPagination(layout);
  const dock = createDock(layout);
  // Clear previous content and append new elements
  rootElement.innerHTML = "";
  rootElement.append(statusBar, main, pagination, dock);
}

export function updateLoading(isLoading: boolean) {
  const loadingElement = document.querySelector<HTMLDivElement>("#loading");
  if (!loadingElement) throw new Error("Không tìm thấy phần tử #loading");
  styleElement(loadingElement.style, {
    display: isLoading ? "flex" : "none",
  });
}
