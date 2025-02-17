import { LayoutProps } from "src/modules/layout/domain/types/layout.type";
import { createStatusBar } from "./status-bar";
import { createMainGrid } from "./main-grid";
import { createPagination } from "./pagination";
import { createDock } from "./dock";

export function layoutRender(layout: LayoutProps): void {
  const rootElement = document.querySelector<HTMLDivElement>("#app");

  if (!rootElement) {
    console.error("Không tìm thấy phần tử #app");
    return;
  }
  // Create sections using separate functions
  const statusBar = createStatusBar(layout);
  const main = createMainGrid();
  const pagination = createPagination(layout);
  const dock = createDock(layout);

  // Clear previous content and append new elements
  rootElement.innerHTML = "";
  rootElement.append(statusBar, main, pagination, dock);
}
