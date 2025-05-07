import { useEffect, useState } from 'react';
import { getDiplomas, Diploma } from '../../services/diplomaService';
import { getCertifications, Certification } from '../../services/certificationService';
import { PiCertificate } from "react-icons/pi";
import { GiDiploma } from "react-icons/gi";

export default function ResumeSection() {
  const [diplomas, setDiplomas] = useState<Diploma[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getDiplomas(), getCertifications()])
      .then(([diplomasData, certsData]) => {
        setDiplomas(diplomasData);
        setCertifications(certsData);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-blue-400"></div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            My Resume
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Education and professional certifications
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Diplomas Column */}
          <div className="lg:w-1/2">
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
                <GiDiploma size={26} className='inline-block mr-2 text-gray-800 dark:text-gray-200'/>
                Education
              </h3>
              
              <div className="space-y-6">
                {diplomas.length > 0 ? (
                  diplomas.map((diploma) => (
                    <div key={diploma._id} className="pb-6">
                      <div className="bg-white dark:bg-black p-4">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{diploma.title}</h4>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {diploma.institution && (
                            <span className="flex items-center mr-4">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                              {diploma.institution}
                            </span>
                          )}
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {formatDate(diploma.date)}
                          </span>
                        </div>
                        {diploma.field && (
                          <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                            {diploma.field}
                          </p>
                        )}
                        {diploma.description && (
                          <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm text-justify line-clamp-3">
                            {diploma.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-4">No diplomas to display</p>
                )}
              </div>
            </div>
          </div>

          {/* Certifications Column */}
          <div className="lg:w-1/2">
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
                <PiCertificate size={26} className='inline-block mr-2 text-gray-800 dark:text-gray-200'/>
                Certifications
              </h3>
              
              <div className="space-y-6">
                {certifications.length > 0 ? (
                  certifications.map((cert) => (
                    <div key={cert._id} className="pb-6">
                      <div className="bg-white dark:bg-black p-4">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{cert.title}</h4>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {cert.issuer && (
                            <span className="flex items-center mr-4">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                              {cert.issuer}
                            </span>
                          )}
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {formatDate(cert.date)}
                          </span>
                        </div>
                        {cert.description && (
                          <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm text-justify line-clamp-3">
                            {cert.description}
                          </p>
                        )}
                        {cert.credentialUrl && (
                          <a 
                            href={cert.credentialUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center mt-3 text-sm text-green-600 dark:text-green-400 hover:underline"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            View Credential
                          </a>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-4">No certifications to display</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}