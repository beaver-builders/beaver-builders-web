"use client";

import { useEffect, useState } from "react";

type Stage = { src: string; label?: string };

export default function ProjectProgressGallery({
  progress,
  completed,
  interval = 2500,
}: {
  progress: string[];   // step 1..n (construction photos, in order)
  completed: string;    // completed photo (always shown LAST)
  interval?: number;
}) {
  const stages: Stage[] = [
    ...progress.map((src, i) => ({ src, label: `Step ${i + 1}` })),
    { src: completed, label: "Completed ✅" },
  ];

  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const last = stages.length - 1;

  useEffect(() => {
    if (!auto || active >= last) return;
    const t = setTimeout(() => setActive((a) => a + 1), interval);
    return () => clearTimeout(t);
  }, [active, auto, last, interval]);

  return (
    <div>
      <div className="relative overflow-hidden rounded-xl">
        <img
          key={active}
          src={stages[active].src}
          alt={stages[active].label}
          className="w-full block animate-[fade_.5s_ease]"
        />
        <span
          className={`absolute top-3 left-3 rounded-full px-3 py-1 text-sm text-white ${
            active === last ? "bg-green-700" : "bg-black/60"
          }`}
        >
          {stages[active].label}
        </span>
      </div>

      <div className="mt-3 flex gap-2">
        {stages.map((s, i) => (
          <img
            key={i}
            src={s.src}
            alt={s.label}
            onClick={() => {
              setAuto(false);
              setActive(i);
            }}
            className={`h-16 w-24 cursor-pointer rounded-md object-cover border-2 ${
              i === active ? "border-green-700 opacity-100" : "border-transparent opacity-60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}