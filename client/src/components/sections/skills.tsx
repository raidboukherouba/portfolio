import { useEffect, useState } from 'react';
import { getSkills, Skill } from '../../services/skillService';

export default function SkillsSection() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      getSkills()
        .then(setSkills)
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
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              My Skills
            </h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
              Technologies I'm proficient with
            </p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7">
            {skills.map((skill) => (
              <div 
                key={skill._id}
                className="rounded-sm p-3 flex flex-col items-center"
              >
                {skill.logo && (
                  <div className="w-8 h-8 mb-2 flex items-center justify-center">
                    <img 
                      src={skill.logo} 
                      alt={skill.name} 
                      className="max-w-full max-h-full"
                    />
                  </div>
                )}
                <h3 className="text-sm font-medium text-gray-900 dark:text-white text-center">
                  {skill.name}
                </h3>
                {skill.level && (
                  <span className={`mt-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                    skill.level === 'Advanced' 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' 
                      : skill.level === 'Intermediate' 
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200' 
                        : 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200'
                  }`}>
                    {skill.level}
                  </span>                 
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
}