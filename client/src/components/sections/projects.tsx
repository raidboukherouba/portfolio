import { useEffect, useState } from 'react';
import { getProjects } from '../../services/projectService';

export default function ProjectsSection() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 dark:border-blue-400"></div>
      </div>
    );
  }

  return (
    <section className="py-8 px-4 sm:px-4 lg:px-4 bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            My Projects
          </h2>
          <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
            Things I've built with passion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects.map((project) => (
            <div 
              key={project._id}
              className="bg-white dark:bg-gray-950 rounded-md border border-gray-100 dark:border-gray-950 overflow-hidden"
            >
              {/* Project Image */}
              <div className="h-36 overflow-hidden">
                <img
                  src={project.imageUrl || '/default-project.png'}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Project Content */}
              <div className="px-6 py-4">
                <h3 className="font-bold text-gray-900 dark:text-white mb-1 h-15 line-clamp-2">
                  {project.title}
                </h3>
                
                {project.description && (
                  <p className="text-gray-600 dark:text-gray-300 mb-3 text-justify text-sm line-clamp-2">
                    {project.description}
                  </p>
                )}

                {/* Technologies */}
                {project.technologies?.length > 0 && (
                  <div className="flex flex-nowrap gap-1 mb-3 scrollbar-hide overflow-x-auto">
                    {project.technologies.map((tech: string) => (
                      <span 
                        key={tech}
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-neutral-100 dark:bg-gray-700 text-neutral-800 dark:text-gray-200 whitespace-nowrap"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* Project Links */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-2 py-0.5 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-semibold text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition"
                    >
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                      </svg>
                      Code
                    </a>
                  )}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-2 py-0.5 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-indigo-400 dark:bg-indigo-600 hover:bg-indigo-500 dark:hover:bg-indigo-700 transition"
                    >
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                      </svg>
                      Live Demo
                    </a>
                  )}
                </div>
              </div>

              {/* Project Date */}
              <div className="px-4 py-1 bg-gray-50 dark:bg-gray-800 text-xs text-gray-500 dark:text-gray-400">
                {new Date(project.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}