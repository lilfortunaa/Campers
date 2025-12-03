'use client';
import { useState } from 'react';
import axios from 'axios';

export default function Form({ camperId }: { camperId: string }) {
  const [name, setName] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');

    try {
      // Пока бекенд бронирований mockapi не поддерживает, но структура запроса правильная
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/bookings`, {
        camperId,
        name,
        from,
        to,
      });

      setMsg('Бронювання успішне!');
      // Очистка формы
      setName('');
      setFrom('');
      setTo('');
    } catch (err) {
      console.error(err);
      setMsg('Помилка бронювання.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-2">
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Ваше ім'я"
        className="w-full border px-2 py-1"
        required
      />

      <div className="flex gap-2">
        <input
          type="date"
          value={from}
          onChange={e => setFrom(e.target.value)}
          className="border px-2 py-1"
          required
        />
        <input
          type="date"
          value={to}
          onChange={e => setTo(e.target.value)}
          className="border px-2 py-1"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full px-3 py-1 rounded text-white ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
        }`}
      >
        {loading ? 'Відправка...' : 'Забронювати'}
      </button>

      {msg && <p className="text-sm mt-2">{msg}</p>}
    </form>
  );
}
