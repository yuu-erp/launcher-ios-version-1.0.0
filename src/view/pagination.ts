import { styleElement } from "@core/helpers";
import { LayoutProps } from "src/modules/layout/domain/types/layout.type";

export function createPagination(layout: LayoutProps) {
  const { heightDock, heightPagination } = layout;

  const pagination = document.createElement("div");
  pagination.id = "pagination";
  pagination.textContent = "Pagination";
  styleElement(pagination.style, {
    height: heightPagination + "px",
    bottom: heightDock + "px",
  });
  pagination.classList.add("layout-absolute");
  return pagination;
}
