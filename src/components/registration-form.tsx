'use client';

import { useState } from 'react';
import { programDetails } from '@/lib/constants';

type ProgramAgeGroup = 'juniors' | 'seniors';
type ProgramSessions = 'oneDay' | 'twoDays';

interface ProgramDetails {
  ageGroups: {
    [key in ProgramAgeGroup]: {
      name: string;
      pricing: {
        monthly: {
          [key in ProgramSessions]: number;
        };
      };
    };
  };
}

interface FormData {
  childName: string;
  childAge: string;
  childGender: string;
  parentName: string;
  email: string;
  phone: string;
  message: string;
  program: {
    ageGroup: ProgramAgeGroup;
    sessions: ProgramSessions;
  };
}

interface RegistrationFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
  isSubmitting: boolean;
}

export default function RegistrationForm({ onSubmit, isSubmitting }: RegistrationFormProps) {
  const [formData, setFormData] = useState<FormData>({
    childName: '',
    childAge: '',
    childGender: '',
    parentName: '',
    email: '',
    phone: '',
    message: '',
    program: {
      ageGroup: 'juniors',
      sessions: 'oneDay'
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof FormData] as Record<string, unknown>),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const getProgramPrice = () => {
    const { ageGroup, sessions } = formData.program;
    return (programDetails as ProgramDetails).ageGroups[ageGroup].pricing.monthly[sessions];
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Program Selection */}
      <div className="bg-gray-50 p-6 rounded-xl space-y-6">
        <h3 className="text-lg font-semibold text-emerald-700">Program Selection</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="program.ageGroup" className="block text-sm font-medium text-gray-700 mb-1">
              Program Type
            </label>
            <select
              id="program.ageGroup"
              name="program.ageGroup"
              value={formData.program.ageGroup}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
            >
              <option value="juniors">Juniors Training Program (Ages 8-12)</option>
              <option value="seniors">Seniors Training Program (Ages 13-18)</option>
            </select>
          </div>

          <div>
            <label htmlFor="program.sessions" className="block text-sm font-medium text-gray-700 mb-1">
              Sessions per Week
            </label>
            <select
              id="program.sessions"
              name="program.sessions"
              value={formData.program.sessions}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
            >
              <option value="oneDay">1 Day per Week</option>
              <option value="twoDays">2 Days per Week</option>
            </select>
          </div>
        </div>
        <div className="mt-2 bg-emerald-50 p-4 rounded-lg">
          <p className="text-emerald-700 font-medium">Selected Program Cost: ${getProgramPrice()}/month</p>
        </div>
      </div>

      {/* Player Information */}
      <div className="bg-gray-50 p-6 rounded-xl space-y-6">
        <h3 className="text-lg font-semibold text-emerald-700">Player Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="childName" className="block text-sm font-medium text-gray-700 mb-1">
              Child&apos;s Full Name
            </label>
            <input
              type="text"
              id="childName"
              name="childName"
              value={formData.childName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
              placeholder="Enter full name"
            />
          </div>
          
          <div>
            <label htmlFor="childAge" className="block text-sm font-medium text-gray-700 mb-1">
              Child&apos;s Age
            </label>
            <input
              type="number"
              id="childAge"
              name="childAge"
              value={formData.childAge}
              onChange={handleChange}
              required
              min="8"
              max="18"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
              placeholder="Enter age"
            />
          </div>

          <div>
            <label htmlFor="childGender" className="block text-sm font-medium text-gray-700 mb-1">
              Child&apos;s Gender
            </label>
            <select
              id="childGender"
              name="childGender"
              value={formData.childGender}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* Parent/Guardian Information */}
      <div className="bg-gray-50 p-6 rounded-xl space-y-6">
        <h3 className="text-lg font-semibold text-emerald-700">Parent/Guardian Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="parentName" className="block text-sm font-medium text-gray-700 mb-1">
              Parent/Guardian Name
            </label>
            <input
              type="text"
              id="parentName"
              name="parentName"
              value={formData.parentName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
              placeholder="Enter full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
              placeholder="Enter email address"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
              placeholder="Enter phone number"
            />
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-gray-50 p-6 rounded-xl space-y-6">
        <h3 className="text-lg font-semibold text-emerald-700">Additional Information</h3>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Additional Notes (Optional)
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 resize-none"
            placeholder="Any additional information you'd like us to know"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full bg-emerald-600 text-white py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg font-semibold ${
          isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-emerald-700'
        }`}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Submitting...
          </span>
        ) : (
          'Submit Registration'
        )}
      </button>
    </form>
  );
} 