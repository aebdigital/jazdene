'use client';

export default function CookieSettingsButton({
  className = '',
  children = 'Cookies',
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event('open-cookie-settings'))}
      className={className}
    >
      {children}
    </button>
  );
}
