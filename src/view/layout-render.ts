import { LayoutProps } from "src/modules/layout/domain/types/layout.type";
import { createStatusBar } from "./status-bar";
import { createMainGrid } from "./main-grid";
import { createPagination } from "./pagination";
import { createDock } from "./dock";
import { styleElement } from "@core/helpers";
import { StoragePort } from "@core/infrastructure/storage/storage.port";
import { Emitter } from "@core/infrastructure/emitter";
import { Draggable } from "../modules/draggable/draggable";
import { PageDraggable } from "../modules/draggable/page-draggable";

function getRootElement(): HTMLDivElement {
  const rootElement = document.querySelector<HTMLDivElement>("#app");
  if (!rootElement) throw new Error("Không tìm thấy phần tử #app");
  return rootElement;
}

export function layoutRender(
  layout: LayoutProps,
  storage: StoragePort,
  emitter: Emitter
): void {
  const totalPage = storage.get("totalPage") || 1;
  const currentPage = storage.get("currentPage") || 0;

  const rootElement = getRootElement();
  // Create sections using separate functions
  const statusBar = createStatusBar(layout);
  const main = createMainGrid(totalPage);
  const pagination = createPagination(layout);
  const dock = createDock(layout);
  // Clear previous content and append new elements
  while (rootElement.firstChild) {
    rootElement.removeChild(rootElement.firstChild);
  }
  rootElement.append(statusBar, main, pagination, dock);

  const pageDraggable = new PageDraggable(main, currentPage, totalPage);
  new Draggable(main, emitter, pageDraggable);

  emitter.on("toggleEditMode", toggleEditMode);
}

export function updateLoading(isLoading: boolean) {
  const loadingElement = document.querySelector<HTMLDivElement>("#loading");
  if (!loadingElement) throw new Error("Không tìm thấy phần tử #loading");
  styleElement(loadingElement.style, {
    display: isLoading ? "flex" : "none",
  });
}
export function toggleEditMode(isEdit: boolean) {
  document.body.classList.toggle("edit", isEdit);
}
