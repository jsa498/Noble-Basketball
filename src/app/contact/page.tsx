//src//app//contact//page.tsx
'use client';

import { useState } from 'react';
import { MotionDiv } from '@/components/motion';
import RegistrationForm from '@/components/registration-form';
import emailjs from '@emailjs/browser';
import { programDetails } from '@/lib/constants';

interface FormData {
  childName: string;
  childAge: string;
  childGender: string;
  parentName: string;
  email: string;
  phone: string;
  message: string;
  program: {
    ageGroup: 'juniors' | 'seniors';
    sessions: 'oneDay' | 'twoDays';
  };
}

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      const selectedProgram = (programDetails as any).ageGroups[formData.program.ageGroup];
      const programCost = selectedProgram.pricing.monthly[formData.program.sessions];
      const sessionsText = formData.program.sessions === 'oneDay' ? '1 day' : '2 days';
      
      const templateParams = {
        to_name: "Noble Basketball",
        from_name: formData.parentName,
        child_name: formData.childName,
        child_age: formData.childAge,
        childGender: formData.childGender,
        email: formData.email,
        phone: formData.phone,
        message: formData.message || "No additional information provided",
        reply_to: formData.email,
        program_name: selectedProgram.name,
        sessions: `${sessionsText} per week`,
        program_cost: programCost,
        subject: `${selectedProgram.name} Registration`
      };

      await emailjs.send(
        "service_673zm8a",
        "template_o7xxojg",
        templateParams,
        "-ZsSTEgASt2WFOV-V"
      );

      alert('Registration submitted successfully!');
    } catch (error) {
      console.error("Error sending email:", error);
      alert("There was an error submitting your registration. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8"
        >
          <h1 className="text-3xl font-bold text-center mb-8">Register for Noble Basketball</h1>
          <RegistrationForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </MotionDiv>
      </div>
    </div>
  );
} 