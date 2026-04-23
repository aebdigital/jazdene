import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ochrana osobných údajov',
  description: 'Zásady ochrany osobných údajov spoločnosti JAZDENÉ s. r. o.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-transparent pt-32 pb-20 text-white">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 font-montserrat text-sm font-semibold uppercase tracking-[0.25em] text-green-400">Ochrana osobných údajov</p>
          <h1 className="font-jakarta text-4xl font-bold md:text-5xl">Ochrana osobných údajov</h1>
          <p className="mt-6 border border-white/10 bg-white/5 px-6 py-5 font-montserrat text-base leading-8 text-gray-200">
            <strong>JAZDENÉ s. r. o.</strong><br />
            Fučíkova 1145/24 977 01 Brezno<br />
            IČO: 55212345, DIČ: 2121234567<br />
            E-mail: jazdenesro@gmail.com<br />
            Tel.: +421 908 071 885
          </p>
          <div className="mt-8 space-y-8 font-montserrat text-gray-300">
            <p className="text-base leading-8">Tieto Zásady ochrany osobných údajov (ďalej len „Zásady“) popisujú, aké osobné údaje spracúvame v súvislosti s používaním našej webovej stránky a kontaktných formulárov.</p>
            <section className="border border-white/10 bg-transparent p-7 shadow-sm">
              <h2 className="font-jakarta text-2xl font-bold text-white">I. Kontaktný formulár</h2>
              <p className="mt-4 text-base leading-8">Na stránke www.jazdene.eu prevádzkujeme kontaktný formulár, ktorého účelom je umožniť vám:</p>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-8"><li>Položiť otázku k našim produktom a službám</li><li>Požiadať o cenovú ponuku</li></ul>
              <p className="mt-6 text-base leading-8"><strong>Rozsah spracúvaných údajov:</strong></p>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-base leading-8"><li>Meno a priezvisko</li><li>E-mailová adresa</li><li>Telefónne číslo</li></ul>
              <p className="mt-6 text-base leading-8"><strong>Účel spracovania:</strong><br />Spracúvame uvedené údaje, aby sme vás mohli kontaktovať a reagovať na váš dopyt.</p>
              <p className="mt-6 text-base leading-8"><strong>Právny základ:</strong><br />Článok 6 ods. 1 písm. b) GDPR – plnenie opatrení pred uzavretím zmluvy na žiadosť dotknutej osoby.</p>
              <p className="mt-6 text-base leading-8"><strong>Doba uchovávania:</strong><br />Osobné údaje budeme uchovávať maximálne 10 rokov od odozvy na váš dopyt, pokiaľ nevznikne ďalší zmluvný vzťah.</p>
            </section>
            <section className="border border-white/10 bg-transparent p-7 shadow-sm">
              <h2 className="font-jakarta text-2xl font-bold text-white">II. Súbory cookies</h2>
              <p className="mt-4 text-base leading-8">Na našej webovej stránke používame cookies výlučne na nasledujúce účely:</p>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-8"><li><strong>Nevyhnutné cookies</strong> – zabezpečujú základnú funkčnosť stránky (napr. ukladanie relácie, nastavení prehliadača).</li><li><strong>Štatistické (analytické) cookies</strong> – pomáhajú nám pochopiť, ako návštevníci stránku používajú (nasadzujeme ich len so súhlasom používateľa).</li></ul>
              <p className="mt-6 text-base leading-8"><strong>Správa súhlasov:</strong><br />Používateľ môže kedykoľvek odvolať súhlas s využívaním štatistických cookies prostredníctvom nastavení cookie lišty alebo priamo v prehliadači.</p>
            </section>
            <section className="border border-white/10 bg-transparent p-7 shadow-sm">
              <h2 className="font-jakarta text-2xl font-bold text-white">III. Práva dotknutej osoby</h2>
              <p className="mt-4 text-base leading-8">Podľa nariadenia GDPR máte nasledujúce práva:</p>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-8"><li>Prístup k osobným údajom, ktoré spracúvame</li><li>Oprava nepresných alebo neúplných údajov</li><li>Vymazanie („právo zabudnutia“), ak na spracovanie už nie je právny základ</li><li>Obmedzenie spracovania</li><li>Prenosnosť údajov</li><li>Odvolanie súhlasu – stane sa účinným dňom odvolania</li><li>Podanie sťažnosti u Úradu na ochranu osobných údajov SR (Hraničná 12, 820 07 Bratislava, <a href="https://www.dataprotection.gov.sk" target="_blank" rel="noopener noreferrer" className="font-semibold text-green-400 underline underline-offset-4">www.dataprotection.gov.sk</a>)</li></ul>
              <p className="mt-6 text-base leading-8">V prípade otázok alebo uplatnenia Vašich práv nás môžete kontaktovať na jazdenesro@gmail.com alebo telefónnom čísle +421 908 071 885.</p>
            </section>
            <div className="border border-white/10 bg-white/5 px-6 py-5 text-sm font-semibold text-green-300">Tieto Zásady nadobúdajú účinnosť dňom 13.5. 2025.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
