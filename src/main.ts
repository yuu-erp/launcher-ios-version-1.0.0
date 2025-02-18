import "./style.css";

import { DATA, DATA_DOCK } from "../data";
import { dependency } from "./dependency";
import { layoutRender } from "./view/layout-render";

async function bootstrap() {
  try {
    const {
      inMemoryStorageAdapter,
      localStorageAdapter,
      dappController,
      layoutController,
    } = dependency();

    const dataFlat = DATA.flatMap((item) => item).concat(DATA_DOCK);
    dappController.insertDapps(dataFlat);
    inMemoryStorageAdapter.set("totalPage", DATA.length);

    const layout = layoutController.calculate();

    layoutRender(
      layout,
      inMemoryStorageAdapter,
      localStorageAdapter,
      dappController
    );

    console.log("InMemoryStorageAdapter: ", inMemoryStorageAdapter.getAll());
  } catch (error) {
    console.error(error);
  }
}

bootstrap();
