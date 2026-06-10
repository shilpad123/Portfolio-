import { useEffect, useRef, useState } from "react";

const layers = [
  { size: 320, blurPx: 0, opacity: 0.95, from: "#38bdf8", to: "#a855f7" },
  { size: 260, blurPx: 2, opacity: 0.7, from: "#22d3ee", to: "#6366f1" },
  { size: 200, blurPx: 4, opacity: 0.55, from: "#f0abfc", to: "#60a5fa" },
];

type PortraitProps = {
  imageUrl: string;
  initials: string;
};

export default function HeroPortrait({ imageUrl, initials }: PortraitProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [autoRotate, setAutoRotate] = useState(true);
  const [imageError, setImageError] = useState(false);
  const dragState = useRef<{
    active: boolean;
    startX: number;
    startY: number;
    baseX: number;
    baseY: number;
  }>({ active: false, startX: 0, startY: 0, baseX: 0, baseY: 0 });

  useEffect(() => {
    if (!autoRotate) return;
    let raf = 0;
    const tick = () => {
      setRotation((prev) => ({ x: prev.x, y: prev.y + 0.0035 }));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [autoRotate]);

  const handlePointerDown = (event: React.PointerEvent) => {
    setAutoRotate(false);
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
      x: Math.max(-25, Math.min(25, dragState.current.baseX - dy * 0.25)),
      y: dragState.current.baseY + dx * 0.3,
    });
  };

  const handlePointerUp = () => {
    dragState.current.active = false;
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className="relative mx-auto aspect-square w-full max-w-md cursor-grab select-none active:cursor-grabbing"
      style={{ perspective: "1200px" }}
    >
      <div className="absolute inset-0 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent" />
      <div className="absolute inset-0 rounded-[2.5rem] bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.18),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.2),transparent_55%)]" />

      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: dragState.current.active ? "none" : "transform 80ms linear",
        }}
      >
        {layers.map((layer, index) => (
          <div
            key={layer.size}
            className="absolute rounded-[2rem] border border-white/15"
            style={{
              width: layer.size,
              height: layer.size,
              transform: `translateZ(${index * 24}px)`,
              background: `linear-gradient(135deg, ${layer.from}, ${layer.to})`,
              opacity: layer.opacity,
              filter: `blur(${layer.blurPx}px)`,
              boxShadow: `0 30px 80px -30px ${layer.from}aa`,
            }}
          />
        ))}

        <div
          className="relative z-10 h-52 w-52 overflow-hidden rounded-[1.75rem] border border-white/25 bg-[#0a0d18]/85 text-center backdrop-blur sm:h-56 sm:w-56"
          style={{
            transform: "translateZ(110px)",
            boxShadow: "0 30px 80px -20px rgba(56,189,248,0.5)",
          }}
        >
          {imageError ? (
            <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-sky-400 to-fuchsia-500 text-slate-950">
              <span className="text-5xl font-black tracking-tight">{initials}</span>
              <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.4em] text-slate-900/80">
                Portfolio
              </span>
            </div>
          ) : (
            <img
              src={imageUrl}
              alt="Shilpa Nagappa Demannavar"
              onError={() => setImageError(true)}
              className="h-full w-full object-cover"
              draggable={false}
            />
          )}
        </div>

        {[
          { label: "Python", x: -120, y: -110, z: 60 },
          { label: "Flask", x: 120, y: -100, z: 90 },
          { label: "TensorFlow", x: -130, y: 90, z: 70 },
          { label: "React", x: 130, y: 100, z: 50 },
          { label: "MySQL", x: 0, y: -150, z: 40 },
        ].map((badge) => (
          <span
            key={badge.label}
            className="rounded-full border border-white/15 bg-[#0a0d18]/80 px-3 py-1.5 text-xs font-semibold text-white shadow-lg shadow-sky-500/20 backdrop-blur"
            style={{ transform: `translate3d(${badge.x}px, ${badge.y}px, ${badge.z}px)` }}
          >
            {badge.label}
          </span>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center text-xs font-medium text-slate-300">
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
          Drag to rotate the portrait
        </span>
      </div>
    </div>
  );
}
