import { styleElement } from "@core/helpers";

export function createMainGrid(totalPage: number = 0) {
  const mainGrid = document.createElement("div");
  mainGrid.id = "main-grid";

  const mainGridContainer = document.createElement("div");
  mainGridContainer.classList.add("main-grid_container");
  styleElement(mainGridContainer.style, {
    width: totalPage * innerWidth + "px",
  });

  const fragment = document.createDocumentFragment();

  [...Array(totalPage).keys()].forEach((i) => {
    const pageElement = document.createElement("div");
    pageElement.textContent = `Page ${i + 1}`;
    styleElement(pageElement.style, {
      width: innerWidth + "px",
      height: "100%",
      border: "1px solid black",
      flexShrink: "0",
      zIndex: "10",
      background: "rgba(0,0,0,0.7)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    });
    fragment.appendChild(pageElement);
  });
  mainGridContainer.appendChild(fragment);

  mainGrid.appendChild(mainGridContainer);

  return mainGrid;
}
