'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

type CookiePreferences = {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
};

const STORAGE_KEY = 'jazdene-cookie-preferences';
const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true,
  functional: false,
  analytics: false,
};

function readStoredPreferences(): CookiePreferences | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const parsed = JSON.parse(stored) as Partial<CookiePreferences>;
    return {
      necessary: true,
      functional: Boolean(parsed.functional),
      analytics: Boolean(parsed.analytics),
    };
  } catch {
    return null;
  }
}

function savePreferences(preferences: CookiePreferences) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
}

function CookieToggle({ checked, disabled = false, onChange }: { checked: boolean; disabled?: boolean; onChange?: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      disabled={disabled}
      aria-pressed={checked}
      className={`relative h-7 w-14 transition ${checked ? 'bg-green-600' : 'bg-gray-300'} ${disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
    >
      <span className={`absolute top-1 h-5 w-5 bg-white shadow transition ${checked ? 'left-8' : 'left-1'}`} />
    </button>
  );
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_PREFERENCES);

  useEffect(() => {
    const stored = readStoredPreferences();
    if (stored) {
      setPreferences(stored);
    } else {
      setShowBanner(true);
    }

    const openSettings = () => {
      setShowBanner(false);
      setShowSettings(true);
    };

    window.addEventListener('open-cookie-settings', openSettings);
    return () => window.removeEventListener('open-cookie-settings', openSettings);
  }, []);

  useEffect(() => {
    if (!showSettings) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [showSettings]);

  const rows = useMemo(
    () => [
      { key: 'necessary' as const, title: 'Nevyhnutné cookies', description: 'Zabezpečujú základnú funkčnosť stránky a nie je možné ich vypnúť.', disabled: true },
      { key: 'functional' as const, title: 'Funkčné cookies', description: 'Pomáhajú si zapamätať vaše voľby a zlepšujú komfort pri používaní webu.' },
      { key: 'analytics' as const, title: 'Štatistické cookies', description: 'Pomáhajú nám pochopiť, ako návštevníci používajú stránku.' },
    ],
    [],
  );

  const updatePreferences = (next: CookiePreferences) => {
    const normalized = { ...next, necessary: true };
    setPreferences(normalized);
    savePreferences(normalized);
  };

  const acceptAll = () => {
    updatePreferences({ necessary: true, functional: true, analytics: true });
    setShowBanner(false);
    setShowSettings(false);
  };

  const rejectOptional = () => {
    updatePreferences({ necessary: true, functional: false, analytics: false });
    setShowBanner(false);
    setShowSettings(false);
  };

  const saveCurrentSettings = () => {
    updatePreferences(preferences);
    setShowBanner(false);
    setShowSettings(false);
  };

  return (
    <>
      {showBanner && (
        <div className="fixed inset-x-0 bottom-0 z-[80] p-4 sm:p-6">
          <div className="mx-auto max-w-7xl border border-white/10 bg-[#0a0b0e]/90 p-6 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-4xl">
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-green-600">Cookies</p>
                <h2 className="mb-3 font-jakarta text-2xl font-bold text-white">Táto stránka používa cookies</h2>
                <p className="font-montserrat text-sm leading-7 text-gray-400">
                  Používame nevyhnutné, funkčné a štatistické cookies, aby stránka fungovala spoľahlivo a aby sme vedeli služby ďalej zlepšovať. Kliknutím na{' '}
                  <button type="button" onClick={() => setShowSettings(true)} className="font-semibold text-green-500 underline underline-offset-4">Nastavenia</button>{' '}
                  si môžete upraviť svoje preferencie. Viac informácií nájdete na stránke{' '}
                  <Link href="/ochrana-osobnych-udajov" className="font-semibold text-green-500 underline underline-offset-4">Ochrana osobných údajov</Link>.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center shrink-0">
                <button type="button" onClick={rejectOptional} className="whitespace-nowrap border border-white/10 px-6 py-3 font-jakarta text-sm font-bold text-white transition hover:bg-white/5">Odmietnuť voliteľné</button>
                <button type="button" onClick={acceptAll} className="whitespace-nowrap bg-green-600 px-6 py-3 font-jakarta text-sm font-bold text-white transition hover:bg-green-700">Prijať všetko</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSettings && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-2xl overflow-hidden bg-[#0a0b0e]/90 border border-white/10 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-600">Nastavenia</p>
                <h3 className="mt-1 font-jakarta text-2xl font-bold text-white">Nastavenia cookies</h3>
              </div>
              <button type="button" onClick={() => setShowSettings(false)} className="border border-white/10 px-3 py-1 text-2xl leading-none text-white transition hover:bg-white/5">×</button>
            </div>

            <div className="space-y-4 px-6 py-6">
              {rows.map((row) => (
                <div key={row.key} className="flex items-start justify-between gap-4 border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-md">
                  <div className="pr-4">
                    <h4 className="font-jakarta text-lg font-bold text-white">{row.title}</h4>
                    <p className="mt-1 font-montserrat text-sm leading-6 text-gray-400">{row.description}</p>
                  </div>
                  <CookieToggle
                    checked={preferences[row.key]}
                    disabled={row.disabled}
                    onChange={row.disabled ? undefined : () => setPreferences((current) => ({ ...current, [row.key]: !current[row.key] }))}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 border-t border-gray-200 px-6 py-5 sm:flex-row sm:justify-end">
              <button type="button" onClick={rejectOptional} className="whitespace-nowrap border border-white/10 px-5 py-3 font-jakarta text-sm font-bold text-white transition hover:bg-white/5">Odmietnuť voliteľné</button>
              <button type="button" onClick={saveCurrentSettings} className="whitespace-nowrap border border-green-200 bg-green-50 px-5 py-3 font-jakarta text-sm font-bold text-green-700 transition hover:bg-green-100">Uložiť nastavenia</button>
              <button type="button" onClick={acceptAll} className="whitespace-nowrap bg-green-600 px-5 py-3 font-jakarta text-sm font-bold text-white transition hover:bg-green-700">Prijať všetko</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
