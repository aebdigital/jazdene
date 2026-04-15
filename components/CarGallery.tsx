'use client';

import { useState, useEffect, useCallback } from 'react';

interface Props {
  images: string[];
  carName: string;
}

export default function CarGallery({ images, carName }: Props) {
  const [mobileIndex, setMobileIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [desktopOffset, setDesktopOffset] = useState(0);

  const COLS_VISIBLE = 2; // number of small-photo columns visible at once

  const openLightbox = (i: number) => {
    setLightboxIndex(i);
    setLightboxOpen(true);
  };
  const closeLightbox = useCallback(() => setLightboxOpen(false), []);
  const nextLb = useCallback(
    () => setLightboxIndex((p) => (p + 1) % images.length),
    [images.length]
  );
  const prevLb = useCallback(
    () => setLightboxIndex((p) => (p - 1 + images.length) % images.length),
    [images.length]
  );

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextLb();
      if (e.key === 'ArrowLeft') prevLb();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxOpen, nextLb, prevLb, closeLightbox]);

  if (images.length === 0) {
    return (
      <div className="w-full h-72 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center rounded-xl mb-8">
        <span className="text-8xl">🚗</span>
      </div>
    );
  }

  // Desktop: 1 big + small grid scrollable
  const smallImages = images.slice(1);
  const colCount = Math.ceil(smallImages.length / 2);
  const maxOffset = Math.max(0, colCount - COLS_VISIBLE);

  return (
    <>
      {/* Mobile slider */}
      <div className="block md:hidden mb-6 relative">
        <div className="w-full aspect-[4/3] bg-gray-200 rounded-xl overflow-hidden relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[mobileIndex]}
            alt={`${carName} ${mobileIndex + 1}`}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => openLightbox(mobileIndex)}
          />
          {images.length > 1 && (
            <>
              <button
                onClick={() => setMobileIndex((p) => (p - 1 + images.length) % images.length)}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                aria-label="Predchádzajúca fotka"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setMobileIndex((p) => (p + 1) % images.length)}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                aria-label="Ďalšia fotka"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <div className="absolute bottom-2 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                {mobileIndex + 1} / {images.length}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Desktop gallery */}
      <div className="hidden md:block mb-8">
        <div className="flex gap-2 h-[420px] overflow-hidden relative">
          {/* Main big image */}
          <div className="flex-shrink-0 w-[55%] h-full rounded-xl overflow-hidden cursor-pointer" onClick={() => openLightbox(0)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[0]}
              alt={carName}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Small grid – scrollable */}
          <div className="flex-1 overflow-hidden relative">
            {maxOffset > 0 && (
              <>
                <button
                  onClick={() => setDesktopOffset((p) => Math.max(0, p - 1))}
                  disabled={desktopOffset === 0}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow rounded-full w-8 h-8 flex items-center justify-center disabled:opacity-30 transition-opacity"
                  aria-label="Skrolovať doľava"
                >
                  ‹
                </button>
                <button
                  onClick={() => setDesktopOffset((p) => Math.min(maxOffset, p + 1))}
                  disabled={desktopOffset >= maxOffset}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow rounded-full w-8 h-8 flex items-center justify-center disabled:opacity-30 transition-opacity"
                  aria-label="Skrolovať doprava"
                >
                  ›
                </button>
              </>
            )}
            <div
              className="grid grid-rows-2 gap-2 h-full transition-transform duration-500"
              style={{
                gridAutoFlow: 'column',
                gridAutoColumns: 'calc(50% - 4px)',
                transform: `translateX(-${desktopOffset * 50}%)`,
              }}
            >
              {smallImages.map((img, i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden cursor-pointer relative"
                  onClick={() => openLightbox(i + 1)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt={`${carName} ${i + 2}`}
                    className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                  />
                  {i === smallImages.length - 1 && images.length > 5 && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl">
                      <span className="text-white font-bold font-montserrat text-lg">
                        +{images.length - 5} fotiek
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-400 font-montserrat mt-1 text-right">
          {images.length} fotiek · kliknite pre zväčšenie
        </p>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white bg-white/20 hover:bg-white/40 rounded-full w-10 h-10 flex items-center justify-center text-2xl transition-colors"
            aria-label="Zavrieť"
          >
            ×
          </button>
          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prevLb(); }}
            className="absolute left-4 text-white bg-white/20 hover:bg-white/40 rounded-full w-10 h-10 flex items-center justify-center text-xl transition-colors"
            aria-label="Predchádzajúca"
          >
            ‹
          </button>
          {/* Image */}
          <div
            className="max-w-[90vw] max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[lightboxIndex]}
              alt={`${carName} ${lightboxIndex + 1}`}
              className="max-w-full max-h-[88vh] object-contain rounded-lg shadow-2xl"
            />
          </div>
          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); nextLb(); }}
            className="absolute right-4 text-white bg-white/20 hover:bg-white/40 rounded-full w-10 h-10 flex items-center justify-center text-xl transition-colors"
            aria-label="Ďalšia"
          >
            ›
          </button>
          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm font-montserrat bg-black/40 px-3 py-1 rounded-full">
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
