'use client';

import { useEffect, useRef } from 'react';

interface Props {
  imageSrc: string;
  children: React.ReactNode;
  className?: string;
}

export default function ParallaxHero({ imageSrc, children, className = '' }: Props) {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!bgRef.current) return;
      const scrolled = window.scrollY;
      bgRef.current.style.transform = `translateY(${scrolled * 0.4}px)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className={`relative min-h-screen flex items-center justify-center text-white overflow-hidden ${className}`}>
      {/* Parallax background */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-[130%] -top-[15%] bg-cover bg-center will-change-transform"
        style={{ backgroundImage: `url("${imageSrc}")` }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55" />
      {/* Content – sticky within hero */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </section>
  );
}
