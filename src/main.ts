import "./style.css";

import { InMemoryStorageAdapter } from "@core/infrastructure/storage/in-memory-storage.adapter";
import { DappModule } from "./modules/dapp/application/dapp.module";
import { layoutRender, updateLoading } from "./view/layout-render";
import { LayoutModule } from "./modules/layout/application/layout.module";

import { DATA } from "../data";
import { Emitter } from "@core/infrastructure/emitter";

async function bootstrap() {
  try {
    const inMemoryStorageAdapter = new InMemoryStorageAdapter();
    const emitter = new Emitter();

    const dappModule = DappModule.getInstance(inMemoryStorageAdapter);
    const dappController = dappModule.getController();
    console.log("dappController: ", dappController);
    const dataFlat = DATA.flatMap((item) => item);
    dappController.insertDapps(dataFlat);
    inMemoryStorageAdapter.set("totalPage", DATA.length);

    const layoutModule = LayoutModule.getInstance(inMemoryStorageAdapter);
    const layoutController = layoutModule.getController();
    const layout = layoutController.calculate();
    console.log("layoutController: ", layoutController);

    console.log("InMemoryStorageAdapter: ", inMemoryStorageAdapter.getAll());

    layoutRender(layout, inMemoryStorageAdapter, emitter);
    updateLoading(false);
  } catch (error) {
    console.error(error);
  }
}

bootstrap();
