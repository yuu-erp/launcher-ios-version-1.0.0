import "./style.css";

import { InMemoryStorageAdapter } from "@core/infrastructure/storage/in-memory-storage.adapter";
import { DappModule } from "./modules/dapp/application/dapp.module";
import { layoutRender } from "./view/layout-render";
import { LayoutModule } from "./modules/layout/application/layout.module";

async function bootstrap() {
  try {
    const inMemoryStorageAdapter = new InMemoryStorageAdapter();

    const dappModule = DappModule.getInstance(inMemoryStorageAdapter);
    const dappController = dappModule.getController();
    console.log("dappController: ", dappController);

    const layoutModule = LayoutModule.getInstance(inMemoryStorageAdapter);
    const layoutController = layoutModule.getController();
    const layout = layoutController.calculate();
    console.log("layoutController: ", layoutController);

    console.log("InMemoryStorageAdapter: ", inMemoryStorageAdapter.getAll());

    layoutRender(layout);
  } catch (error) {
    console.error(error);
  }
}

bootstrap();
