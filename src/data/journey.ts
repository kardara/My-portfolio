import type { Localized } from "../contexts/LanguageContext";

export type MilestoneKind = "work" | "education" | "community";

export type Milestone = {
  period: string;
  place: "td" | "rw";
  kind: MilestoneKind;
  title: Localized;
  org: string;
  description: Localized;
  tags?: Localized[];
  current?: boolean;
};

/** Chronological, oldest first. Source: public/Zakaria_CV.pdf */
export const milestones: Milestone[] = [
  {
    period: "2020",
    place: "td",
    kind: "community",
    title: { en: "Humanitarian volunteer", fr: "Volontaire humanitaire", ar: "متطوع في العمل الإنساني" },
    org: "Croix-Rouge, N'Djamena",
    description: {
      en: "Red Cross training and community outreach, alongside a professional nursing program in Sarh. Where the habit of serving people first started.",
      fr: "Formation Croix-Rouge et actions communautaires, en parallèle d'une formation d'infirmier à Sarh. Là où l'habitude de servir les autres a commencé.",
      ar: "تدريب مع الصليب الأحمر وعمل مجتمعي، إلى جانب برنامج تمريض مهني في سار. هناك بدأت عادة خدمة الناس أولاً.",
    },
  },
  {
    period: "2022",
    place: "td",
    kind: "education",
    title: { en: "Baccalaureate (Science)", fr: "Baccalauréat (série D)", ar: "البكالوريا (علوم)" },
    org: "Lycée Ibnou Cina, Chad",
    description: {
      en: "Graduated high school in the sciences, then a nursing internship at the Hôpital Militaire de Garnison in N'Djamena before choosing software.",
      fr: "Bac scientifique, puis stage infirmier à l'Hôpital Militaire de Garnison de N'Djamena avant de choisir le logiciel.",
      ar: "بكالوريا علمية، ثم تدريب في التمريض بالمستشفى العسكري في نجامينا قبل اختيار البرمجيات.",
    },
  },
  {
    period: "Jan 2023",
    place: "rw",
    kind: "education",
    title: { en: "Moved to Kigali · BSc Software Engineering", fr: "Arrivée à Kigali · Licence en génie logiciel", ar: "الانتقال إلى كيغالي · بكالوريوس هندسة البرمجيات" },
    org: "Adventist University of Central Africa (AUCA)",
    description: {
      en: "Travelled about 2,280 km from N'Djamena to start a software engineering degree in Kigali.",
      fr: "Environ 2 280 km depuis N'Djamena pour commencer une licence en génie logiciel à Kigali.",
      ar: "قطعت نحو 2280 كم من نجامينا لبدء دراسة هندسة البرمجيات في كيغالي.",
    },
    current: true,
  },
  {
    period: "2023 – 2025",
    place: "rw",
    kind: "community",
    title: { en: "Student community leader", fr: "Responsable associatif étudiant", ar: "قيادي في المجتمع الطلابي" },
    org: "AEESTR · Beri Bour Community · AC-DEV",
    description: {
      en: "Secretary General of the Beri Bour community, advisor to the Chadian Students Association in Rwanda, and organizer of Chadian Independence Day 2025.",
      fr: "Secrétaire général de la communauté Beri Bour, conseiller de l'association des étudiants tchadiens au Rwanda, et organisateur de la fête de l'indépendance du Tchad 2025.",
      ar: "أمين عام مجتمع بيري بور، ومستشار جمعية الطلاب التشاديين في رواندا، ومنظم احتفال عيد استقلال تشاد 2025.",
    },
    tags: [
      { en: "Leadership", fr: "Leadership", ar: "القيادة" },
      { en: "Event organizing", fr: "Organisation d'événements", ar: "تنظيم الفعاليات" },
    ],
  },
  {
    period: "2024 – now",
    place: "rw",
    kind: "work",
    title: { en: "Software Engineering Trainee", fr: "Stagiaire en génie logiciel", ar: "متدرب في هندسة البرمجيات" },
    org: "The Gym Rwanda",
    description: {
      en: "Building full-stack apps in teams with React, Node.js, Express and Tailwind CSS, using sprints, task breakdown and peer code review.",
      fr: "Développement d'applications full-stack en équipe avec React, Node.js, Express et Tailwind CSS : sprints, découpage des tâches et revues de code.",
      ar: "بناء تطبيقات متكاملة ضمن فرق باستخدام React وNode.js وExpress وTailwind CSS، مع العمل بالدورات السريعة وتقسيم المهام ومراجعة الشيفرة.",
    },
    tags: [
      { en: "Full-stack", fr: "Full-stack", ar: "تطوير متكامل" },
      { en: "Agile", fr: "Agile", ar: "أجايل" },
    ],
    current: true,
  },
  {
    period: "Apr – Sep 2025",
    place: "rw",
    kind: "work",
    title: { en: "Volunteer Coach", fr: "Coach bénévole", ar: "مدرب متطوع" },
    org: "The Gym Rwanda",
    description: {
      en: "Mentored beginner developers in JavaScript, React and full-stack fundamentals through guided coding sessions.",
      fr: "Accompagnement de développeurs débutants en JavaScript, React et bases du full-stack lors de sessions de code guidées.",
      ar: "إرشاد المطورين المبتدئين في JavaScript وReact وأساسيات التطوير المتكامل عبر جلسات برمجة موجهة.",
    },
    tags: [{ en: "Mentoring", fr: "Mentorat", ar: "الإرشاد" }],
  },
  {
    period: "Sep 2025 – now",
    place: "rw",
    kind: "work",
    title: { en: "Teaching Assistant · Web Technology", fr: "Assistant d'enseignement · Technologies web", ar: "مساعد تدريس · تقنيات الويب" },
    org: "AUCA",
    description: {
      en: "Teaching HTML, CSS, JavaScript, React, Tailwind and Spring Boot through hands-on projects, code reviews, Git and deployment basics.",
      fr: "Enseignement de HTML, CSS, JavaScript, React, Tailwind et Spring Boot par projets pratiques, revues de code, Git et bases du déploiement.",
      ar: "تدريس HTML وCSS وJavaScript وReact وTailwind وSpring Boot عبر مشاريع عملية ومراجعات للشيفرة وأساسيات Git والنشر.",
    },
    tags: [
      { en: "Teaching", fr: "Enseignement", ar: "التدريس" },
      { en: "Code review", fr: "Revue de code", ar: "مراجعة الشيفرة" },
    ],
    current: true,
  },
  {
    period: "Nov 2025 – now",
    place: "rw",
    kind: "work",
    title: { en: "Lead Software Engineer", fr: "Lead Software Engineer", ar: "مهندس برمجيات رئيسي" },
    org: "ChadNova",
    description: {
      en: "Leading the design and development of web platforms focused on scalability, reliability and security, and mentoring junior developers.",
      fr: "Direction de la conception et du développement de plateformes web axées sur la scalabilité, la fiabilité et la sécurité, et encadrement de développeurs juniors.",
      ar: "قيادة تصميم وتطوير منصات ويب تركز على قابلية التوسع والموثوقية والأمان، وإرشاد المطورين المبتدئين.",
    },
    tags: [
      { en: "Architecture", fr: "Architecture", ar: "البنية" },
      { en: "Team lead", fr: "Chef d'équipe", ar: "قيادة الفريق" },
    ],
    current: true,
  },
];

export const kindLabels: Record<"all" | MilestoneKind, Localized> = {
  all: { en: "Everything", fr: "Tout", ar: "الكل" },
  work: { en: "Work", fr: "Travail", ar: "العمل" },
  education: { en: "Education", fr: "Études", ar: "الدراسة" },
  community: { en: "Community", fr: "Communauté", ar: "المجتمع" },
};
