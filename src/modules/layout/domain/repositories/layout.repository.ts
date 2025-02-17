import { LayoutProps } from "../types/layout.type";

export interface ILayoutRepository {
  insertLayout(props: LayoutProps): LayoutProps;
  getLayout(): LayoutProps;
}
