import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';

// Framework Icons
const NextjsIcon = () => (
  <svg width="40" height="40" viewBox="0 0 180 180" fill="none">
    <mask
      id="mask0_408_139"
      style={{ maskType: 'alpha' }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="180"
      height="180"
    >
      <circle cx="90" cy="90" r="90" fill="black" />
    </mask>
    <g mask="url(#mask0_408_139)">
      <circle cx="90" cy="90" r="87" fill="black" stroke="white" strokeWidth="6" />
      <path
        d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
        fill="url(#paint0_linear_408_139)"
      />
      <rect x="115" y="54" width="12" height="72" fill="url(#paint1_linear_408_139)" />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_408_139"
        x1="109"
        y1="116.5"
        x2="144.5"
        y2="160.5"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_408_139"
        x1="121"
        y1="54"
        x2="120.799"
        y2="106.875"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

const ReactIcon = () => (
  <svg width="40" height="40" viewBox="-11.5 -10.232 23 20.463">
    <circle r="2.05" fill="#61dafb" />
    <g stroke="#61dafb" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

const RemixIcon = () => (
  <svg width="40" height="40" viewBox="0 0 800 800" fill="none">
    <rect width="800" height="800" fill="black" rx="100" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M587.947 527.768C592.201 582.418 592.201 608.036 592.201 636H465.756C465.756 633.035 465.879 630.232 466.003 627.416C466.414 618.041 466.834 608.455 464.717 590.911C461.443 562.298 448.281 554.328 420.004 554.328H331V636H211V289.4C211 262.6 232.6 241 259.4 241H422.947C514.753 241 562.013 286.298 562.013 354.82C562.013 406.103 530.347 437.768 491.34 448.983C525.627 459.653 555.173 488.235 587.947 527.768ZM331 459.328H408.443C444.623 459.328 464.717 441.503 464.717 408.793C464.717 373.835 444.623 358.258 408.443 358.258H331V459.328Z"
      fill="white"
    />
  </svg>
);

const AstroIcon = () => (
  <svg width="40" height="40" viewBox="0 0 128 128">
    <path
      fill="#FF5D01"
      d="M81.504 9.465c.973 1.207 1.469 2.836 2.457 6.09l21.656 71.136a90.079 90.079 0 00-25.89-8.765L65.629 30.28a1.833 1.833 0 00-3.52.004L48.18 77.902a90.104 90.104 0 00-26.003 8.778l21.758-71.14c.996-3.25 1.492-4.876 2.464-6.083a8.023 8.023 0 013.243-2.398c1.433-.575 3.136-.575 6.535-.575H71.72c3.402 0 5.105 0 6.543.579a7.988 7.988 0 013.242 2.402h-.001z"
    />
    <path
      fill="#FF5D01"
      d="M84.094 90.074c-3.57 3.054-10.696 5.137-18.903 5.137-10.07 0-18.515-3.137-20.754-7.356-.8 2.418-.98 5.184-.98 6.954 0 0-.527 8.675 5.508 14.71a5.671 5.671 0 015.672-5.671c5.37 0 5.367 4.683 5.363 8.488v.336c0 5.773 3.527 10.719 8.543 12.805a11.62 11.62 0 01-1.172-5.098c0-5.508 3.23-7.555 6.988-9.938 2.989-1.894 6.309-4 8.594-8.222a15.513 15.513 0 001.875-7.41 15.55 15.55 0 00-.734-4.735z"
    />
  </svg>
);

const icons: Record<string, () => ReactNode> = {
  nextjs: NextjsIcon,
  react: ReactIcon,
  remix: RemixIcon,
  astro: AstroIcon,
};

interface FrameworkCardProps {
  icon: 'nextjs' | 'react' | 'remix' | 'astro';
  name: string;
  href: string;
  badge?: string;
}

const cardStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.75rem',
  padding: '1.5rem 1rem',
  borderRadius: '0.75rem',
  border: '1px solid var(--gray-alpha-200, #e5e7eb)',
  textDecoration: 'none',
  color: 'inherit',
  transition: 'all 0.2s ease',
  position: 'relative',
  minHeight: '120px',
};

const nameStyle: CSSProperties = {
  fontWeight: 500,
  fontSize: '0.95rem',
};

const badgeStyle: CSSProperties = {
  position: 'absolute',
  top: '0.5rem',
  right: '0.5rem',
  fontSize: '0.65rem',
  padding: '0.15rem 0.5rem',
  borderRadius: '9999px',
  backgroundColor: 'var(--gray-alpha-100, #f3f4f6)',
  color: 'var(--gray-900, #374151)',
  fontWeight: 500,
};

export function FrameworkCard({ icon, name, href, badge }: FrameworkCardProps) {
  const Icon = icons[icon];

  return (
    <Link
      href={href}
      style={cardStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--primary, #3b82f6)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--gray-alpha-200, #e5e7eb)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {badge && <span style={badgeStyle}>{badge}</span>}
      {Icon && <Icon />}
      <span style={nameStyle}>{name}</span>
    </Link>
  );
}

// Grid container for multiple cards
const gridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
  gap: '1rem',
  margin: '1.5rem 0',
};

interface FrameworkGridProps {
  children: ReactNode;
}

export function FrameworkGrid({ children }: FrameworkGridProps) {
  return <div style={gridStyle}>{children}</div>;
}
