import { useEffect, useRef, useState } from "react";
import type { SkillBand } from "../data/resume";

type SceneProps = {
  bands: SkillBand[];
};

const baseRadius = 3.6;
const verticalGap = 0.95;

function getColorPair(gradientClass: string): { from: string; to: string } {
  const map: Record<string, { from: string; to: string }> = {
    "from-sky-400 to-cyan-300": { from: "#38bdf8", to: "#22d3ee" },
    "from-fuchsia-400 to-pink-300": { from: "#e879f9", to: "#f9a8d4" },
    "from-emerald-400 to-teal-300": { from: "#34d399", to: "#5eead4" },
    "from-amber-400 to-orange-300": { from: "#fbbf24", to: "#fdba74" },
    "from-indigo-400 to-violet-300": { from: "#818cf8", to: "#c4b5fd" },
    "from-rose-400 to-red-300": { from: "#fb7185", to: "#fca5a5" },
  };
  return map[gradientClass] ?? { from: "#38bdf8", to: "#a855f7" };
}

export default function SkillsScene({ bands }: SceneProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [rotation, setRotation] = useState({ x: -18, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [autoSpin, setAutoSpin] = useState(true);
  const dragState = useRef<{ active: boolean; startX: number; startY: number; baseX: number; baseY: number }>({
    active: false,
    startX: 0,
    startY: 0,
    baseX: 0,
    baseY: 0,
  });

  useEffect(() => {
    if (!autoSpin) return;
    let raf = 0;
    const tick = () => {
      setRotation((prev) => ({ x: prev.x, y: prev.y + 0.0028 }));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [autoSpin]);

  const handlePointerDown = (event: React.PointerEvent) => {
    setAutoSpin(false);
    dragState.current = {
      active: true,
      startX: event.clientX,
      startY: event.clientY,
      baseX: rotation.x,
      baseY: rotation.y,
    };
    (event.target as Element).setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent) => {
    if (!dragState.current.active) return;
    const dx = event.clientX - dragState.current.startX;
    const dy = event.clientY - dragState.current.startY;
    setRotation({
      x: Math.max(-45, Math.min(45, dragState.current.baseX - dy * 0.3)),
      y: dragState.current.baseY + dx * 0.4,
    });
  };

  const handlePointerUp = () => {
    dragState.current.active = false;
  };

  const handleWheel = (event: React.WheelEvent) => {
    event.preventDefault();
    setZoom((z) => Math.max(0.7, Math.min(1.6, z - event.deltaY * 0.001)));
  };

  return (
    <div className="mt-12">
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onWheel={handleWheel}
        className="relative mx-auto h-[460px] w-full max-w-5xl cursor-grab select-none overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#0a0d18] via-[#0b1020] to-[#0a0d18] shadow-[0_40px_120px_-40px_rgba(56,189,248,0.35)] active:cursor-grabbing sm:h-[540px]"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.18),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(148,163,184,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.18)_1px,transparent_1px)] [background-size:32px_32px]" />

        <div
          className="absolute left-1/2 top-1/2 h-0 w-0"
          style={{
            transform: `translate(-50%, -50%) perspective(1400px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${zoom})`,
            transformStyle: "preserve-3d",
            transition: dragState.current.active ? "none" : "transform 80ms linear",
          }}
        >
          <div
            className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-sky-400 to-fuchsia-500 shadow-[0_0_60px_rgba(56,189,248,0.7)]"
            style={{ transform: "translate3d(-50%, -50%, 0)" }}
          />
          <div
            className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-300/30"
            style={{ transform: "translate3d(-50%, -50%, 0)" }}
          />
          <div
            className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-fuchsia-300/20"
            style={{ transform: "translate3d(-50%, -50%, 0)" }}
          />

          {bands.map((band, bandIndex) => {
            const radius = baseRadius + bandIndex * 0.35;
            const y = (bandIndex - (bands.length - 1) / 2) * verticalGap;
            const items = band.items;
            return (
              <div
                key={band.title}
                className="absolute left-1/2 top-1/2"
                style={{
                  transform: `translate3d(-50%, -50%, 0) translateY(${y * 70}px)`,
                  width: `${radius * 2 * 70}px`,
                  height: `${radius * 2 * 70}px`,
                }}
              >
                <div
                  className="absolute inset-0 rounded-full border border-white/15"
                  style={{ transform: `rotateX(72deg)` }}
                />

                {items.map((item, itemIndex) => {
                  const angle = (itemIndex / items.length) * Math.PI * 2;
                  const x = Math.cos(angle) * radius * 70;
                  const z = Math.sin(angle) * radius * 70;
                  const colors = getColorPair(band.color);
                  return (
                    <div
                      key={item}
                      className="absolute left-1/2 top-1/2"
                      style={{ transform: `translate3d(${x}px, 0, ${z}px)` }}
                    >
                      <div
                        className="relative -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/15 bg-[#0a0d18]/85 px-3 py-1.5 text-xs font-semibold text-white shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur"
                        style={{ boxShadow: `0 10px 30px rgba(0,0,0,0.45), 0 0 18px ${colors.from}55` }}
                      >
                        <span
                          className="absolute inset-0 -z-10 rounded-2xl opacity-50"
                          style={{ background: `linear-gradient(135deg, ${colors.from}, ${colors.to})` }}
                        />
                        {item}
                      </div>
                    </div>
                  );
                })}

                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.3em]"
                  style={{ transform: "translate3d(-50%, -50%, 0) translateY(-110px)" }}
                >
                  <span
                    className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-white/80"
                    style={{ boxShadow: `0 0 24px ${getColorPair(band.color).from}55` }}
                  >
                    {String(bandIndex + 1).padStart(2, "0")} · {band.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-3 px-5 py-4 text-xs font-medium text-slate-300 sm:px-8">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
            Drag to rotate · Scroll to zoom
          </span>
          <button
            type="button"
            onClick={() => setAutoSpin((spin) => !spin)}
            className="pointer-events-auto rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white transition hover:border-sky-400"
          >
            {autoSpin ? "Pause orbit" : "Resume orbit"}
          </button>
        </div>
      </div>

      <ul className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3">
        {bands.map((band) => (
          <li key={band.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p
              className={`text-xs font-semibold uppercase tracking-[0.24em] text-transparent bg-clip-text bg-gradient-to-r ${band.color}`}
            >
              {band.title}
            </p>
            <p className="mt-2 text-sm text-slate-200">{band.items.join(" · ")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
