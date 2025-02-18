/**
 * Creates a smooth ease-in-out animation curve based on a quadratic function.
 *
 * - For the first half of the progress (t < 0.5), it eases in using a quadratic function.
 * - For the second half (t >= 0.5), it eases out symmetrically, slowing down towards the end.
 *
 * This easing is useful for animations that require a smooth acceleration at the start
 * and deceleration at the end.
 *
 * @param {number} t - The normalized time value of the animation (range: 0 to 1).
 * @returns {number} - The eased value at the given time.
 *
 * @example
 * const easedValue = easeInOutQuadratic(0.25); // Smoothly accelerates in the first half
 * const easedValue2 = easeInOutQuadratic(0.75); // Smoothly decelerates in the second half
 *
 * @see https://easings.net/ for more details on easing functions.
 */
export const easeInOutQuadratic = (t: number): number => (t < 0.5 ? 2 * t ** 2 : 1 - (-2 * t + 2) ** 2 / 2)
/**
 * Easing function: easeInCubic
 * Creates a cubic ease-in (starts slowly, accelerates).
 * @param t - Progress (value between 0 and 1)
 * @returns Eased value
 */
export const easeInCubic = (t: number): number => t ** 3

/**
 * Easing function: easeOutCubic
 * Creates a cubic ease-out (starts fast, decelerates).
 * @param t - Progress (value between 0 and 1)
 * @returns Eased value
 */
export const easeOutCubic = (t: number): number => 1 - (1 - t) ** 3

/**
 * Easing function: easeInOutCubic
 * Creates a smooth cubic ease-in-out transition.
 * @param t - Progress (value between 0 and 1)
 * @returns Eased value
 */
export const easeInOutCubic = (t: number): number => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2)

/**
 * Easing function: easeInExponential
 * Creates an exponential ease-in (starts very slowly, then accelerates).
 * @param t - Progress (value between 0 and 1)
 * @returns Eased value
 */
export const easeInExponential = (t: number): number => (t === 0 ? 0 : 2 ** (10 * (t - 1)))

/**
 * Easing function: easeOutExponential
 * Creates an exponential ease-out (starts fast, then slows).
 * @param t - Progress (value between 0 and 1)
 * @returns Eased value
 */
export const easeOutExponential = (t: number): number => (t === 1 ? 1 : 1 - 2 ** (-10 * t))

/**
 * Easing function: easeInOutExponential
 * Creates a dramatic exponential ease-in-out transition.
 * @param t - Progress (value between 0 and 1)
 * @returns Eased value
 */
export const easeInOutExponential = (t: number): number =>
  t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? 2 ** (20 * t - 10) / 2 : (2 - 2 ** (-20 * t + 10)) / 2

/**
 * Easing function: easeOutBounce
 * Creates a bouncing effect on ease-out.
 * @param t - Progress (value between 0 and 1)
 * @returns Eased value
 */
export const easeOutBounce = (t: number): number => {
  const n1 = 7.5625
  const d1 = 2.75
  if (t < 1 / d1) return n1 * t ** 2
  else if (t < 2 / d1) return n1 * (t -= 1.5 / d1) ** 2 + 0.75
  else if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) ** 2 + 0.9375
  else return n1 * (t -= 2.625 / d1) ** 2 + 0.984375
}

/**
 * Easing function: easeInElastic
 * Creates an elastic effect on ease-in.
 * @param t - Progress (value between 0 and 1)
 * @returns Eased value
 */
export const easeInElastic = (t: number): number =>
  t === 0 ? 0 : t === 1 ? 1 : -(2 ** (10 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI))

/**
 * Easing function: easeOutElastic
 * Creates an elastic effect on ease-out.
 * @param t - Progress (value between 0 and 1)
 * @returns Eased value
 */
export const easeOutElastic = (t: number): number =>
  t === 0 ? 0 : t === 1 ? 1 : 2 ** (-10 * t) * Math.sin((t - 0.1) * 5 * Math.PI) + 1

/**
 * Easing function: easeInOutElastic
 * Creates an elastic effect on ease-in-out.
 * @param t - Progress (value between 0 and 1)
 * @returns Eased value
 */
export const easeInOutElastic = (t: number): number =>
  t === 0
    ? 0
    : t === 1
      ? 1
      : t < 0.5
        ? -(2 ** (20 * t - 10) * Math.sin((20 * t - 11.125) * (2 * Math.PI))) / 2
        : (2 ** (-20 * t + 10) * Math.sin((20 * t - 11.125) * (2 * Math.PI))) / 2 + 1
