import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCarById } from '@/lib/cars';
import CarGallery from '@/components/CarGallery';
import RollingButton from '@/components/RollingButton';
import AnimatedSection from '@/components/AnimatedSection';
import Image from 'next/image';
import { 
  MapPin, 
  Clock, 
  Calendar, 
  Gauge, 
  Fuel, 
  Settings2, 
  Zap, 
  Maximize, 
  Car, 
  Activity, 
  DoorOpen, 
  Users, 
  Palette, 
  Hash,
  Check
} from 'lucide-react';

export const revalidate = 300;

const SPECS = [
  { label: 'Rok výroby', icon: Calendar, field: 'yearMonth' as const },
  { label: 'Najazdené', icon: Gauge, field: 'mileage' as const },
  { label: 'Palivo', icon: Fuel, field: 'fuel' as const },
  { label: 'Prevodovka', icon: Settings2, field: 'transmission' as const },
  { label: 'Výkon', icon: Zap, field: 'power' as const },
  { label: 'Objem motora', icon: Maximize, field: 'engine' as const },
  { label: 'Karoséria', icon: Car, field: 'bodyType' as const },
  { label: 'Pohon', icon: Activity, field: 'drivetrain' as const },
  { label: 'Počet dverí', icon: DoorOpen, field: 'doors' as const },
  { label: 'Počet miest', icon: Users, field: 'seats' as const },
  { label: 'Farba', icon: Palette, field: 'color' as const },
  { label: 'VIN', icon: Hash, field: 'vin' as const },
];

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const id = slug.match(/(\d+)$/)?.[1] ?? '';
  const car = id ? await getCarById(id) : null;
  if (!car) notFound();

  const specValues: Record<string, string> = {
    yearMonth: car.month ? `${car.month} / ${car.year}` : String(car.year),
    mileage: car.mileage > 0 ? `${car.mileage.toLocaleString('sk-SK')} km` : '',
    fuel: car.fuel,
    transmission: car.transmission,
    power: car.powerKw > 0 ? `${car.powerKw} kW (${car.powerPs} PS)` : '',
    engine: car.engine ? `${car.engine} cm³` : '',
    bodyType: car.bodyType,
    drivetrain: car.drivetrain,
    doors: car.doors,
    seats: car.seats,
    color: car.color,
    vin: car.vin,
  };

  return (
    <div className="min-h-screen bg-transparent">
      <AnimatedSection className="bg-transparent text-white pt-24 pb-8">
        <div className="container mx-auto px-4">
          <Link href="/ponuka" className="text-gray-400 hover:text-white text-sm font-montserrat transition-colors">
            ← Späť na ponuku
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold font-jakarta mt-2">{car.title}</h1>
        </div>
      </AnimatedSection>

      <div className="container mx-auto px-4 py-8">
        <AnimatedSection>
          <CarGallery images={car.images} carName={car.title} />
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-8">
          <div className="lg:col-span-2 space-y-8">
            <AnimatedSection>
              <div className="border-b border-gray-700 pb-6">
              <h2 className="text-2xl font-bold font-jakarta text-white">{car.title}</h2>
              <p className="text-gray-400 font-montserrat text-sm mt-1">
                {[car.year > 0 ? car.year : '', car.mileage > 0 ? `${car.mileage.toLocaleString('sk-SK')} km` : '', car.fuel, car.transmission]
                  .filter(Boolean).join(' · ')}
              </p>
              <div className="flex flex-wrap items-baseline gap-4 mt-3">
                <span className="text-4xl font-bold font-jakarta text-green-600">
                  {car.price > 0 ? `${car.price.toLocaleString('sk-SK')} €` : 'Cena na vyžiadanie'}
                </span>
                {car.vatDeductible && car.priceWithoutVat > 0 && (
                  <span className="text-sm text-gray-500 font-montserrat">
                    Bez DPH: <strong>{car.priceWithoutVat.toLocaleString('sk-SK')} €</strong>
                  </span>
                )}
              </div>
              <div className="flex gap-2 mt-3 flex-wrap">
                {car.isReserved && (
                  <span className="bg-gray-800 text-white text-xs font-bold font-montserrat px-3 py-1">REZERVOVANÉ</span>
                )}
                {car.vatDeductible && (
                  <span className="bg-green-700 text-white text-xs font-bold font-montserrat px-3 py-1">Odpočet DPH</span>
                )}
              </div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <h3 className="text-xl font-bold font-jakarta text-white mb-4">Základné údaje</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {SPECS.map(({ label, icon: Icon, field }) => {
                  const val = specValues[field];
                  if (!val) return null;
                  return (
                    <div key={label} className="flex items-center gap-3 bg-transparent border border-white/10 p-3">
                      <Icon className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs text-gray-400 font-montserrat">{label}</p>
                        <p className="font-semibold text-white font-montserrat text-sm truncate">{val}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </AnimatedSection>

            {car.description && (
              <AnimatedSection>
                <h3 className="text-xl font-bold font-jakarta text-white mb-3">Popis vozidla</h3>
                <div className="bg-transparent border border-white/10 p-5 font-montserrat text-gray-300 leading-relaxed whitespace-pre-wrap text-sm">
                  {car.description}
                </div>
              </AnimatedSection>
            )}

            {car.descriptionExtend && (
              <div className="bg-transparent border border-white/10 p-5 font-montserrat text-gray-300 leading-relaxed whitespace-pre-wrap text-sm">
                {car.descriptionExtend}
              </div>
            )}

            {car.features.length > 0 && (
              <AnimatedSection>
                <h3 className="text-xl font-bold font-jakarta text-white mb-3">Výbava</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {car.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 font-montserrat text-gray-300 text-sm">
                      <Check className="text-green-600 w-4 h-4 mt-0.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </AnimatedSection>
            )}

            {car.link && (
              <div className="mb-6">
                <a href={car.link} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-green-600 font-montserrat transition-colors">
                  <span className="text-lg">🔗</span> Zobraziť pôvodný inzerát na Autobazar.sk
                </a>
              </div>
            )}

            <RollingButton
              text="← Späť na ponuku"
              href="/ponuka"
              className="inline-block border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-6 py-3 font-bold font-montserrat transition-colors"
            />
          </div>

          <div>
            <AnimatedSection className="bg-transparent border border-green-600/30 text-white p-6 sticky top-24">
              <h3 className="text-xl font-bold font-jakarta mb-1">Máte záujem?</h3>
              <p className="text-green-100 text-sm font-montserrat mb-5">Kontaktujte nás a dohodneme si prehliadku.</p>
              <a href="tel:+421908071885"
                className="flex items-center gap-3 bg-green-600 text-white px-4 py-3 font-bold font-montserrat hover:bg-green-500 transition-colors mb-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +421 908 071 885
              </a>
              <a href="mailto:jazdenesro@gmail.com"
                className="flex items-center gap-3 bg-white/5 border border-white/10 text-white px-4 py-3 font-montserrat hover:bg-white/10 transition-colors mb-5 text-sm">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                jazdenesro@gmail.com
              </a>
              <RollingButton
                text="Napísať správu"
                href="/kontakt"
                className="block w-full text-center bg-white hover:bg-gray-200 text-black py-3 font-bold font-montserrat transition-colors h-12"
              />
              <div className="mt-5 pt-4 border-t border-white/10 text-green-100 text-xs font-montserrat space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <p>Fučíkova 1145/24, Brezno</p>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <p>Po–Pia: 9:00–17:00 | So: 9:00–13:00</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
}
