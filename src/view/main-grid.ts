export function createMainGrid() {
  const mainGrid = document.createElement("div");
  mainGrid.id = "main-grid";
  mainGrid.classList.add(
    "w-full",
    "h-full",
    "flex",
    "items-center",
    "justify-center"
  );

  const mainGridContainer = document.createElement("div");
  mainGridContainer.textContent = "Main Grid";

  mainGrid.appendChild(mainGridContainer);
  return mainGrid;
}
