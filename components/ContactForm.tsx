'use client';

import { useState } from 'react';
import RollingButton from './RollingButton';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      subject: (form.elements.namedItem('subject') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setErrorMsg(json.error || 'Chyba odoslania.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Chyba siete. Skúste to znova.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="p-8 bg-green-900/10 border border-green-700/30 text-center">
        <svg className="w-12 h-12 text-green-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-lg font-bold font-jakarta text-green-300 mb-1">Správa odoslaná!</h3>
        <p className="text-green-400 font-montserrat text-sm">Ozveme sa vám čo najskôr.</p>
        <button onClick={() => setStatus('idle')} className="mt-4 text-sm text-green-400 underline font-montserrat bg-transparent border-none cursor-pointer">
          Odoslať ďalšiu správu
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="name" type="text" placeholder="Meno *" required className="w-full border border-white/10 bg-transparent text-white px-3 py-2.5 font-montserrat text-sm focus:outline-none focus:border-green-600 placeholder-gray-500" />
        <input name="email" type="email" placeholder="Email *" required className="w-full border border-white/10 bg-transparent text-white px-3 py-2.5 font-montserrat text-sm focus:outline-none focus:border-green-600 placeholder-gray-500" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="phone" type="tel" placeholder="Telefón" className="w-full border border-white/10 bg-transparent text-white px-3 py-2.5 font-montserrat text-sm focus:outline-none focus:border-green-600 placeholder-gray-500" />
        <input name="subject" type="text" placeholder="Predmet" className="w-full border border-white/10 bg-transparent text-white px-3 py-2.5 font-montserrat text-sm focus:outline-none focus:border-green-600 placeholder-gray-500" />
      </div>
      <textarea name="message" placeholder="Správa *" rows={5} required className="w-full border border-white/10 bg-transparent text-white px-3 py-2.5 font-montserrat text-sm focus:outline-none focus:border-green-600 placeholder-gray-500 resize-none" />

      {status === 'error' && (
        <p className="text-red-400 text-sm font-montserrat bg-red-900/10 border border-red-700/30 px-3 py-2">{errorMsg}</p>
      )}

      <RollingButton
        text={status === 'loading' ? 'Odosielam...' : 'Odoslať správu'}
        type="submit"
        className={`w-full bg-green-600 text-white py-3 px-6 font-bold font-jakarta hover:bg-green-500 transition-colors h-12 ${status === 'loading' ? 'opacity-60 cursor-not-allowed' : ''}`}
      />
    </form>
  );
}
