import React, { createContext, useContext, useEffect, useState } from "react";

export type Language = "en" | "fr" | "ar";

/** Inline translations used by the content files in src/data. */
export type Localized = Record<Language, string>;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  tr: (value: Localized) => string;
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
      "Software Developer | MSIT Student at Carnegie Mellon University Africa | Full-Stack & Backend Engineering",
    "hero.description":
      "I build full-stack and backend systems with Java, Spring Boot, React, Next.js and PostgreSQL, like the academic management platform replacing AUCA's legacy registration. I'm a software developer at AUCA and an MSIT student at Carnegie Mellon University Africa, specializing in AI and machine learning.",
    "hero.location": "Chadian 🇹🇩 living in Rwanda 🇷🇼",
    "hero.education":
      "Studying at AUCA and currently part of the gym, the most intense software development training program in Rwanda",
    "hero.passion": "Building real-world tech solutions",
    "hero.focus": "Passionate about tech for development and security",
    "hero.cta": "Let's Connect",
    "hero.downloadCV": "Download CV",
    "hero.summaryLabel": "profile --summary",
    "hero.certificationsStat": "Certifications",
    "hero.scrollNext": "scroll --next",
    "hero.systemStatus": "system-status",
    "hero.roleEngineer": "role: engineer",
    "hero.statusAvailable": "status: available",
    "hero.locationLabel": "location: Kigali",
    "hero.focusLabel": "focus: full-stack",

    // About Section
    "about.title": "About Me",
    "about.subtitle":
      "Software developer, MSIT student, mentor",
    "about.description":
      "I'm a software developer and a Master of Science in Information Technology student at Carnegie Mellon University Africa, specializing in AI and machine learning. I build full-stack and backend applications: academic information systems, REST APIs, authentication and authorization, database design, and deployment on Linux servers.",
    "about.point1":
      "Backend-first full-stack developer: Java 21, Spring Boot, PostgreSQL, Next.js",
    "about.point2":
      "Studying AI & machine learning at Carnegie Mellon University Africa",
    "about.point3":
      "Former teaching assistant and coach: I enjoy helping others learn",
    "about.point4":
      "Interested in research, science, and technology that addresses challenges in Africa",
    "about.primaryStack": "Primary Tech Stack",
    "about.currentPositions": "Current Positions",
    "about.keyAchievements": "Key Achievements",
    "about.achievement1Title": "10+ Projects Built",
    "about.achievement1Desc": "Full-stack applications in production",
    "about.achievement2Title": "Multiple Leadership Roles",
    "about.achievement2Desc": "Community organizations & tech teams",
    "about.achievement3Title": "5 Certifications",
    "about.achievement3Desc": "Networking, design, and technical skills",

    // Skills Section
    "skills.title": "Technical Skills",
    "skills.languages": "Languages & Frameworks",
    "skills.certifications": "Certifications & Training",
    "skills.subtitle":
      "The languages, frameworks and tools I use across backend, frontend and deployment",
    "skills.softSkills": "Soft Skills",
    "skills.technologies": "technologies",
    "skills.manualScroll": "Manual Scroll",
    "skills.autoScroll": "Auto Scroll",

    // Projects Section
    "projects.title": "Featured Projects",
    "projects.viewProject": "View Project",
    "projects.inDevelopment": "In Development",
    "projects.subtitle":
      "A showcase of my technical skills and creative problem-solving through real-world applications",
    "projects.completed": "Completed",
    "projects.source": "Source",
    "projects.live": "Live",
    "projects.keyFeatures": "Key Features",
    "projects.techStack": "Tech Stack",

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
    "contact.connectTitle": "Let's Connect",
    "contact.actionsDescription":
      "Send a quick message, book a slot on my calendar, or email me directly. I usually reply within a day.",
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
    "experience.trainee": "Software Engineering Trainee",
    "experience.gym": "The Gym Rwanda",
    "experience.traineeDesc":
      "Build full-stack applications using React, Node.js, Express, and Tailwind CSS in collaborative teams. Apply Agile delivery practices including sprint planning, task decomposition, documentation, and peer code reviews.",
    "experience.volunteer": "Volunteer Coach",
    "experience.volunteerDesc":
      "Support junior developers through technical coaching sessions, practical code walkthroughs, and project guidance. Help teams improve communication, collaboration, and engineering discipline across delivery cycles.",
    "experience.fullstackdev": "Full-Stack Development",
    "experience.agile": "Agile Methodology",
    "experience.coaching": "Developer Coaching",
    "experience.community": "Community Mentoring",
    "experience.facilitation": "Technical Facilitation",
    "experience.location": "Kigali, Rwanda",
    "experience.nowPresent": "Present",

    // About Section Strengths
    "about.strength1":
      "Full-Stack & Backend",
    "about.strength1Desc":
      "Spring Boot services, PostgreSQL schemas, REST APIs and React/Next.js front-ends",
    "about.strength2":
      "Leadership & Mentoring",
    "about.strength2Desc":
      "Former lead engineer at ChadNova and teaching assistant at AUCA",
    "about.strength3":
      "Secure System Design",
    "about.strength3Desc":
      "Authentication, role-based access control and workflows built to scale",
    "about.strength4":
      "Tech for Africa",
    "about.strength4Desc":
      "Building technology that serves communities, from university systems to CleanEX",
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
    "projects.mytask": "MyTaskManagement BestSeller",
    "projects.mytaskDesc":
      "A full-stack task management platform with a TypeScript frontend and Java backend, built around maintainable workflows and clean architecture.",
    "projects.aucalms": "AUCA Library Management System (IMS)",
    "projects.aucalmsDesc":
      "Integrated library and inventory management system for AUCA. Manages book inventory, borrowing/returning, student records, and generates reports. Built with Java for robust backend operations.",
    "projects.aucaapp": "AUCA Online Application Portal",
    "projects.aucaappDesc":
      "A modern AUCA admissions web portal with TypeScript and React, enabling user-friendly online application experiences for prospective students.",
    "projects.studentmgmt":
      "AUCA IMS Frontend (University Information Management System)",
    "projects.studentmgmtDesc":
      "Built a modern, scalable frontend for a university information management platform supporting student registration, course and prerequisite workflows, term management, workload tracking, bans and waivers, announcements, and role-based administration. Designed for real institutional workflows with strong focus on maintainability, reusable components, and secure access control.",
    "projects.mytaskFeature1":
      "Modular frontend and backend coordination for task workflows",
    "projects.mytaskFeature2":
      "Structured state and data flow for maintainable features",
    "projects.mytaskFeature3":
      "Reliable CRUD lifecycle with clear task ownership",
    "projects.mytaskFeature4":
      "Scalable architecture prepared for team collaboration",
    "projects.kardaraFeature1":
      "Role-aware stock operations and inventory tracking",
    "projects.kardaraFeature2":
      "Structured data handling and reporting support",
    "projects.kardaraFeature3":
      "Operational workflows aligned to day-to-day usage",
    "projects.kardaraFeature4": "Maintainable desktop module organization",
    "projects.medireminderFeature1":
      "Medication scheduling with dependable reminder flows",
    "projects.medireminderFeature2":
      "Cross-platform mobile architecture using Flutter",
    "projects.medireminderFeature3":
      "Notification-first UX for adherence improvement",
    "projects.medireminderFeature4": "Offline-friendly local data behavior",
    "projects.aucalmsFeature1":
      "Domain-based modules for academic resource handling",
    "projects.aucalmsFeature2":
      "Clear borrowing and return workflows with user tracking",
    "projects.aucalmsFeature3":
      "Report-ready data operations for administration",
    "projects.aucalmsFeature4": "Maintainable Java desktop architecture",
    "projects.aucaappFeature1":
      "Institutional admission workflow modeled for usability",
    "projects.aucaappFeature2":
      "Responsive UI architecture with clear validation flow",
    "projects.aucaappFeature3":
      "Service-driven integration with backend endpoints",
    "projects.aucaappFeature4":
      "Scalable structure for future admission modules",
    "projects.studentmgmtFeature1":
      "Modular architecture with components, services, hooks, contexts, and domain types for long-term scalability",
    "projects.studentmgmtFeature2":
      "Reusable UI and action patterns across academic and administrative workflows",
    "projects.studentmgmtFeature3":
      "Centralized API client and caching utilities for cleaner data handling and better user experience",
    "projects.studentmgmtFeature4":
      "Production-style structure with protected routes, error handling, and role-based access control",

    // Footer
    "footer.quote": '"Creativity + Code + Community = Change."',
    "footer.subquote":
      "Let's build solutions that empower and transform lives.",
    "footer.rights": "All rights reserved.",
    "footer.backToTop": "Back to Top ↑",
    "footer.profileSummary":
      "Full-stack & backend developer and MSIT student at CMU-Africa.",
    "footer.quickLinksTag": "navigate --quick-links",
    "footer.directContactTag": "contact --direct",
    "footer.scheduleMeeting": "Schedule Meeting",

    // Misc UI labels
    "nav.journey": "Journey",
    "projects.featured": "Featured",
    "projects.other": "Other Projects",
    "projects.githubProfile": "GitHub Profile",
    "projects.privateRepo": "Private repository",
    "projects.advanced": "Advanced",
    "projects.intermediate": "Intermediate",
    "skills.count": "skills",
    "contact.quickDesc": "Send a quick message",
    "contact.scheduleDesc": "Book a meeting slot",
    "contact.emailDesc": "Reach me directly",
    "footer.available": "Available for opportunities",
    "header.language": "Change language",
    "header.toggleTheme": "Toggle theme",
    "header.menu": "Toggle menu",
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
      "Développeur logiciel | Étudiant MSIT à Carnegie Mellon University Africa | Ingénierie full-stack & back-end",
    "hero.description":
      "Je conçois des systèmes full-stack et back-end avec Java, Spring Boot, React, Next.js et PostgreSQL, comme la plateforme de gestion académique qui remplace l'ancien système d'inscription de l'AUCA. Je suis développeur logiciel à l'AUCA et étudiant MSIT à Carnegie Mellon University Africa, spécialisé en IA et apprentissage automatique.",
    "hero.location": "Tchadien 🇹🇩 vivant au Rwanda 🇷🇼",
    "hero.education":
      "Étudiant à AUCA et actuellement membre du gym, le programme de formation en développement logiciel le plus intense du Rwanda",
    "hero.passion": "Construire des solutions technologiques du monde réel",
    "hero.focus":
      "Passionné par la technologie pour le développement et la sécurité",
    "hero.cta": "Connectons-nous",
    "hero.downloadCV": "Télécharger CV",
    "hero.summaryLabel": "profil --résumé",
    "hero.certificationsStat": "Certifications",
    "hero.scrollNext": "défiler --suite",
    "hero.systemStatus": "état-système",
    "hero.roleEngineer": "rôle : ingénieur",
    "hero.statusAvailable": "statut : disponible",
    "hero.locationLabel": "localisation : Kigali",
    "hero.focusLabel": "focus : full-stack",

    // About Section
    "about.title": "À Propos de Moi",
    "about.subtitle":
      "Développeur logiciel, étudiant MSIT, mentor",
    "about.description":
      "Je suis développeur logiciel et étudiant en Master of Science in Information Technology à Carnegie Mellon University Africa, spécialisé en IA et apprentissage automatique. Je conçois des applications full-stack et back-end : systèmes d'information académiques, API REST, authentification et autorisation, conception de bases de données et déploiement sur serveurs Linux.",
    "about.point1":
      "Développeur full-stack orienté back-end : Java 21, Spring Boot, PostgreSQL, Next.js",
    "about.point2":
      "J'étudie l'IA et l'apprentissage automatique à Carnegie Mellon University Africa",
    "about.point3":
      "Ancien assistant d'enseignement et coach : j'aime aider les autres à apprendre",
    "about.point4":
      "Intéressé par la recherche, la science et la technologie au service des défis de l'Afrique",
    "about.primaryStack": "Stack technique principal",
    "about.currentPositions": "Postes actuels",
    "about.keyAchievements": "Réalisations clés",
    "about.achievement1Title": "10+ projets réalisés",
    "about.achievement1Desc": "Applications full-stack en production",
    "about.achievement2Title": "Plusieurs rôles de leadership",
    "about.achievement2Desc": "Organisations communautaires et équipes tech",
    "about.achievement3Title": "5 certifications",
    "about.achievement3Desc": "Réseaux, design et compétences techniques",

    // Skills Section
    "skills.title": "Compétences Techniques",
    "skills.languages": "Langages & Frameworks",
    "skills.certifications": "Certifications & Formation",
    "skills.subtitle":
      "Les langages, frameworks et outils que j'utilise en back-end, en front-end et en déploiement",
    "skills.softSkills": "Compétences humaines",
    "skills.technologies": "technologies",
    "skills.manualScroll": "Défilement manuel",
    "skills.autoScroll": "Défilement automatique",

    // Projects Section
    "projects.title": "Projets Phares",
    "projects.viewProject": "Voir le Projet",
    "projects.inDevelopment": "En Développement",
    "projects.subtitle":
      "Une vitrine de mes compétences techniques et de ma résolution créative de problèmes à travers des applications réelles",
    "projects.completed": "Terminé",
    "projects.source": "Source",
    "projects.live": "Démo",
    "projects.keyFeatures": "Fonctionnalités clés",
    "projects.techStack": "Pile technologique",

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
    "contact.connectTitle": "Connectons-nous",
    "contact.actionsDescription":
      "Envoyez un message rapide, réservez un créneau dans mon agenda ou écrivez-moi directement. Je réponds généralement sous 24 h.",
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
    "experience.trainee": "Stagiaire en Génie Logiciel",
    "experience.gym": "The Gym Rwanda",
    "experience.traineeDesc":
      "Développer des applications Full-Stack avec React, Node.js, Express et Tailwind CSS dans des équipes collaboratives. Appliquer des pratiques Agile comme la planification de sprint, la décomposition des tâches, la documentation et les revues de code entre pairs.",
    "experience.volunteer": "Coach Bénévole",
    "experience.volunteerDesc":
      "Accompagner les développeurs juniors à travers des sessions de coaching technique, des revues de code pratiques et un suivi de projets. Renforcer la communication d'équipe, la collaboration et la discipline d'ingénierie.",
    "experience.fullstackdev": "Développement Full-Stack",
    "experience.agile": "Méthodologie Agile",
    "experience.coaching": "Coaching de Développeurs",
    "experience.community": "Mentorat Communautaire",
    "experience.facilitation": "Facilitation Technique",
    "experience.location": "Kigali, Rwanda",
    "experience.nowPresent": "Actuellement",

    // About Section Strengths
    "about.strength1":
      "Full-stack & back-end",
    "about.strength1Desc":
      "Services Spring Boot, schémas PostgreSQL, API REST et front-ends React/Next.js",
    "about.strength2":
      "Leadership & mentorat",
    "about.strength2Desc":
      "Ancien lead engineer chez ChadNova et assistant d'enseignement à l'AUCA",
    "about.strength3":
      "Conception de systèmes sécurisés",
    "about.strength3Desc":
      "Authentification, contrôle d'accès par rôles et processus conçus pour monter en charge",
    "about.strength4":
      "La tech pour l'Afrique",
    "about.strength4Desc":
      "Une technologie au service des communautés, des systèmes universitaires à CleanEX",
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
    "projects.mytask": "MyTaskManagement BestSeller",
    "projects.mytaskDesc":
      "Une plateforme complète de gestion des tâches avec un frontend TypeScript et un backend Java, construite autour de flux de travail maintenables et d'une architecture propre.",
    "projects.aucalms": "Système de Gestion de Bibliothèque AUCA (IMS)",
    "projects.aucalmsDesc":
      "Système intégré de gestion de bibliothèque et d'inventaire pour AUCA. Gère l'inventaire des livres, les emprunts/retours, les dossiers d'étudiants et génère des rapports. Construit avec Java pour des opérations backend robustes.",
    "projects.aucaapp": "Portail de Candidature en Ligne AUCA",
    "projects.aucaappDesc":
      "Un portail d'admission AUCA moderne avec TypeScript et React, permettant des expériences de candidature en ligne conviviales pour les étudiants potentiels.",
    "projects.studentmgmt":
      "Frontend AUCA IMS (Système de Gestion des Informations Universitaires)",
    "projects.studentmgmtDesc":
      "Développement d'un frontend moderne et évolutif pour une plateforme de gestion universitaire, prenant en charge l'inscription des étudiants, les parcours de cours et prérequis, la gestion des trimestres, le suivi de la charge de travail, les interdictions et dérogations, les annonces, ainsi que l'administration basée sur les rôles. Conçu pour des flux institutionnels réels avec un fort accent sur la maintenabilité, les composants réutilisables et le contrôle d'accès sécurisé.",
    "projects.mytaskFeature1":
      "Coordination modulaire frontend-backend pour les flux de tâches",
    "projects.mytaskFeature2":
      "Flux d'état et de données structuré pour une meilleure maintenabilité",
    "projects.mytaskFeature3":
      "Cycle CRUD fiable avec attribution claire des responsabilités",
    "projects.mytaskFeature4":
      "Architecture évolutive prête pour la collaboration d'équipe",
    "projects.kardaraFeature1":
      "Opérations de stock sensibles aux rôles et suivi d'inventaire",
    "projects.kardaraFeature2":
      "Traitement structuré des données et support de reporting",
    "projects.kardaraFeature3":
      "Flux opérationnels alignés sur l'utilisation quotidienne",
    "projects.kardaraFeature4": "Organisation modulaire desktop maintenable",
    "projects.medireminderFeature1":
      "Planification des médicaments avec rappels fiables",
    "projects.medireminderFeature2":
      "Architecture mobile multiplateforme avec Flutter",
    "projects.medireminderFeature3":
      "UX orientée notifications pour améliorer l'adhérence",
    "projects.medireminderFeature4":
      "Comportement local adapté aux usages hors ligne",
    "projects.aucalmsFeature1":
      "Modules orientés domaine pour la gestion académique",
    "projects.aucalmsFeature2":
      "Flux clairs d'emprunt et de retour avec suivi utilisateur",
    "projects.aucalmsFeature3":
      "Opérations prêtes pour les rapports administratifs",
    "projects.aucalmsFeature4": "Architecture desktop Java maintenable",
    "projects.aucaappFeature1":
      "Workflow d'admission institutionnel conçu pour l'utilisabilité",
    "projects.aucaappFeature2":
      "Architecture UI responsive avec validation claire",
    "projects.aucaappFeature3":
      "Intégration orientée services avec les endpoints backend",
    "projects.aucaappFeature4":
      "Structure évolutive pour de futurs modules d'admission",
    "projects.studentmgmtFeature1":
      "Architecture modulaire avec composants, services, hooks, contextes et types domaine",
    "projects.studentmgmtFeature2":
      "Patterns UI/actions réutilisables sur les flux académiques et administratifs",
    "projects.studentmgmtFeature3":
      "Client API centralisé et utilitaires de cache pour une meilleure expérience",
    "projects.studentmgmtFeature4":
      "Structure de production avec routes protégées et gestion d'erreurs",

    // Footer
    "footer.quote": '"Créativité + Code + Communauté = Changement."',
    "footer.subquote":
      "Construisons des solutions qui autonomisent et transforment les vies.",
    "footer.rights": "Tous droits réservés.",
    "footer.backToTop": "Retour en haut ↑",
    "footer.profileSummary":
      "Développeur full-stack & back-end, étudiant MSIT à CMU-Africa.",
    "footer.quickLinksTag": "navigation --liens-rapides",
    "footer.directContactTag": "contact --direct",
    "footer.scheduleMeeting": "Planifier une réunion",

    // Misc UI labels
    "nav.journey": "Parcours",
    "projects.featured": "En vedette",
    "projects.other": "Autres projets",
    "projects.githubProfile": "Profil GitHub",
    "projects.privateRepo": "Dépôt privé",
    "projects.advanced": "Avancé",
    "projects.intermediate": "Intermédiaire",
    "skills.count": "compétences",
    "contact.quickDesc": "Envoyer un message rapide",
    "contact.scheduleDesc": "Réserver un créneau",
    "contact.emailDesc": "Me contacter directement",
    "footer.available": "Disponible pour des opportunités",
    "header.language": "Changer de langue",
    "header.toggleTheme": "Changer de thème",
    "header.menu": "Ouvrir le menu",
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
      "مطور برمجيات | طالب ماجستير تقنية المعلومات في جامعة كارنيغي ميلون أفريقيا | هندسة التطبيقات المتكاملة والخوادم",
    "hero.description":
      "أبني أنظمة متكاملة وخوادم باستخدام Java وSpring Boot وReact وNext.js وPostgreSQL، مثل منصة الإدارة الأكاديمية التي تحل محل نظام التسجيل القديم في AUCA. أعمل مطور برمجيات في AUCA وأدرس ماجستير تقنية المعلومات في جامعة كارنيغي ميلون أفريقيا بتخصص الذكاء الاصطناعي وتعلم الآلة.",
    "hero.location": "تشادي 🇹🇩 يعيش في رواندا 🇷🇼",
    "hero.education":
      "أدرس في AUCA وحالياً جزء من الجيم، برنامج التدريب الأكثر كثافة في تطوير البرمجيات في رواندا",
    "hero.passion": " بناء حلول تقنية من العالم الحقيقي",
    "hero.focus": " شغوف بالتكنولوجيا للتنمية والأمان",
    "hero.cta": "لنتواصل",
    "hero.downloadCV": "تحميل السيرة الذاتية",
    "hero.summaryLabel": "الملف --ملخص",
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
    "experience.trainee": "متدرب هندسة برمجيات",
    "experience.gym": "The Gym Rwanda",
    "experience.traineeDesc":
      "بناء تطبيقات Full-Stack باستخدام React و Node.js و Express و Tailwind CSS ضمن فرق تعاونية. تطبيق ممارسات Agile مثل تخطيط Sprint وتقسيم المهام والتوثيق ومراجعات الكود بين الزملاء.",
    "experience.volunteer": "مدرب متطوع",
    "experience.volunteerDesc":
      "دعم المطورين المبتدئين عبر جلسات تدريب تقني ومراجعات كود عملية وتوجيه المشاريع. المساعدة في تحسين التواصل والتعاون والانضباط الهندسي داخل الفرق.",
    "experience.fullstackdev": "تطوير Full-Stack",
    "experience.agile": "منهجية Agile",
    "experience.coaching": "تدريب المطورين",
    "experience.community": "إرشاد مجتمعي",
    "experience.facilitation": "تيسير تقني",
    "experience.location": "كيغالي، رواندا",
    "experience.nowPresent": "الحاضر",

    // About Section Strengths
    "about.strength1":
      "التطوير المتكامل والخوادم",
    "about.strength1Desc":
      "خدمات Spring Boot ومخططات PostgreSQL وواجهات REST وواجهات React/Next.js",
    "about.strength2":
      "القيادة والإرشاد",
    "about.strength2Desc":
      "مهندس رئيسي سابق في ChadNova ومساعد تدريس سابق في AUCA",
    "about.strength3":
      "تصميم أنظمة آمنة",
    "about.strength3Desc":
      "المصادقة والتحكم بالوصول حسب الأدوار ومسارات عمل مصممة للتوسع",
    "about.strength4":
      "التقنية من أجل أفريقيا",
    "about.strength4Desc":
      "بناء تقنية تخدم المجتمعات، من الأنظمة الجامعية إلى CleanEX",
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
    "projects.mytask": "MyTaskManagement BestSeller",
    "projects.mytaskDesc":
      "منصة إدارة المهام الكاملة مع واجهة أمامية TypeScript وخلفية Java، مبنية حول سير العمل القابل للصيانة والعمارة النظيفة.",
    "projects.aucalms": "نظام إدارة مكتبة AUCA (IMS)",
    "projects.aucalmsDesc":
      "نظام متكامل لإدارة المكتبة والمخزون لـ AUCA. يدير مخزون الكتب والاستعارة/الإرجاع وسجلات الطلاب ويولد التقارير. مبني بـ Java لعمليات Backend قوية.",
    "projects.aucaapp": "بوابة التقديم عبر الإنترنت AUCA",
    "projects.aucaappDesc":
      "بوابة التحضيرية الحديثة AUCA مع TypeScript و React، مما يتيح تجارب تقديم صديقة للمستخدم للطلاب المحتملين.",
    "projects.studentmgmt": "واجهة AUCA IMS (نظام إدارة المعلومات الجامعية)",
    "projects.studentmgmtDesc":
      "تم تطوير واجهة أمامية حديثة وقابلة للتوسع لمنصة إدارة معلومات جامعية تدعم تسجيل الطلاب، ومسارات المقررات والمتطلبات المسبقة، وإدارة الفصول الدراسية، وتتبع عبء العمل، والحظر والإعفاءات، والإعلانات، والإدارة المعتمدة على الأدوار. صُممت لتخدم سير العمل المؤسسي الحقيقي مع تركيز قوي على سهولة الصيانة، والمكونات القابلة لإعادة الاستخدام، والتحكم الآمن في الوصول.",
    "projects.mytaskFeature1":
      "تنسيق معياري بين الواجهة الأمامية والخلفية لمسارات المهام",
    "projects.mytaskFeature2": "تدفق حالة وبيانات منظم لسهولة الصيانة",
    "projects.mytaskFeature3": "دورة CRUD موثوقة مع ملكية واضحة للمهام",
    "projects.mytaskFeature4": "معمارية قابلة للتوسع وجاهزة للتعاون بين الفريق",
    "projects.kardaraFeature1": "عمليات مخزون تراعي الأدوار وتتبع الجرد",
    "projects.kardaraFeature2": "معالجة بيانات منظمة ودعم التقارير",
    "projects.kardaraFeature3": "تدفقات تشغيلية متوافقة مع الاستخدام اليومي",
    "projects.kardaraFeature4": "تنظيم وحدات سطح مكتب قابل للصيانة",
    "projects.medireminderFeature1": "جدولة الأدوية مع تدفقات تذكير موثوقة",
    "projects.medireminderFeature2":
      "معمارية موبايل متعددة المنصات باستخدام Flutter",
    "projects.medireminderFeature3":
      "تجربة استخدام قائمة على الإشعارات لتحسين الالتزام",
    "projects.medireminderFeature4":
      "سلوك بيانات محلي مناسب للاستخدام دون اتصال",
    "projects.aucalmsFeature1":
      "وحدات مبنية على المجال لإدارة الموارد الأكاديمية",
    "projects.aucalmsFeature2":
      "تدفقات واضحة للاستعارة والإرجاع مع تتبع المستخدم",
    "projects.aucalmsFeature3": "عمليات بيانات جاهزة للتقارير الإدارية",
    "projects.aucalmsFeature4": "معمارية Java لسطح المكتب سهلة الصيانة",
    "projects.aucaappFeature1": "مسار قبول مؤسسي مصمم لسهولة الاستخدام",
    "projects.aucaappFeature2": "معمارية واجهة متجاوبة مع تدفق تحقق واضح",
    "projects.aucaappFeature3":
      "تكامل قائم على طبقة الخدمات مع نقاط نهاية الخلفية",
    "projects.aucaappFeature4": "بنية قابلة للتوسع لوحدات قبول مستقبلية",
    "projects.studentmgmtFeature1":
      "معمارية معيارية تضم المكونات والخدمات والخطافات والسياقات وأنواع المجال",
    "projects.studentmgmtFeature2":
      "أنماط واجهة وإجراءات قابلة لإعادة الاستخدام عبر المسارات الأكاديمية والإدارية",
    "projects.studentmgmtFeature3":
      "عميل API مركزي وأدوات تخزين مؤقت لتحسين تجربة الاستخدام",
    "projects.studentmgmtFeature4":
      "بنية إنتاجية مع مسارات محمية ومعالجة أخطاء",

    // About Section
    "about.title": "نبذة عني",
    "about.subtitle":
      "مطور برمجيات، طالب ماجستير، ومرشد",
    "about.description":
      "أنا مطور برمجيات وطالب ماجستير العلوم في تقنية المعلومات بجامعة كارنيغي ميلون أفريقيا، بتخصص الذكاء الاصطناعي وتعلم الآلة. أبني تطبيقات متكاملة وخوادم: أنظمة معلومات أكاديمية، وواجهات REST، والمصادقة والتفويض، وتصميم قواعد البيانات، والنشر على خوادم Linux.",
    "about.point1":
      "مطور متكامل يركز على الخوادم: Java 21 وSpring Boot وPostgreSQL وNext.js",
    "about.point2":
      "أدرس الذكاء الاصطناعي وتعلم الآلة في جامعة كارنيغي ميلون أفريقيا",
    "about.point3":
      "مساعد تدريس ومدرب سابق: أستمتع بمساعدة الآخرين على التعلم",
    "about.point4":
      "مهتم بالبحث والعلوم والتقنية التي تعالج تحديات أفريقيا",
    "about.primaryStack": "الحزمة التقنية الأساسية",
    "about.currentPositions": "المناصب الحالية",
    "about.keyAchievements": "الإنجازات الرئيسية",
    "about.achievement1Title": "+10 مشاريع منجزة",
    "about.achievement1Desc": "تطبيقات Full-Stack في الإنتاج",
    "about.achievement2Title": "أدوار قيادية متعددة",
    "about.achievement2Desc": "منظمات مجتمعية وفرق تقنية",
    "about.achievement3Title": "5 شهادات",
    "about.achievement3Desc": "الشبكات والتصميم والمهارات التقنية",

    // Skills Section
    "skills.title": "المهارات التقنية",
    "skills.languages": "اللغات والأطر",
    "skills.subtitle":
      "اللغات والأطر والأدوات التي أستخدمها في الخوادم والواجهات والنشر",
    "skills.softSkills": "المهارات الشخصية",
    "skills.technologies": "تقنية",
    "skills.manualScroll": "تمرير يدوي",
    "skills.autoScroll": "تمرير تلقائي",

    // Projects Section
    "projects.title": "المشاريع المميزة",
    "projects.viewProject": "عرض المشروع",
    "projects.inDevelopment": "قيد التطوير",
    "projects.subtitle":
      "عرض لمهاراتي التقنية وحل المشكلات الإبداعي من خلال تطبيقات واقعية",
    "projects.completed": "مكتمل",
    "projects.source": "المصدر",
    "projects.live": "العرض",
    "projects.keyFeatures": "الميزات الأساسية",
    "projects.techStack": "الحزمة التقنية",

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
    "contact.connectTitle": "لنتواصل",
    "contact.actionsDescription":
      "أرسل رسالة سريعة، أو احجز موعداً في تقويمي، أو راسلني مباشرة. عادةً أرد خلال يوم.",
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
      "مطور متكامل وخوادم، وطالب ماجستير في CMU-Africa.",
    "footer.quickLinksTag": "التنقل --روابط-سريعة",
    "footer.directContactTag": "التواصل --مباشر",
    "footer.scheduleMeeting": "جدولة اجتماع",

    // Misc UI labels
    "nav.journey": "المسيرة",
    "projects.featured": "مميز",
    "projects.other": "مشاريع أخرى",
    "projects.githubProfile": "حساب GitHub",
    "projects.privateRepo": "مستودع خاص",
    "projects.advanced": "متقدم",
    "projects.intermediate": "متوسط",
    "skills.count": "مهارة",
    "contact.quickDesc": "أرسل رسالة سريعة",
    "contact.scheduleDesc": "احجز موعداً",
    "contact.emailDesc": "تواصل معي مباشرة",
    "footer.available": "متاح للفرص",
    "header.language": "تغيير اللغة",
    "header.toggleTheme": "تبديل المظهر",
    "header.menu": "القائمة",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem("language");
      if (saved === "en" || saved === "fr" || saved === "ar") return saved;
    } catch {
      // storage unavailable (private mode); fall back to default
    }
    return "en";
  });

  useEffect(() => {
    try {
      localStorage.setItem("language", language);
    } catch {
      // ignore
    }
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const t = (key: string): string => {
    return (translations[language] as Record<string, string>)[key] || key;
  };

  const tr = (value: Localized): string => value[language] ?? value.en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, tr }}>
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
