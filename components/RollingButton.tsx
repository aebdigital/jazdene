'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface Props {
  text: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
}

export default function RollingButton({ text, href, onClick, className = '', type = 'button' }: Props) {
  const content = (
    <div className="relative overflow-hidden h-[1.2em]">
      <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2">
        <span className="flex items-center justify-center h-[1.2em]">{text}</span>
        <span className="flex items-center justify-center h-[1.2em]">{text}</span>
      </div>
    </div>
  );

  const baseStyles = `group relative inline-flex items-center justify-center overflow-hidden transition-all duration-300 ${className}`;

  if (href) {
    if (href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:')) {
      return (
        <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} className={baseStyles}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={baseStyles}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={baseStyles}>
      {content}
    </button>
  );
}
