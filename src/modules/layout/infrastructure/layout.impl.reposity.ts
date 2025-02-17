import { StoragePort } from "@core/infrastructure/storage/storage.port";
import { ILayoutRepository } from "../domain/repositories/layout.repository";
import { LayoutProps } from "../domain/types/layout.type";

export class LayoutRepositoryImpl implements ILayoutRepository {
  protected readonly key: string = "layout";
  constructor(private readonly storage: StoragePort) {}
  insertLayout(props: LayoutProps): LayoutProps {
    this.storage.set(this.key, props);
    return props;
  }
  getLayout(): LayoutProps {
    const layout = this.storage.get(this.key);
    return layout;
  }
}
