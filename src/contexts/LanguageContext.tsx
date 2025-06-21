import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'fr' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.greeting': 'Hi, I\'m',
    'hero.name': 'Abdoulaye Zakaria Djerou',
    'hero.title': 'Software Engineering Student | Full-Stack & Mobile Developer | Future Cybersecurity Expert',
    'hero.description': 'As a passionate software engineering student at Adventist University of Central Africa (AUCA), I\'m at the beginning of my journey to become an IT professional. With a deep interest in web development and design, I thrive on combining technical skills with creativity to build innovative and user-friendly digital solutions.',
    'hero.location': '🌍 Chadian 🇹🇩 living in Rwanda 🇷🇼',
    'hero.education': '🎓 Studying at AUCA and currently part of the gym, the most intense software development training program in Rwanda',
    'hero.passion': '💡 Building real-world tech solutions',
    'hero.focus': '🔗 Passionate about tech for development and security',
    'hero.cta': 'Let\'s Connect',
    'hero.downloadCV': 'Download CV',
    
    // About Section
    'about.title': 'About Me',
    'about.subtitle': 'Passionate Developer & Future Tech Leader',
    'about.description': 'I am a dedicated software engineering student with a passion for creating innovative solutions that make a real impact. My journey combines technical excellence with creative problem-solving, always focusing on building technology that serves communities and solves real-world problems.',
    'about.point1': '💻 Passionate about software development, cybersecurity, and networks',
    'about.point2': 'Currently learning advanced mobile development,full stack software development focused in JavaScript and TypeScript',
    'about.point3': 'I build software that solves real community problems',
    'about.point4': 'Community leader, team collaborator, and lifelong learner',
    
    // Skills Section
    'skills.title': 'Technical Skills',
    'skills.languages': 'Languages & Frameworks',
    'skills.tools': 'Tools & Platforms',
    'skills.certifications': 'Certifications & Training',
    
    // Projects Section
    'projects.title': 'Featured Projects',
    'projects.viewProject': 'View Project',
    'projects.inDevelopment': 'In Development',
    
    // Contact Section
    'contact.title': 'Get In Touch',
    'contact.subtitle': 'Let\'s build something amazing together',
    'contact.description': 'I\'m always open to discussing new opportunities, innovative projects, or just having a chat about technology and its potential to change the world.',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.linkedin': 'LinkedIn',
    
    // Footer
    'footer.quote': '"Creativity + Code + Community = Change."',
    'footer.subquote': 'Let\'s build solutions that empower and transform lives.',
    'footer.rights': 'All rights reserved.',
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.about': 'À propos',
    'nav.projects': 'Projets',
    'nav.skills': 'Compétences',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.greeting': 'Salut, je suis',
    'hero.name': 'Abdoulaye Zakaria Djerou',
    'hero.title': 'Étudiant en Génie Logiciel | Développeur Full-Stack & Mobile | Futur Expert en Cybersécurité',
    'hero.description': 'En tant qu\'étudiant passionné en génie logiciel à l\'Université Adventiste d\'Afrique Centrale (AUCA), je suis au début de mon parcours pour devenir un professionnel de l\'informatique. Avec un intérêt profond pour le développement web et le design, je prospère en combinant les compétences techniques avec la créativité pour construire des solutions numériques innovantes et conviviales.',
    'hero.location': '🌍 Tchadien 🇹🇩 vivant au Rwanda 🇷🇼',
    'hero.education': '🎓 Étudiant à AUCA et actuellement membre du gym, le programme de formation en développement logiciel le plus intense du Rwanda',
    'hero.passion': '💡 Construire des solutions technologiques du monde réel',
    'hero.focus': '🔗 Passionné par la technologie pour le développement et la sécurité',
    'hero.cta': 'Connectons-nous',
    'hero.downloadCV': 'Télécharger CV',
    
    // About Section
    'about.title': 'À Propos de Moi',
    'about.subtitle': 'Développeur Passionné & Futur Leader Tech',
    'about.description': 'Je suis un étudiant en génie logiciel dévoué avec une passion pour créer des solutions innovantes qui ont un impact réel. Mon parcours combine l\'excellence technique avec la résolution créative de problèmes, en me concentrant toujours sur la construction de technologies qui servent les communautés et résolvent les problèmes du monde réel.',
    'about.point1': '💻 Passionné par le développement logiciel, la cybersécurité et les réseaux',
    'about.point2': 'Actuellement en apprentissage du développement mobile avancé, de l\'administration Linux et de Spring Boot',
    'about.point3': 'Je construis des logiciels qui résolvent de vrais problèmes communautaires',
    'about.point4': 'Leader communautaire, collaborateur d\'équipe et apprenant à vie',
    
    // Skills Section
    'skills.title': 'Compétences Techniques',
    'skills.languages': 'Langages & Frameworks',
    'skills.tools': 'Outils & Plateformes',
    'skills.certifications': 'Certifications & Formation',
    
    // Projects Section
    'projects.title': 'Projets Phares',
    'projects.viewProject': 'Voir le Projet',
    'projects.inDevelopment': 'En Développement',
    
    // Contact Section
    'contact.title': 'Entrons en Contact',
    'contact.subtitle': 'Construisons quelque chose d\'incroyable ensemble',
    'contact.description': 'Je suis toujours ouvert à discuter de nouvelles opportunités, de projets innovants, ou simplement à avoir une conversation sur la technologie et son potentiel à changer le monde.',
    'contact.email': 'Email',
    'contact.phone': 'Téléphone',
    'contact.linkedin': 'LinkedIn',
    
    // Footer
    'footer.quote': '"Créativité + Code + Communauté = Changement."',
    'footer.subquote': 'Construisons des solutions qui autonomisent et transforment les vies.',
    'footer.rights': 'Tous droits réservés.',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.about': 'نبذة عني',
    'nav.projects': 'المشاريع',
    'nav.skills': 'المهارات',
    'nav.contact': 'التواصل',
    
    // Hero Section
    'hero.greeting': 'مرحباً، أنا',
    'hero.name': 'عبد الله زكريا جيرو',
    'hero.title': 'طالب هندسة البرمجيات | مطور Full-Stack و Mobile | خبير أمن سيبراني مستقبلي',
    'hero.description': 'كطالب شغوف في هندسة البرمجيات في جامعة الأدفنتست في وسط أفريقيا (AUCA)، أنا في بداية رحلتي لأصبح محترف في تكنولوجيا المعلومات. مع اهتمام عميق بتطوير الويب والتصميم، أزدهر في دمج المهارات التقنية مع الإبداع لبناء حلول رقمية مبتكرة وسهلة الاستخدام.',
    'hero.location': '🌍 تشادي 🇹🇩 يعيش في رواندا 🇷🇼',
    'hero.education': '🎓 أدرس في AUCA وحالياً جزء من الجيم، برنامج التدريب الأكثر كثافة في تطوير البرمجيات في رواندا',
    'hero.passion': '💡 بناء حلول تقنية من العالم الحقيقي',
    'hero.focus': '🔗 شغوف بالتكنولوجيا للتنمية والأمان',
    'hero.cta': 'لنتواصل',
    'hero.downloadCV': 'تحميل السيرة الذاتية',
    
    // About Section
    'about.title': 'نبذة عني',
    'about.subtitle': 'مطور شغوف وقائد تقني مستقبلي',
    'about.description': 'أنا طالب هندسة برمجيات مخلص مع شغف لإنشاء حلول مبتكرة تحدث تأثيراً حقيقياً. رحلتي تجمع بين التميز التقني وحل المشاكل الإبداعي، مع التركيز دائماً على بناء تكنولوجيا تخدم المجتمعات وتحل مشاكل العالم الحقيقي.',
    'about.point1': '💻 شغوف بتطوير البرمجيات والأمن السيبراني والشبكات',
    'about.point2': 'أتعلم حالياً تطوير الهاتف المحمول المتقدم وإدارة Linux و Spring Boot',
    'about.point3': 'أبني برمجيات تحل مشاكل المجتمع الحقيقية',
    'about.point4': 'قائد مجتمعي ومتعاون في الفريق ومتعلم مدى الحياة',
    
    // Skills Section
    'skills.title': 'المهارات التقنية',
    'skills.languages': 'اللغات والأطر',
    'skills.tools': 'الأدوات والمنصات',
    'skills.certifications': 'الشهادات والتدريب',
    
    // Projects Section
    'projects.title': 'المشاريع المميزة',
    'projects.viewProject': 'عرض المشروع',
    'projects.inDevelopment': 'قيد التطوير',
    
    // Contact Section
    'contact.title': 'تواصل معي',
    'contact.subtitle': 'لنبني شيئاً مذهلاً معاً',
    'contact.description': 'أنا منفتح دائماً لمناقشة الفرص الجديدة والمشاريع المبتكرة، أو مجرد الدردشة حول التكنولوجيا وإمكانياتها لتغيير العالم.',
    'contact.email': 'البريد الإلكتروني',
    'contact.phone': 'الهاتف',
    'contact.linkedin': 'لينكد إن',
    
    // Footer
    'footer.quote': '"الإبداع + الكود + المجتمع = التغيير."',
    'footer.subquote': 'لنبني حلولاً تمكن وتحول الحياة.',
    'footer.rights': 'جميع الحقوق محفوظة.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};