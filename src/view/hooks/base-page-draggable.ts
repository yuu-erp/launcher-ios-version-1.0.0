export abstract class BasePageDraggable {
  protected currentPage: number;
  protected totalPage: number;
  protected scrollElement: HTMLElement;
  private scrollLeft: number = 0;

  constructor(element: HTMLElement, currentPage: number, totalPage: number) {
    this.currentPage = currentPage;
    this.totalPage = totalPage;
    this.scrollElement = element;
  }

  onStartPage() {
    this.scrollLeft = this.scrollElement.scrollLeft || 0;
  }

  onMovePage(walkX: number) {
    if (walkX > 0 && this.currentPage === 0) return;
    if (walkX < 0 && this.currentPage + 1 === this.totalPage) return;
    this.movePage(this.scrollLeft - walkX);
  }

  onEndPage(deltaX: number, deltaTime: number) {
    const deltaThreshold = 2;
    if (Math.abs(deltaX) < deltaThreshold) return;

    const MAX_TIME = 1000;
    const adjustedDeltaTime = Math.min(deltaTime, MAX_TIME);
    const velocity = Math.abs(deltaX / adjustedDeltaTime);
    const VELOCITY_THRESHOLD = 0.3;
    const pageWidth = this.scrollElement.clientWidth || 1;
    const DISTANCE_THRESHOLD = pageWidth * 0.5;
    const maxPage = this.totalPage;

    if (
      velocity > VELOCITY_THRESHOLD ||
      Math.abs(deltaX) > DISTANCE_THRESHOLD
    ) {
      this.currentPage =
        deltaX > 0
          ? Math.max(0, this.currentPage - 1)
          : Math.min(maxPage, this.currentPage + 1);
    }
    this.scrollToPage(this.currentPage);
    this.resetScrollLeft();
  }

  protected movePage(to: number) {
    this.scrollElement.scrollLeft = to;
  }

  protected scrollToPage(
    targetPage: number,
    callback?: () => void,
    duration: number = 260
  ) {
    const pageWidth = this.scrollElement.offsetWidth;
    const targetPosition = targetPage * pageWidth;
    const startPosition = this.scrollElement.scrollLeft;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      this.scrollElement.scrollLeft = startPosition + distance * progress;

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        if (callback && typeof callback === "function") {
          callback();
        }
      }
    };
    requestAnimationFrame(animateScroll);
  }

  protected scrollToPageNotrequestAnimationFrame(page: number = 0) {
    if (!this.scrollElement) return;
    const to = this.scrollElement.offsetWidth * page;
    this.movePage(to);
  }

  private resetScrollLeft() {
    this.scrollLeft = 0;
  }
}
