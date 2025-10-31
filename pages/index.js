import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import events from '../data/events';
import EventCard from '../components/EventCard';
import FilterBar from '../components/FilterBar';

export default function Home() {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const newYear = new Date('2026-01-01T00:00:00+01:00');
      const diff = newYear - now;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setCountdown({ days, hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const uniqueCities = Array.from(new Set(events.map((e) => e.city)));
  const uniqueTypes = Array.from(new Set(events.map((e) => e.type)));

  const filteredEvents = events.filter((event) => {
    return (selectedCity === '' || event.city === selectedCity) && (selectedType === '' || event.type === selectedType);
  });

  return (
    <>
      <Head>
        <title>Capodanno 2026 – Tutti gli eventi in Italia</title>
        <meta
          name="description"
          content="Scopri tutti gli eventi per il Capodanno 2026 in Italia con concerti, cene di gala, party e fuochi d'artificio."
        />
      </Head>
      <main className="min-h-screen bg-black text-gray-200">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gold mb-4">Capodanno 2026</h1>
          <p className="mb-6 text-lg md:text-xl">
            Scopri tutti gli eventi per il Capodanno 2026 in Italia.
          </p>
          <div className="flex justify-center space-x-6 text-gold text-lg md:text-2xl mb-8">
            <div>
              <span className="block text-4xl md:text-5xl">{countdown.days}</span>
              <span>Giorni</span>
            </div>
            <div>
              <span className="block text-4xl md:text-5xl">{countdown.hours}</span>
              <span>Ore</span>
            </div>
            <div>
              <span className="block text-4xl md:text-5xl">{countdown.minutes}</span>
              <span>Min</span>
            </div>
            <div>
              <span className="block text-4xl md:text-5xl">{countdown.seconds}</span>
              <span>Sec</span>
            </div>
          </div>
          <FilterBar
            cities={uniqueCities}
            types={uniqueTypes}
            selectedCity={selectedCity}
            selectedType={selectedType}
            onCityChange={setSelectedCity}
            onTypeChange={setSelectedType}
          />
          <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <EventCard key={event.name} event={event} />
            ))}
          </div>
          <div className="mt-8">
            <Link href="/add-event" className="text-gold underline hover:no-underline">
              Aggiungi un evento
            </Link>
          </div>
        </div>
        <footer className="mt-12 py-6 border-t border-gray-700 text-sm text-gray-400">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
            <span>© 2025 Capodanno 2026</span>
            <span>Realizzato con Next.js e Tailwind CSS</span>
          </div>
        </footer>
      </main>
    </>
  );
}
