import type { Localized } from "../contexts/LanguageContext";
import { asset } from "./profile";

export type ProjectCategory = "web" | "mobile" | "desktop";

export type Project = {
  id: string;
  title: string;
  year: string;
  category: ProjectCategory;
  /** Short label such as "Client work" or "University" */
  context: Localized;
  summary: Localized;
  /** Case-study sections; optional for smaller projects */
  problem?: Localized;
  solution?: Localized;
  role?: Localized;
  highlights: Localized[];
  stack: string[];
  image?: string;
  /** Visual used when there is no screenshot */
  accent: string;
  github?: string;
  demo?: string;
  isPrivate?: boolean;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "haggar-royal",
    title: "Haggar Royal Parfum",
    year: "2026",
    category: "web",
    featured: true,
    context: { en: "Client work · N'Djamena", fr: "Projet client · N'Djamena", ar: "مشروع لعميل · نجامينا" },
    summary: {
      en: "Storefront for a perfume and cosmetics boutique in N'Djamena, with a cart that turns into a ready-to-send WhatsApp order.",
      fr: "Vitrine en ligne d'une boutique de parfums et cosmétiques à N'Djamena, avec un panier qui se transforme en commande WhatsApp prête à envoyer.",
      ar: "واجهة متجر لمحل عطور ومستحضرات تجميل في نجامينا، مع سلة تتحول إلى طلب جاهز للإرسال عبر واتساب.",
    },
    problem: {
      en: "Give a N'Djamena boutique an online home where customers can browse the full range and still order the way they already talk to the shop: WhatsApp and phone.",
      fr: "Offrir à une boutique de N'Djamena une présence en ligne où les clients parcourent toute la gamme et commandent comme ils échangent déjà avec la boutique : WhatsApp et téléphone.",
      ar: "منح محل في نجامينا حضوراً على الإنترنت يتصفح فيه الزبائن كامل المنتجات ويطلبون بالطريقة التي يتواصلون بها أصلاً مع المحل: واتساب والهاتف.",
    },
    solution: {
      en: "A bilingual catalogue where the cart builds a formatted WhatsApp message, plus one-tap call buttons, so no online payment system is needed.",
      fr: "Un catalogue bilingue dont le panier génère un message WhatsApp formaté, avec des boutons d'appel direct : aucun paiement en ligne n'est nécessaire.",
      ar: "كتالوج ثنائي اللغة تُنشئ فيه السلة رسالة واتساب منسقة، مع أزرار اتصال مباشر، فلا حاجة لنظام دفع إلكتروني.",
    },
    highlights: [
      { en: "One-click WhatsApp checkout from the cart", fr: "Commande WhatsApp en un clic depuis le panier", ar: "إتمام الطلب عبر واتساب بنقرة واحدة من السلة" },
      { en: "French and Arabic (RTL) content", fr: "Contenu en français et en arabe (RTL)", ar: "محتوى بالفرنسية والعربية (من اليمين لليسار)" },
      { en: "Product catalogue, gift sets and FAQ", fr: "Catalogue, coffrets cadeaux et FAQ", ar: "كتالوج المنتجات، علب الهدايا والأسئلة الشائعة" },
    ],
    stack: ["React", "TypeScript", "Vite", "Framer Motion"],
    image: asset("projects/haggar-royal.webp"),
    accent: "#8b1d4f",
    github: "https://github.com/kardara/haggar-royal",
    demo: "https://haggar-royal.vercel.app",
  },
  {
    id: "safe-ride",
    title: "SafeRide SOS",
    year: "2026",
    category: "mobile",
    featured: true,
    context: { en: "IoT · Hardware + mobile", fr: "IoT · Matériel + mobile", ar: "إنترنت الأشياء · عتاد + تطبيق" },
    summary: {
      en: "A wearable panic button: an Arduino detects a press or a shout and alerts a Flutter app over Bluetooth, which sounds a siren and attaches GPS location.",
      fr: "Un bouton d'alerte portable : un Arduino détecte un appui ou un cri et alerte une app Flutter en Bluetooth, qui déclenche une sirène et joint la position GPS.",
      ar: "زر استغاثة قابل للارتداء: يلتقط Arduino الضغط أو الصراخ وينبّه تطبيق Flutter عبر البلوتوث، فيطلق صفارة إنذار ويرفق الموقع الجغرافي.",
    },
    problem: {
      en: "In an emergency, unlocking a phone and calling for help takes too long, or is impossible.",
      fr: "En cas d'urgence, déverrouiller un téléphone et appeler à l'aide prend trop de temps, voire est impossible.",
      ar: "في حالات الطوارئ، يستغرق فتح الهاتف وطلب المساعدة وقتاً طويلاً أو يكون مستحيلاً.",
    },
    solution: {
      en: "Firmware on an Arduino Nano 33 BLE Sense watches a button and the microphone level, then sends a JSON sensor snapshot over BLE. The app alarms until someone taps Accept, which writes back to the board and turns its LED green.",
      fr: "Le firmware d'un Arduino Nano 33 BLE Sense surveille un bouton et le niveau du micro, puis envoie un instantané JSON des capteurs en BLE. L'app sonne jusqu'à ce qu'on appuie sur Accepter, ce qui répond à la carte et passe sa LED au vert.",
      ar: "يراقب برنامج Arduino Nano 33 BLE Sense الزر ومستوى الميكروفون، ثم يرسل لقطة JSON من الحساسات عبر BLE. يستمر التطبيق في التنبيه حتى يضغط أحدهم على «قبول»، فيرسل رداً إلى اللوحة ويتحول ضوؤها إلى الأخضر.",
    },
    highlights: [
      { en: "Two-way BLE: alert out, acknowledgement back", fr: "BLE bidirectionnel : alerte envoyée, accusé reçu", ar: "BLE باتجاهين: إرسال التنبيه واستلام التأكيد" },
      { en: "Sound-level trigger, not just a button", fr: "Déclenchement par niveau sonore, pas seulement par bouton", ar: "تفعيل بمستوى الصوت وليس بالزر فقط" },
      { en: "Siren, vibration and GPS until accepted", fr: "Sirène, vibration et GPS jusqu'à acceptation", ar: "صفارة واهتزاز وموقع حتى القبول" },
    ],
    stack: ["Flutter", "Dart", "Arduino", "C++", "BLE"],
    accent: "#e95420",
    github: "https://github.com/kardara/SafeRideFlutter",
  },
  {
    id: "auca-ims",
    title: "AUCA IMS",
    year: "2025",
    category: "web",
    featured: true,
    context: { en: "University system", fr: "Système universitaire", ar: "نظام جامعي" },
    summary: {
      en: "Front-end for a university information management system: registration, courses and prerequisites, terms, workload, bans and waivers, and role-based administration.",
      fr: "Front-end d'un système d'information universitaire : inscriptions, cours et prérequis, semestres, charge de travail, restrictions et dérogations, administration par rôles.",
      ar: "واجهة لنظام إدارة معلومات جامعي: التسجيل، المقررات والمتطلبات السابقة، الفصول، العبء الدراسي، الحظر والاستثناءات، والإدارة حسب الأدوار.",
    },
    problem: {
      en: "Academic workflows involve many roles and rules, so the front-end needed a structure that could grow module by module.",
      fr: "Les processus académiques impliquent de nombreux rôles et règles : le front-end devait pouvoir grandir module par module.",
      ar: "تتوزع العمليات الأكاديمية على أدوار وقواعد كثيرة، لذا احتاجت الواجهة إلى بنية تنمو وحدة بعد وحدة.",
    },
    solution: {
      en: "A layered Next.js architecture of components, services, hooks, contexts and domain types, with a central API client, caching and route guards per role.",
      fr: "Une architecture Next.js en couches — composants, services, hooks, contextes et types métier — avec un client API central, du cache et des gardes de route par rôle.",
      ar: "بنية Next.js متعددة الطبقات من مكونات وخدمات وخطافات وسياقات وأنواع نطاق، مع عميل API مركزي وتخزين مؤقت وحماية للمسارات حسب الدور.",
    },
    role: {
      en: "Front-end architecture and implementation.",
      fr: "Architecture et développement front-end.",
      ar: "تصميم بنية الواجهة وتنفيذها.",
    },
    highlights: [
      { en: "Role-based access control and protected routes", fr: "Contrôle d'accès par rôles et routes protégées", ar: "تحكم بالوصول حسب الأدوار ومسارات محمية" },
      { en: "Central API client with caching", fr: "Client API central avec cache", ar: "عميل API مركزي مع تخزين مؤقت" },
      { en: "Reusable action patterns across modules", fr: "Modèles d'actions réutilisables entre modules", ar: "أنماط إجراءات قابلة لإعادة الاستخدام بين الوحدات" },
    ],
    stack: ["Next.js", "React", "TypeScript", "Context API"],
    image: asset("projects/auca-ims.webp"),
    accent: "#58a6ff",
    isPrivate: true,
  },
  {
    id: "agro-pastoral",
    title: "Complexe Agro-pastoral du Sahel",
    year: "2026",
    category: "web",
    context: { en: "Client work · Chad", fr: "Projet client · Tchad", ar: "مشروع لعميل · تشاد" },
    summary: {
      en: "Website for a team of young Chadian agronomists offering farm consulting, livestock management and field training, with bookings and a blog.",
      fr: "Site d'une équipe de jeunes agronomes tchadiens : conseil agricole, conduite d'élevage et formations terrain, avec réservations et blog.",
      ar: "موقع لفريق من المهندسين الزراعيين التشاديين الشباب يقدم الاستشارات الزراعية وإدارة الماشية والتدريب الميداني، مع الحجوزات ومدونة.",
    },
    highlights: [
      { en: "Service catalogue and booking requests", fr: "Catalogue de services et demandes de réservation", ar: "كتالوج الخدمات وطلبات الحجز" },
      { en: "Multi-page routing with a blog", fr: "Navigation multi-pages avec blog", ar: "تنقل متعدد الصفحات مع مدونة" },
      { en: "Content written for local producers", fr: "Contenu pensé pour les producteurs locaux", ar: "محتوى موجه للمنتجين المحليين" },
    ],
    stack: ["React", "TypeScript", "React Router", "Vite"],
    image: asset("projects/agro-pastoral.webp"),
    accent: "#1f5130",
    github: "https://github.com/kardara/agro-pastoral",
    demo: "https://agro-pastoral.vercel.app",
  },
  {
    id: "auca-apply",
    title: "AUCA Online Application",
    year: "2025",
    category: "web",
    context: { en: "University system", fr: "Système universitaire", ar: "نظام جامعي" },
    summary: {
      en: "Admissions portal where prospective students apply online, with form validation and integration with backend services.",
      fr: "Portail d'admission où les futurs étudiants postulent en ligne, avec validation des formulaires et intégration aux services back-end.",
      ar: "بوابة قبول يتقدم عبرها الطلاب المحتملون عبر الإنترنت، مع التحقق من النماذج والتكامل مع خدمات الخادم.",
    },
    highlights: [
      { en: "Multi-step application flow", fr: "Parcours de candidature en plusieurs étapes", ar: "مسار تقديم متعدد الخطوات" },
      { en: "Schema-based form validation", fr: "Validation de formulaires par schéma", ar: "تحقق من النماذج بالاعتماد على مخطط" },
      { en: "Accessible component library (Radix UI)", fr: "Bibliothèque de composants accessibles (Radix UI)", ar: "مكتبة مكونات سهلة الوصول (Radix UI)" },
    ],
    stack: ["React", "TypeScript", "Tailwind CSS", "Radix UI"],
    accent: "#3fb950",
    github: "https://github.com/kardara/auca-online-application-fronend",
  },
  {
    id: "mytask",
    title: "MyTaskManagement",
    year: "2025",
    category: "web",
    context: { en: "Full-stack", fr: "Full-stack", ar: "تطوير متكامل" },
    summary: {
      en: "Task management app with a React + TypeScript front-end and a Java back-end.",
      fr: "Application de gestion de tâches avec un front-end React + TypeScript et un back-end Java.",
      ar: "تطبيق لإدارة المهام بواجهة React وTypeScript وخادم Java.",
    },
    highlights: [
      { en: "Separate front-end and Java API", fr: "Front-end et API Java séparés", ar: "واجهة وواجهة برمجية Java منفصلتان" },
      { en: "Routing and typed API calls with Axios", fr: "Routage et appels API typés avec Axios", ar: "توجيه واستدعاءات API مضبوطة الأنواع عبر Axios" },
      { en: "Full CRUD task lifecycle", fr: "Cycle de vie CRUD complet des tâches", ar: "دورة حياة كاملة للمهام (إنشاء، قراءة، تعديل، حذف)" },
    ],
    stack: ["React", "TypeScript", "Java", "Tailwind CSS"],
    accent: "#a855f7",
    github: "https://github.com/kardara/MyTaskMangement_BestSeller_Interview_Frontend",
  },
  {
    id: "auca-library",
    title: "AUCA Library System",
    year: "2024",
    category: "desktop",
    context: { en: "University system", fr: "Système universitaire", ar: "نظام جامعي" },
    summary: {
      en: "Desktop library management for AUCA: book inventory, borrowing and returns, student records and reports.",
      fr: "Gestion de bibliothèque sur poste de travail pour l'AUCA : inventaire, emprunts et retours, dossiers étudiants et rapports.",
      ar: "نظام مكتبي لإدارة مكتبة الجامعة: جرد الكتب، الإعارة والإرجاع، سجلات الطلاب والتقارير.",
    },
    highlights: [
      { en: "Borrow and return workflows", fr: "Processus d'emprunt et de retour", ar: "إجراءات الإعارة والإرجاع" },
      { en: "Report generation for administrators", fr: "Génération de rapports pour l'administration", ar: "إنشاء تقارير للإدارة" },
      { en: "Student and book records management", fr: "Gestion des dossiers étudiants et des livres", ar: "إدارة سجلات الطلاب والكتب" },
    ],
    stack: ["Java", "Swing", "MySQL"],
    image: asset("projects/auca-lms.webp"),
    accent: "#f59e0b",
    github: "https://github.com/kardara/auca-lms-testing",
  },
  {
    id: "kardara-stock",
    title: "Kardara Stock Management",
    year: "2024",
    category: "web",
    context: { en: "Business tool", fr: "Outil de gestion", ar: "أداة أعمال" },
    summary: {
      en: "Stock control web app with an admin dashboard for inventory, stock movements and reports.",
      fr: "Application web de gestion de stock avec tableau de bord pour l'inventaire, les mouvements et les rapports.",
      ar: "تطبيق ويب لإدارة المخزون مع لوحة تحكم للجرد وحركات المخزون والتقارير.",
    },
    highlights: [
      { en: "Admin dashboard with role-aware modules", fr: "Tableau de bord avec modules selon les rôles", ar: "لوحة تحكم بوحدات حسب الأدوار" },
      { en: "Inventory and stock movement tracking", fr: "Suivi de l'inventaire et des mouvements", ar: "تتبع الجرد وحركات المخزون" },
      { en: "Printable reports", fr: "Rapports imprimables", ar: "تقارير قابلة للطباعة" },
    ],
    stack: ["PHP", "MySQL", "JavaScript", "Bootstrap"],
    accent: "#0ea5e9",
    github: "https://github.com/kardara/Kardara-Stock-Management-System",
  },
  {
    id: "medireminder",
    title: "MediReminder",
    year: "2024",
    category: "mobile",
    context: { en: "Health · Mobile", fr: "Santé · Mobile", ar: "صحة · تطبيق جوال" },
    summary: {
      en: "Medication reminder app that helps patients stick to their treatment with schedules and local notifications that work offline.",
      fr: "Application de rappel de médicaments qui aide les patients à suivre leur traitement, avec plannings et notifications locales hors ligne.",
      ar: "تطبيق تذكير بالأدوية يساعد المرضى على الالتزام بعلاجهم عبر جداول وإشعارات محلية تعمل دون اتصال.",
    },
    highlights: [
      { en: "Dose scheduling and reminders", fr: "Planification des prises et rappels", ar: "جدولة الجرعات والتذكيرات" },
      { en: "Offline-first local storage", fr: "Stockage local, fonctionne hors ligne", ar: "تخزين محلي يعمل دون اتصال" },
      { en: "Cross-platform with Flutter", fr: "Multiplateforme avec Flutter", ar: "متعدد المنصات باستخدام Flutter" },
    ],
    stack: ["Flutter", "Dart", "SQLite"],
    accent: "#14b8a6",
  },
];

export const categoryLabels: Record<"all" | ProjectCategory, Localized> = {
  all: { en: "All", fr: "Tous", ar: "الكل" },
  web: { en: "Web", fr: "Web", ar: "الويب" },
  mobile: { en: "Mobile & IoT", fr: "Mobile & IoT", ar: "الجوال وإنترنت الأشياء" },
  desktop: { en: "Desktop", fr: "Bureau", ar: "سطح المكتب" },
};
