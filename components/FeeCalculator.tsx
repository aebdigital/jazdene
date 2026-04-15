'use client';

import { useState } from 'react';

type EngineType = 'comb' | 'hyb' | 'vet' | 'ev' | null;

const COMB_PRICES = [
  [33, 33, 33, 33, 33, 33, 33],
  [60, 48, 42, 36, 33, 33, 33],
  [90, 72, 63, 54, 45, 41, 36],
  [120, 96, 84, 72, 60, 54, 48],
  [200, 160, 140, 120, 100, 90, 80],
  [300, 240, 210, 180, 150, 135, 120],
  [500, 400, 350, 300, 250, 225, 200],
  [700, 560, 490, 420, 350, 315, 280],
  [900, 720, 630, 540, 450, 405, 360],
  [1000, 800, 700, 600, 500, 450, 400],
];
const HYB_PRICES = [33, 33, 33, 33, 40, 60, 100, 140, 180, 200];
const VET_PRICES = [33, 33, 33, 33, 33, 33, 50, 70, 90, 100];
const EV_PRICE = 33;

const POWER_OPTIONS = [
  'do 80 kW vrátane',
  'od 80 do 90 kW vrátane',
  'od 90 do 100 kW vrátane',
  'od 100 do 110 kW vrátane',
  'od 110 do 125 kW vrátane',
  'od 125 do 140 kW vrátane',
  'od 140 do 155 kW vrátane',
  'od 155 do 170 kW vrátane',
  'od 170 do 210 kW vrátane',
  'nad 210 kW',
];
const EURO_OPTIONS = [
  'Euro 1 (do 31.12.1996)',
  'Euro 2 (01.01.1997 – 31.12.2001)',
  'Euro 3 (01.01.2002 – 31.12.2006)',
  'Euro 4 (01.01.2007 – 31.12.2011)',
  'Euro 5/EEV (01.01.2012 – 31.08.2016)',
  'Euro 6 a,b,c (01.09.2016 – 31.08.2020)',
  'Euro 6 d (od 01.09.2020)',
];

const BOXES: { type: EngineType; label: string }[] = [
  { type: 'comb', label: 'Spalovací motor' },
  { type: 'hyb', label: 'Plug-in hybrid' },
  { type: 'vet', label: 'Veterán' },
  { type: 'ev', label: 'Elektrické vozidlo' },
];

const GOLD = '#D0AD24';

export default function FeeCalculator() {
  const [active, setActive] = useState<EngineType>(null);
  const [power, setPower] = useState(-1);
  const [euro, setEuro] = useState(-1);
  const [price, setPrice] = useState<number | null>(null);

  function selectType(type: EngineType) {
    setActive(type);
    setPower(-1);
    setEuro(-1);
    setPrice(type === 'ev' ? EV_PRICE : null);
  }

  function onPowerChange(val: number) {
    setPower(val);
    setEuro(-1);
    if (active === 'hyb') setPrice(HYB_PRICES[val]);
    else if (active === 'vet') setPrice(VET_PRICES[val]);
    else setPrice(null);
  }

  function onEuroChange(val: number) {
    setEuro(val);
    if (active === 'comb' && power >= 0) setPrice(COMB_PRICES[power][val]);
  }

  return (
    <div>
      {/* Type selector boxes */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {BOXES.map(({ type, label }) => (
          <button
            key={type}
            onClick={() => selectType(type)}
            className="relative h-20 rounded-lg text-left px-4 cursor-pointer transition-all duration-300 bg-gray-800 hover:scale-[1.02]"
            style={
              active === type
                ? {
                    boxShadow: `0 0 0 2.5px ${GOLD}, 0 8px 20px rgba(208,173,36,0.3)`,
                    transform: 'scale(1.02)',
                  }
                : { boxShadow: '0 4px 12px rgba(0,0,0,0.4)' }
            }
          >
            <span className="absolute bottom-3 left-4 font-bold font-jakarta text-[22px] leading-tight text-white">
              {label}
            </span>
          </button>
        ))}
      </div>

      {/* Form fields */}
      {active && active !== 'ev' && (
        <div className="mt-8 space-y-6">
          <div>
            <label className="block font-bold font-jakarta text-xl text-white mb-2">
              Vyberte výkon motora
            </label>
            <select
              value={power}
              onChange={(e) => onPowerChange(Number(e.target.value))}
              className="w-full max-w-sm border border-gray-700 bg-gray-800 text-white rounded-lg px-3 py-2.5 text-sm font-montserrat focus:outline-none appearance-none cursor-pointer"
              style={{ outlineColor: GOLD }}
            >
              <option value={-1} disabled>Vyberte výkon motora</option>
              {POWER_OPTIONS.map((opt, i) => (
                <option key={i} value={i}>{opt}</option>
              ))}
            </select>
          </div>

          {active === 'comb' && power >= 0 && (
            <div>
              <label className="block font-bold font-jakarta text-xl text-white mb-2">
                Vyberte emisnú normu
              </label>
              <select
                value={euro}
                onChange={(e) => onEuroChange(Number(e.target.value))}
                className="w-full max-w-sm border border-gray-700 bg-gray-800 text-white rounded-lg px-3 py-2.5 text-sm font-montserrat focus:outline-none appearance-none cursor-pointer"
              >
                <option value={-1} disabled>Vyberte emisnú normu</option>
                {EURO_OPTIONS.map((opt, i) => (
                  <option key={i} value={i}>{opt}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}

      {/* Price result */}
      {price !== null && (
        <div className="mt-8 font-jakarta text-xl text-white font-bold">
          Výška registračného poplatku:{' '}
          <span className="text-3xl" style={{ color: GOLD }}>{price} €</span>
        </div>
      )}
    </div>
  );
}
