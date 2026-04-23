import Link from 'next/link';
import { getCars } from '@/lib/cars';
import ParallaxHero from '@/components/ParallaxHero';
import FeeCalculator from '@/components/FeeCalculator';
import RollingButton from '@/components/RollingButton';
import AnimatedSection from '@/components/AnimatedSection';
import Image from 'next/image';
import Script from 'next/script';
import { Calendar, Gauge, Fuel, Settings2 } from 'lucide-react';

export const revalidate = 300;

const SERVICES = [
  {
    title: 'Predaj vozidiel',
    desc: 'Overené ojazené autá s garantovanou históriou za najlepšie ceny.',
    svg: <svg viewBox="0 0 64 64" fill="none" className="w-10 h-10 text-green-400" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 36l4-12h34l4 12"/><rect x="5" y="36" width="54" height="14" rx="4"/><circle cx="17" cy="54" r="4"/><circle cx="47" cy="54" r="4"/><path d="M5 43h54"/></svg>,
  },
  {
    title: 'Výkup vozidiel',
    desc: 'Odkúpime vaše auto rýchlo a za férovú cenu.',
    svg: <svg viewBox="0 0 64 64" fill="none" className="w-10 h-10 text-green-400" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="32" cy="32" r="22"/><path d="M32 18v4m0 16v4m-8-12h14a4 4 0 010 8H26m0 0h14"/><path d="M24 26h10a4 4 0 010 8"/></svg>,
  },
  {
    title: 'Leasing & úver',
    desc: 'Financovanie na mieru – poradíme s najvýhodnejším riešením.',
    svg: <svg viewBox="0 0 64 64" fill="none" className="w-10 h-10 text-green-400" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="14" width="48" height="36" rx="4"/><path d="M8 24h48M18 34h10M18 40h6"/><rect x="36" y="32" width="12" height="10" rx="2"/></svg>,
  },
  {
    title: 'Prenájom',
    desc: 'Krátkodobý aj dlhodobý prenájom vozidiel pre firmy i jednotlivcov.',
    svg: <svg viewBox="0 0 64 64" fill="none" className="w-10 h-10 text-green-400" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="24" cy="28" r="10"/><path d="M32 28h20M44 22l8 6-8 6M16 44l4 12M32 44l-4 12"/></svg>,
  },
];

export default async function HomePage() {
  const allCars = await getCars();
  const featured = allCars.slice(0, 8);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    "name": "Jazdené s.r.o.",
    "url": "https://www.jazdene.eu",
    "logo": "https://www.jazdene.eu/logo.svg",
    "image": "https://www.jazdene.eu/hero.jpg",
    "description": "Kúpte si auto bez starostí. Široká ponuka overených vozidiel v Brezne.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Fučíkova 1145/24",
      "addressLocality": "Brezno",
      "postalCode": "977 01",
      "addressCountry": "SK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 48.805562,
      "longitude": 19.642571
    },
    "telephone": "+421 908 071 885",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "17:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "13:00"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-transparent">
      <Script
        id="schema-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ParallaxHero imageSrc="/hero.jpg">
        <div className="container mx-auto px-4 pt-28 pb-20">
          <div className="max-w-3xl">
            <p className="text-green-400 font-montserrat font-light text-sm tracking-widest mb-3">JAZDENÉ s.r.o.</p>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 font-jakarta leading-tight">
              KÚPTE SI AUTO BEZ<br />
              <span className="text-green-400">STAROSTÍ</span>
            </h1>
            <p className="text-lg md:text-xl mb-10 max-w-2xl leading-relaxed font-montserrat font-light text-gray-300">
              Široký výber overených áut za najlepšie ceny a garantovaná kvalita na jednom mieste.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <RollingButton
                text="PONUKA"
                href="/ponuka"
                className="bg-green-600 hover:bg-green-500 px-8 py-4 text-white font-bold text-lg font-jakarta border border-green-400 transition-colors text-center"
              />
              <RollingButton
                text="Kontakt"
                href="/kontakt"
                className="bg-transparent hover:bg-white/5 border border-white/10 px-8 py-4 text-white font-bold text-lg font-jakarta transition-colors text-center"
              />
            </div>
          </div>
        </div>
      </ParallaxHero>

      <AnimatedSection className="bg-green-600 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div><p className="text-5xl font-bold font-jakarta">Overené</p><p className="text-lg mt-2 font-montserrat font-light text-green-100">Vozidlá s garantovanou históriou</p></div>
            <div><p className="text-5xl font-bold font-jakarta">Férové</p><p className="text-lg mt-2 font-montserrat font-light text-green-100">Ceny bez skrytých poplatkov</p></div>
            <div><p className="text-5xl font-bold font-jakarta">Bez</p><p className="text-lg mt-2 font-montserrat font-light text-green-100">Starostí pri kúpe</p></div>
          </div>
        </div>
      </AnimatedSection>

      {featured.length > 0 && (
        <AnimatedSection className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold font-jakarta text-white mb-8">Aktuálna ponuka</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {featured.map((car) => {
                const thumb = car.images[0] ?? null;
                return (
                  <Link key={car.id} href={`/vozidlo/${car.slug}`} className="bg-transparent border border-white/10 overflow-hidden hover:border-green-600 hover:-translate-y-1 transition-all duration-200 flex flex-col">
                    <div className="relative aspect-[4/3] bg-white/5 overflow-hidden">
                      {thumb ? (
                        <Image
                          src={thumb}
                          alt={car.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-5xl">🚗</div>
                      )}
                      {car.isReserved && <div className="absolute top-2 left-2 bg-gray-900 text-white text-xs font-bold font-montserrat px-2 py-1">REZERVOVANÉ</div>}
                      <div 
                        className="absolute bottom-0 right-0 bg-green-600 text-white font-bold font-jakarta px-4 py-2 text-lg shadow-lg"
                        style={{ clipPath: 'polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
                      >
                        {car.price > 0 ? `${car.price.toLocaleString('sk-SK')} €` : 'Cena na vyžiadanie'}
                      </div>
                    </div>
                    <div className="p-3 flex flex-col flex-1">
                      <h3 className="font-bold font-jakarta text-white text-sm leading-tight mb-2 min-h-[2.5rem]">{car.title}</h3>
                      <div className="grid grid-cols-2 gap-1 mb-3 flex-1">
                        {car.year > 0 && (
                          <div className="flex items-center gap-1 text-xs font-montserrat text-gray-400">
                            <Calendar className="w-3.5 h-3.5 text-green-600" />
                            <span>{car.year}</span>
                          </div>
                        )}
                        {car.mileage > 0 && (
                          <div className="flex items-center gap-1 text-xs font-montserrat text-gray-400">
                            <Gauge className="w-3.5 h-3.5 text-green-600" />
                            <span>{car.mileage.toLocaleString('sk-SK')} km</span>
                          </div>
                        )}
                        {car.fuel && (
                          <div className="flex items-center gap-1 text-xs font-montserrat text-gray-400">
                            <Fuel className="w-3.5 h-3.5 text-green-600" />
                            <span>{car.fuel}</span>
                          </div>
                        )}
                        {car.transmission && (
                          <div className="flex items-center gap-1 text-xs font-montserrat text-gray-400">
                            <Settings2 className="w-3.5 h-3.5 text-green-600" />
                            <span className="truncate">{car.transmission.split('|')[0]}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="text-center mt-10">
              <RollingButton
                text="Všetky autá →"
                href="/ponuka"
                className="inline-block bg-green-600 hover:bg-green-500 text-white font-bold font-jakarta px-10 py-4 text-lg transition-colors"
              />
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Fee Calculator */}
      <AnimatedSection className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-start md:gap-16 mb-10">
              <div className="flex-1 mb-6 md:mb-0">
                <p className="text-green-400 font-montserrat font-light text-xs tracking-widest mb-2">JAZDENÉ s.r.o.</p>
                <h2 className="text-4xl md:text-5xl font-bold font-jakarta text-white leading-tight">
                  Poplatok za prepis<br />auta
                </h2>
              </div>
              <div className="md:w-72 flex-shrink-0">
                <p className="text-gray-400 font-montserrat font-light text-base leading-relaxed">
                  Vypočítajte si na našej kalkulačke, koľko vás bude stáť prihlásenie vášho vozidla na dopravnom inšpektoráte.
                </p>
              </div>
            </div>
            <FeeCalculator />
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-jakarta text-center mb-10 text-white">Naše služby</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map((s) => (
              <div key={s.title} className="bg-transparent p-6 border border-white/10 hover:border-green-600 transition-colors">
                <div className="mb-4">{s.svg}</div>
                <h3 className="text-lg font-bold font-jakarta mb-2 text-white">{s.title}</h3>
                <p className="text-gray-400 font-montserrat font-light text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="h-96 bg-transparent">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2635.32833446904!2d19.6425712771509!3d48.80556200389366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47156531af0f0fbb%3A0x8eee3c6e365d9477!2sAutobaz%C3%A1r%20Brezno!5e0!3m2!1ssk!2ssk!4v1713840000000!5m2!1ssk!2ssk" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Jazdené mapa" />
      </AnimatedSection>
    </div>
  );
}
