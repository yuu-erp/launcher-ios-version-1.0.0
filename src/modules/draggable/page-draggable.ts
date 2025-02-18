import { easeInOutQuadratic } from "@core/helpers";

export class PageDraggable {
  private currentPage: number;
  private scrollLeft: number = 0;
  private scrollElement: HTMLElement;
  private totalPage: number;
  constructor(element: HTMLElement, currentPage: number, totalPage: number) {
    this.currentPage = currentPage || 0;
    this.totalPage = totalPage || 1;
    this.scrollElement = element;
  }

  onStartPage() {
    this.scrollLeft = this.scrollElement.scrollLeft || 0;
  }

  onMovePage(walkX: number) {
    if (walkX > 0 && this.currentPage === 0) return;
    if (walkX < 0 && this.currentPage + 1 === this.totalPage) return;
    const to = this.scrollLeft - walkX;
    this.movePage(to);
  }

  onEndPage(deltaX: number, deltaTime: number) {
    const deltaThreshold = 2;
    if (Math.abs(deltaX) < deltaThreshold) return;
    // Kiểm tra giá trị deltaX và deltaTime
    const MAX_TIME = 1000; // Giới hạn thời gian tối đa kéo (1 giây)
    const adjustedDeltaTime = Math.min(deltaTime, MAX_TIME);
    const velocity = Math.abs(deltaX / adjustedDeltaTime);
    // Ngưỡng tốc độ (tùy chỉnh theo yêu cầu)
    const VELOCITY_THRESHOLD = 0.3; // Tốc độ đủ để chuyển trang
    const pageWidth = this.scrollElement.clientWidth || 1; // Tránh chia cho 0
    const DISTANCE_THRESHOLD = pageWidth * 0.5; // Ngưỡng kéo 50% trang
    const maxPage = this.totalPage;
    // Xác định trang mục tiêu
    if (
      velocity > VELOCITY_THRESHOLD ||
      Math.abs(deltaX) > DISTANCE_THRESHOLD
    ) {
      // Dựa vào hướng kéo để xác định trang
      if (deltaX > 0) {
        this.currentPage = Math.max(0, this.currentPage - 1);
      } else {
        this.currentPage = Math.min(maxPage, this.currentPage + 1);
      }
    }
    this.scrollToPage(this.currentPage);
    this.resetScrollLeft();
  }

  movePage(to: number) {
    if (!this.scrollElement)
      return console.error("this.scrollElement not found!");
    this.scrollElement.scrollLeft = to;
  }

  scrollToPage(
    targetPage: number,
    callback?: () => void,
    duration: number = 260
  ) {
    return new Promise((resolve) => {
      if (!this.scrollElement) return;
      const pageWidth = this.scrollElement.offsetWidth;
      const targetPosition = targetPage * pageWidth;
      const startPosition = this.scrollElement.scrollLeft;
      const distance = targetPosition - startPosition;

      const startTime = performance.now();

      const animateScroll = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const ease = easeInOutQuadratic(progress);
        this.scrollElement.scrollLeft = startPosition + distance * ease;

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        } else {
          resolve(true);
          if (callback && typeof callback === "function") {
            callback?.();
          }
        }
      };

      requestAnimationFrame(animateScroll);
    });
  }

  resetScrollLeft(): void {
    this.scrollLeft = 0;
  }
}
