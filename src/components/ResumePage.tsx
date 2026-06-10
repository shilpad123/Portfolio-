import { useEffect } from "react";
import {
  profile,
  summary,
  experience,
  projects,
  education,
  skills,
  certificates,
  languages,
} from "../data/resume";
import { downloadResumePdf } from "../utils/generateResume";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ResumePage({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Full resume"
      className="fixed inset-0 z-50 overflow-y-auto"
      style={{
        background:
          "radial-gradient(circle at 50% 0%, rgba(0,217,255,0.18), transparent 55%), rgba(2,4,12,0.92)",
      }}
      onClick={onClose}
    >
      {/* Top action bar - fixed at top of viewport, always visible */}
      <div className="sticky top-0 z-30 mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#0a0a1a]/90 px-4 py-3 text-xs text-slate-300 backdrop-blur-xl sm:px-6">
        <div className="flex items-center gap-3">
          <span className="rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 font-semibold uppercase tracking-[0.24em] text-cyan-200">
            Resume preview
          </span>
          <span className="hidden text-[10px] uppercase tracking-[0.2em] text-slate-500 sm:inline">Scroll to view full resume</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              window.print();
            }}
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-200"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              <path d="M6 9V3h12v6" />
              <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
              <path d="M6 14h12v7H6z" />
            </svg>
            Print
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              void downloadResumePdf();
            }}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-pink-500 to-fuchsia-500 px-3 py-2 text-xs font-semibold text-white shadow-lg shadow-pink-500/30 transition hover:-translate-y-0.5"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              <path d="M12 3v12" />
              <path d="M7 10l5 5 5-5" />
              <path d="M5 21h14" />
            </svg>
            Download PDF
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close resume"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white transition hover:border-pink-500 hover:text-pink-300"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              <path d="M6 6l12 12" />
              <path d="M18 6L6 18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Resume card - reduced padding, full width, no fixed max-height so it can grow */}
      <div
        className="mx-auto my-4 w-full max-w-5xl px-3 sm:my-8 sm:px-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className="resume-3d relative overflow-hidden rounded-2xl border border-white/10 bg-white text-slate-900 shadow-2xl"
          style={{
            boxShadow:
              "0 30px 60px -20px rgba(0,217,255,0.35), 0 50px 100px -30px rgba(236,72,153,0.35), 0 1px 0 rgba(255,255,255,0.4) inset",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Top accent strip */}
          <div className="h-1.5 w-full bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500" />

          {/* Header */}
          <header className="border-b border-slate-200 bg-gradient-to-br from-slate-50 to-white px-6 py-6 sm:px-10 sm:py-8">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-700">Resume</p>
            <h1 className="mt-2 text-2xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl">
              {profile.name}
            </h1>
            <p className="mt-1 text-sm font-semibold text-slate-600">{profile.role}</p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-slate-600">
              <span>✉ {profile.email}</span>
              <span>📞 {profile.phone}</span>
              <span>📍 {profile.location}</span>
              <span>in {profile.linkedin.replace(/^https?:\/\//, "")}</span>
            </div>
          </header>

          {/* Body */}
          <div className="grid gap-6 p-5 sm:gap-8 sm:p-10 lg:grid-cols-[0.95fr_1.05fr]">
            {/* LEFT COLUMN */}
            <div>
              <section className="resume-3d-section">
                <h2 className="border-b-2 border-slate-900 pb-1 text-sm font-black uppercase tracking-[0.18em] text-slate-900">
                  Summary
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-700">{summary}</p>
              </section>

              <section className="resume-3d-section mt-6">
                <h2 className="border-b-2 border-slate-900 pb-1 text-sm font-black uppercase tracking-[0.18em] text-slate-900">
                  Experience
                </h2>
                <div className="mt-3 space-y-2 text-sm text-slate-700">
                  <p>
                    <strong>Indian Space Research Organisation (ISRO) –</strong>
                    <br />
                    <strong>National Remote Sensing Centre (NRSC),</strong>
                    <br />
                    <strong>Hyderabad, India</strong>
                  </p>
                  <p>Project Intern – Safety, Reliability and Quality Assurance (SRQA)</p>
                  <p className="text-slate-500">
                    08/2025 – 05/2026  |  <span className="font-semibold text-emerald-700">Completed</span>
                  </p>
                  <p className="pt-2">
                    <strong>Project: Automated Error and Performance Analysis of Remote Sensing Satellite Data Chain</strong>
                  </p>
                  <ul className="list-disc space-y-1.5 pl-5">
                    {experience[0].bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </section>

              <section className="resume-3d-section mt-6">
                <h2 className="border-b-2 border-slate-900 pb-1 text-sm font-black uppercase tracking-[0.18em] text-slate-900">
                  Languages
                </h2>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
                  {languages.map((language) => (
                    <li key={language}>{language}</li>
                  ))}
                </ul>
              </section>
            </div>

            {/* RIGHT COLUMN */}
            <div>
              <section className="resume-3d-section">
                <h2 className="border-b-2 border-slate-900 pb-1 text-sm font-black uppercase tracking-[0.18em] text-slate-900">
                  Education
                </h2>
                <div className="mt-3 space-y-4 text-sm text-slate-700">
                  {education.map((item) => (
                    <div key={item.role}>
                      <p>
                        <strong>{item.role}</strong>
                        <br />
                        {item.company}
                        <br />
                        {item.period} | {item.detail.startsWith("CGPA") ? "Belagavi, India" : "Dharwad, India"}
                      </p>
                      <p className="pt-1">
                        <strong>{item.detail.startsWith("CGPA") ? "CGPA" : "Percentage"}:</strong>{" "}
                        {item.detail.split(":")[1]?.trim()}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="resume-3d-section mt-6">
                <h2 className="border-b-2 border-slate-900 pb-1 text-sm font-black uppercase tracking-[0.18em] text-slate-900">
                  Projects
                </h2>
                <div className="mt-3 space-y-5 text-sm text-slate-700">
                  {projects.map((project) => (
                    <div key={project.title}>
                      <p><strong>{project.title}</strong></p>
                      <p className="text-slate-500">{project.period}</p>
                      <ul className="list-disc space-y-1.5 pl-5 pt-2">
                        {project.impact.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              <section className="resume-3d-section mt-6">
                <h2 className="border-b-2 border-slate-900 pb-1 text-sm font-black uppercase tracking-[0.18em] text-slate-900">
                  Skills
                </h2>
                <ul className="mt-3 space-y-1.5 text-sm text-slate-700">
                  {skills.map((skill) => (
                    <li key={skill.title}>
                      <strong>{skill.title}:</strong> {skill.items.join(", ")}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="resume-3d-section mt-6">
                <h2 className="border-b-2 border-slate-900 pb-1 text-sm font-black uppercase tracking-[0.18em] text-slate-900">
                  Certificates
                </h2>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-slate-700">
                  {certificates.map((cert) => (
                    <li key={cert}>{cert}</li>
                  ))}
                </ul>
              </section>
            </div>
          </div>

          {/* Footer with comfortable bottom padding so last section isn't cut off */}
          <footer className="border-t border-slate-200 bg-slate-50 px-6 py-4 text-center text-xs text-slate-500 sm:px-10">
            End of resume · {profile.shortName} · {new Date().getFullYear()}
          </footer>
        </div>
      </div>
    </div>
  );
}
