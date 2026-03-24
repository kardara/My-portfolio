import React, { createContext, useContext, useState } from "react";

type Language = "en" | "fr" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About",
    "experience.title": "Experience",
    "experience.subtitle":
      "Crafting solutions that matter, one project at a time",
    "nav.projects": "Projects",
    "nav.skills": "Skills",
    "nav.contact": "Contact",

    // Hero Section
    "hero.greeting": "Hi, I'm",
    "hero.name": "Abdoulaye Zakaria Djerou",
    "hero.title":
      "Software Engineering Student | Full-Stack & Mobile Developer | Future Cybersecurity Expert",
    "hero.description":
      "As a passionate software engineering student at Adventist University of Central Africa (AUCA), I'm at the beginning of my journey to become an IT professional. With a deep interest in web development and design, I thrive on combining technical skills with creativity to build innovative and user-friendly digital solutions.",
    "hero.location": "Chadian 🇹🇩 living in Rwanda 🇷🇼",
    "hero.education":
      "Studying at AUCA and currently part of the gym, the most intense software development training program in Rwanda",
    "hero.passion": "Building real-world tech solutions",
    "hero.focus": "Passionate about tech for development and security",
    "hero.cta": "Let's Connect",
    "hero.downloadCV": "Download CV",
    "hero.openRoles": "Open to Software Engineering Roles",
    "hero.summaryLabel": "profile --summary",
    "hero.projectsStat": "Projects",
    "hero.activeRolesStat": "Active Roles",
    "hero.certificationsStat": "Certifications",
    "hero.scrollNext": "scroll --next",
    "hero.systemStatus": "system-status",
    "hero.roleEngineer": "role: engineer",
    "hero.statusAvailable": "status: available",
    "hero.locationLabel": "location: Kigali",
    "hero.focusLabel": "focus: full-stack",

    // About Section
    "about.title": "About Me",
    "about.subtitle": "Passionate Developer & Future Tech Leader",
    "about.description":
      "I am a dedicated software engineering student with a passion for creating innovative solutions that make a real impact. My journey combines technical excellence with creative problem-solving, always focusing on building technology that serves communities and solves real-world problems.",
    "about.point1":
      "Passionate about software development, cybersecurity, and networks",
    "about.point2":
      "Currently learning advanced mobile development,full stack software development focused in JavaScript and TypeScript",
    "about.point3": "I build software that solves real community problems",
    "about.point4": "Community leader, team collaborator, and lifelong learner",
    "about.primaryStack": "Primary Tech Stack",
    "about.currentPositions": "Current Positions",
    "about.keyAchievements": "Key Achievements",
    "about.achievement1Title": "6+ Projects Delivered",
    "about.achievement1Desc": "Full-stack applications in production",
    "about.achievement2Title": "Multiple Leadership Roles",
    "about.achievement2Desc": "Community organizations & tech teams",
    "about.achievement3Title": "3+ Certifications",
    "about.achievement3Desc": "Networking, design, and technical skills",

    // Skills Section
    "skills.title": "Technical Skills",
    "skills.languages": "Languages & Frameworks",
    "skills.certifications": "Certifications & Training",
    "skills.subtitle":
      "30+ technologies mastered across web, mobile, and backend development",
    "skills.softSkills": "Soft Skills",
    "skills.technologies": "technologies",

    // Projects Section
    "projects.title": "Featured Projects",
    "projects.viewProject": "View Project",
    "projects.inDevelopment": "In Development",
    "projects.subtitle":
      "A showcase of my technical skills and creative problem-solving through real-world applications",
    "projects.completed": "Completed",
    "projects.source": "Source",
    "projects.live": "Live",

    // Contact Section
    "contact.title": "Get In Touch",
    "contact.subtitle": "Let's build something amazing together",
    "contact.description":
      "I'm always open to discussing new opportunities, innovative projects, or just having a chat about technology and its potential to change the world.",
    "contact.email": "Email",
    "contact.whatsapp": "WhatsApp",
    "contact.location": "Location",
    "contact.phone": "Phone",
    "contact.linkedin": "LinkedIn",
    "contact.infoTitle": "Contact Information",
    "contact.follow": "Follow Me",
    "contact.sendMessage": "Send a Message",
    "contact.name": "Name",
    "contact.subject": "Subject",
    "contact.message": "Message",
    "contact.placeholderName": "Your Name",
    "contact.placeholderEmail": "your.email@example.com",
    "contact.placeholderSubject": "What's this about?",
    "contact.placeholderMessage":
      "Tell me about your project or just say hello!",
    "contact.send": "Send Message",
    "contact.whatsappValue": "Start a chat on WhatsApp",
    "contact.locationValue": "Kigali, Rwanda",
    "contact.success": "Message sent successfully!",
    "contact.error": "Failed to send message.",
    "contact.errorLater": "An error occurred. Try again later.",
    "contact.connectTitle": "Let's Connect Professionally",
    "contact.actionsDescription":
      "Use the Quick Contact button in the header to send a direct message, or schedule a meeting instantly on Google Calendar.",
    "contact.scheduleGoogle": "Schedule Meeting on Google Calendar",
    "contact.sendEmailDirect": "Send Email Directly",
    "contact.availabilityTag": "availability --status",
    "contact.weekdaysHours": "Weekdays: 09:00 - 18:00 (CAT)",
    "contact.fastestResponse": "Fastest response: WhatsApp or Email",

    // Header
    "header.quickContact": "Quick Contact",
    "header.schedule": "Schedule",
    "header.scheduleMeeting": "Schedule Meeting",
    "header.quickFormTag": "contact --quick-form",
    "header.modalDescription":
      "Send your message instantly or schedule a calendar meeting.",

    // Experience Section
    "experience.lead": "Lead Software Engineer",
    "experience.chadnova": "ChadNova",
    "experience.leadDesc":
      "Lead the design and development of web-based platforms with a focus on scalability, reliability, and security. Coordinate technical tasks, mentor junior developers, and align engineering decisions with organizational and community-oriented objectives.",
    "experience.arch": "Platform Architecture",
    "experience.leadership": "Team Leadership",
    "experience.strategy": "Technical Strategy",
    "experience.assistant": "Teaching Assistant - Web Technology & Internet",
    "experience.auca": "Adventist University of Central Africa (AUCA)",
    "experience.assistantDesc":
      "Support undergraduate students in learning HTML, CSS, JavaScript, React, Tailwind CSS, and Spring Boot through practical exercises and full-stack projects. Assist in clarifying complex concepts, reviewing code, and introducing Agile workflows.",
    "experience.fullstack": "Full-Stack Education",
    "experience.codereview": "Code Review",
    "experience.mentorship": "Mentorship",
    "experience.trainee": "Trainee & Volunteer Coach",
    "experience.gym": "The Gym Rwanda",
    "experience.traineeDesc":
      "Develop full-stack applications using React, Node.js, Express, and Tailwind CSS in collaborative team environments. Apply Agile practices such as sprint planning, task decomposition, documentation, and peer code reviews.",
    "experience.fullstackdev": "Full-Stack Development",
    "experience.agile": "Agile Methodology",
    "experience.coaching": "Developer Coaching",
    "experience.location": "Kigali, Rwanda",
    "experience.nowPresent": "Present",

    // About Section Strengths
    "about.strength1": "Full-Stack Expertise",
    "about.strength1Desc":
      "Expert in modern JavaScript frameworks, backend technologies, and database design",
    "about.strength2": "Team Leadership",
    "about.strength2Desc":
      "Lead Software Engineer with mentorship experience and Agile workflow expertise",
    "about.strength3": "Problem Solving",
    "about.strength3Desc":
      "Strong analytical skills with focus on scalable, reliable, and secure solutions",
    "about.strength4": "Community Focus",
    "about.strength4Desc":
      "Passionate about creating technology that serves and empowers communities",
    "about.stack": "Java, React, Node.js",
    "about.roles": "4 Roles",

    // Skills Section
    "skills.webUI": "Web & UI Development",
    "skills.webUIDesc": "Frontend technologies and responsive design",
    "skills.databases": "Databases & Cloud",
    "skills.databasesDesc": "Data storage and cloud platform solutions",
    "skills.tools": "DevTools & Deployment",
    "skills.toolsDesc": "Development tools and hosting platforms",
    "skills.cert1": "Cisco Networking Essentials",
    "skills.cert2": "Full Stack Development Training (React.js & Spring Boot)",
    "skills.cert3": "Graphic Design (Adobe Photoshop)",
    "skills.cert4": "Leadership & Team Management",
    "skills.cert5": "Red Cross Humanitarian Training",
    "skills.softSkillsTitle": "Soft Skills",
    "skills.skill1": "Leadership & Mentorship",
    "skills.skill2": "Team Coordination",
    "skills.skill3": "Problem Solving",
    "skills.skill4": "Agile Methodology",
    "skills.skill5": "Code Review",
    "skills.skill6": "Technical Communication",
    "skills.skill7": "Cross-cultural Collaboration",

    // Projects Section
    "projects.kardara": "Kardara Stock Management System",
    "projects.kardaraDesc":
      "A comprehensive Java-based stock control application with role-aware modules, inventory updates, and reporting support for day-to-day operations.",
    "projects.medireminder": "MediReminder",
    "projects.medreminderDesc":
      "A mobile medicine reminder app designed to improve treatment adherence through clear scheduling and local notification workflows.",
    "projects.mytask": "MyTaskMangement BestSeller",
    "projects.mytaskDesc":
      "A full-stack task management platform with a TypeScript frontend and Java backend, built around maintainable workflows and clean architecture.",
    "projects.aucalms": "AUCA Library Management System (IMS)",
    "projects.auca​lmsDesc":
      "Integrated library and inventory management system for AUCA. Manages book inventory, borrowing/returning, student records, and generates reports. Built with Java for robust backend operations.",
    "projects.aucaapp": "AUCA Online Application Portal",
    "projects.aucaappDesc":
      "A modern AUCA admissions web portal with TypeScript and React, enabling user-friendly online application experiences for prospective students.",
    "projects.studentmgmt":
      "AUCA IMS Frontend (University Information Management System)",
    "projects.studentmgmtDesc":
      "Built a modern, scalable frontend for a university information management platform supporting student registration, course and prerequisite workflows, term management, workload tracking, bans and waivers, announcements, and role-based administration. Designed for real institutional workflows with strong focus on maintainability, reusable components, and secure access control.",

    // Footer
    "footer.quote": '"Creativity + Code + Community = Change."',
    "footer.subquote":
      "Let's build solutions that empower and transform lives.",
    "footer.rights": "All rights reserved.",
    "footer.backToTop": "Back to Top ↑",
    "footer.profileSummary":
      "Full-stack engineer focused on reliable, community-impact products.",
    "footer.quickLinksTag": "navigate --quick-links",
    "footer.directContactTag": "contact --direct",
    "footer.scheduleMeeting": "Schedule Meeting",
  },
  fr: {
    // Navigation
    "nav.home": "Accueil",
    "nav.about": "À propos",
    "experience.title": "Expérience",
    "experience.subtitle": "Créer des solutions utiles, projet après projet",
    "nav.projects": "Projets",
    "nav.skills": "Compétences",
    "nav.contact": "Contact",

    // Hero Section
    "hero.greeting": "Salut, je suis",
    "hero.name": "Abdoulaye Zakaria Djerou",
    "hero.title":
      "Étudiant en Génie Logiciel | Développeur Full-Stack & Mobile | Futur Expert en Cybersécurité",
    "hero.description":
      "En tant qu'étudiant passionné en génie logiciel à l'Université Adventiste d'Afrique Centrale (AUCA), je suis au début de mon parcours pour devenir un professionnel de l'informatique. Avec un intérêt profond pour le développement web et le design, je prospère en combinant les compétences techniques avec la créativité pour construire des solutions numériques innovantes et conviviales.",
    "hero.location": "Tchadien 🇹🇩 vivant au Rwanda 🇷🇼",
    "hero.education":
      "Étudiant à AUCA et actuellement membre du gym, le programme de formation en développement logiciel le plus intense du Rwanda",
    "hero.passion": "Construire des solutions technologiques du monde réel",
    "hero.focus":
      "Passionné par la technologie pour le développement et la sécurité",
    "hero.cta": "Connectons-nous",
    "hero.downloadCV": "Télécharger CV",
    "hero.openRoles": "Ouvert aux opportunités en génie logiciel",
    "hero.summaryLabel": "profil --résumé",
    "hero.projectsStat": "Projets",
    "hero.activeRolesStat": "Rôles actifs",
    "hero.certificationsStat": "Certifications",
    "hero.scrollNext": "défiler --suite",
    "hero.systemStatus": "état-système",
    "hero.roleEngineer": "rôle : ingénieur",
    "hero.statusAvailable": "statut : disponible",
    "hero.locationLabel": "localisation : Kigali",
    "hero.focusLabel": "focus : full-stack",

    // About Section
    "about.title": "À Propos de Moi",
    "about.subtitle": "Développeur Passionné & Futur Leader Tech",
    "about.description":
      "Je suis un étudiant en génie logiciel dévoué avec une passion pour créer des solutions innovantes qui ont un impact réel. Mon parcours combine l'excellence technique avec la résolution créative de problèmes, en me concentrant toujours sur la construction de technologies qui servent les communautés et résolvent les problèmes du monde réel.",
    "about.point1":
      "Passionné par le développement logiciel, la cybersécurité et les réseaux",
    "about.point2":
      "Actuellement en apprentissage du développement mobile avancé, de l'administration Linux et de Spring Boot",
    "about.point3":
      "Je construis des logiciels qui résolvent de vrais problèmes communautaires",
    "about.point4":
      "Leader communautaire, collaborateur d'équipe et apprenant à vie",
    "about.primaryStack": "Stack technique principal",
    "about.currentPositions": "Postes actuels",
    "about.keyAchievements": "Réalisations clés",
    "about.achievement1Title": "6+ projets livrés",
    "about.achievement1Desc": "Applications full-stack en production",
    "about.achievement2Title": "Plusieurs rôles de leadership",
    "about.achievement2Desc": "Organisations communautaires et équipes tech",
    "about.achievement3Title": "3+ certifications",
    "about.achievement3Desc": "Réseaux, design et compétences techniques",

    // Skills Section
    "skills.title": "Compétences Techniques",
    "skills.languages": "Langages & Frameworks",
    "skills.certifications": "Certifications & Formation",
    "skills.subtitle":
      "30+ technologies maîtrisées en développement web, mobile et backend",
    "skills.softSkills": "Compétences humaines",
    "skills.technologies": "technologies",

    // Projects Section
    "projects.title": "Projets Phares",
    "projects.viewProject": "Voir le Projet",
    "projects.inDevelopment": "En Développement",
    "projects.subtitle":
      "Une vitrine de mes compétences techniques et de ma résolution créative de problèmes à travers des applications réelles",
    "projects.completed": "Terminé",
    "projects.source": "Source",
    "projects.live": "Démo",

    // Contact Section
    "contact.title": "Entrons en Contact",
    "contact.subtitle": "Construisons quelque chose d'incroyable ensemble",
    "contact.description":
      "Je suis toujours ouvert à discuter de nouvelles opportunités, de projets innovants, ou simplement à avoir une conversation sur la technologie et son potentiel à changer le monde.",
    "contact.email": "Email",
    "contact.whatsapp": "WhatsApp",
    "contact.location": "Localisation",
    "contact.phone": "Téléphone",
    "contact.linkedin": "LinkedIn",
    "contact.infoTitle": "Informations de contact",
    "contact.follow": "Suivez-moi",
    "contact.sendMessage": "Envoyer un message",
    "contact.name": "Nom",
    "contact.subject": "Sujet",
    "contact.message": "Message",
    "contact.placeholderName": "Votre nom",
    "contact.placeholderEmail": "votre.email@exemple.com",
    "contact.placeholderSubject": "Quel est le sujet ?",
    "contact.placeholderMessage":
      "Parlez-moi de votre projet ou dites simplement bonjour !",
    "contact.send": "Envoyer le message",
    "contact.whatsappValue": "Démarrer une discussion sur WhatsApp",
    "contact.locationValue": "Kigali, Rwanda",
    "contact.success": "Message envoyé avec succès !",
    "contact.error": "Échec de l'envoi du message.",
    "contact.errorLater": "Une erreur est survenue. Réessayez plus tard.",
    "contact.connectTitle": "Connectons-nous professionnellement",
    "contact.actionsDescription":
      "Utilisez le bouton Contact rapide dans l'en-tête pour envoyer un message direct, ou planifiez instantanément une réunion sur Google Calendar.",
    "contact.scheduleGoogle": "Planifier une réunion sur Google Calendar",
    "contact.sendEmailDirect": "Envoyer un email directement",
    "contact.availabilityTag": "disponibilité --statut",
    "contact.weekdaysHours": "Jours ouvrés : 09:00 - 18:00 (CAT)",
    "contact.fastestResponse": "Réponse la plus rapide : WhatsApp ou Email",

    // Header
    "header.quickContact": "Contact rapide",
    "header.schedule": "Planifier",
    "header.scheduleMeeting": "Planifier une réunion",
    "header.quickFormTag": "contact --formulaire-rapide",
    "header.modalDescription":
      "Envoyez votre message instantanément ou planifiez une réunion via le calendrier.",

    // Experience Section
    "experience.lead": "Ingénieur Logiciel Principal",
    "experience.chadnova": "ChadNova",
    "experience.leadDesc":
      "Diriger la conception et le développement de plateformes Web en mettant l'accent sur l'évolutivité, la fiabilité et la sécurité. Coordonner les tâches techniques, mentorer les jeunes développeurs et aligner les décisions d'ingénierie avec les objectifs organisationnels et communautaires.",
    "experience.arch": "Architecture de Plateforme",
    "experience.leadership": "Leadership d'Équipe",
    "experience.strategy": "Stratégie Technique",
    "experience.assistant":
      "Assistant Enseignant - Technologie Web et Internet",
    "experience.auca": "Université Adventiste d'Afrique Centrale (AUCA)",
    "experience.assistantDesc":
      "Soutenir les étudiants de premier cycle dans l'apprentissage HTML, CSS, JavaScript, React, Tailwind CSS et Spring Boot à travers des exercices pratiques et des projets Full-Stack. Aider à clarifier les concepts complexes, examiner le code et introduire les flux de travail Agile.",
    "experience.fullstack": "Éducation Full-Stack",
    "experience.codereview": "Examen de Code",
    "experience.mentorship": "Mentorat",
    "experience.trainee": "Stagiaire et Coach Bénévole",
    "experience.gym": "The Gym Rwanda",
    "experience.traineeDesc":
      "Développer des applications Full-Stack utilisant React, Node.js, Express et Tailwind CSS dans des environnements d'équipe collaboratifs. Appliquer les pratiques Agile telles que la planification de sprint, la décomposition des tâches, la documentation et les examens de code entre pairs.",
    "experience.fullstackdev": "Développement Full-Stack",
    "experience.agile": "Méthodologie Agile",
    "experience.coaching": "Coaching de Développeurs",
    "experience.location": "Kigali, Rwanda",
    "experience.nowPresent": "Actuellement",

    // About Section Strengths
    "about.strength1": "Expertise Full-Stack",
    "about.strength1Desc":
      "Expert dans les frameworks JavaScript modernes, les technologies backend et la conception de bases de données",
    "about.strength2": "Leadership d'Équipe",
    "about.strength2Desc":
      "Ingénieur Logiciel Principal avec expérience en mentorat et expertise des flux de travail Agile",
    "about.strength3": "Résolution de Problèmes",
    "about.strength3Desc":
      "Fortes compétences analytiques avec accent sur les solutions évolutives, fiables et sécurisées",
    "about.strength4": "Focus Communautaire",
    "about.strength4Desc":
      "Passionné par la création de technologies qui servent et responsabilisent les communautés",
    "about.stack": "Java, React, Node.js",
    "about.roles": "4 Rôles",

    // Skills Section
    "skills.webUI": "Développement Web et Interface Utilisateur",
    "skills.webUIDesc": "Technologies frontend et design réactif",
    "skills.databases": "Bases de Données et Cloud",
    "skills.databasesDesc":
      "Solutions de stockage de données et de plateforme cloud",
    "skills.tools": "DevTools et Déploiement",
    "skills.toolsDesc": "Outils de développement et plateformes d'hébergement",
    "skills.cert1": "Cisco Networking Essentials",
    "skills.cert2": "Cours de Formation Full Stack (React.js et Spring Boot)",
    "skills.cert3": "Conception Graphique (Adobe Photoshop)",
    "skills.cert4": "Leadership et Gestion d'Équipe",
    "skills.cert5": "Formation Humanitaire de la Croix-Rouge",
    "skills.softSkillsTitle": "Compétences Humaines",
    "skills.skill1": "Leadership et Mentorat",
    "skills.skill2": "Coordination d'Équipe",
    "skills.skill3": "Résolution de Problèmes",
    "skills.skill4": "Méthodologie Agile",
    "skills.skill5": "Examen de Code",
    "skills.skill6": "Communication Technique",
    "skills.skill7": "Collaboration Multiculturelle",

    // Projects Section
    "projects.kardara": "Système de Gestion des Stocks Kardara",
    "projects.kardaraDesc":
      "Une application de contrôle des stocks complète basée sur Java avec des modules sensibles aux rôles, des mises à jour d'inventaire et un support de reporting pour les opérations quotidiennes.",
    "projects.medireminder": "MediReminder",
    "projects.medreminderDesc":
      "Une application mobile de rappel de médicaments conçue pour améliorer l'adhérence au traitement grâce à des workflows de planification et de notification clairs.",
    "projects.mytask": "MyTaskMangement BestSeller",
    "projects.mytaskDesc":
      "Une plateforme complète de gestion des tâches avec un frontend TypeScript et un backend Java, construite autour de flux de travail maintenables et d'une architecture propre.",
    "projects.aucalms": "Système de Gestion de Bibliothèque AUCA (IMS)",
    "projects.aucalmsDesc":
      "Système intégré de gestion de bibliothèque et d'inventaire pour AUCA. Gère l'inventaire des livres, les emprunts/retours, les dossiers d'étudiants et génère des rapports. Construit avec Java pour des opérations backend robustes.",
    "projects.aucaapp": "Portail de Candidature en Ligne AUCA",
    "projects.aucaappDesc":
      "Un portail d'admission AUCA moderne avec TypeScript et React, permettant des expériences de candidature en ligne conviviales pour les étudiants potentiels.",
    "projects.studentmgmt":
      "AUCA IMS Frontend (University Information Management System)",
    "projects.studentmgmtDesc":
      "Built a modern, scalable frontend for a university information management platform supporting student registration, course and prerequisite workflows, term management, workload tracking, bans and waivers, announcements, and role-based administration. Designed for real institutional workflows with strong focus on maintainability, reusable components, and secure access control.",

    // Footer
    "footer.quote": '"Créativité + Code + Communauté = Changement."',
    "footer.subquote":
      "Construisons des solutions qui autonomisent et transforment les vies.",
    "footer.rights": "Tous droits réservés.",
    "footer.backToTop": "Retour en haut ↑",
    "footer.profileSummary":
      "Ingénieur full-stack axé sur des produits fiables à impact communautaire.",
    "footer.quickLinksTag": "navigation --liens-rapides",
    "footer.directContactTag": "contact --direct",
    "footer.scheduleMeeting": "Planifier une réunion",
  },
  ar: {
    // Navigation
    "nav.home": "الرئيسية",
    "nav.about": "نبذة عني",
    "experience.title": "الخبرة",
    "experience.subtitle": "نبني حلولاً مهمة، مشروعاً بعد مشروع",
    "nav.projects": "المشاريع",
    "nav.skills": "المهارات",
    "nav.contact": "التواصل",

    // Hero Section
    "hero.greeting": "مرحباً، أنا",
    "hero.name": "عبد الله زكريا جيرو",
    "hero.title":
      "طالب هندسة البرمجيات | مطور Full-Stack و Mobile | خبير أمن سيبراني مستقبلي",
    "hero.description":
      "كطالب شغوف في هندسة البرمجيات في جامعة الأدفنتست في وسط أفريقيا (AUCA)، أنا في بداية رحلتي لأصبح محترف في تكنولوجيا المعلومات. مع اهتمام عميق بتطوير الويب والتصميم، أزدهر في دمج المهارات التقنية مع الإبداع لبناء حلول رقمية مبتكرة وسهلة الاستخدام.",
    "hero.location": "تشادي 🇹🇩 يعيش في رواندا 🇷🇼",
    "hero.education":
      "أدرس في AUCA وحالياً جزء من الجيم، برنامج التدريب الأكثر كثافة في تطوير البرمجيات في رواندا",
    "hero.passion": " بناء حلول تقنية من العالم الحقيقي",
    "hero.focus": " شغوف بالتكنولوجيا للتنمية والأمان",
    "hero.cta": "لنتواصل",
    "hero.downloadCV": "تحميل السيرة الذاتية",
    "hero.openRoles": "متاح لفرص هندسة البرمجيات",
    "hero.summaryLabel": "الملف --ملخص",
    "hero.projectsStat": "المشاريع",
    "hero.activeRolesStat": "الأدوار الحالية",
    "hero.certificationsStat": "الشهادات",
    "hero.scrollNext": "انتقل --التالي",
    "hero.systemStatus": "حالة-النظام",
    "hero.roleEngineer": "الدور: مهندس",
    "hero.statusAvailable": "الحالة: متاح",
    "hero.locationLabel": "الموقع: كيغالي",
    "hero.focusLabel": "التركيز: Full-Stack",

    // Experience Section
    "experience.lead": "مهندس برمجيات رئيسي",
    "experience.chadnova": "ChadNova",
    "experience.leadDesc":
      "قيادة تصميم وتطوير منصات الويب مع التركيز على قابلية التوسع والموثوقية والأمان. تنسيق المهام التقنية وتوجيه المطورين الصغار ومواءمة قرارات الهندسة مع الأهداف التنظيمية والمجتمعية.",
    "experience.arch": "معمارية المنصة",
    "experience.leadership": "قيادة الفريق",
    "experience.strategy": "الاستراتيجية التقنية",
    "experience.assistant": "مساعد تدريس - تكنولوجيا الويب والإنترنت",
    "experience.auca": "جامعة الأدفنتست بوسط أفريقيا (AUCA)",
    "experience.assistantDesc":
      "دعم الطلاب الجامعيين في تعلم HTML و CSS و JavaScript و React و Tailwind CSS و Spring Boot من خلال تمارين عملية ومشاريع Full-Stack. مساعدة في توضيح المفاهيم المعقدة ومراجعة الكود وإدخال سير العمل Agile.",
    "experience.fullstack": "تعليم Full-Stack",
    "experience.codereview": "مراجعة الكود",
    "experience.mentorship": "الإرشاد",
    "experience.trainee": "متدرب ومدرب متطوع",
    "experience.gym": "The Gym Rwanda",
    "experience.traineeDesc":
      "تطوير تطبيقات Full-Stack باستخدام React و Node.js و Express و Tailwind CSS في بيئات فريق تعاونية. تطبيق ممارسات Agile مثل تخطيط Sprint وتحويل المهام والتوثيق واستعراضات الكود بين الأقران.",
    "experience.fullstackdev": "تطوير Full-Stack",
    "experience.agile": "منهجية Agile",
    "experience.coaching": "تدريب المطورين",
    "experience.location": "كيغالي، رواندا",
    "experience.nowPresent": "الحاضر",

    // About Section Strengths
    "about.strength1": "خبرة Full-Stack",
    "about.strength1Desc":
      "خبير في أطر عمل JavaScript الحديثة وتقنيات Backend وتصميم قواعد البيانات",
    "about.strength2": "قيادة الفريق",
    "about.strength2Desc":
      "مهندس برمجيات رئيسي بخبرة في الإرشاد وخبرة سير العمل Agile",
    "about.strength3": "حل المشاكل",
    "about.strength3Desc":
      "مهارات تحليلية قوية مع التركيز على الحلول القابلة للتوسع والموثوقة والآمنة",
    "about.strength4": "التركيز على المجتمع",
    "about.strength4Desc": "شغوف بإنشاء تكنولوجيا تخدم وتمكن المجتمعات",
    "about.stack": "Java, React, Node.js",
    "about.roles": "4 أدوار",

    // Skills Section
    "skills.webUI": "تطوير الويب وواجهة المستخدم",
    "skills.webUIDesc": "تقنيات الواجهة الأمامية والتصميم سريع الاستجابة",
    "skills.databases": "قواعد البيانات والسحابة",
    "skills.databasesDesc": "حلول تخزين البيانات ومنصات السحابة",
    "skills.tools": "أدوات التطوير والنشر",
    "skills.toolsDesc": "أدوات التطوير ومنصات الاستضافة",
    "skills.cert1": "Cisco Networking Essentials",
    "skills.cert2": "تدريب Full Stack (React.js و Spring Boot)",
    "skills.cert3": "التصميم الجرافيكي (Adobe Photoshop)",
    "skills.cert4": "القيادة وإدارة الفريق",
    "skills.cert5": "تدريب الصليب الأحمر الإنساني",
    "skills.softSkillsTitle": "المهارات الشخصية",
    "skills.skill1": "القيادة والإرشاد",
    "skills.skill2": "تنسيق الفريق",
    "skills.skill3": "حل المشاكل",
    "skills.skill4": "منهجية Agile",
    "skills.skill5": "مراجعة الكود",
    "skills.skill6": "التواصل التقني",
    "skills.skill7": "التعاون متعدد الثقافات",

    // Projects Section
    "projects.kardara": "نظام إدارة الأسهم Kardara",
    "projects.kardaraDesc":
      "تطبيق تحكم مخزون شامل قائم على Java بوحدات تدرك الدور وتحديثات الجرد ودعم التقارير للعمليات اليومية.",
    "projects.medireminder": "MediReminder",
    "projects.medreminderDesc":
      "تطبيق ذكي لتذكير الأدوية مصمم لتحسين الالتزام بالعلاج من خلال مسارات جدولة وإخطار واضحة.",
    "projects.mytask": "MyTaskMangement BestSeller",
    "projects.mytaskDesc":
      "منصة إدارة المهام الكاملة مع واجهة أمامية TypeScript وخلفية Java، مبنية حول سير العمل القابل للصيانة والعمارة النظيفة.",
    "projects.aucalms": "نظام إدارة مكتبة AUCA (IMS)",
    "projects.aucalmsDesc":
      "نظام متكامل لإدارة المكتبة والمخزون لـ AUCA. يدير مخزون الكتب والاستعارة/الإرجاع وسجلات الطلاب ويولد التقارير. مبني بـ Java لعمليات Backend قوية.",
    "projects.aucaapp": "بوابة التقديم عبر الإنترنت AUCA",
    "projects.aucaappDesc":
      "بوابة التحضيرية الحديثة AUCA مع TypeScript و React، مما يتيح تجارب تقديم صديقة للمستخدم للطلاب المحتملين.",
    "projects.studentmgmt":
      "AUCA IMS Frontend (University Information Management System)",
    "projects.studentmgmtDesc":
      "Built a modern, scalable frontend for a university information management platform supporting student registration, course and prerequisite workflows, term management, workload tracking, bans and waivers, announcements, and role-based administration. Designed for real institutional workflows with strong focus on maintainability, reusable components, and secure access control.",

    // About Section
    "about.title": "نبذة عني",
    "about.subtitle": "مطور شغوف وقائد تقني مستقبلي",
    "about.description":
      "أنا طالب هندسة برمجيات مخلص مع شغف لإنشاء حلول مبتكرة تحدث تأثيراً حقيقياً. رحلتي تجمع بين التميز التقني وحل المشاكل الإبداعي، مع التركيز دائماً على بناء تكنولوجيا تخدم المجتمعات وتحل مشاكل العالم الحقيقي.",
    "about.point1": "شغوف بتطوير البرمجيات والأمن السيبراني والشبكات",
    "about.point2":
      "أتعلم حالياً تطوير الهاتف المحمول المتقدم وإدارة Linux و Spring Boot",
    "about.point3": "أبني برمجيات تحل مشاكل المجتمع الحقيقية",
    "about.point4": "قائد مجتمعي ومتعاون في الفريق ومتعلم مدى الحياة",
    "about.primaryStack": "الحزمة التقنية الأساسية",
    "about.currentPositions": "المناصب الحالية",
    "about.keyAchievements": "الإنجازات الرئيسية",
    "about.achievement1Title": "6+ مشاريع منجزة",
    "about.achievement1Desc": "تطبيقات Full-Stack في الإنتاج",
    "about.achievement2Title": "أدوار قيادية متعددة",
    "about.achievement2Desc": "منظمات مجتمعية وفرق تقنية",
    "about.achievement3Title": "3+ شهادات",
    "about.achievement3Desc": "الشبكات والتصميم والمهارات التقنية",

    // Skills Section
    "skills.title": "المهارات التقنية",
    "skills.languages": "اللغات والأطر",
    "skills.subtitle": "أكثر من 30 تقنية في تطوير الويب والموبايل والخلفية",
    "skills.softSkills": "المهارات الشخصية",
    "skills.technologies": "تقنية",

    // Projects Section
    "projects.title": "المشاريع المميزة",
    "projects.viewProject": "عرض المشروع",
    "projects.inDevelopment": "قيد التطوير",
    "projects.subtitle":
      "عرض لمهاراتي التقنية وحل المشكلات الإبداعي من خلال تطبيقات واقعية",
    "projects.completed": "مكتمل",
    "projects.source": "المصدر",
    "projects.live": "العرض",

    // Contact Section
    "contact.title": "تواصل معي",
    "contact.subtitle": "لنبني شيئاً مذهلاً معاً",
    "contact.description":
      "أنا منفتح دائماً لمناقشة الفرص الجديدة والمشاريع المبتكرة، أو مجرد الدردشة حول التكنولوجيا وإمكانياتها لتغيير العالم.",
    "contact.email": "البريد الإلكتروني",
    "contact.whatsapp": "واتساب",
    "contact.location": "الموقع",
    "contact.phone": "الهاتف",
    "contact.linkedin": "لينكد إن",
    "contact.infoTitle": "معلومات التواصل",
    "contact.follow": "تابعني",
    "contact.sendMessage": "أرسل رسالة",
    "contact.name": "الاسم",
    "contact.subject": "الموضوع",
    "contact.message": "الرسالة",
    "contact.placeholderName": "اسمك",
    "contact.placeholderEmail": "your.email@example.com",
    "contact.placeholderSubject": "عن ماذا هذه الرسالة؟",
    "contact.placeholderMessage": "حدثني عن مشروعك أو فقط قل مرحباً!",
    "contact.send": "إرسال الرسالة",
    "contact.whatsappValue": "ابدأ محادثة على واتساب",
    "contact.locationValue": "كيغالي، رواندا",
    "contact.success": "تم إرسال الرسالة بنجاح!",
    "contact.error": "فشل إرسال الرسالة.",
    "contact.errorLater": "حدث خطأ. حاول مرة أخرى لاحقاً.",
    "contact.connectTitle": "لنتواصل بشكل مهني",
    "contact.actionsDescription":
      "استخدم زر التواصل السريع في الترويسة لإرسال رسالة مباشرة، أو قم بجدولة اجتماع فوراً عبر Google Calendar.",
    "contact.scheduleGoogle": "جدولة اجتماع على Google Calendar",
    "contact.sendEmailDirect": "إرسال بريد إلكتروني مباشرة",
    "contact.availabilityTag": "التوفر --الحالة",
    "contact.weekdaysHours": "أيام الأسبوع: 09:00 - 18:00 (CAT)",
    "contact.fastestResponse": "أسرع استجابة: واتساب أو البريد الإلكتروني",

    // Header
    "header.quickContact": "تواصل سريع",
    "header.schedule": "جدولة",
    "header.scheduleMeeting": "جدولة اجتماع",
    "header.quickFormTag": "التواصل --نموذج-سريع",
    "header.modalDescription":
      "أرسل رسالتك فوراً أو قم بجدولة اجتماع عبر التقويم.",

    // Footer
    "footer.quote": '"الإبداع + الكود + المجتمع = التغيير."',
    "footer.subquote": "لنبني حلولاً تمكن وتحول الحياة.",
    "footer.rights": "جميع الحقوق محفوظة.",
    "footer.backToTop": "العودة للأعلى ↑",
    "footer.profileSummary":
      "مهندس Full-stack يركز على منتجات موثوقة ذات أثر مجتمعي.",
    "footer.quickLinksTag": "التنقل --روابط-سريعة",
    "footer.directContactTag": "التواصل --مباشر",
    "footer.scheduleMeeting": "جدولة اجتماع",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return (translations[language] as Record<string, string>)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
