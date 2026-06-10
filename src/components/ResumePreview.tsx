import { useEffect, useState } from "react";
import {
  profile,
  summary,
  experience,
  projects,
  education,
  skills,
  certificates,
  languages,
  photoUrl,
} from "../data/resume";
import { downloadResumePdf } from "../utils/generateResume";

function printResumePage() {
  window.print();
}

export default function ResumePreview() {
  const [photoOk, setPhotoOk] = useState(true);
  const [isLightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (!isLightboxOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isLightboxOpen]);

  return (
    <section id="resume" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-300">Resume</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] text-white sm:text-6xl">
              My full resume, on the page.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              The same resume, laid out as a clean printable page. Download the PDF, open it large, or print it directly from your browser.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <button
            type="button"
            onClick={downloadResumePdf}
            className="group flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-400 to-fuchsia-500 px-5 py-3.5 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/30 transition hover:-translate-y-0.5"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              <path d="M12 3v12" />
              <path d="M7 10l5 5 5-5" />
              <path d="M5 21h14" />
            </svg>
            Download Resume (PDF)
          </button>
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3.5 text-sm font-semibold text-white transition hover:border-sky-400"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              <circle cx="11" cy="11" r="6" />
              <path d="M21 21l-4.3-4.3" />
              <path d="M11 8v6" />
              <path d="M8 11h6" />
            </svg>
            Open large view
          </button>
          <button
            type="button"
            onClick={printResumePage}
            className="flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3.5 text-sm font-semibold text-white transition hover:border-sky-400"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              <path d="M6 9V3h12v6" />
              <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
              <path d="M6 14h12v7H6z" />
            </svg>
            Print this page
          </button>
        </div>

        <article
          id="resume-paper"
          className="resume-paper mt-12 mx-auto grid w-full max-w-5xl gap-8 rounded-3xl border border-white/10 bg-white p-8 text-slate-900 shadow-2xl sm:p-10 lg:grid-cols-[0.95fr_1.05fr]"
        >
          {/* LEFT COLUMN */}
          <div>
            <h1 className="text-2xl font-black leading-tight tracking-tight sm:text-3xl">
              {profile.name}
            </h1>

            <div className="mt-5 flex items-center gap-4">
              {photoOk ? (
                <img
                  src={photoUrl}
                  alt={profile.name}
                  onError={() => setPhotoOk(false)}
                  className="h-24 w-24 rounded-full object-cover ring-2 ring-slate-200"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-100 text-2xl font-black text-slate-700 ring-2 ring-slate-200">
                  SD
                </div>
              )}
            </div>

            <ul className="mt-6 space-y-1.5 text-sm text-slate-700">
              <li className="flex items-center gap-2">
                <span className="w-4 text-slate-500">✉</span>
                <a className="hover:underline" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 text-slate-500">📞</span>
                <a className="hover:underline" href={`tel:${profile.phone}`}>
                  {profile.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 text-slate-500">📍</span>
                {profile.location}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 text-slate-500">in</span>
                <a className="hover:underline" href={profile.linkedin} target="_blank" rel="noreferrer">
                  {profile.linkedin.replace(/^https?:\/\//, "")}
                </a>
              </li>
            </ul>

            <section className="mt-7">
              <h2 className="border-b-2 border-slate-900 pb-1 text-sm font-black uppercase tracking-[0.18em] text-slate-900">
                Summary
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-700">{summary}</p>
            </section>

            <section className="mt-7">
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
                <p className="text-slate-500">08/2025 – 05/2026  |  <span className="font-semibold text-emerald-700">Completed</span></p>
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

            <section className="mt-7">
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
            <section>
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

            <section className="mt-7">
              <h2 className="border-b-2 border-slate-900 pb-1 text-sm font-black uppercase tracking-[0.18em] text-slate-900">
                Projects
              </h2>
              <div className="mt-3 space-y-5 text-sm text-slate-700">
                {projects.map((project) => (
                  <div key={project.title}>
                    <p>
                      <strong>{project.title}</strong>
                    </p>
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

            <section className="mt-7">
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

            <section className="mt-7">
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
        </article>
      </div>

      {isLightboxOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Resume large view"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-10"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            aria-label="Close large view"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:border-sky-400"
            onClick={() => setLightboxOpen(false)}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              <path d="M6 6l12 12" />
              <path d="M18 6L6 18" />
            </svg>
          </button>
          <div
            className="resume-paper max-h-full max-w-3xl overflow-auto rounded-2xl bg-white p-8 text-slate-900 shadow-2xl sm:p-10"
            onClick={(event) => event.stopPropagation()}
          >
            <h1 className="text-2xl font-black leading-tight tracking-tight sm:text-3xl">
              {profile.name}
            </h1>
            <div className="mt-5 space-y-1.5 text-sm text-slate-700">
              <p>✉ {profile.email}</p>
              <p>📞 {profile.phone}</p>
              <p>📍 {profile.location}</p>
              <p>in {profile.linkedin.replace(/^https?:\/\//, "")}</p>
            </div>
            <h2 className="mt-6 border-b-2 border-slate-900 pb-1 text-sm font-black uppercase tracking-[0.18em]">
              Summary
            </h2>
            <p className="mt-2 text-sm leading-7">{summary}</p>
            <h2 className="mt-6 border-b-2 border-slate-900 pb-1 text-sm font-black uppercase tracking-[0.18em]">
              Experience
            </h2>
            <p className="mt-2 text-sm font-bold">
              Indian Space Research Organisation (ISRO) – National Remote Sensing Centre (NRSC), Hyderabad, India
            </p>
            <p className="text-sm">Project Intern – Safety, Reliability and Quality Assurance (SRQA)</p>
            <p className="text-sm text-slate-500">08/2025 – 05/2026  |  <span className="font-semibold text-emerald-700">Completed</span></p>
            <p className="mt-2 text-sm font-bold">
              Project: Automated Error and Performance Analysis of Remote Sensing Satellite Data Chain
            </p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm">
              {experience[0].bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            <h2 className="mt-6 border-b-2 border-slate-900 pb-1 text-sm font-black uppercase tracking-[0.18em]">
              Education
            </h2>
            <div className="mt-2 space-y-3 text-sm">
              {education.map((item) => (
                <p key={item.role}>
                  <strong>{item.role}</strong> — {item.company} ({item.period}) | {item.detail}
                </p>
              ))}
            </div>
            <h2 className="mt-6 border-b-2 border-slate-900 pb-1 text-sm font-black uppercase tracking-[0.18em]">
              Projects
            </h2>
            <div className="mt-2 space-y-3 text-sm">
              {projects.map((project) => (
                <div key={project.title}>
                  <p>
                    <strong>{project.title}</strong> ({project.period})
                  </p>
                  <ul className="list-disc space-y-1.5 pl-5 pt-1">
                    {project.impact.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <h2 className="mt-6 border-b-2 border-slate-900 pb-1 text-sm font-black uppercase tracking-[0.18em]">
              Skills
            </h2>
            <ul className="mt-2 space-y-1 text-sm">
              {skills.map((skill) => (
                <li key={skill.title}>
                  <strong>{skill.title}:</strong> {skill.items.join(", ")}
                </li>
              ))}
            </ul>
            <h2 className="mt-6 border-b-2 border-slate-900 pb-1 text-sm font-black uppercase tracking-[0.18em]">
              Certificates
            </h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm">
              {certificates.map((cert) => (
                <li key={cert}>{cert}</li>
              ))}
            </ul>
            <h2 className="mt-6 border-b-2 border-slate-900 pb-1 text-sm font-black uppercase tracking-[0.18em]">
              Languages
            </h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm">
              {languages.map((language) => (
                <li key={language}>{language}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </section>
  );
}
