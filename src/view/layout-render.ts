import { styleElement } from "@core/helpers";
import { Emitter } from "@core/infrastructure/emitter";
import { StoragePort } from "@core/infrastructure/storage/storage.port";
import { DappController } from "src/modules/dapp/application/dapp.controller";
import { DappResponse } from "src/modules/dapp/domain/entities/dapp.type";
import { Draggable } from "../modules/draggable/draggable";
import { PageDraggable } from "../modules/draggable/page-draggable";
import { LayoutProps } from "../modules/layout/domain/types/layout.type";
import { createDock } from "./dock";
import {
  createMainGrid,
  renderListDataDapp,
  renderListDockDapp,
} from "./main-grid";
import { createPagination } from "./pagination";
import { createStatusBar } from "./status-bar";

function getRootElement(): HTMLDivElement {
  const rootElement = document.querySelector<HTMLDivElement>("#app");
  if (!rootElement) throw new Error("Không tìm thấy phần tử #app");
  return rootElement;
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

export function layoutRender(
  layout: LayoutProps,
  inMemoryStorageAdapter: StoragePort,
  localStorageAdapter: StoragePort,
  dappController: DappController
): void {
  const totalPage = inMemoryStorageAdapter.get("totalPage") || 1;
  const currentPage = localStorageAdapter.get("currentPage") || 0;
  const dapps = dappController.getDapps();
  const dataDapp = dapps.filter((item) => !item.isFavorite);
  const dappDocks = dapps.filter((item) => item.isFavorite);
  // set current page vào localstorage
  function setCurrentPage(currentPage: number) {
    localStorageAdapter.set("currentPage", currentPage);
  }

  // lấy ra danh sách ứng dụng cần được render theo currentPage
  function getDappsByPageRange(currentPage: number): DappResponse[] {
    const pagesToFetch = [currentPage - 1, currentPage, currentPage + 1].filter(
      (page) => page >= 0 && page < totalPage
    );
    return dataDapp.filter((dapp) => pagesToFetch.includes(dapp.page));
  }

  // xử lý render danh sách ứng dụng
  function handleRenderDappList(currentPage: number) {
    const dapps = getDappsByPageRange(currentPage);
    renderListDataDapp(dapps, layout);
  }

  // handle Event onChangePageMainGrid
  function onChangePageMainGrid(currentPage: number) {
    setCurrentPage(currentPage);
    handleRenderDappList(currentPage);
  }
  // khai báo emitter Event-driven architecture
  const emitter = new Emitter();

  const rootElement = getRootElement();
  // Create sections using separate functions
  const statusBar = createStatusBar(layout);
  const mainGrid = createMainGrid(totalPage);
  const pagination = createPagination(layout);
  const dock = createDock(layout);

  rootElement.append(statusBar, mainGrid, pagination, dock);

  handleRenderDappList(currentPage);
  renderListDockDapp(dappDocks, layout);
  // Khai báo lớp page draggable
  const pageDraggable = new PageDraggable(mainGrid, currentPage, totalPage);
  // di chuyển page theo current page
  pageDraggable.scrollToPageNotrequestAnimationFrame(currentPage);

  new Draggable(mainGrid, emitter, pageDraggable);

  // listen event
  emitter.on("toggleEditMode", toggleEditMode);
  emitter.on("onChangePageMainGrid", onChangePageMainGrid);
}
