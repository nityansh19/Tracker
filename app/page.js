'use client';

import { useEffect, useRef, useState } from 'react';

const START_FALLBACK = 4599350;

function fmt(n) {
  return new Intl.NumberFormat('en-IN').format(Math.round(n));
}

export default function Home() {
  const [count, setCount] = useState(START_FALLBACK);
  const [baseline, setBaseline] = useState(null);
  const [status, setStatus] = useState('connecting');
  const [updatedAt, setUpdatedAt] = useState(null);
  const lastVerified = useRef(START_FALLBACK);

  async function refresh() {
    try {
      const res = await fetch('/api/count', { cache: 'no-store' });
      if (!res.ok) throw new Error('source unavailable');
      const data = await res.json();
      if (Number.isFinite(data.followers)) {
        lastVerified.current = data.followers;
        setCount(data.followers);
        setBaseline(v => v ?? data.followers);
        setUpdatedAt(new Date());
        setStatus(data.live ? 'live' : 'cached');
      }
    } catch {
      setBaseline(v => v ?? lastVerified.current);
      setStatus('retrying');
    }
  }

  useEffect(() => {
    refresh();
    const sourceTimer = setInterval(refresh, 15000);
    return () => clearInterval(sourceTimer);
  }, []);

  const growth = baseline == null ? 0 : count - baseline;

  return (
    <main className="wrap">
      <section className="tracker" aria-live="polite">
        <div className="identity">
          <div className="avatar">S</div>
          <div>
            <h1>ScoutOP</h1>
            <p>@scoutop</p>
          </div>
          <span className={`dot ${status}`} title={status} />
        </div>

        <div className="number">{fmt(count)}</div>
        <div className="label">FOLLOWERS</div>

        <div className={`growth ${growth >= 0 ? 'up' : 'down'}`}>
          {growth >= 0 ? '+' : ''}{fmt(growth)}
          <span> since tracking started</span>
        </div>

        <div className="pulse"><i /></div>
        <p className="stamp">
          {updatedAt ? `Last verified ${updatedAt.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit', second:'2-digit'})}` : 'Connecting to follower source…'}
        </p>
      </section>
    </main>
  );
}
