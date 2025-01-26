'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { init } from '@emailjs/browser';

interface ClubRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  teamName: string;
}

interface RegistrationFormData {
  parentFirstName: string;
  parentLastName: string;
  parentPhone: string;
  parentEmail: string;
  childFirstName: string;
  childLastName: string;
  age: string;
  gender: string;
  height: string;
  grade: string;
  highSchool: string;
  teamName: string;
}

// Update the initialization
init("-ZsSTEgASt2WFOV-V"); // Public key

export default function ClubRegistrationModal({ isOpen, onClose, teamName }: ClubRegistrationModalProps) {
  const [formData, setFormData] = useState<RegistrationFormData>({
    parentFirstName: '',
    parentLastName: '',
    parentPhone: '',
    parentEmail: '',
    childFirstName: '',
    childLastName: '',
    age: '',
    gender: '',
    height: '',
    grade: '',
    highSchool: '',
    teamName: teamName,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await emailjs.send(
        'service_673zm8a',  // Service ID
        'template_juj9lwc', // Template ID
        {
          parent_first_name: formData.parentFirstName,
          parent_last_name: formData.parentLastName,
          parent_phone: formData.parentPhone,
          parent_email: formData.parentEmail,
          child_first_name: formData.childFirstName,
          child_last_name: formData.childLastName,
          age: formData.age,
          gender: formData.gender,
          height: formData.height,
          grade: formData.grade,
          high_school: formData.highSchool,
          team_name: formData.teamName,
        },
        '-ZsSTEgASt2WFOV-V'  // Public key
      );

      setSubmitStatus('success');
      setTimeout(() => {
        onClose();
        setSubmitStatus('idle');
        setFormData({
          parentFirstName: '',
          parentLastName: '',
          parentPhone: '',
          parentEmail: '',
          childFirstName: '',
          childLastName: '',
          age: '',
          gender: '',
          height: '',
          grade: '',
          highSchool: '',
          teamName: teamName,
        });
      }, 2000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm">
      <div className="min-h-screen px-4 text-center">
        <div className="inline-block w-full max-w-md p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-emerald-600">Club Team Registration</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-emerald-500 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h4 className="text-emerald-600 text-lg mb-4">Parent Information</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="parentFirstName"
                    placeholder="First Name"
                    value={formData.parentFirstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-gray-50 text-gray-900 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="parentLastName"
                    placeholder="Last Name"
                    value={formData.parentLastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-gray-50 text-gray-900 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
                  />
                </div>
              </div>
              <div className="mt-4">
                <input
                  type="tel"
                  name="parentPhone"
                  placeholder="Phone Number"
                  value={formData.parentPhone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-gray-50 text-gray-900 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
                />
              </div>
              <div className="mt-4">
                <input
                  type="email"
                  name="parentEmail"
                  placeholder="Email Address"
                  value={formData.parentEmail}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-gray-50 text-gray-900 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <h4 className="text-emerald-600 text-lg mb-4">Child Information</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="childFirstName"
                    placeholder="First Name"
                    value={formData.childFirstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-gray-50 text-gray-900 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="childLastName"
                    placeholder="Last Name"
                    value={formData.childLastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-gray-50 text-gray-900 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
                  />
                </div>
              </div>
              <div className="mt-4">
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  value={formData.age}
                  onChange={handleInputChange}
                  required
                  min="8"
                  max="18"
                  className="w-full px-4 py-2 bg-gray-50 text-gray-900 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
                />
              </div>
              <div className="mt-4">
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-gray-50 text-gray-900 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <input
                    type="text"
                    name="height"
                    placeholder="Height"
                    value={formData.height}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-gray-50 text-gray-900 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="grade"
                    placeholder="Grade"
                    value={formData.grade}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-gray-50 text-gray-900 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
                  />
                </div>
              </div>
              <div className="mt-4">
                <input
                  type="text"
                  name="highSchool"
                  placeholder="High School"
                  value={formData.highSchool}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-gray-50 text-gray-900 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-lg bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>

            <AnimatePresence>
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-emerald-600 text-center mt-4"
                >
                  Registration successful! Redirecting...
                </motion.div>
              )}
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-500 text-center mt-4"
                >
                  Something went wrong. Please try again.
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </div>
  );
} 