'use client';

import { useState } from 'react';
import { clients } from '@/lib/site-data';

export default function Ticker() {
  const [paused, setPaused] = useState(false);
  return (
    <div className={`ticker${paused ? ' paused' : ''}`} role="region" aria-label="Clients and projects">
      <div className="ticker-inner">
        <span className="ticker-label">Delivered on projects for</span>
        <div className="ticker-mask">
          <div className="ticker-track">
            {[0, 1].map(copy => (
              <ul className="ticker-list" key={copy} aria-hidden={copy === 1 || undefined}>
                {clients.map(c => <li key={c}>{c}</li>)}
              </ul>
            ))}
          </div>
        </div>
        <button className="ticker-toggle" type="button" aria-pressed={paused} aria-label="Pause the client list" onClick={() => setPaused(p => !p)}>
          Pause
        </button>
      </div>
    </div>
  );
}