import { styleElement } from "@core/helpers";
import { DappResponse } from "src/modules/dapp/domain/entities/dapp.type";
import { LayoutProps } from "src/modules/layout/domain/types/layout.type";

export interface DappViewProps extends LayoutProps {
  dapp: DappResponse;
  left: number;
  top: number;
}
export function createDapp(props: DappViewProps) {
  const { dapp, left, top, itemWidth, itemHeight, outerPadding, sizeIcon } =
    props;
  const template = document.getElementById(
    "dapp-template"
  ) as HTMLTemplateElement;

  if (!template) throw new Error("Template dapp-template không tồn tại!");

  const element = template.content.firstElementChild!.cloneNode(
    true
  ) as HTMLElement;

  styleElement(element.style, {
    width: dapp.isFavorite ? "auto" : itemWidth + "px",
    height: dapp.isFavorite ? "auto" : itemHeight + "px",
    left: "0",
    top: "0",
    transform: `translate(${left}px, ${top}px)`,
    position: dapp.isFavorite ? "fixed" : "absolute",
  });

  const container = element.querySelector(".itemDapp_container") as HTMLElement;
  const containerLogo = container.querySelector(
    ".itemDapp_container-logo"
  ) as HTMLElement;
  const containerName = container.querySelector(
    ".itemDapp_container-name"
  ) as HTMLElement;

  styleElement(containerLogo.style, {
    width: sizeIcon + "px",
    height: sizeIcon + "px",
  });
  if (!dapp.isFavorite) {
    containerName.textContent = dapp.name;
    styleElement(container.style, {
      paddingTop: outerPadding + "px",
    });
  } else {
    containerName.style.display = "none";
  }

  return element;
}
