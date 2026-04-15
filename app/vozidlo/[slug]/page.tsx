import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCarById } from '@/lib/cars';
import CarGallery from '@/components/CarGallery';

export const revalidate = 300;

const SPECS = [
  { label: 'Rok výroby', icon: '/icons/rok.svg', field: 'yearMonth' as const },
  { label: 'Najazdené', icon: '/icons/kilometre.svg', field: 'mileage' as const },
  { label: 'Palivo', icon: '/icons/palivo.svg', field: 'fuel' as const },
  { label: 'Prevodovka', icon: '/icons/prevodovka.svg', field: 'transmission' as const },
  { label: 'Výkon', icon: '/icons/vykon.svg', field: 'power' as const },
  { label: 'Objem motora', icon: '/icons/objem.svg', field: 'engine' as const },
  { label: 'Karoséria', icon: '/icons/karoseria.svg', field: 'bodyType' as const },
  { label: 'Pohon', icon: '/icons/pohon.svg', field: 'drivetrain' as const },
  { label: 'Počet dverí', icon: '/icons/dvere.svg', field: 'doors' as const },
  { label: 'Počet miest', icon: '/icons/dvere.svg', field: 'seats' as const },
  { label: 'Farba', icon: '/icons/farba.svg', field: 'color' as const },
  { label: 'VIN', icon: '/icons/vin.svg', field: 'vin' as const },
];

export default async function CarDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const id = params.slug.match(/(\d+)$/)?.[1] ?? '';
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
    <div className="min-h-screen bg-gray-950">
      <div className="bg-gray-900 text-white pt-24 pb-8">
        <div className="container mx-auto px-4">
          <Link href="/ponuka" className="text-gray-400 hover:text-white text-sm font-montserrat transition-colors">
            ← Späť na ponuku
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold font-jakarta mt-2">{car.title}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <CarGallery images={car.images} carName={car.title} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div className="border-b border-gray-700 pb-6">
              <h2 className="text-2xl font-bold font-jakarta text-white">{car.title}</h2>
              <p className="text-gray-400 font-montserrat text-sm mt-1">
                {[car.year > 0 ? car.year : '', car.mileage > 0 ? `${car.mileage.toLocaleString('sk-SK')} km` : '', car.fuel, car.transmission]
                  .filter(Boolean).join(' · ')}
              </p>
              <div className="flex flex-wrap items-baseline gap-4 mt-3">
                <span className="text-4xl font-bold font-jakarta text-green-700">
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
                  <span className="bg-gray-800 text-white text-xs font-bold font-montserrat px-3 py-1 rounded">REZERVOVANÉ</span>
                )}
                {car.vatDeductible && (
                  <span className="bg-green-700 text-white text-xs font-bold font-montserrat px-3 py-1 rounded">Odpočet DPH</span>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold font-jakarta text-white mb-4">Základné údaje</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {SPECS.map(({ label, icon, field }) => {
                  const val = specValues[field];
                  if (!val) return null;
                  return (
                    <div key={label} className="flex items-center gap-3 bg-gray-800 rounded-xl p-3">
                      <img src={icon} alt={label} className="w-6 h-6 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs text-gray-400 font-montserrat">{label}</p>
                        <p className="font-semibold text-white font-montserrat text-sm truncate">{val}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {car.description && (
              <div>
                <h3 className="text-xl font-bold font-jakarta text-white mb-3">Popis vozidla</h3>
                <div className="bg-gray-800 rounded-xl p-5 font-montserrat text-gray-300 leading-relaxed whitespace-pre-wrap text-sm">
                  {car.description}
                </div>
              </div>
            )}

            {car.descriptionExtend && (
              <div className="bg-gray-800 rounded-xl p-5 font-montserrat text-gray-300 leading-relaxed whitespace-pre-wrap text-sm">
                {car.descriptionExtend}
              </div>
            )}

            {car.features.length > 0 && (
              <div>
                <h3 className="text-xl font-bold font-jakarta text-white mb-3">Výbava</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {car.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 font-montserrat text-gray-300 text-sm">
                      <span className="text-green-700 font-bold mt-0.5 flex-shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {car.link && (
              <a href={car.link} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-green-700 font-montserrat transition-colors">
                🔗 Zobraziť pôvodný inzerát na Autobazar.sk
              </a>
            )}

            <Link href="/ponuka"
              className="inline-block border-2 border-green-700 text-green-700 hover:bg-green-50 px-6 py-3 rounded-lg font-bold font-montserrat transition-colors">
              ← Späť na ponuku
            </Link>
          </div>

          <div>
            <div className="bg-green-700 text-white rounded-xl p-6 sticky top-24">
              <h3 className="text-xl font-bold font-jakarta mb-1">Máte záujem?</h3>
              <p className="text-green-100 text-sm font-montserrat mb-5">Kontaktujte nás a dohodneme si prehliadku.</p>
              <a href="tel:+421908071885"
                className="flex items-center gap-3 bg-white text-green-700 rounded-lg px-4 py-3 font-bold font-montserrat hover:bg-green-50 transition-colors mb-3">
                <span className="text-xl">📞</span> +421 908 071 885
              </a>
              <a href="mailto:jazdenesro@gmail.com"
                className="flex items-center gap-3 bg-white/10 text-white rounded-lg px-4 py-3 font-montserrat hover:bg-white/20 transition-colors mb-5 text-sm">
                <span className="text-lg">✉️</span> jazdenesro@gmail.com
              </a>
              <Link href="/kontakt"
                className="block w-full text-center bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-bold font-montserrat transition-colors">
                Napísať správu
              </Link>
              <div className="mt-5 pt-4 border-t border-green-600 text-green-100 text-xs font-montserrat space-y-1">
                <p>📍 Fučíkova 1145/24, Brezno</p>
                <p>🕘 Po–Pia: 9:00–17:00 | So: 9:00–13:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
