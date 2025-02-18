import { Emitter } from "@core/infrastructure/emitter";
import { DraggableCore } from "./draggable-core";

export class Draggable extends DraggableCore {
  private startX: number = 0;
  private startY: number = 0;
  private timeStart: number = 0;
  private isMoveMain: boolean = false;
  private holdTimeout: number | undefined;
  private moveFrame: number | null = null;

  constructor(element: HTMLElement, private readonly emitter: Emitter) {
    super(element);
  }

  onStartDraggable(event: TouchEvent | MouseEvent): void {
    if (this.isMoveMain) return;
    const { clientX, clientY } = this.getClientCoordinates(event);
    this.setStartDraggable(clientX, clientY);

    // Trigger edit mode after 500ms hold
    this.holdTimeout = window.setTimeout(() => {
      this.emitter.emit("toggleEditMode", true);
    }, 500);
  }

  onMoveDraggable(event: TouchEvent | MouseEvent): void {
    if (!this.isMoveMain) return;
    const { clientX, clientY } = this.getClientCoordinates(event);
    if (this.moveFrame) {
      cancelAnimationFrame(this.moveFrame);
    }
    this.moveFrame = requestAnimationFrame(() => {
      const { deltaX, deltaY } = this.calculateDelta(clientX, clientY, true);
      const deltaThreshold = 2;
      if (
        Math.abs(deltaX) < deltaThreshold &&
        Math.abs(deltaY) < deltaThreshold
      )
        return;

      // Cancel the holdTimeout if movement exceeds threshold
      if (this.holdTimeout) {
        clearTimeout(this.holdTimeout);
      }
      this.isMoveMain = true; // Continue with dragging
    });
  }

  onEndDraggable(event: TouchEvent | MouseEvent): void {
    const { clientX, clientY } = this.getClientCoordinates(event);
    const { deltaX, deltaY } = this.calculateDelta(clientX, clientY, true);

    clearTimeout(this.holdTimeout); // Clear the timeout if movement happens

    // If no significant movement (tap), switch back to view mode
    if (Math.abs(deltaX) < 5 && Math.abs(deltaY) < 5) {
      this.emitter.emit("toggleEditMode", false); // Switch to view mode
    } else {
      this.reset();
    }
  }

  private reset() {
    this.startX = 0;
    this.startY = 0;
    this.timeStart = 0;
    this.isMoveMain = false;
    if (this.moveFrame) cancelAnimationFrame(this.moveFrame);
  }

  private calculateDelta(
    clientX: number,
    clientY: number,
    includeTime: boolean = false
  ): { deltaX: number; deltaY: number; deltaTime: number } {
    const deltaX = clientX - this.startX;
    const deltaY = clientY - this.startY;
    const deltaTime = includeTime ? performance.now() - this.timeStart : 0;
    return { deltaX, deltaY, deltaTime };
  }

  private setStartDraggable(clientX: number, clientY: number) {
    this.isMoveMain = true;
    this.timeStart = performance.now();
    this.startX = clientX;
    this.startY = clientY;
  }
}
