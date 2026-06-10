import { useState } from "react";
import type { Project } from "../data/resume";

type SectionProps = {
  projects: Project[];
};

export default function ProjectsSection({ projects }: SectionProps) {
  const [active, setActive] = useState(0);
  const total = projects.length;
  const project = projects[active];

  return (
    <div className="mt-12">
      <div className="grid gap-4 md:grid-cols-3">
        {projects.map((item, index) => {
          const isActive = index === active;
          return (
            <button
              key={item.title}
              type="button"
              onClick={() => setActive(index)}
              className={`group flex flex-col rounded-2xl border p-5 text-left transition ${
                isActive
                  ? "border-sky-400/60 bg-sky-400/10"
                  : "border-white/10 bg-white/5 hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                  0{index + 1}
                </span>
                <span className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-sky-400" : "bg-white/20"}`} />
              </div>
              <span className="mt-3 text-base font-semibold leading-snug text-white">{item.title}</span>
              <span className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-400">{item.type}</span>
              <span className="mt-1 text-xs text-slate-500">{item.period}</span>
            </button>
          );
        })}
      </div>

      <article className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="lg:max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-300">
              {project.type} · {project.role}
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
              {project.title}
            </h3>
            <p className="mt-3 text-base leading-7 text-slate-300">{project.summary}</p>
          </div>
          <div className="text-sm leading-6 text-slate-400 sm:text-right">
            <p className="font-semibold text-white">{project.period}</p>
            <p>{project.role}</p>
          </div>
        </div>

        <ul className="mt-8 grid gap-3 text-base text-slate-200 sm:grid-cols-2">
          {project.impact.map((point) => (
            <li key={point} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-sky-400 to-fuchsia-400" />
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-white/10 pt-6">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Stack</span>
          {project.stack.split(", ").map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
            {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} · {project.type}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActive((value) => (value - 1 + total) % total)}
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:border-sky-400"
            >
              ← Previous
            </button>
            <button
              type="button"
              onClick={() => setActive((value) => (value + 1) % total)}
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:border-sky-400"
            >
              Next →
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
