'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { Car } from '@/lib/cars';
import { Calendar, Gauge, Fuel, Settings2 } from 'lucide-react';

type SortKey = 'price-asc' | 'price-desc' | 'year-desc' | 'year-asc' | 'mileage-asc';

interface Filters {
  search: string;
  priceMin: string;
  priceMax: string;
  yearMin: string;
  yearMax: string;
  mileageMax: string;
  fuels: string[];
  transmissions: string[];
  bodyTypes: string[];
  sort: SortKey;
}

function unique(arr: string[]) {
  return Array.from(new Set(arr.filter(Boolean))).sort();
}

export default function PonukaClient({ cars }: { cars: Car[] }) {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    search: '',
    priceMin: '',
    priceMax: '',
    yearMin: '',
    yearMax: '',
    mileageMax: '',
    fuels: [],
    transmissions: [],
    bodyTypes: [],
    sort: 'price-asc',
  });

  // Derive unique filter options from data
  const fuelOptions = useMemo(() => unique(cars.map(c => c.fuel)), [cars]);
  const transmissionOptions = useMemo(() => unique(cars.map(c => c.transmission.split('|')[0].trim())), [cars]);
  const bodyTypeOptions = useMemo(() => unique(cars.map(c => c.bodyType)), [cars]);

  function setFilter<K extends keyof Filters>(key: K, val: Filters[K]) {
    setFilters(f => ({ ...f, [key]: val }));
  }

  function toggleArray(key: 'fuels' | 'transmissions' | 'bodyTypes', val: string) {
    setFilters(f => {
      const arr = f[key];
      return { ...f, [key]: arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val] };
    });
  }

  function resetFilters() {
    setFilters({ search: '', priceMin: '', priceMax: '', yearMin: '', yearMax: '', mileageMax: '', fuels: [], transmissions: [], bodyTypes: [], sort: 'price-asc' });
  }

  const filtered = useMemo(() => {
    let result = [...cars];
    const q = filters.search.toLowerCase();
    if (q) result = result.filter(c => c.title.toLowerCase().includes(q) || c.brand.toLowerCase().includes(q) || c.model.toLowerCase().includes(q));
    if (filters.priceMin) result = result.filter(c => c.price >= Number(filters.priceMin));
    if (filters.priceMax) result = result.filter(c => c.price <= Number(filters.priceMax) || c.price === 0);
    if (filters.yearMin) result = result.filter(c => c.year >= Number(filters.yearMin));
    if (filters.yearMax) result = result.filter(c => c.year <= Number(filters.yearMax));
    if (filters.mileageMax) result = result.filter(c => c.mileage <= Number(filters.mileageMax));
    if (filters.fuels.length) result = result.filter(c => filters.fuels.includes(c.fuel));
    if (filters.transmissions.length) result = result.filter(c => filters.transmissions.some(t => c.transmission.includes(t)));
    if (filters.bodyTypes.length) result = result.filter(c => filters.bodyTypes.includes(c.bodyType));

    result.sort((a, b) => {
      switch (filters.sort) {
        case 'price-asc': return (a.price || Infinity) - (b.price || Infinity);
        case 'price-desc': return (b.price || 0) - (a.price || 0);
        case 'year-desc': return b.year - a.year;
        case 'year-asc': return a.year - b.year;
        case 'mileage-asc': return a.mileage - b.mileage;
      }
    });
    return result;
  }, [cars, filters]);

  const activeCount = [
    filters.search, filters.priceMin, filters.priceMax, filters.yearMin, filters.yearMax, filters.mileageMax,
    ...filters.fuels, ...filters.transmissions, ...filters.bodyTypes,
  ].filter(Boolean).length;

  const FilterPanel = () => (
    <aside className="w-full space-y-5">
      {/* Search */}
      <div>
        <label className="block text-xs font-bold font-jakarta text-gray-400 uppercase tracking-wide mb-1.5">Hľadať</label>
        <input
          type="text"
          placeholder="Značka, model..."
          value={filters.search}
          onChange={e => setFilter('search', e.target.value)}
          className="w-full border border-white/10 bg-white/5 text-white px-3 py-2 text-sm font-montserrat focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
        />
      </div>

      {/* Sort */}
      <div>
        <label className="block text-xs font-bold font-jakarta text-gray-400 uppercase tracking-wide mb-1.5">Zoradiť podľa</label>
        <select
          value={filters.sort}
          onChange={e => setFilter('sort', e.target.value as SortKey)}
          className="w-full border border-white/10 bg-white/5 text-white px-3 py-2 text-sm font-montserrat focus:outline-none focus:border-green-500"
        >
          <option value="price-asc">Cena: najlacnejšie</option>
          <option value="price-desc">Cena: najdrahšie</option>
          <option value="year-desc">Rok: najnovšie</option>
          <option value="year-asc">Rok: najstaršie</option>
          <option value="mileage-asc">Najazdené: najmenej</option>
        </select>
      </div>

      {/* Price */}
      <div>
        <label className="block text-xs font-bold font-jakarta text-gray-400 uppercase tracking-wide mb-1.5">Cena (€)</label>
        <div className="flex gap-2">
          <input type="number" placeholder="Od" value={filters.priceMin} onChange={e => setFilter('priceMin', e.target.value)} className="w-1/2 border border-white/10 bg-white/5 text-white px-3 py-2 text-sm font-montserrat focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" min={0} />
          <input type="number" placeholder="Do" value={filters.priceMax} onChange={e => setFilter('priceMax', e.target.value)} className="w-1/2 border border-white/10 bg-white/5 text-white px-3 py-2 text-sm font-montserrat focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" min={0} />
        </div>
      </div>

      {/* Year */}
      <div>
        <label className="block text-xs font-bold font-jakarta text-gray-400 uppercase tracking-wide mb-1.5">Rok výroby</label>
        <div className="flex gap-2">
          <input type="number" placeholder="Od" value={filters.yearMin} onChange={e => setFilter('yearMin', e.target.value)} className="w-1/2 border border-white/10 bg-white/5 text-white px-3 py-2 text-sm font-montserrat focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" min={1990} max={2025} />
          <input type="number" placeholder="Do" value={filters.yearMax} onChange={e => setFilter('yearMax', e.target.value)} className="w-1/2 border border-white/10 bg-white/5 text-white px-3 py-2 text-sm font-montserrat focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" min={1990} max={2025} />
        </div>
      </div>

      {/* Mileage */}
      <div>
        <label className="block text-xs font-bold font-jakarta text-gray-400 uppercase tracking-wide mb-1.5">Max. najazdené (km)</label>
        <input type="number" placeholder="Napr. 100000" value={filters.mileageMax} onChange={e => setFilter('mileageMax', e.target.value)} className="w-full border border-white/10 bg-white/5 text-white px-3 py-2 text-sm font-montserrat focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" min={0} />
      </div>

      {/* Fuel */}
      {fuelOptions.length > 0 && (
        <div>
          <label className="block text-xs font-bold font-jakarta text-gray-400 uppercase tracking-wide mb-1.5">Palivo</label>
          <div className="space-y-1.5">
            {fuelOptions.map(f => (
              <label key={f} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.fuels.includes(f)}
                  onChange={() => toggleArray('fuels', f)}
                  className="w-4 h-4  border-gray-300 text-green-500 focus:ring-green-500"
                />
                <span className="text-sm font-montserrat text-gray-300">{f}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Transmission */}
      {transmissionOptions.length > 0 && (
        <div>
          <label className="block text-xs font-bold font-jakarta text-gray-400 uppercase tracking-wide mb-1.5">Prevodovka</label>
          <div className="space-y-1.5">
            {transmissionOptions.map(t => (
              <label key={t} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.transmissions.includes(t)}
                  onChange={() => toggleArray('transmissions', t)}
                  className="w-4 h-4  border-gray-300 text-green-500 focus:ring-green-500"
                />
                <span className="text-sm font-montserrat text-gray-300">{t}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Body type */}
      {bodyTypeOptions.length > 0 && (
        <div>
          <label className="block text-xs font-bold font-jakarta text-gray-400 uppercase tracking-wide mb-1.5">Karoséria</label>
          <div className="space-y-1.5">
            {bodyTypeOptions.map(b => (
              <label key={b} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.bodyTypes.includes(b)}
                  onChange={() => toggleArray('bodyTypes', b)}
                  className="w-4 h-4  border-gray-300 text-green-500 focus:ring-green-500"
                />
                <span className="text-sm font-montserrat text-gray-300">{b}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {activeCount > 0 && (
        <button onClick={resetFilters} className="w-full text-sm font-montserrat text-green-400 border border-green-800 hover:bg-green-900/30 py-2  transition-colors">
          Zrušiť filtre ({activeCount})
        </button>
      )}
    </aside>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Mobile filter toggle */}
      <div className="lg:hidden mb-4 flex items-center gap-3">
        <button
          onClick={() => setShowFilters(v => !v)}
          className="flex items-center gap-2 bg-gray-800 border border-gray-700 text-white  px-4 py-2.5 text-sm font-bold font-jakarta shadow-sm hover:border-green-500 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
          </svg>
          Filtre {activeCount > 0 && <span className="bg-green-600 text-white text-xs  w-5 h-5 flex items-center justify-center">{activeCount}</span>}
        </button>
        <span className="text-sm text-gray-400 font-montserrat">{filtered.length} vozidiel</span>
      </div>

      {/* Mobile filter panel */}
      {showFilters && (
        <div className="lg:hidden mb-6 bg-transparent border border-white/10 p-5 shadow-sm">
          <FilterPanel />
        </div>
      )}

      <div className="flex gap-7">
        {/* Desktop sidebar */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="bg-transparent border border-white/10 p-5 shadow-sm sticky top-28">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold font-jakarta text-white">Filtre</h2>
              {activeCount > 0 && (
                <button onClick={resetFilters} className="text-xs text-green-400 font-montserrat hover:underline">
                  Zrušiť ({activeCount})
                </button>
              )}
            </div>
            <FilterPanel />
          </div>
        </div>

        {/* Car grid */}
        <div className="flex-1 min-w-0">
          <div className="hidden lg:flex items-center justify-between mb-5">
            <p className="text-sm text-gray-400 font-montserrat">{filtered.length} z {cars.length} vozidiel</p>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 bg-transparent border border-white/10">
              <svg className="w-12 h-12 text-gray-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0016.803 15.803z" />
              </svg>
              <p className="text-lg font-jakarta text-gray-300 mb-1">Žiadne výsledky</p>
              <p className="text-gray-500 font-montserrat text-sm mb-4">Skúste upraviť alebo zrušiť filtre.</p>
              <button onClick={resetFilters} className="text-green-400 font-semibold font-montserrat text-sm hover:underline">Zrušiť všetky filtre</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((car) => {
                const thumb = car.images[0] ?? null;
                return (
                  <Link
                    key={car.id}
                    href={`/vozidlo/${car.slug}`}
                    className="bg-transparent shadow-sm border border-white/10 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col"
                  >
                    <div className="relative aspect-[4/3] bg-white/5 overflow-hidden">
                      {thumb ? (
                        <img src={thumb} alt={car.title} className="w-full h-full object-cover" loading="lazy" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-5xl text-gray-400">
                          <svg viewBox="0 0 64 64" fill="none" className="w-14 h-14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 36l4-12h34l4 12"/><rect x="5" y="36" width="54" height="14" rx="4"/><circle cx="17" cy="54" r="4"/><circle cx="47" cy="54" r="4"/><path d="M5 43h54"/></svg>
                        </div>
                      )}
                      {car.isReserved && (
                        <div className="absolute top-2 left-2 bg-gray-800 text-white text-xs font-bold font-montserrat px-2 py-1">REZERVOVANÉ</div>
                      )}
                      {car.vatDeductible && (
                        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold font-montserrat px-2 py-1">Odpočet DPH</div>
                      )}
                      <div 
                        className="absolute bottom-0 right-0 bg-green-600 text-white font-bold font-jakarta px-4 py-2 text-lg shadow-lg"
                        style={{ clipPath: 'polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
                      >
                        {car.price > 0 ? `${car.price.toLocaleString('sk-SK')} €` : 'Cena na vyžiadanie'}
                      </div>
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-bold font-jakarta text-white text-sm leading-tight min-h-[2.5rem] mb-2">{car.title}</h3>
                      <div className="grid grid-cols-2 gap-1.5 mb-3 flex-1">
                        {car.year > 0 && (
                          <div className="flex items-center gap-1.5 text-xs font-montserrat text-gray-400">
                            <Calendar className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span>{car.month ? `${car.month}/${car.year}` : car.year}</span>
                          </div>
                        )}
                        {car.mileage > 0 && (
                          <div className="flex items-center gap-1.5 text-xs font-montserrat text-gray-400">
                            <Gauge className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span>{car.mileage.toLocaleString('sk-SK')} km</span>
                          </div>
                        )}
                        {car.fuel && (
                          <div className="flex items-center gap-1.5 text-xs font-montserrat text-gray-400">
                            <Fuel className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span>{car.fuel}</span>
                          </div>
                        )}
                        {car.transmission && (
                          <div className="flex items-center gap-1.5 text-xs font-montserrat text-gray-400">
                            <Settings2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span className="truncate">{car.transmission.split('|')[0]}</span>
                          </div>
                        )}
                      </div>
                      <div className="border-t border-gray-700 pt-3">
                        {car.vatDeductible && car.priceWithoutVat > 0 && (
                          <p className="text-xs text-gray-400 font-montserrat">Bez DPH: {car.priceWithoutVat.toLocaleString('sk-SK')} €</p>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
