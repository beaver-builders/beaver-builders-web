'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { startBuildHero, type BuildUi } from '../hero/engine';
import './hero-build.css';

const STAGE_NAMES = ['Site survey', 'Piling', 'Structural frame', 'Envelope', 'Handover'];
const STAGE_TABS = ['Survey', 'Piling', 'Frame', 'Envelope', 'Handover'];

interface HeroBuildProps {
  title: ReactNode;            
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  handover?: { kicker: string; title: string; text: string; ctaLabel: string; ctaHref: string };
  nav?: ReactNode;            
}

export default function HeroBuild({ title, description, ctaLabel, ctaHref = '#', handover, nav }: HeroBuildProps) {
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ui, setUi] = useState<BuildUi>({ stage: 0, level: 0, pct: 0, done: false });

  useEffect(() => {
    const hero = heroRef.current;
    const canvas = canvasRef.current;
    if (!hero || !canvas) return;
    const monoFont = getComputedStyle(hero).getPropertyValue('--hb-mono').trim() || undefined;
    return startBuildHero({ hero, canvas, monoFont, onUi: setUi });
  }, []);

  return (
    <header ref={heroRef} className="hb">
      <div className="hb-pin">
        <div className="hb-shell">
          <canvas ref={canvasRef} className="hb-canvas" aria-hidden="true" />
          {nav}

          <div className="hb-copy">
            <h1 className="hb-title">{title}</h1>
            {description && <p>{description}</p>}
            {ctaLabel && <a className="hb-btn" href={ctaHref}>{ctaLabel}</a>}
          </div>

          <div className="hb-log" role="group" aria-label="Build sequence">
            <div className="hb-log-head">
              <p className="hb-now">
                <span className="hb-step">{String(ui.stage + 1).padStart(2, '0')}</span>
                <span className="hb-name">{STAGE_NAMES[ui.stage]}</span>
              </p>
              <p className="hb-meta">
                <span>Level <b>{String(ui.level).padStart(2, '0')}</b>/10</span>
                <span><b>{ui.pct}</b>%</span>
              </p>
            </div>
            <div className="hb-tape" aria-hidden="true"><i /></div>
            <ol className="hb-stages">
              {STAGE_TABS.map((t, k) => (
                <li key={t} className={k < ui.stage ? 'done' : k === ui.stage ? 'now' : ''}>{t}</li>
              ))}
            </ol>
          </div>

          <p className="hb-cue" aria-hidden="true"><i />Scroll to build</p>

          {handover && (
            <aside className="hb-handover" aria-label="Featured project">
              <p className="hb-kicker">{handover.kicker}</p>
              <p className="hb-hv-title">{handover.title}</p>
              <p className="hb-hv-text">{handover.text}</p>
              <a className="hb-btn" href={handover.ctaHref}>{handover.ctaLabel}</a>
            </aside>
          )}
          <div className="hb-veil" aria-hidden="true" />
        </div>
      </div>
    </header>
  );
}
