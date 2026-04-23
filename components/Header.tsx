'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import RollingButton from './RollingButton';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-black/40 backdrop-blur-md text-white fixed w-full top-0 z-50 border-b border-white/5">
      <div className="container mx-auto px-4 flex justify-between items-center h-20">
        {/* Logo + social */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center">
            <Image src="/logo.svg" alt="Jazdené" height={60} width={210} className="h-[60px] w-auto object-contain" priority />
          </Link>
          <div className="hidden md:flex items-center gap-2 ml-1">
            <a href="https://www.facebook.com/p/Jazdené-100090163867662/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://www.instagram.com/jazdene.eu/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          <Link href="/" className="text-gray-300 font-semibold font-jakarta hover:text-white px-3 py-2 text-sm transition-colors">Domov</Link>
          <Link href="/ponuka" className="text-gray-300 font-semibold font-jakarta hover:text-white px-3 py-2 text-sm transition-colors">Ponuka</Link>
          <Link href="/kontakt" className="text-gray-300 font-semibold font-jakarta hover:text-white px-3 py-2 text-sm transition-colors">Kontakt</Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href="tel:+421908071885" className="text-sm font-semibold font-montserrat text-gray-400 hover:text-white transition-colors">+421 908 071 885</a>
          <RollingButton
            text="KONTAKT"
            href="/kontakt"
            className="border border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-bold font-jakarta text-sm px-5 py-2 transition-colors h-10"
          />
        </div>

        <button className="md:hidden p-2 focus:outline-none bg-transparent border-none cursor-pointer text-gray-300" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Overlay */}
      <div className={`fixed top-0 left-0 w-full h-[100dvh] bg-black/95 backdrop-blur-xl z-[60] transform transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center h-16 border-b border-gray-800">
          <Link href="/" onClick={() => setIsMenuOpen(false)}>
            <Image src="/logo.svg" alt="Jazdené" height={48} width={168} className="h-12 w-auto object-contain" />
          </Link>
          <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-transparent border-none cursor-pointer text-gray-300">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col p-8 gap-6">
          <Link href="/" className="text-white font-bold font-jakarta text-4xl hover:text-green-400 transition-colors" onClick={() => setIsMenuOpen(false)}>Domov</Link>
          <Link href="/ponuka" className="text-white font-bold font-jakarta text-4xl hover:text-green-400 transition-colors" onClick={() => setIsMenuOpen(false)}>Ponuka</Link>
          <Link href="/kontakt" className="text-white font-bold font-jakarta text-4xl hover:text-green-400 transition-colors" onClick={() => setIsMenuOpen(false)}>Kontakt</Link>
          <a href="tel:+421908071885" className="text-green-500 font-bold font-montserrat text-xl mt-4" onClick={() => setIsMenuOpen(false)}>+421 908 071 885</a>
        </nav>
      </div>
    </header>
  );
}
