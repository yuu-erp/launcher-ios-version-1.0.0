import { BasePageDraggable } from "./base-page-draggable";

export class GroupDraggable extends BasePageDraggable {
  constructor(element: HTMLElement, currentPage: number, totalPage: number) {
    super(element, currentPage, totalPage);
  }
}
