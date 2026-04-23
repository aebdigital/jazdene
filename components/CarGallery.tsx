'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  images: string[];
  carName: string;
}

export default function CarGallery({ images, carName }: Props) {
  const [mobileIndex, setMobileIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [desktopOffset, setDesktopOffset] = useState(0);
  const [direction, setDirection] = useState(0);

  const COLS_VISIBLE = 2;

  const openLightbox = (i: number) => {
    setLightboxIndex(i);
    setLightboxOpen(true);
  };
  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const nextLb = useCallback(() => {
    setDirection(1);
    setLightboxIndex((p) => (p + 1) % images.length);
  }, [images.length]);

  const prevLb = useCallback(() => {
    setDirection(-1);
    setLightboxIndex((p) => (p - 1 + images.length) % images.length);
  }, [images.length]);

  const nextMobile = useCallback(() => {
    setDirection(1);
    setMobileIndex((p) => (p + 1) % images.length);
  }, [images.length]);

  const prevMobile = useCallback(() => {
    setDirection(-1);
    setMobileIndex((p) => (p - 1 + images.length) % images.length);
  }, [images.length]);

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
      <div className="w-full h-72 bg-white/5 border border-white/10 flex items-center justify-center mb-8 backdrop-blur-sm">
        <span className="text-8xl">🚗</span>
      </div>
    );
  }

  const smallImages = images.slice(1);
  const colCount = Math.ceil(smallImages.length / 2);
  const maxOffset = Math.max(0, colCount - COLS_VISIBLE);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  return (
    <>
      {/* Mobile slider */}
      <div className="block md:hidden mb-6 relative">
        <div className="w-full aspect-[4/3] bg-white/5 border border-white/10 overflow-hidden relative backdrop-blur-sm touch-pan-y">
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={mobileIndex}
              src={images[mobileIndex]}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = offset.x;
                if (swipe < -50) nextMobile();
                else if (swipe > 50) prevMobile();
              }}
              className="absolute w-full h-full object-cover cursor-pointer"
              onClick={() => openLightbox(mobileIndex)}
            />
          </AnimatePresence>
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevMobile(); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 z-10 transition-colors"
                aria-label="Predchádzajúca fotka"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextMobile(); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 z-10 transition-colors"
                aria-label="Ďalšia fotka"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <div className="absolute bottom-2 right-3 bg-black/50 text-white text-xs px-2 py-1 z-10">
                {mobileIndex + 1} / {images.length}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Desktop gallery */}
      <div className="hidden md:block mb-8">
        <div className="flex gap-2 h-[420px] overflow-hidden relative">
          <div className="flex-shrink-0 w-[55%] h-full overflow-hidden cursor-pointer" onClick={() => openLightbox(0)}>
            <img
              src={images[0]}
              alt={carName}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="flex-1 overflow-hidden relative">
            {maxOffset > 0 && (
              <>
                <button
                  onClick={() => setDesktopOffset((p) => Math.max(0, p - 1))}
                  disabled={desktopOffset === 0}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow w-8 h-8 flex items-center justify-center disabled:opacity-30 transition-opacity"
                >
                  ‹
                </button>
                <button
                  onClick={() => setDesktopOffset((p) => Math.min(maxOffset, p + 1))}
                  disabled={desktopOffset >= maxOffset}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow w-8 h-8 flex items-center justify-center disabled:opacity-30 transition-opacity"
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
                  className="overflow-hidden cursor-pointer relative"
                  onClick={() => openLightbox(i + 1)}
                >
                  <img
                    src={img}
                    alt={`${carName} ${i + 2}`}
                    className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                  />
                  {i === smallImages.length - 1 && images.length > 5 && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center ">
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
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center touch-none"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 w-12 h-12 flex items-center justify-center text-3xl z-50"
            >
              ×
            </button>
            
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              <AnimatePresence initial={false} custom={direction}>
                <motion.img
                  key={lightboxIndex}
                  src={images[lightboxIndex]}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = offset.x;
                    if (swipe < -50) nextLb();
                    else if (swipe > 50) prevLb();
                  }}
                  className="absolute max-w-[95vw] max-h-[90vh] object-contain shadow-2xl cursor-grab active:cursor-grabbing"
                  onClick={(e) => e.stopPropagation()}
                />
              </AnimatePresence>
            </div>

            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevLb(); }}
                  className="absolute left-4 text-white bg-white/10 hover:bg-white/20 w-12 h-12 hidden md:flex items-center justify-center text-2xl z-50"
                >
                  ‹
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextLb(); }}
                  className="absolute right-4 text-white bg-white/10 hover:bg-white/20 w-12 h-12 hidden md:flex items-center justify-center text-2xl z-50"
                >
                  ›
                </button>
              </>
            )}

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 bg-black/50 px-4 py-1.5 font-montserrat text-sm z-50">
              {lightboxIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
