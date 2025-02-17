import { styleElement } from "@core/helpers";
import { LayoutProps } from "src/modules/layout/domain/types/layout.type";

export function createDock(layout: LayoutProps) {
  const { heightDock, heightDockContainer, widthDock } = layout;

  const dock = document.createElement("div");
  dock.id = "dock";
  dock.classList.add("layout-absolute");
  styleElement(dock.style, {
    height: heightDock + "px",
    bottom: "0",
  });

  const dockContainer = document.createElement("div");
  styleElement(dockContainer.style, {
    height: heightDockContainer + "px",
    width: widthDock + "px",
    background: "var(--bg-main)",
    backdropFilter: "var(--blur-main)",
    borderRadius: "40px",
  });

  dock.appendChild(dockContainer);
  return dock;
}
