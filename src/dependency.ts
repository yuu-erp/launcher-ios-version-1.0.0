import { InMemoryStorageAdapter } from "@core/infrastructure/storage/in-memory-storage.adapter";
import { LocalStorageAdapter } from "@core/infrastructure/storage/localstorage.storage.adapter";
import { DappModule } from "./modules/dapp/application/dapp.module";
import { LayoutModule } from "./modules/layout/application/layout.module";

export const dependency = () => {
  const inMemoryStorageAdapter = new InMemoryStorageAdapter();
  const localStorageAdapter = new LocalStorageAdapter();

  const dappModule = DappModule.getInstance(inMemoryStorageAdapter);
  const dappController = dappModule.getController();

  const layoutModule = LayoutModule.getInstance(inMemoryStorageAdapter);
  const layoutController = layoutModule.getController();

  return {
    inMemoryStorageAdapter,
    localStorageAdapter,
    dappController,
    layoutController,
  };
};
