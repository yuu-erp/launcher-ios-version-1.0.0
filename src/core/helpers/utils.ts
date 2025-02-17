export const styleElement = (
  styleElement: CSSStyleDeclaration,
  obj: Partial<CSSStyleDeclaration>
) => Object.assign(styleElement, obj);

export const useResponsiveValue = <T extends number | string>(
  breakpoints: Record<number, T>,
  defaultValue: T
) => {
  const sortedBreakpoints = Object.keys(breakpoints)
    .map(Number)
    .sort((a, b) => b - a);

  for (const breakpoint of sortedBreakpoints) {
    if (innerWidth >= breakpoint) {
      return breakpoints[breakpoint];
    }
  }

  return defaultValue;
};
