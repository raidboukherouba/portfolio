import { useState } from 'react';
import { sendMessage } from '../../services/messageService';
import { BsFillSendFill } from "react-icons/bs";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await sendMessage(formData);
      setSubmitStatus({
        success: true,
        message: 'Message sent successfully!'
      });
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'Failed to send message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Contact Us</h2>
          <p className="my-2 text-lg text-gray-600 dark:text-gray-300">
            Ready to get started? Feel free to reach out through the contact form, Get in touch!
          </p>
        </div>

        <div className="bg-white dark:bg-black p-4 sm:p-8">
          {submitStatus && (
            <div
              className={`mb-4 p-4 rounded-md ${
                submitStatus.success
                  ? 'bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                  : 'bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200'
              }`}
            >
              {submitStatus.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative mt-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="eg. wail"
                  className="peer w-full focus:border-transparent focus:outline-none py-2 bg-transparent text-gray-900 dark:text-white"
                />
                <span className="absolute left-0 bottom-0 h-px w-full bg-gray-300 dark:bg-gray-600"></span>
                <span className="absolute left-1/2 bottom-0 h-0.5 w-0 bg-gray-400 dark:bg-gray-400 transition-all duration-300 transform -translate-x-1/2 peer-focus:w-full"></span>
              </div>
            </div>

            <div className="relative mt-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="eg. wail@gmail.com"
                  required
                  className="peer w-full focus:border-transparent focus:outline-none py-2 bg-transparent text-gray-900 dark:text-white"
                />
                <span className="absolute left-0 bottom-0 h-px w-full bg-gray-300 dark:bg-gray-600"></span>
                <span className="absolute left-1/2 bottom-0 h-0.5 w-0 bg-gray-400 dark:bg-gray-400 transition-all duration-300 transform -translate-x-1/2 peer-focus:w-full"></span>
              </div>
            </div>

            <div className="relative mt-4">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Your Message
              </label>
              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="peer w-full focus:border-transparent focus:outline-none py-2 resize-none bg-transparent text-gray-900 dark:text-white"
                />
                <span className="absolute left-0 bottom-0 h-px w-full bg-gray-300 dark:bg-gray-600"></span>
                <span className="absolute left-1/2 bottom-0 h-0.5 w-0 bg-gray-400 dark:bg-gray-400 transition-all duration-300 transform -translate-x-1/2 peer-focus:w-full"></span>
              </div>
            </div>

            <div className='flex w-full justify-end'>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`sm:w-1/3 md:w-1/4 lg:w-1/4 xl:w-1/5 flex items-center justify-center gap-2 py-2 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white dark:text-indigo-100 bg-indigo-400 dark:bg-indigo-600 cursor-pointer ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    <BsFillSendFill size={14} />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>We'll get back to you as soon as possible.</p>
        </div>
      </div>
    </section>
  );
}