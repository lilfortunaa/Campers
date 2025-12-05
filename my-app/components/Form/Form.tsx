'use client';
import { useState } from 'react';
import axios from 'axios';
import styles from './Form.module.css';

interface FormProps {
  camperId: string;
}

export default function Form({ camperId }: FormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/bookings`, {
        camperId,
        name,
        email,
        from,
        to,
        comment,
      });

      setMsg('Booking successful!');
      setName('');
      setEmail('');
      setFrom('');
      setTo('');
      setComment('');
    } catch (err) {
      console.error(err);
      setMsg('Error booking.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Book your campervan now</h2>
      <p className={styles.formSubtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <form onSubmit={submit} className={styles.form}>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Name*"
          className={styles.input}
          required
        />

        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email*"
          className={styles.input}
          required
        />

        <div className={styles.dateWrapper}>
          <input
            type="date"
            value={from}
            onChange={e => setFrom(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        <textarea
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="Comment"
          className={styles.textarea}
          rows={4}
        />

        <button
          type="submit"
          disabled={loading}
          className={styles.button}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>

        {msg && <p className={styles.message}>{msg}</p>}
      </form>
    </div>
  );
}
