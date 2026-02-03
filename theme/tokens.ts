
/**
 * MATERIAL 3 DESIGN TOKENS
 * Strictly following the 8dp grid and semantic roles.
 */

export const M3_SPACING = {
  xs: 'dp-4',   // 4dp
  sm: 'dp-8',   // 8dp (Grid base)
  md: 'dp-16',  // 16dp
  lg: 'dp-24',  // 24dp
  xl: 'dp-32',  // 32dp
  touch: 'dp-48' // 48dp (Min touch target)
} as const;

export const M3_TYPOGRAPHY = {
  display: {
    large: 'text-6xl font-normal tracking-[-0.25px]',
    medium: 'text-5xl font-normal tracking-[0px]',
    small: 'text-4xl font-normal tracking-[0px]',
  },
  headline: {
    large: 'text-3xl font-normal tracking-[0px]',
    medium: 'text-2xl font-normal tracking-[0px]',
    small: 'text-xl font-normal tracking-[0px]',
  },
  title: {
    large: 'text-lg font-medium tracking-[0px]',
    medium: 'text-base font-medium tracking-[0.15px]',
    small: 'text-sm font-medium tracking-[0.1px]',
  },
  body: {
    large: 'text-base font-normal tracking-[0.5px]',
    medium: 'text-sm font-normal tracking-[0.25px]',
    small: 'text-xs font-normal tracking-[0.4px]',
  },
  label: {
    large: 'text-sm font-medium tracking-[0.1px]',
    medium: 'text-xs font-medium tracking-[0.5px]',
    small: 'text-[11px] font-medium tracking-[0.5px]',
  }
} as const;

export const M3_SHAPE = {
  none: 'rounded-m3-none',
  extraSmall: 'rounded-m3-xs',
  small: 'rounded-m3-sm',
  medium: 'rounded-m3-md',
  large: 'rounded-m3-lg',
  extraLarge: 'rounded-m3-xl',
  full: 'rounded-m3-full',
  // Standardized semantic tokens
  card: 'rounded-m3-md',      // 12dp - Standard M3 Card rounding
  container: 'rounded-m3-lg', // 16dp - Larger container rounding
} as const;
