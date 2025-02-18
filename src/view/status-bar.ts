import { styleElement } from "@core/helpers";
import { LayoutProps } from "src/modules/layout/domain/types/layout.type";

function createButton(
  id: string,
  text: string,
  index: number
): HTMLButtonElement {
  const button = document.createElement("button");
  button.id = id;
  button.classList.add("button-status-bar");
  button.dataset.index = index.toString();
  button.textContent = text;
  return button;
}

export function createStatusBar(layout: LayoutProps) {
  const { heightStatusBar, outerPadding, screenCheckPoint } = layout;
  const statusBar = document.createElement("div");
  statusBar.id = "status-bar";
  statusBar.classList.add("layout-absolute");
  styleElement(statusBar.style, {
    height: heightStatusBar + "px",
    width: "100%",
  });

  const addButton = createButton("status-bar-button-add", "Thêm", 0);
  const doneButton = createButton("status-bar-button-done", "Xong", 1);

  const statusBarContainer = document.createElement("div");
  statusBarContainer.classList.add(
    "statusBar-container",
    "w-full",
    "h-full",
    "flex",
    "items-center",
    "justify-between",
    "mx-auto"
  );
  styleElement(statusBarContainer.style, {
    width: screenCheckPoint + "px",
    paddingLeft: outerPadding + "px",
    paddingRight: outerPadding + "px",
  });
  statusBarContainer.append(addButton, doneButton);

  statusBar.appendChild(statusBarContainer);

  return statusBar;
}
