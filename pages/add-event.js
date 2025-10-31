import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function AddEvent() {
  const [form, setForm] = useState({
    name: '',
    city: '',
    description: '',
    date: '',
    type: '',
    link: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/add-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
      setForm({ name: '', city: '', description: '', date: '', type: '', link: '' });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>Aggiungi evento – Capodanno 2026</title>
      </Head>
      <main className="min-h-screen bg-black text-gray-200">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gold mb-6 text-center">Aggiungi un evento</h1>
          {submitted && (
            <div className="bg-green-700 text-white p-4 rounded mb-4">
              Evento aggiunto con successo!
            </div>
          )}
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
            <div>
              <label className="block mb-1">Nome evento</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full p-2 rounded bg-gray-800 text-white"
              />
            </div>
            <div>
              <label className="block mb-1">Città</label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                required
                className="w-full p-2 rounded bg-gray-800 text-white"
              />
            </div>
            <div>
              <label className="block mb-1">Descrizione</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                className="w-full p-2 rounded bg-gray-800 text-white"
              ></textarea>
            </div>
            <div>
              <label className="block mb-1">Data e ora</label>
              <input
                type="datetime-local"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                className="w-full p-2 rounded bg-gray-800 text-white"
              />
            </div>
            <div>
              <label className="block mb-1">Tipo</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                required
                className="w-full p-2 rounded bg-gray-800 text-white"
              >
                <option value="">Seleziona tipo</option>
                <option value="Concerto">Concerto</option>
                <option value="Cena di gala">Cena di gala</option>
                <option value="Party">Party</option>
                <option value="Fuochi d'artificio">Fuochi d'artificio</option>
              </select>
            </div>
            <div>
              <label className="block mb-1">Link biglietti</label>
              <input
                type="url"
                name="link"
                value={form.link}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-800 text-white"
              />
            </div>
            <button type="submit" className="bg-gold text-black font-semibold px-4 py-2 rounded">
              Invia
            </button>
          </form>
          <div className="mt-8 text-center">
            <Link href="/" className="text-gold underline">
              Torna alla home
            </Link>
          </div>
        </div>
        <footer className="mt-12 py-6 border-t border-gray-700 text-sm text-gray-400 text-center">
          © 2025 Capodanno 2026
        </footer>
      </main>
    </>
  );
}
