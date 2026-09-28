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
    period: "2023 – 2026",
    place: "rw",
    kind: "education",
    title: { en: "Moved to Kigali · BSc Information Technology", fr: "Arrivée à Kigali · Licence en technologies de l'information", ar: "الانتقال إلى كيغالي · بكالوريوس تقنية المعلومات" },
    org: "Adventist University of Central Africa (AUCA)",
    description: {
      en: "Travelled about 2,280 km from N'Djamena to study Information Technology in Kigali.",
      fr: "Environ 2 280 km depuis N'Djamena pour étudier les technologies de l'information à Kigali.",
      ar: "قطعت نحو 2280 كم من نجامينا لدراسة تقنية المعلومات في كيغالي.",
    },
  },
  {
    period: "2023 – 2025",
    place: "rw",
    kind: "community",
    title: { en: "Student community leader", fr: "Responsable associatif étudiant", ar: "قيادي في المجتمع الطلابي" },
    org: "AEESTR · Beri Bour Rwanda · AC-DEV",
    description: {
      en: "Secretary-General of Beri Bour Rwanda, where I helped organize the annual Beri Bour Cultural Day. Treasurer of AC-DEV Sec-Rwanda. In 2025, Secretary-General and spokesperson of the AEESTR Independent Electoral Commission, then advisor to the association.",
      fr: "Secrétaire général de Beri Bour Rwanda, où j'ai aidé à organiser la Journée culturelle Beri Bour. Trésorier d'AC-DEV Sec-Rwanda. En 2025, secrétaire général et porte-parole de la Commission électorale indépendante de l'AEESTR, puis conseiller de l'association.",
      ar: "أمين عام بيري بور رواندا، حيث ساهمت في تنظيم اليوم الثقافي السنوي لبيري بور. أمين صندوق AC-DEV فرع رواندا. في 2025، أمين عام اللجنة الانتخابية المستقلة لجمعية AEESTR والناطق باسمها، ثم مستشار للجمعية.",
    },
    tags: [
      { en: "Leadership", fr: "Leadership", ar: "القيادة" },
      { en: "Event organizing", fr: "Organisation d'événements", ar: "تنظيم الفعاليات" },
    ],
  },
  {
    period: "Sep 2025 – Apr 2026",
    place: "rw",
    kind: "work",
    title: { en: "Teaching Assistant · Web Technology & Internet", fr: "Assistant d'enseignement · Technologies web & Internet", ar: "مساعد تدريس · تقنيات الويب والإنترنت" },
    org: "AUCA",
    description: {
      en: "Ran practical sessions on React, Java Servlets, Spring Boot, JPA and REST APIs, helped students with their front-end and back-end projects, and supported assignments, exams and grading.",
      fr: "Animation de séances pratiques sur React, les servlets Java, Spring Boot, JPA et les API REST, accompagnement des projets front-end et back-end des étudiants, et appui aux devoirs, examens et corrections.",
      ar: "إدارة حصص عملية حول React وJava Servlets وSpring Boot وJPA وواجهات REST، ومساعدة الطلاب في مشاريع الواجهة والخادم، ودعم الواجبات والامتحانات والتصحيح.",
    },
    tags: [
      { en: "Teaching", fr: "Enseignement", ar: "التدريس" },
      { en: "Spring Boot", fr: "Spring Boot", ar: "Spring Boot" },
    ],
  },
  {
    period: "Nov 2025 – Aug 2026",
    place: "rw",
    kind: "work",
    title: { en: "Lead Software Engineer", fr: "Lead Software Engineer", ar: "مهندس برمجيات رئيسي" },
    org: "ChadNova",
    description: {
      en: "Led software development and technical decisions. Designed and built full-stack applications with Java, Spring Boot, React, Next.js and PostgreSQL, including CleanEX, which gives 18 widows regular work.",
      fr: "Direction du développement logiciel et des choix techniques. Conception et développement d'applications full-stack en Java, Spring Boot, React, Next.js et PostgreSQL, dont CleanEX, qui offre un travail régulier à 18 veuves.",
      ar: "قيادة تطوير البرمجيات والقرارات التقنية. تصميم وبناء تطبيقات متكاملة بـ Java وSpring Boot وReact وNext.js وPostgreSQL، منها CleanEX الذي يوفر عملاً منتظماً لـ 18 أرملة.",
    },
    tags: [
      { en: "Architecture", fr: "Architecture", ar: "البنية" },
      { en: "Team lead", fr: "Chef d'équipe", ar: "قيادة الفريق" },
    ],
  },
  {
    period: "Feb 2026 – now",
    place: "rw",
    kind: "education",
    title: { en: "Advanced Java Backend & Software Architecture", fr: "Back-end Java avancé & architecture logicielle", ar: "تطوير الخوادم بـ Java المتقدم وهندسة البرمجيات" },
    org: "The Gym × MaibornWolff",
    description: {
      en: "Advanced backend training covering Java, OOP, Spring Boot, PostgreSQL, multithreading and concurrency, algorithms, system design and clean code.",
      fr: "Formation back-end avancée : Java, POO, Spring Boot, PostgreSQL, multithreading et concurrence, algorithmique, conception de systèmes et code propre.",
      ar: "تدريب متقدم على تطوير الخوادم: Java والبرمجة الكائنية وSpring Boot وPostgreSQL وتعدد الخيوط والتزامن والخوارزميات وتصميم الأنظمة والشيفرة النظيفة.",
    },
    tags: [
      { en: "System design", fr: "Conception de systèmes", ar: "تصميم الأنظمة" },
      { en: "Concurrency", fr: "Concurrence", ar: "التزامن" },
    ],
    current: true,
  },
  {
    period: "Feb – Jun 2026",
    place: "rw",
    kind: "community",
    title: { en: "Volunteer Coach", fr: "Coach bénévole", ar: "مدرب متطوع" },
    org: "The Gym",
    description: {
      en: "Coached beginner members during training sessions, helping them learn proper technique and keep consistent habits in a supportive environment.",
      fr: "Accompagnement des membres débutants pendant les entraînements : bonne technique, régularité et environnement bienveillant.",
      ar: "مرافقة الأعضاء المبتدئين خلال التدريبات لتعلم التقنية الصحيحة والحفاظ على عادات منتظمة في بيئة داعمة.",
    },
    tags: [{ en: "Mentoring", fr: "Mentorat", ar: "الإرشاد" }],
  },
  {
    period: "2026 – now",
    place: "rw",
    kind: "work",
    title: { en: "Software Developer", fr: "Développeur logiciel", ar: "مطور برمجيات" },
    org: "Adventist University of Central Africa (AUCA)",
    description: {
      en: "Building and maintaining the university's information systems: Spring Boot and PostgreSQL services, React and Next.js front-ends, REST APIs, and deployment, working directly with stakeholders on requirements.",
      fr: "Développement et maintenance des systèmes d'information de l'université : services Spring Boot et PostgreSQL, front-ends React et Next.js, API REST et déploiement, en lien direct avec les parties prenantes.",
      ar: "بناء أنظمة معلومات الجامعة وصيانتها: خدمات Spring Boot وPostgreSQL، وواجهات React وNext.js، وواجهات REST، والنشر، بالعمل المباشر مع أصحاب المصلحة على المتطلبات.",
    },
    tags: [
      { en: "Full-stack", fr: "Full-stack", ar: "تطوير متكامل" },
      { en: "Spring Boot", fr: "Spring Boot", ar: "Spring Boot" },
    ],
    current: true,
  },
  {
    period: "2026 – now",
    place: "rw",
    kind: "education",
    title: { en: "MSc Information Technology · AI & ML", fr: "Master en technologies de l'information · IA & ML", ar: "ماجستير تقنية المعلومات · الذكاء الاصطناعي وتعلم الآلة" },
    org: "Carnegie Mellon University Africa",
    description: {
      en: "Master of Science in Information Technology (MSIT) at CMU-Africa in Kigali, specializing in artificial intelligence and machine learning.",
      fr: "Master of Science in Information Technology (MSIT) à CMU-Africa, à Kigali, spécialisation intelligence artificielle et apprentissage automatique.",
      ar: "ماجستير العلوم في تقنية المعلومات (MSIT) في جامعة كارنيغي ميلون أفريقيا بكيغالي، بتخصص الذكاء الاصطناعي وتعلم الآلة.",
    },
    tags: [
      { en: "AI", fr: "IA", ar: "الذكاء الاصطناعي" },
      { en: "Machine learning", fr: "Apprentissage automatique", ar: "تعلم الآلة" },
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
