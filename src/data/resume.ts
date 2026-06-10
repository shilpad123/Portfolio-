export const photoUrl = "/images/profile.jpg";

export const profile = {
  name: "Shilpa Nagappa Demannavar",
  shortName: "Shilpa Demannavar",
  initials: "SD",
  role: "Computer Science & Business Systems • Aspiring Software Engineer",
  location: "Dharwad, Karnataka, India",
  email: "shilpademannavar4@gmail.com",
  phone: "7619602902",
  linkedin: "https://www.linkedin.com/in/shilpa-demannavar",
  headline: "ISRO-NRSC intern building data pipelines, deep learning, and automation that turn raw signals into reliable insight.",
};

export const summary =
  "B.Tech Computer Science and Business Systems student with strong problem-solving, analytical, and technical skills. Experienced in Python, automation, data analysis, and web development through internship experience at ISRO-NRSC. Passionate about developing real-world software solutions and eager to contribute to a growth-oriented organization while continuously learning new technologies.";

export type Highlight = { label: string; value: string; accent: string };
export type Experience = {
  period: string;
  status?: string;
  role: string;
  company: string;
  bullets: string[];
  metrics: { label: string; value: string }[];
};
export type Project = {
  title: string;
  period: string;
  type: string;
  role: string;
  summary: string;
  impact: string[];
  stack: string;
  accent: string;
};
export type Education = {
  period: string;
  role: string;
  company: string;
  detail: string;
};
export type SkillBand = { title: string; color: string; items: string[] };

export const highlights: Highlight[] = [
  { label: "ISRO-NRSC", value: "Project Intern", accent: "from-sky-400 to-cyan-300" },
  { label: "PDFs processed", value: "50,000+", accent: "from-fuchsia-400 to-pink-300" },
  { label: "Extraction accuracy", value: "~96%", accent: "from-emerald-400 to-teal-300" },
  { label: "Report time", value: "< 2 min", accent: "from-amber-400 to-orange-300" },
];

export const experience: Experience[] = [
  {
    period: "08/2025 – 05/2026",
    status: "Completed",
    role: "Project Intern – Safety, Reliability and Quality Assurance (SRQA)",
    company: "Indian Space Research Organisation (ISRO) – National Remote Sensing Centre (NRSC), Hyderabad, India",
    bullets: [
      "Developed an automated Python-based system for extracting satellite pass data from PDF reports and generating Excel outputs automatically.",
      "Built a web-based application using Python and Flask for satellite pass data analysis and operational report generation.",
      "Automated extraction and processing of satellite operational data using PDFPlumber and Regular Expressions.",
      "Implemented data validation, threshold-based error analysis, and communication chain performance monitoring.",
      "Generated automated Excel and Word reports with charts and visualizations using OpenPyXL, Matplotlib, and Plotly.",
      "Supported automation of satellite data processing workflows to reduce manual effort and improve operational efficiency.",
      "Deployed the application on a Waitress WSGI server for multi-user browser-based access.",
      "Processed and analyzed 50,000+ satellite operational PDF reports with ~96% extraction accuracy and reduced processing time to under 2 minutes.",
    ],
    metrics: [
      { label: "PDFs", value: "50,000+" },
      { label: "Accuracy", value: "~96%" },
      { label: "Time", value: "< 2 min" },
      { label: "Stack", value: "Python · Flask" },
    ],
  },
];

export const projects = [
  {
    title: "Automated Error & Performance Analysis of Remote Sensing Satellite Data Chain",
    period: "08/2025 – 05/2026",
    type: "ISRO-NRSC Project",
    role: "Project Intern, SRQA",
    summary:
      "End-to-end automation that extracts satellite pass data from PDFs, validates it, and produces Excel and Word reports for operations teams.",
    impact: [
      "Processed 50,000+ satellite operational PDFs with ~96% extraction accuracy.",
      "Cut report processing time to under 2 minutes per pass.",
      "Automated data extraction using PDFPlumber and regular expressions.",
      "Threshold-based error analysis and communication chain monitoring.",
      "Generated charts and reports with OpenPyXL, Matplotlib, and Plotly.",
      "Deployed on Waitress WSGI for multi-user browser access.",
    ],
    stack: "Python, Flask, PDFPlumber, OpenPyXL, Matplotlib, Plotly, Waitress",
    accent: "from-sky-400 to-cyan-300",
  },
  {
    title: "Image Enhancement Using Deep Learning",
    period: "02/2025 – 05/2025",
    type: "Deep Learning Research",
    role: "Developer",
    summary:
      "CNN-based learning model that enhances image quality by reducing noise and improving resolution.",
    impact: [
      "Improved image clarity and visual performance.",
      "Trained and evaluated with TensorFlow/PyTorch and OpenCV.",
    ],
    stack: "Python, TensorFlow, PyTorch, OpenCV, CNNs",
    accent: "from-fuchsia-400 to-pink-300",
  },
  {
    title: "Hand-Written Digit Recognition",
    period: "07/2024 – 10/2024",
    type: "Machine Learning Project",
    role: "Developer",
    summary:
      "System that automatically recognizes handwritten digits from images, with applications in banking, education, and postal automation.",
    impact: [
      "Built with TensorFlow, NumPy, Keras, and Pandas.",
      "Trained CNNs for accurate recognition on digit datasets.",
      "Mapped outcomes to real-world workflows: bank check processing, education, mail sorting.",
    ],
    stack: "Python, TensorFlow, NumPy, Keras, Pandas, CNNs",
    accent: "from-emerald-400 to-teal-300",
  },
];

export const education: Education[] = [
  {
    period: "12/2022 – 05/2026",
    role: "B.Tech, Computer Science and Business Systems (CSBS)",
    company: "Visvesvaraya Technological University Belagavi, Karnataka",
    detail: "CGPA 8.62",
  },
  {
    period: "08/2020 – 05/2022",
    role: "Pre-University Course (PUC) – Science",
    company: "ICS MAHESH IND PU College, Dharwad",
    detail: "78.16%",
  },
  {
    period: "06/2019 – 08/2020",
    role: "Secondary School Leaving Certificate (SSLC / 10th)",
    company: "K.N.K Girls High School Fort, Dharwad",
    detail: "81.76%",
  },
];

export const skills: { title: string; items: string[] }[] = [
  {
    title: "Programming Languages",
    items: ["Python", "Java", "C++"],
  },
  {
    title: "Web Technologies",
    items: ["HTML+CSS", "Node.js", "React.js"],
  },
  {
    title: "Libraries & Frameworks",
    items: ["NumPy", "Matplotlib", "Scikit-learn", "PDFPlumber", "TensorFlow", "PyTorch", "Keras", "Pandas", "OpenCV", "OpenPyXL", "Plotly", "Flask"],
  },
  {
    title: "Database & Tools",
    items: ["MySQL", "Git", "GitHub"],
  },
  {
    title: "Domains",
    items: ["Machine Learning", "Artificial Intelligence", "Data Analytics", "Error Detection Systems", "Remote Sensing Automation"],
  },
];

export const languages: string[] = ["English", "Kannada", "Hindi"];

export const skillBands: SkillBand[] = [
  {
    title: "Languages",
    color: "from-sky-400 to-cyan-300",
    items: ["Python", "Java", "C++"],
  },
  {
    title: "Web & APIs",
    color: "from-fuchsia-400 to-pink-300",
    items: ["HTML", "CSS", "Node.js", "React.js", "Flask"],
  },
  {
    title: "ML & Data",
    color: "from-emerald-400 to-teal-300",
    items: ["NumPy", "Pandas", "Matplotlib", "Scikit-learn", "TensorFlow", "PyTorch", "Keras"],
  },
  {
    title: "Vision & Docs",
    color: "from-amber-400 to-orange-300",
    items: ["OpenCV", "PDFPlumber", "OpenPyXL", "Plotly"],
  },
  {
    title: "Database & Tools",
    color: "from-indigo-400 to-violet-300",
    items: ["MySQL", "Git", "GitHub"],
  },
  {
    title: "Domains",
    color: "from-rose-400 to-red-300",
    items: ["Machine Learning", "AI", "Data Analytics", "Remote Sensing"],
  },
];

export const certificates = [
  "6-day workshop on Green Skills in AI – Edunet Foundation.",
  "Udemy certificate for Python Programming.",
  "2-day workshop on Indian Knowledge System.",
];
