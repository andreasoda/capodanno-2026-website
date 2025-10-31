import { useState, useEffect } from 'react';
import events from '../data/events';
import EventCard from '../components/EventCard';
import FilterBar from '../components/FilterBar';
import Link from 'next/link';

export default function Home() {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const countdown = () => {
      const targetDate = new Date('2026-01-01T00:00:00+01:00');
      const now = new Date();
      const diff = targetDate - now;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });
    };
    countdown();
    const interval = setInterval(countdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const cities = Array.from(new Set(events.map((e) => e.city)));
  const types = Array.from(new Set(events.map((e) => e.type)));

  const filteredEvents = events.filter((event) => {
    return (
      (selectedCity === '' || event.city === selectedCity) &&
      (selectedType === '' || event.type === selectedType)
    );
  });

  return (
    <div className="container mx-auto px-4 text-center">
      <section className="py-10">
        <h1 className="text-4xl font-bold text-gold mb-4">Capodanno 2026</h1>
        <p className="mb-6">Scopri tutti gli eventi per festeggiare il nuovo anno in Italia!</p>
        <div className="flex justify-center gap-4 text-gold text-2xl">
          <div>
            <span className="block text-4xl font-semibold">{timeLeft.days}</span>
            <span>Giorni</span>
          </div>
          <div>
            <span className="block text-4xl font-semibold">{timeLeft.hours}</span>
            <span>Ore</span>
          </div>
          <div>
            <span className="block text-4xl font-semibold">{timeLeft.minutes}</span>
            <span>Minuti</span>
          </div>
          <div>
            <span className="block text-4xl font-semibold">{timeLeft.seconds}</span>
            <span>Secondi</span>
          </div>
        </div>
      </section>
      <section>
        <FilterBar
          cities={cities}
          types={types}
          selectedCity={selectedCity}
          selectedType={selectedType}
          onCityChange={setSelectedCity}
          onTypeChange={setSelectedType}
        />
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <EventCard key={event.name + event.city} event={event} />
          ))}
        </div>
      </section>
      <section className="my-8">
        <Link href="/add-event" className="text-gold underline">
          Aggiungi un evento
        </Link>
      </section>
      <footer className="py-8 text-sm text-gray-500">
        <p>
          &copy; 2025 Capodanno 2026. Tutti i diritti riservati. Sito creato da{' '}
          <a className="underline" href="#">
            Il tuo nome
          </a>
          .
        </p>
      </footer>
    </div>
  );
}
