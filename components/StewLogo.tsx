// Stew Ladle Logo SVG — uses currentColor for easy recoloring
export default function StewLogo({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      aria-label="Stew logo"
    >
      {/* Handle curve */}
      <path d="M185 18c-8-5-22-2-38 10-16 12-35 32-56 58-21 26-44 55-65 82-18 23-36 44-50 58-12 12-24 22-33 26-7 3-13 4-15 0s2-14 10-26c14-18 36-42 62-68 26-26 56-54 84-78 24-20 47-36 64-44 12-6 22-9 28-8 5 1 12 5 9-10z"/>
      {/* Ladle bowl */}
      <path d="M62 162c-14 11-30 24-40 32-8 6-16 10-18 7-4-5 4-18 16-32 16-18 38-40 62-62 18-16 36-32 50-44-20 18-44 42-66 64-16 16-26 28-28 34-1 4 1 5 4 4 5-3 14-10 24-20l16-16-20 33z" opacity="0.85"/>
      {/* Bowl inner detail */}
      <ellipse cx="72" cy="158" rx="12" ry="5" transform="rotate(-40 72 158)" opacity="0.4"/>
    </svg>
  );
}
