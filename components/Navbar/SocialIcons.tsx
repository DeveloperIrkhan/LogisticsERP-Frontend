interface IconProps {
  size?: number;
  className?: string;
}

export function FacebookIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.51 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.58v1.86h2.78l-.45 2.91h-2.33V22c4.78-.79 8.43-4.94 8.43-9.94Z" />
    </svg>
  );
}

export function TwitterIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.9 2H22l-7.19 8.2L23 22h-6.56l-5.14-6.74L5.3 22H2.18l7.7-8.8L1.5 2h6.72l4.66 6.16L18.9 2Zm-2.3 18h1.78L8.5 4H6.6l9.99 16Z" />
    </svg>
  );
}

export function LinkedinIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14ZM8.34 9.5H5.67V18.5h2.67V9.5ZM7 5.7a1.54 1.54 0 1 0 0 3.08A1.54 1.54 0 0 0 7 5.7Zm11.34 7.13c0-2.27-1.21-3.33-2.83-3.33-1.31 0-1.9.72-2.22 1.22v-1.22h-2.66c.04.78 0 9 0 9h2.66v-5.03c0-.27.02-.54.1-.73.22-.54.72-1.1 1.56-1.1 1.1 0 1.54.84 1.54 2.06V18.5h2.65l.2-5.67Z" />
    </svg>
  );
}

export function YoutubeIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M23.5 7.2s-.23-1.64-.94-2.36c-.9-.95-1.9-.95-2.36-1C16.9 3.6 12 3.6 12 3.6h-.01s-4.9 0-8.2.24c-.46.05-1.46.05-2.36 1C.73 5.56.5 7.2.5 7.2S.26 9.13.26 11.06v1.8c0 1.93.24 3.86.24 3.86s.23 1.64.94 2.36c.9.95 2.08.92 2.6 1.02 1.9.18 8 .24 8 .24s4.9-.01 8.2-.25c.46-.05 1.46-.05 2.36-1 .71-.72.94-2.36.94-2.36s.24-1.93.24-3.86v-1.8c0-1.93-.24-3.86-.24-3.86ZM9.7 14.96v-6.5l6.1 3.26-6.1 3.24Z" />
    </svg>
  );
}
