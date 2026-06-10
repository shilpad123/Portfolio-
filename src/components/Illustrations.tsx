export function IsometricWorkstation() {
  return (
    <svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg" className="w-full">
      <defs>
        <linearGradient id="deskGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e1b4b" />
          <stop offset="100%" stopColor="#0f0f2e" />
        </linearGradient>
        <linearGradient id="screenGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e1b4b" />
          <stop offset="100%" stopColor="#0a0a1a" />
        </linearGradient>
      </defs>

      {/* Desk surface */}
      <ellipse cx="200" cy="280" rx="170" ry="18" fill="url(#deskGrad)" />
      <polygon points="60,260 340,260 370,280 30,280" fill="#1a1a3e" />

      {/* Laptop base */}
      <polygon points="110,240 290,240 310,260 90,260" fill="#0d0d1a" />
      <polygon points="110,240 290,240 280,230 120,230" fill="#1a1a3e" />
      <rect x="190" y="245" width="20" height="3" rx="1.5" fill="#2a2a4e" />

      {/* Laptop screen back */}
      <polygon points="125,230 275,230 285,130 115,130" fill="#0a0a1a" />
      {/* Laptop screen face */}
      <polygon points="130,225 270,225 278,135 122,135" fill="url(#screenGrad)" />

      {/* Code lines on screen */}
      <rect x="145" y="150" width="80" height="4" rx="2" fill="#00d9ff" opacity="0.8" />
      <rect x="155" y="162" width="100" height="3" rx="1.5" fill="#a855f7" opacity="0.7" />
      <rect x="155" y="172" width="70" height="3" rx="1.5" fill="#ff2d75" opacity="0.7" />
      <rect x="165" y="182" width="85" height="3" rx="1.5" fill="#00d9ff" opacity="0.7" />
      <rect x="165" y="192" width="60" height="3" rx="1.5" fill="#fbbf24" opacity="0.7" />
      <rect x="155" y="202" width="90" height="3" rx="1.5" fill="#a855f7" opacity="0.7" />
      <rect x="145" y="212" width="50" height="3" rx="1.5" fill="#ff2d75" opacity="0.7" />

      {/* Coffee cup */}
      <ellipse cx="335" cy="240" rx="18" ry="5" fill="#2a2a4e" />
      <path d="M318,238 L321,210 L349,210 L352,238" fill="#1a1a3e" />
      <ellipse cx="335" cy="210" rx="14" ry="4" fill="#2a2a4e" />
      <path d="M352,215 Q360,218 358,228 Q356,235 350,233" fill="none" stroke="#1a1a3e" strokeWidth="3" />

      {/* Steam */}
      <path d="M328,200 Q325,188 330,178" stroke="#64748b" strokeWidth="1.5" fill="none" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.1;0.4" dur="3s" repeatCount="indefinite" />
      </path>
      <path d="M338,200 Q341,188 336,178" stroke="#64748b" strokeWidth="1.5" fill="none" opacity="0.3">
        <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2.5s" repeatCount="indefinite" />
      </path>

      {/* Floating elements */}
      <circle cx="65" cy="70" r="6" fill="#00d9ff" opacity="0.6">
        <animate attributeName="cy" values="70;55;70" dur="3s" repeatCount="indefinite" />
      </circle>
      <rect x="300" y="55" width="22" height="22" rx="4" fill="#ff2d75" opacity="0.6" transform="rotate(15 311 66)">
        <animate attributeName="y" values="55;42;55" dur="4s" repeatCount="indefinite" />
      </rect>
      <polygon points="350,95 362,107 350,119 338,107" fill="#a855f7" opacity="0.6">
        <animate attributeName="cy" values="107;95;107" dur="3.5s" repeatCount="indefinite" />
      </polygon>
      <text x="45" y="130" fontSize="16" fill="#00d9ff" opacity="0.6" fontFamily="monospace" fontWeight="bold">{'</>'}</text>
      <text x="320" y="160" fontSize="14" fill="#fbbf24" opacity="0.5" fontFamily="monospace" fontWeight="bold">{'{ }'}</text>

      {/* Plant */}
      <rect x="40" y="250" width="20" height="25" rx="3" fill="#1a1a3e" />
      <ellipse cx="50" cy="250" rx="12" ry="4" fill="#2a2a4e" />
      <path d="M50,248 Q42,235 45,225 Q50,220 55,225 Q58,235 50,248" fill="#10b981" opacity="0.7" />
    </svg>
  );
}

export function SkillTicker() {
  const items = [
    "Machine Learning",
    "Python",
    "Java",
    "C++",
    "JavaScript",
    "React",
    "Node.js",
    "TensorFlow",
    "PyTorch",
    "Keras",
    "Flask",
    "OpenCV",
    "NumPy",
    "Pandas",
    "Matplotlib",
    "Scikit-learn",
    "MySQL",
    "Git",
    "GitHub",
    "AI",
    "Data Analytics",
  ];

  const colorMap: Record<string, string> = {
    "Machine Learning": "from-violet-500 to-fuchsia-500",
    "Python": "from-blue-500 to-yellow-500",
    "Java": "from-red-500 to-orange-500",
    "C++": "from-blue-500 to-indigo-500",
    "JavaScript": "from-yellow-400 to-amber-500",
    "React": "from-cyan-400 to-blue-500",
    "Node.js": "from-green-400 to-emerald-500",
    "TensorFlow": "from-orange-400 to-red-500",
    "PyTorch": "from-orange-500 to-red-600",
    "Keras": "from-red-400 to-pink-500",
    "Flask": "from-slate-300 to-slate-500",
    "OpenCV": "from-emerald-400 to-teal-500",
    "NumPy": "from-blue-400 to-cyan-500",
    "Pandas": "from-sky-400 to-blue-600",
    "Matplotlib": "from-amber-400 to-orange-500",
    "Scikit-learn": "from-blue-400 to-indigo-500",
    "MySQL": "from-sky-500 to-blue-700",
    "Git": "from-orange-500 to-red-600",
    "GitHub": "from-slate-400 to-slate-700",
    "AI": "from-rose-400 to-pink-500",
    "Data Analytics": "from-cyan-400 to-teal-500",
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/5 via-violet-500/5 to-pink-500/5 py-6">
      {/* Edge fades for a clean train look */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#0a0a1a] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#0a0a1a] to-transparent" />

      <div className="ticker-track flex w-max gap-4">
        {[...items, ...items].map((item, index) => {
          const color = colorMap[item] ?? "from-cyan-400 to-pink-500";
          return (
            <div
              key={`${item}-${index}`}
              className={`ticker-chip flex items-center gap-2 rounded-full border border-white/10 bg-gradient-to-r ${color} px-5 py-2.5 shadow-lg shadow-black/40`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white/90" />
              <span className="whitespace-nowrap text-sm font-bold uppercase tracking-wider text-white">
                {item}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function IsometricSkills() {
  return (
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" className="w-full">
      <defs>
        <linearGradient id="cubeGrad1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>
        <linearGradient id="cubeGrad2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e879f9" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <linearGradient id="cubeGrad3" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
        <linearGradient id="cubeGrad4" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>

      {/* CUBE 1 (cyan) */}
      <g transform="translate(60, 30)">
        <polygon points="0,30 35,12 70,30 35,48" fill="url(#cubeGrad1)" />
        <polygon points="0,30 0,75 35,93 35,48" fill="#0e7490" />
        <polygon points="70,30 70,75 35,93 35,48" fill="#155e75" />
        <text x="35" y="42" textAnchor="middle" fontSize="9" fontFamily="monospace" fontWeight="bold" fill="white">{'</>'}</text>
      </g>

      {/* CUBE 2 (purple) */}
      <g transform="translate(150, 50)">
        <polygon points="0,30 35,12 70,30 35,48" fill="url(#cubeGrad2)" />
        <polygon points="0,30 0,75 35,93 35,48" fill="#7e22ce" />
        <polygon points="70,30 70,75 35,93 35,48" fill="#581c87" />
        <text x="35" y="42" textAnchor="middle" fontSize="11" fontFamily="monospace" fontWeight="bold" fill="white">AI</text>
      </g>

      {/* CUBE 3 (amber) */}
      <g transform="translate(240, 30)">
        <polygon points="0,30 35,12 70,30 35,48" fill="url(#cubeGrad3)" />
        <polygon points="0,30 0,75 35,93 35,48" fill="#b45309" />
        <polygon points="70,30 70,75 35,93 35,48" fill="#92400e" />
        <text x="35" y="42" textAnchor="middle" fontSize="9" fontFamily="monospace" fontWeight="bold" fill="white">{'{ }'}</text>
      </g>

      {/* CUBE 4 (green) */}
      <g transform="translate(330, 50)">
        <polygon points="0,30 35,12 70,30 35,48" fill="url(#cubeGrad4)" />
        <polygon points="0,30 0,75 35,93 35,48" fill="#047857" />
        <polygon points="70,30 70,75 35,93 35,48" fill="#065f46" />
        <text x="35" y="42" textAnchor="middle" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="white">ML</text>
      </g>

      {/* Connecting line */}
      <path d="M30 130 Q200 145 370 130" stroke="url(#cubeGrad2)" strokeWidth="1" fill="none" opacity="0.4" strokeDasharray="3 3" />

      {/* Floating dots */}
      <circle cx="110" cy="155" r="2" fill="#22d3ee" opacity="0.6">
        <animate attributeName="cy" values="155;145;155" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="290" cy="155" r="2" fill="#e879f9" opacity="0.6">
        <animate attributeName="cy" values="155;145;155" dur="3.5s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

export function IsometricEducation() {
  return (
    <svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg" className="w-full">
      <defs>
        <linearGradient id="capGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e1b4b" />
          <stop offset="100%" stopColor="#0f0f2e" />
        </linearGradient>
      </defs>

      {/* Desk surface */}
      <ellipse cx="200" cy="280" rx="170" ry="18" fill="#1a1a3e" />

      {/* Books stack */}
      <rect x="80" y="230" width="100" height="18" rx="2" fill="#ff2d75" opacity="0.8" />
      <rect x="85" y="212" width="95" height="18" rx="2" fill="#00d9ff" opacity="0.8" />
      <rect x="90" y="194" width="90" height="18" rx="2" fill="#a855f7" opacity="0.8" />
      <rect x="95" y="176" width="85" height="18" rx="2" fill="#fbbf24" opacity="0.8" />
      {/* Book details */}
      <rect x="100" y="235" width="40" height="2" rx="1" fill="#fff" opacity="0.3" />
      <rect x="105" y="217" width="35" height="2" rx="1" fill="#fff" opacity="0.3" />
      <rect x="110" y="199" width="30" height="2" rx="1" fill="#fff" opacity="0.3" />
      <rect x="115" y="181" width="25" height="2" rx="1" fill="#fff" opacity="0.3" />

      {/* Graduation cap base */}
      <polygon points="200,150 280,170 200,190 120,170" fill="url(#capGrad)" />
      <polygon points="200,150 280,170 200,190 120,170" fill="none" stroke="#00d9ff" strokeWidth="1.5" opacity="0.6" />

      {/* Cap button */}
      <circle cx="200" cy="170" r="5" fill="#00d9ff" />

      {/* Tassel */}
      <path d="M280,170 Q290,175 285,200" stroke="#fbbf24" strokeWidth="2" fill="none" />
      <circle cx="285" cy="203" r="5" fill="#fbbf24" />
      <path d="M283,208 L283,220 M287,208 L287,220" stroke="#fbbf24" strokeWidth="1.5" />

      {/* Floating elements */}
      <text x="280" y="80" fontSize="20" fill="#00d9ff" opacity="0.6" fontFamily="monospace" fontWeight="bold">{'</>'}</text>
      <text x="60" y="90" fontSize="18" fill="#ff2d75" opacity="0.5" fontFamily="monospace" fontWeight="bold">{'{ }'}</text>
      <circle cx="320" cy="130" r="6" fill="#a855f7" opacity="0.5">
        <animate attributeName="cy" values="130;115;130" dur="3s" repeatCount="indefinite" />
      </circle>
      <rect x="50" y="140" width="18" height="18" rx="3" fill="#00d9ff" opacity="0.5" transform="rotate(20 59 149)">
        <animate attributeName="y" values="140;128;140" dur="3.5s" repeatCount="indefinite" />
      </rect>

      {/* Certificate scroll */}
      <rect x="220" y="220" width="60" height="40" rx="3" fill="#1a1a3e" stroke="#00d9ff" strokeWidth="1" opacity="0.7" />
      <rect x="230" y="230" width="40" height="2" rx="1" fill="#00d9ff" opacity="0.5" />
      <rect x="230" y="236" width="30" height="2" rx="1" fill="#a855f7" opacity="0.5" />
      <rect x="230" y="242" width="35" height="2" rx="1" fill="#ff2d75" opacity="0.5" />
      <circle cx="250" cy="252" r="4" fill="#fbbf24" opacity="0.7" />
    </svg>
  );
}
