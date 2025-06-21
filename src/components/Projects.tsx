import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {  Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Projects: React.FC = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects = [
    {
      title: 'Kardara Stock Management System',
      description: 'A comprehensive Java-based stock control system featuring role-based access, automatic updates, and a user-friendly interface.',
      technologies: ['Java', 'Swing', 'MySQL', 'JDBC'],
      status: 'completed',
      image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800',
      github: '#',
      demo: '#',
    },
    {
      title: 'MediReminder',
      description: 'A Flutter mobile app that reminds users when to take their medications, improving treatment adherence through a sleek and intuitive interface.',
      technologies: ['Flutter', 'Dart', 'SQLite', 'Local Notifications'],
      status: 'completed',
      image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=800',
      github: '#',
      demo: '#',
    },
    {
      title: 'Employee Attendance Management',
      description: 'A system to track employee attendance and leave requests with robust security built using Spring Boot and React.',
      technologies: ['Spring Boot', 'React', 'PostgreSQL', 'JWT'],
      status: 'completed',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      github: '#',
      demo: '#',
    },
    {
      title: 'Predictive Policing in Rwanda',
      description: 'This project leverages Big Data and machine learning to predict and visualize crime patterns in Rwanda, enabling smarter and more proactive policing strategies.',
      technologies: ['Python', 'Machine Learning', 'Data Visualization', 'Big Data'],
      status: 'completed',
      image: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=800',
      github: '#',
      demo: '#',
    },
    {
      title: 'AUCA Library Management System',
      description: 'A complete LMS using Java Swings where admin can track borrowed books, issue books, and manage students and books. Students can login and request to borrow books.',
      technologies: ['Java', 'Swing', 'MySQL', 'CRUD Operations'],
      status: 'completed',
      image: '/lms.png',
      github: '#',
      demo: '#',
    },
    {
      title: 'MotoExpress',
      description: 'A full-stack platform for express motor delivery service — integrates real-time tracking, service scheduling, and customer feedback.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'Maps API'],
      status: 'development',
      image: 'https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=800',
      github: '#',
      demo: '#',
    },
  ];

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('projects.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A showcase of my technical skills and creative problem-solving through real-world applications
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                  {project.status === 'development' ? (
                    <span className="px-3 py-1 bg-yellow-500 text-white text-xs font-medium rounded-full flex items-center gap-1">
                      <Clock size={12} />
                      {t('projects.inDevelopment')}
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                      Completed
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;