import { XMLParser } from 'fast-xml-parser';

const FEED_URL =
  'http://www.autobazar.sk/api/export/2edf0d7f06f3908b76a993cf32297fcd36/firmAdvertisements/329683/';

export interface Car {
  id: string;
  brand: string;
  model: string;
  title: string;
  description: string;
  descriptionExtend: string;
  descriptionOptions: string;
  price: number;
  year: number;
  month: string;
  mileage: number;
  fuel: string;
  transmission: string;
  drivetrain: string;
  bodyType: string;
  powerKw: number;
  powerPs: number;
  engine: string;
  color: string;
  vin: string;
  seats: string;
  doors: string;
  features: string[];
  images: string[];
  isReserved: boolean;
  vatDeductible: boolean;
  priceWithoutVat: number;
  link: string;
  slug: string;
}

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  isArray: (name: string) => name === 'advertisement' || name === 'photo',
  parseTagValue: true,
  trimValues: true,
});

function str(val: unknown): string {
  if (val === null || val === undefined) return '';
  return String(val).trim();
}

function mapCar(ad: Record<string, unknown>): Car {
  const p = (ad.params ?? {}) as Record<string, unknown>;

  const featuresRaw = str(p['vybava_value']);
  const features = featuresRaw
    ? featuresRaw.split('|').map((f) => f.trim()).filter(Boolean)
    : [];

  const photosRaw = (ad.photos as Record<string, unknown>)?.photo ?? [];
  const photosArr = Array.isArray(photosRaw) ? photosRaw : [photosRaw];
  const images = photosArr
    .map((ph) => str(ph).replace(/^http:\/\//i, 'https://'))
    .filter(Boolean);

  const id = str(ad.idAdvertisement);
  const brand = str(ad.brand);
  const model = str(ad.model);
  const year = parseInt(str(p['rok'])) || 0;
  const priceRaw = str(p['cena']).replace(/\D/g, '');
  const price = parseInt(priceRaw) || 0;
  const powerKw = parseFloat(str(p['vykon-motora'])) || 0;

  const odpocetRaw = str(p['odpocet-dph_value'] ?? p['odpocet-dph'])
    .toLowerCase()
    .replace(/á/g, 'a');
  const vatDeductible = odpocetRaw === 'ano' || odpocetRaw === 'yes';
  const priceWithoutVat = vatDeductible ? Math.round(price / 1.23) : 0;

  const transmission = str(p['prevodovka_value'] ?? p['prevodovka'])
    .split('|')[0]
    .trim();
  const month = str(p['mesiac_value'] ?? p['mesiac']).split('|')[0].trim();

  return {
    id,
    brand,
    model,
    title: str(ad.title) || `${brand} ${model}`,
    description: str(ad.content),
    descriptionExtend: str(ad.contentExtend),
    descriptionOptions: str(ad.contentOptions),
    price,
    year,
    month,
    mileage: parseInt(str(p['najazdene-km']).replace(/\D/g, '')) || 0,
    fuel: str(p['palivo_value'] ?? p['palivo']),
    transmission,
    drivetrain: str(p['pohon_value'] ?? p['pohon']),
    bodyType: str(p['karoseria_value'] ?? p['karoseria']),
    powerKw,
    powerPs: Math.floor(powerKw * 1.34102),
    engine: str(p['objem-motora']),
    color: str(p['farba_value'] ?? p['farba']),
    vin: str(p['vin']),
    seats: str(p['miest-na-sedenie_value'] ?? p['miest-na-sedenie']),
    doors: str(p['pocet-dveri_value'] ?? p['pocet-dveri']),
    features,
    images,
    isReserved: str(ad.isReserved) === '1',
    vatDeductible,
    priceWithoutVat,
    link: str(ad.link),
    slug: `${brand.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${model
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')}-${year}-${id}`,
  };
}

export async function getCars(): Promise<Car[]> {
  try {
    const res = await fetch(FEED_URL, {
      next: { revalidate: 300 },
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        Accept: 'text/xml,application/xml,*/*',
        'Accept-Language': 'sk-SK,sk;q=0.9,en;q=0.8',
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();
    const parsed = parser.parse(xml);
    const ads: Record<string, unknown>[] =
      parsed?.advertisements?.advertisement ?? [];
    return ads.map(mapCar);
  } catch (err) {
    console.error('[jazdene] getCars error:', err);
    return [];
  }
}

export async function getCarById(id: string): Promise<Car | null> {
  const cars = await getCars();
  return cars.find((c) => c.id === id) ?? null;
}
