import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Kontakt | Jazdené – Autobazár Brezno',
  description: 'Kontaktujte nás – Jazdené s.r.o., Fučíkova 1145/24, 977 01 Brezno. Telefón, email a otváracie hodiny.',
};

export default function KontaktPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Mini Hero */}
      <div className="bg-gray-900 text-white pt-24 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold font-jakarta">KONTAKT</h1>
          <p className="text-gray-400 mt-2 font-montserrat">Jazdené – Autobazár Brezno</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8 font-montserrat">
            <div>
              <h2 className="text-2xl font-bold font-jakarta text-white mb-4">JAZDENÉ s.r.o.</h2>
              <div className="text-gray-300 leading-relaxed space-y-1">
                <p>Fučíkova 1145/24,</p>
                <p>977 01 Brezno</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📞</span>
                <a href="tel:+421908071885" className="text-gray-300 hover:text-green-400 font-semibold transition-colors text-lg">
                  +421 908 071 885
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">✉️</span>
                <a href="mailto:jazdenesro@gmail.com" className="text-gray-300 hover:text-green-400 font-semibold transition-colors text-lg">
                  jazdenesro@gmail.com
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold font-jakarta text-white mb-3">Otváracie hodiny</h3>
              <div className="text-gray-300 space-y-1">
                <p>Pondelok – Piatok: <span className="font-semibold">9:00 – 17:00</span></p>
                <p>Sobota: <span className="font-semibold">9:00 – 13:00</span></p>
                <p>Nedeľa: <span className="font-semibold">Zatvorené</span></p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold font-jakarta text-white mb-3">Sledujte nás</h3>
              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/p/Jazdené-100090163867662/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                  title="Facebook"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/jazdene.eu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors"
                  title="Instagram"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-xl overflow-hidden shadow-lg">
            <div className="bg-green-700 p-6">
              <h2 className="text-white text-2xl font-bold font-jakarta">Napíšte nám</h2>
              <p className="text-green-100 text-sm mt-1 font-montserrat">Ozveme sa Vám čo najskôr</p>
            </div>
            <div className="p-6 bg-gray-900">
              <ContactForm />
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="mt-12 rounded-xl overflow-hidden shadow-sm h-80">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2635.0!2d19.7005!3d48.8067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zRnXEjcOra292YSAxMTQ1LzI0LCBCcmV6bm8!5e0!3m2!1ssk!2ssk!4v1600000000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Jazdené mapa"
          />
        </div>
      </div>
    </div>
  );
}
