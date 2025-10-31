import React from 'react';

const EventCard = ({ event }) => (
  <div className="bg-black border border-gray-700 rounded-lg p-4 shadow hover:shadow-lg transition duration-300">
    <h3 className="text-xl font-semibold text-gold mb-2">{event.name}</h3>
    <p className="text-sm text-gray-400">{event.city} - {new Date(event.date).toLocaleString('it-IT', { dateStyle: 'medium', timeStyle: 'short' })}</p>
    <p className="mt-2 mb-2">{event.description}</p>
    <p className="italic text-sm">{event.type}</p>
    <a href={event.link} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block px-4 py-2 bg-gold text-black rounded hover:bg-yellow-500 transition">Biglietti</a>
  </div>
);

export default EventCard;
