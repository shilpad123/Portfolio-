import jsPDF from "jspdf";
import {
  profile,
  summary,
  experience,
  projects,
  education,
  skills,
  certificates,
  languages as resumeLanguages,
  photoUrl,
} from "../data/resume";

const PAGE_MARGIN = 12;
const GUTTER = 8;
const LEFT_WIDTH = 88;

async function loadImageAsDataUrl(url: string): Promise<string | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    const blob = await response.blob();
    return await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

function detectImageFormat(dataUrl: string): "JPEG" | "PNG" {
  return dataUrl.startsWith("data:image/png") ? "PNG" : "JPEG";
}

function drawSectionHeader(doc: jsPDF, label: string, x: number, y: number, width: number) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text(label, x, y);

  // Blue accent line under header
  doc.setDrawColor(29, 78, 216);
  doc.setLineWidth(0.7);
  doc.line(x, y + 1.6, x + width, y + 1.6);

  doc.setTextColor(30, 41, 59);
  return y + 6.5;
}

function writeLines(
  doc: jsPDF,
  lines: { text: string; bold?: boolean; size?: number; gap?: number }[],
  x: number,
  startY: number,
  width: number,
): number {
  let y = startY;
  for (const line of lines) {
    doc.setFont("helvetica", line.bold ? "bold" : "normal");
    doc.setFontSize(line.size ?? 10);
    doc.setTextColor(line.bold ? 15 : 30, line.bold ? 23 : 41, line.bold ? 42 : 59);
    const wrapped = doc.splitTextToSize(line.text, width) as string[];
    for (const segment of wrapped) {
      if (y > 285) {
        doc.addPage();
        y = PAGE_MARGIN + 4;
      }
      doc.text(segment, x, y);
      y += (line.size ?? 10) * 0.45;
    }
    y += (line.gap ?? 1.4);
  }
  return y;
}

export async function generateResumePdf(): Promise<jsPDF> {
  const doc = new jsPDF({ unit: "mm", format: "a4" });

  const pageWidth = doc.internal.pageSize.getWidth();
  const rightX = PAGE_MARGIN + LEFT_WIDTH + GUTTER;
  const rightWidth = pageWidth - PAGE_MARGIN - rightX;

  // Load profile photo
  const photoData = await loadImageAsDataUrl(photoUrl);

  // ──────────── LEFT COLUMN ────────────
  let leftY = PAGE_MARGIN + 6;

  // Name
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(15, 23, 42);
  const nameLines = doc.splitTextToSize(profile.name, LEFT_WIDTH) as string[];
  for (const segment of nameLines) {
    doc.text(segment, PAGE_MARGIN, leftY);
    leftY += 8.5;
  }

  // Photo
  if (photoData) {
    try {
      doc.addImage(photoData, detectImageFormat(photoData), PAGE_MARGIN, leftY, 28, 28);
    } catch {
      /* ignore image errors */
    }
    leftY += 32;
  } else {
    leftY += 4;
  }

  // Contact
  leftY = drawSectionHeader(doc, "Contact", PAGE_MARGIN, leftY, LEFT_WIDTH);
  leftY = writeLines(
    doc,
    [
      { text: profile.email, gap: 1.2 },
      { text: profile.phone, gap: 1.2 },
      { text: profile.location, gap: 1.2 },
      { text: profile.linkedin.replace(/^https?:\/\//, ""), gap: 2 },
    ],
    PAGE_MARGIN,
    leftY,
    LEFT_WIDTH,
  );

  // Summary
  leftY = drawSectionHeader(doc, "Summary", PAGE_MARGIN, leftY, LEFT_WIDTH);
  leftY = writeLines(
    doc,
    [{ text: summary, gap: 6 }],
    PAGE_MARGIN,
    leftY,
    LEFT_WIDTH,
  );

  // Experience
  leftY = drawSectionHeader(doc, "Experience", PAGE_MARGIN, leftY, LEFT_WIDTH);
  leftY = writeLines(
    doc,
    [
      { text: "Indian Space Research Organisation (ISRO) – National Remote Sensing Centre (NRSC), Hyderabad, India", bold: true, size: 10, gap: 1 },
      { text: "Project Intern – Safety, Reliability and Quality Assurance (SRQA)", gap: 1 },
      { text: "08/2025 – 05/2026", size: 9.5, gap: 2 },
      { text: "Project: Automated Error and Performance Analysis of Remote Sensing Satellite Data Chain", bold: true, size: 9.5, gap: 2 },
      ...experience[0].bullets.map((bullet) => ({ text: `• ${bullet}`, size: 9.5, gap: 1.2 })),
    ],
    PAGE_MARGIN,
    leftY,
    LEFT_WIDTH,
  );

  // ──────────── RIGHT COLUMN ────────────
  let rightY = PAGE_MARGIN + 6;

  // Education
  rightY = drawSectionHeader(doc, "Education", rightX, rightY, rightWidth);
  rightY = writeLines(
    doc,
    education.flatMap((item) => [
      { text: item.role, bold: true, size: 10, gap: 0.8 },
      { text: `${item.company}`, size: 9.5, gap: 0.6 },
      { text: `${item.period}  |  ${item.detail}`, size: 9.5, gap: 3 },
    ]),
    rightX,
    rightY,
    rightWidth,
  );

  // Projects
  rightY = drawSectionHeader(doc, "Projects", rightX, rightY, rightWidth);
  rightY = writeLines(
    doc,
    projects.flatMap((project) => [
      { text: project.title, bold: true, size: 10, gap: 0.6 },
      { text: `${project.period}`, size: 9.5, gap: 1 },
      ...project.impact.map((point) => ({ text: `• ${point}`, size: 9.5, gap: 1 })),
      { text: " ", size: 8, gap: 1.5 },
    ]),
    rightX,
    rightY,
    rightWidth,
  );

  // Skills
  rightY = drawSectionHeader(doc, "Skills", rightX, rightY, rightWidth);
  rightY = writeLines(
    doc,
    skills.map((skill) => ({
      text: `• ${skill.title}: ${skill.items.join(", ")}`,
      size: 9.5,
      gap: 1.4,
    })),
    rightX,
    rightY,
    rightWidth,
  );

  // Certificates
  rightY = drawSectionHeader(doc, "Certificates", rightX, rightY, rightWidth);
  rightY = writeLines(
    doc,
    certificates.map((cert) => ({ text: `• ${cert}`, size: 9.5, gap: 1.4 })),
    rightX,
    rightY,
    rightWidth,
  );

  // Languages (kept on the right column under Certificates)
  rightY = drawSectionHeader(doc, "Languages", rightX, rightY, rightWidth);
  rightY = writeLines(
    doc,
    resumeLanguages.map((language) => ({ text: `• ${language}`, size: 9.5, gap: 1.2 })),
    rightX,
    rightY,
    rightWidth,
  );

  return doc;
}

export async function downloadResumePdf() {
  const doc = await generateResumePdf();
  const fileName = `${profile.shortName.replace(/\s+/g, "-")}-Resume.pdf`;
  doc.save(fileName);
}
