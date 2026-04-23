import { MetadataRoute } from 'next';
import { getCars } from '@/lib/cars';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const SITE_URL = 'https://www.jazdene.eu';
  const cars = await getCars();

  const carEntries = cars.map((car) => ({
    url: `${SITE_URL}/vozidlo/${car.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${SITE_URL}/ponuka`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/kontakt`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/ochrana-osobnych-udajov`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    ...carEntries,
  ];
}
