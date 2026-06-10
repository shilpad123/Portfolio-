import { useEffect, useState, type FormEvent } from "react";
import {
  profile,
  summary,
  experience,
  projects,
  education,
  skills,
  certificates,
  languages,
} from "./data/resume";
import { downloadResumePdf } from "./utils/generateResume";
import { IsometricWorkstation, IsometricEducation, IsometricSkills, SkillTicker } from "./components/Illustrations";
import ResumePage from "./components/ResumePage";

/* ---------- Helpers ---------- */

function CodeWindow({
  title = "script.js",
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0d0d1a] shadow-2xl shadow-black/40">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-500" />
          <span className="h-3 w-3 rounded-full bg-yellow-500" />
          <span className="h-3 w-3 rounded-full bg-green-500" />
        </div>
        <span className="text-xs text-gray-500">{title}</span>
        <span className="w-12" />
      </div>
      <pre className="overflow-x-auto p-5 text-[13px] leading-7 font-mono text-gray-300">
        <code>{children}</code>
      </pre>
    </div>
  );
}

const Kw = ({ children }: { children: React.ReactNode }) => (
  <span className="text-pink-400">{children}</span>
);
const Prop = ({ children }: { children: React.ReactNode }) => (
  <span className="text-purple-400">{children}</span>
);
const Str = ({ children }: { children: React.ReactNode }) => (
  <span className="text-cyan-300">{children}</span>
);
const Num = ({ children }: { children: React.ReactNode }) => (
  <span className="text-amber-400">{children}</span>
);
const Punc = ({ children }: { children: React.ReactNode }) => (
  <span className="text-gray-500">{children}</span>
);
const Fn = ({ children }: { children: React.ReactNode }) => (
  <span className="text-cyan-400">{children}</span>
);

/* ---------- Skill icon set ---------- */

const skillIcon: Record<string, { icon: React.ReactNode; color: string }> = {
  python: {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
        <path d="M12 2c-1.7 0-3.3.1-4.6.4C5.3 2.8 4.5 4 4.5 5.5v2.4h7.5v.8H3.2c-2 0-3.7 1.5-3.7 4.2v2.5c0 2.5 1.5 4 3.7 4H5v-2.4c0-2 1.7-3.7 3.7-3.7h7.4c1.7 0 3-1.4 3-3.1V5.5c0-2-1.7-3.1-3.7-3.5H12zm-2 1.6c.6 0 1.1.5 1.1 1.1 0 .6-.5 1.1-1.1 1.1-.6 0-1.1-.5-1.1-1.1 0-.6.5-1.1 1.1-1.1z" />
        <path d="M20.8 8.7h-1.8v2.4c0 2-1.7 3.7-3.7 3.7H7.9c-1.7 0-3 1.4-3 3.1v5.2c0 2 1.7 3.1 3.7 3.5 2.4.4 4.7.1 6.1-.4 1.1-.4 2-1.5 2-2.7v-2.4H8.7v-.8h8.7c2 0 2.8-1.7 3.4-3.4.6-1.8.6-3.5 0-5.2-.4-1.5-1.4-3-3-3zm-4 11.7c.6 0 1.1.5 1.1 1.1 0 .6-.5 1.1-1.1 1.1-.6 0-1.1-.5-1.1-1.1 0-.6.5-1.1 1.1-1.1z" />
      </svg>
    ),
    color: "from-blue-400 to-yellow-400",
  },
  java: {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
        <path d="M8.5 2c-.4 0-.7.2-.9.5-.2.3-.2.7 0 1l1.5 2.6c.2.3.2.7 0 1l-1.5 2.6c-.2.3-.2.7 0 1 .2.3.5.5.9.5.4 0 .7-.2.9-.5l1.5-2.6c.2-.3.5-.5.9-.5.4 0 .7.2.9.5l1.5 2.6c.2.3.5.5.9.5.4 0 .7-.2.9-.5.2-.3.2-.7 0-1l-1.5-2.6c-.2-.3-.2-.7 0-1l1.5-2.6c.2-.3.2-.7 0-1-.2-.3-.5-.5-.9-.5-.4 0-.7.2-.9.5l-1.5 2.6c-.2.3-.5.5-.9.5-.4 0-.7-.2-.9-.5L9.4 2.5c-.2-.3-.5-.5-.9-.5zM4 13c-.6 0-1 .4-1 1v4c0 .6.4 1 1 1s1-.4 1-1v-4c0-.6-.4-1-1-1zm16 0c-.6 0-1 .4-1 1v4c0 .6.4 1 1 1s1-.4 1-1v-4c0-.6-.4-1-1-1zM12 14c-2.2 0-4 1.3-4 3 0 1 .5 1.8 1.4 2.4-.3.4-.5.9-.5 1.4 0 1.2 1 2.2 2.2 2.2h1.8c1.2 0 2.2-1 2.2-2.2 0-.5-.2-1-.5-1.4.9-.6 1.4-1.4 1.4-2.4 0-1.7-1.8-3-4-3z" />
      </svg>
    ),
    color: "from-red-500 to-orange-400",
  },
  javascript: {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
        <path d="M3 3h18v18H3V3zm4.5 14.5c.5.5 1.2.8 2 .8 1.5 0 2.5-.8 2.5-2.2V11h-1.5v5c0 .6-.3 1-1 1s-1-.4-1-1H7c0 1 .2 1.5.5 1.5zM14 16c.5.7 1.5 1.3 2.8 1.3 1.5 0 2.7-.7 2.7-2 0-1.1-.7-1.6-2-2l-.8-.2c-.7-.2-1-.4-1-.7 0-.3.3-.5.8-.5.5 0 1 .2 1.4.6l1-1c-.6-.6-1.4-.9-2.3-.9-1.4 0-2.4.7-2.4 1.9 0 1.1.7 1.6 1.9 2l.7.2c.7.2 1.1.4 1.1.7 0 .3-.3.6-.9.6-.7 0-1.2-.3-1.6-.8L14 16z" />
      </svg>
    ),
    color: "from-yellow-400 to-amber-500",
  },
  react: {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7">
        <circle cx="12" cy="12" r="2" fill="currentColor" />
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      </svg>
    ),
    color: "from-cyan-400 to-blue-500",
  },
  node: {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
        <path d="M12 1.5c-.4 0-.8.1-1.1.3l-8.2 4.7c-.7.4-1.1 1.1-1.1 1.9v9.4c0 .8.4 1.5 1.1 1.9l8.2 4.7c.3.2.7.3 1.1.3s.8-.1 1.1-.3l8.2-4.7c.7-.4 1.1-1.1 1.1-1.9V8.4c0-.8-.4-1.5-1.1-1.9L13.1 1.8c-.3-.2-.7-.3-1.1-.3z" />
      </svg>
    ),
    color: "from-green-400 to-emerald-500",
  },
  tensorflow: {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
        <path d="M3 3l8 8v10l-8-4V3zm10 8l8-8v14l-8 4V11z" />
      </svg>
    ),
    color: "from-orange-400 to-red-500",
  },
  flask: {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <path d="M9 3v6L4 19a2 2 0 002 2h12a2 2 0 002-2L15 9V3" />
        <path d="M9 3h6" />
        <path d="M7 15h10" />
      </svg>
    ),
    color: "from-slate-300 to-slate-500",
  },
  html: {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
        <path d="M4 2l2 18 6 2 6-2 2-18H4zm15 3H5l1 11h12l1-11zm-3 5H8l-.2-2H16l-.2 2H10v2h5.5l-.5 5-3 1-3-1v-2H7l.2 3 4.8 1.5 4.8-1.5.5-6H8l-.2-2z" />
      </svg>
    ),
    color: "from-orange-500 to-red-500",
  },
  git: {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
        <path d="M21 7L17 3l-2 2 2 2-4 4-3-3-7 7 7 7 7-7-3-3 4-4 2 2 2-2-4-4zM9 18l-3-3 3-3 3 3-3 3z" />
      </svg>
    ),
    color: "from-orange-500 to-red-600",
  },
  sql: {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <ellipse cx="12" cy="5" rx="8" ry="3" />
        <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
        <path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
      </svg>
    ),
    color: "from-blue-400 to-cyan-500",
  },
  ml: {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3" />
      </svg>
    ),
    color: "from-violet-400 to-fuchsia-500",
  },
  ai: {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <rect x="3" y="6" width="18" height="14" rx="3" />
        <circle cx="8" cy="13" r="1.5" />
        <circle cx="16" cy="13" r="1.5" />
        <path d="M12 3v3M9 20v1M15 20v1" />
        <path d="M9 9h.01M15 9h.01" />
      </svg>
    ),
    color: "from-rose-400 to-pink-500",
  },
};

const skillOrder: { name: string; key: keyof typeof skillIcon }[] = [
  { name: "Machine Learning", key: "ml" },
  { name: "Python", key: "python" },
  { name: "Java", key: "java" },
  { name: "JavaScript", key: "javascript" },
  { name: "React", key: "react" },
  { name: "Node.js", key: "node" },
  { name: "TensorFlow", key: "tensorflow" },
  { name: "Flask", key: "flask" },
  { name: "HTML/CSS", key: "html" },
  { name: "Git", key: "git" },
  { name: "MySQL", key: "sql" },
  { name: "AI", key: "ai" },
];

/* ---------- Section heading ---------- */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex items-center justify-center gap-4 py-2">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
      <span className="rounded-md border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.3em] text-cyan-300">
        {children}
      </span>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
    </div>
  );
}

/* ---------- Social icons ---------- */

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-300 transition hover:border-pink-500/50 hover:bg-pink-500/10 hover:text-pink-300"
    >
      {children}
    </a>
  );
}

/* ---------- App ---------- */

function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const name = String(formData.get("name") || "");
  const message = String(formData.get("message") || "");
  const subject = encodeURIComponent(`Portfolio inquiry for ${profile.shortName} from ${name || "a visitor"}`);
  const body = encodeURIComponent(message);
  window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0a0a1a] text-slate-200">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#0d0d2a] to-[#0a0a1a]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(0,217,255,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(0,217,255,0.4)_1px,transparent_1px)] [background-size:48px_48px]" />
      </div>

      {/* NAV */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[#0a0a1a]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#about" className="text-lg font-black tracking-[0.18em] text-white sm:text-xl">
            {profile.shortName.toUpperCase()}
          </a>
          <nav className="hidden items-center gap-7 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 lg:flex">
            {[
              { href: "#about", label: "About" },
              { href: "#experience", label: "Experience" },
              { href: "#skills", label: "Skills" },
              { href: "#education", label: "Education" },
              { href: "#projects", label: "Projects" },
            ].map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-cyan-300">
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => setResumeOpen(true)}
              className="transition hover:text-cyan-300"
            >
              Resume
            </button>
          </nav>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              {menuOpen ? (
                <>
                  <path d="M6 6l12 12" />
                  <path d="M18 6L6 18" />
                </>
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>
        {menuOpen ? (
          <div className="border-t border-white/5 bg-[#0a0a1a]/95 px-5 py-4 lg:hidden">
            <div className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
              {[
                { href: "#about", label: "About" },
                { href: "#experience", label: "Experience" },
                { href: "#skills", label: "Skills" },
                { href: "#education", label: "Education" },
                { href: "#projects", label: "Projects" },
                { href: "#contact", label: "Contact" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg border border-white/5 bg-white/5 px-4 py-3 transition hover:border-cyan-500/30 hover:text-cyan-300"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </header>

      {/* HERO */}
      <section id="about" className="relative pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-base font-medium text-slate-300 sm:text-lg">
              Hello,
              <br />
            </p>
            <h1 className="mt-2 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              This is <span className="text-pink-400">{profile.name.split(" ")[0]} {profile.name.split(" ")[1]}</span>
              <span className="text-cyan-300">,</span> I&apos;m a
              <br />
              <span className="text-cyan-300">Professional {profile.role.split("•")[1]?.trim() || "Software Engineer"}</span>
              <span className="text-pink-400">.</span>
            </h1>

            <div className="mt-6 flex items-center gap-3">
              <SocialIcon href={profile.linkedin} label="LinkedIn">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M4 4h4v16H4zM6 1.8a2.2 2.2 0 110 4.4 2.2 2.2 0 010-4.4zM10 8h4v2.2c.7-1.2 2-2.4 4.2-2.4 3 0 4.8 1.9 4.8 5.4V20h-4v-6c0-1.7-.6-2.9-2.2-2.9-1.5 0-2.3 1-2.3 2.9V20h-4z" /></svg>
              </SocialIcon>
              <SocialIcon href="https://github.com/" label="GitHub">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.3 6.8 9.6.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.4-3.4-1.4-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 3 .8.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1 .8-.2 1.7-.3 2.5-.3.8 0 1.7.1 2.5.3 1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.8v2.7c0 .3.2.6.7.5 4-1.3 6.8-5.1 6.8-9.6C22 6.6 17.5 2 12 2z" /></svg>
              </SocialIcon>
              <SocialIcon href={`mailto:${profile.email}`} label="Email">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M4 6h16v12H4z" /><path d="M4 6l8 7 8-7" /></svg>
              </SocialIcon>
              <SocialIcon href={`tel:${profile.phone}`} label="Phone">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M5 4h4l2 5-2 1c1 2.5 3 4.5 5.5 5.5l1-2 5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" /></svg>
              </SocialIcon>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-6 py-3 text-sm font-semibold text-cyan-200 transition hover:border-cyan-400 hover:bg-cyan-500/20"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M21 15a4 4 0 01-4 4H7l-4 4V7a4 4 0 014-4h10a4 4 0 014 4z" /></svg>
                Contact Me
                <span className="transition group-hover:translate-x-1">→</span>
              </a>
              <button
                type="button"
                onClick={() => setResumeOpen(true)}
                className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-pink-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-500/30 transition hover:-translate-y-0.5"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M12 3v12" /><path d="M7 10l5 5 5-5" /><path d="M5 21h14" /></svg>
                Get Resume
              </button>
            </div>
          </div>

          <div>
            <CodeWindow title="Coder.js">
              <Kw>const</Kw> <Fn>coder</Fn> <Punc>=</Punc> {"{"}
              {"\n  "}<Prop>name</Prop>: <Str>'{profile.shortName}'</Str>,
              {"\n  "}<Prop>skills</Prop>: [<Str>'Python'</Str>, <Str>'Java'</Str>, <Str>'C++'</Str>, <Str>'React'</Str>, <Str>'ML'</Str>],
              {"\n  "}<Prop>hardWorker</Prop>: <Kw>true</Kw>,
              {"\n  "}<Prop>quickLearner</Prop>: <Kw>true</Kw>,
              {"\n  "}<Prop>problemSolver</Prop>: <Kw>true</Kw>,
              {"\n  "}<Prop>hireable</Prop>: <Kw>function</Kw>() {"{"}
              {"\n    "}<Kw>return</Kw> (
              {"\n      "}<Kw>this</Kw>.hardWorker <Punc>&amp;&amp;</Punc>
              {"\n      "}<Kw>this</Kw>.problemSolver <Punc>&amp;&amp;</Punc>
              {"\n      "}<Kw>this</Kw>.skills.length <Punc>&gt;=</Punc> <Num>5</Num>
              {"\n    "});
              {"\n  }"},
              {"\n"}{"}"};
            </CodeWindow>
          </div>
        </div>

        {/* WHO I AM */}
        <div className="mx-auto mt-24 grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">Who I am?</h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">{summary}</p>
            <p className="mt-3 text-sm text-slate-400">
              Recently completed a Project Internship at <span className="font-semibold text-cyan-300">ISRO-NRSC</span>, contributing to data automation and analytics for remote sensing satellite operations. Strong in data structures, backend systems, and applied machine learning.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="grid w-full max-w-md grid-cols-2 gap-3">
              {[
                { label: "ISRO-NRSC", value: "Intern" },
                { label: "PDFs processed", value: "50,000+" },
                { label: "Accuracy", value: "~96%" },
                { label: "Report time", value: "< 2 min" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-white/10 bg-white/[0.04] p-4"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">{stat.label}</p>
                  <p className="mt-2 text-2xl font-black text-white">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionLabel>Experiences</SectionLabel>

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1fr_1.3fr]">
            <div className="order-2 lg:order-1">
              <IsometricWorkstation />
            </div>

            <div className="order-1 space-y-5 lg:order-2">
              {experience.map((role) => (
                <div
                  key={`${role.period}-${role.role}`}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-cyan-500/30 hover:bg-white/[0.05]"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">{role.period}</p>
                    {role.status ? (
                      <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-300">
                        {role.status}
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mt-2 text-lg font-bold text-white">{role.role}</h3>
                  <p className="mt-1 text-sm font-medium text-pink-300">{role.company}</p>
                  <p className="mt-3 text-sm font-semibold text-amber-300">
                    Project: Automated Error and Performance Analysis of Remote Sensing Satellite Data Chain
                  </p>
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-6 text-slate-300">
                    {role.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">Languages</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {languages.map((language) => (
                    <span
                      key={language}
                      className="rounded-full border border-pink-500/30 bg-pink-500/10 px-3 py-1 text-xs font-semibold text-pink-200"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionLabel>Skills</SectionLabel>

          <div className="mt-8 flex justify-center">
            <div className="w-full max-w-md">
              <IsometricSkills />
            </div>
          </div>

          <div className="mt-8">
            <SkillTicker />
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((group) => (
              <div key={group.title} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">{group.title}</p>
                <p className="mt-2 text-sm text-slate-300">{group.items.join(" · ")}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionLabel>Educations</SectionLabel>

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1fr_1.3fr]">
            <div>
              <IsometricEducation />
            </div>

            <div className="space-y-5">
              {education.map((item) => (
                <div
                  key={item.role}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-cyan-500/30 hover:bg-white/[0.05]"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">{item.period}</p>
                  <h3 className="mt-2 text-lg font-bold text-white">{item.role}</h3>
                  <p className="mt-1 text-sm font-medium text-pink-300">{item.company}</p>
                  <p className="mt-3 text-sm font-semibold text-amber-300">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <h3 className="text-center text-xs font-bold uppercase tracking-[0.3em] text-cyan-300">Certificates</h3>
            <ul className="mx-auto mt-6 grid max-w-3xl gap-3 sm:grid-cols-3">
              {certificates.map((cert) => (
                <li key={cert} className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center text-sm text-slate-300">
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionLabel>Projects</SectionLabel>

          <div className="mt-10 space-y-6">
            {projects.map((project) => (
              <CodeWindow key={project.title} title="project.js">
                <Kw>const</Kw> <Fn>project</Fn> <Punc>=</Punc> {"{"}
                {"\n  "}<Prop>name</Prop>: <Str>'{project.title}'</Str>,
                {"\n  "}<Prop>tools</Prop>: [{project.stack.split(", ").map((tech, idx) => (
                  <span key={tech}>
                    <Str>'{tech}'</Str>{idx < project.stack.split(", ").length - 1 ? <Punc>,</Punc> : null}
                    {idx < project.stack.split(", ").length - 1 ? " " : ""}
                  </span>
                ))}],
                {"\n  "}<Prop>myRole</Prop>: <Str>'{project.role}'</Str>,
                {"\n  "}<Prop>description</Prop>: <Str>'{project.summary}'</Str>,
                {"\n  "}<Prop>period</Prop>: <Str>'{project.period}'</Str>,
                {"\n  "}<Prop>links</Prop>: {"{"}
                {"\n    "}<Prop>demo</Prop>: <Str>'#'</Str>,
                {"\n    "}<Prop>code</Prop>: <Str>'#'</Str>,
                {"\n  }"},
                {"\n"}{"}"};
              </CodeWindow>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionLabel>Contact With Me</SectionLabel>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <form onSubmit={handleContactSubmit} className="space-y-5">
              <p className="text-sm text-slate-300">
                If you have any questions or concerns, feel free to reach out to me. I am open to any work opportunities.
              </p>
              <div>
                <label htmlFor="name" className="text-sm font-semibold text-slate-300">Your Name</label>
                <input
                  id="name"
                  name="name"
                  required
                  className="mt-2 w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-semibold text-slate-300">Your Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-2 w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="message" className="text-sm font-semibold text-slate-300">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="mt-2 w-full resize-none rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20"
                  placeholder="Hi Shilpa, I would like to connect about..."
                />
              </div>
              <button
                type="submit"
                className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-pink-500 to-fuchsia-500 px-7 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-pink-500/30 transition hover:-translate-y-0.5"
              >
                Send Message
                <span className="transition group-hover:translate-x-1">→</span>
              </button>
            </form>

            <div className="space-y-5 text-sm">
              <a href={`mailto:${profile.email}`} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-4 transition hover:border-cyan-500/30">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M4 6h16v12H4z" /><path d="M4 6l8 7 8-7" /></svg>
                </span>
                <span className="font-medium text-white">{profile.email}</span>
              </a>
              <a href={`tel:${profile.phone}`} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-4 transition hover:border-cyan-500/30">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M5 4h4l2 5-2 1c1 2.5 3 4.5 5.5 5.5l1-2 5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" /></svg>
                </span>
                <span className="font-medium text-white">+91 {profile.phone}</span>
              </a>
              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M12 22s7-7 7-12a7 7 0 10-14 0c0 5 7 12 7 12z" /><circle cx="12" cy="10" r="2.5" /></svg>
                </span>
                <span className="font-medium text-white">{profile.location}</span>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-300 font-bold text-[10px]">EN</span>
                <span className="font-medium text-white">{languages.join(" · ")}</span>
              </div>

              <div className="flex items-center gap-3 pt-2">
                {[
                  { href: profile.linkedin, label: "LinkedIn", path: "M4 4h4v16H4zM6 1.8a2.2 2.2 0 110 4.4 2.2 2.2 0 010-4.4zM10 8h4v2.2c.7-1.2 2-2.4 4.2-2.4 3 0 4.8 1.9 4.8 5.4V20h-4v-6c0-1.7-.6-2.9-2.2-2.9-1.5 0-2.3 1-2.3 2.9V20h-4z" },
                  { href: "https://github.com/", label: "GitHub", path: "M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.3 6.8 9.6.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.4-3.4-1.4-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 3 .8.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1 .8-.2 1.7-.3 2.5-.3.8 0 1.7.1 2.5.3 1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.8v2.7c0 .3.2.6.7.5 4-1.3 6.8-5.1 6.8-9.6C22 6.6 17.5 2 12 2z" },
                ].map((icon) => (
                  <a
                    key={icon.label}
                    href={icon.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={icon.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 transition hover:border-cyan-500/40 hover:text-cyan-300"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d={icon.path} /></svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ResumePage open={resumeOpen} onClose={() => setResumeOpen(false)} />

      <footer className="border-t border-white/5 px-5 py-8 text-center sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-xs text-slate-400 sm:flex-row">
          <p>© Developer Portfolio by <span className="font-bold text-cyan-300">{profile.shortName}</span></p>
          <div className="flex items-center gap-3">
            <a href="https://github.com/" target="_blank" rel="noreferrer" className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-1.5 font-semibold text-slate-300 transition hover:border-cyan-500/40 hover:text-cyan-300">★ STAR</a>
            <span className="text-slate-600">|</span>
            <a href="https://github.com/" target="_blank" rel="noreferrer" className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-1.5 font-semibold text-slate-300 transition hover:border-pink-500/40 hover:text-pink-300">⑂ FORK</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
