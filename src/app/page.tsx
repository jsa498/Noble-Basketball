'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { MotionDiv, MotionH1, MotionP, GlowingButton } from '@/components/motion';
import { programDetails, trainingFocus, coaches } from '@/lib/constants';
import emailjs from '@emailjs/browser';
import TrainingGallery from '@/components/training-gallery';
import Image from 'next/image';

type ProgramAgeGroup = 'juniors' | 'seniors';
type ProgramSessions = 'oneDay' | 'twoDays';

interface FormData {
  childName: string;
  childAge: string;
  parentName: string;
  email: string;
  phone: string;
  message: string;
  program: {
    ageGroup: ProgramAgeGroup;
    sessions: ProgramSessions;
  };
}

interface Program {
  name: string;
  ageRange: string;
  pricing: {
    oneDay: number;
    twoDays: number;
  };
}

interface ProgramDetails {
  ageGroups: {
    juniors: Program;
    seniors: Program;
  };
  maxGroupSize: number;
  features: string[];
}

interface ProgramSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  program: ProgramAgeGroup;
  onConfirm: (sessions: ProgramSessions) => void;
}

const ProgramSelectionModal = ({ isOpen, onClose, program, onConfirm }: ProgramSelectionModalProps) => {
  if (!isOpen) return null;

  const programInfo = (programDetails as ProgramDetails).ageGroups[program];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-75 backdrop-blur-sm">
      <div className="flex min-h-full items-center justify-center p-4">
        <MotionDiv
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl mx-4 sm:mx-auto"
        >
          {/* Header */}
          <div className="bg-emerald-600 p-6 text-center">
            <h3 className="text-2xl font-bold text-white">
              {programInfo.name}
            </h3>
            <p className="text-emerald-50 mt-1">
              Ages {programInfo.ageRange}
            </p>
          </div>

          {/* Content */}
          <div className="p-6">
            <p className="text-gray-600 text-center text-lg mb-6">
              Choose your preferred training schedule:
            </p>
            <div className="space-y-4">
              <button
                onClick={() => onConfirm('oneDay')}
                className="flex items-center justify-between w-full p-5 text-left border-2 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-200 group"
              >
                <div>
                  <p className="font-semibold text-lg text-gray-900 group-hover:text-emerald-600">1 Day per Week</p>
                  <p className="text-sm text-gray-500">Perfect for beginners</p>
                </div>
                <div className="text-2xl font-bold text-emerald-600">
                  ${programInfo.pricing.oneDay}/month
                </div>
              </button>
              
              <button
                onClick={() => onConfirm('twoDays')}
                className="flex items-center justify-between w-full p-5 text-left border-2 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-200 group"
              >
                <div>
                  <p className="font-semibold text-lg text-gray-900 group-hover:text-emerald-600">2 Days per Week</p>
                  <p className="text-sm text-gray-500">Recommended for faster progress</p>
                </div>
                <div className="text-2xl font-bold text-emerald-600">
                  ${programInfo.pricing.twoDays}/month
                </div>
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 px-4 rounded-xl bg-white text-gray-700 font-medium border-2 hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </MotionDiv>
      </div>
    </div>
  );
};

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  programName: string;
}

const SuccessModal = ({ isOpen, onClose, programName }: SuccessModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-75 backdrop-blur-sm">
      <div className="flex min-h-full items-center justify-center p-4">
        <MotionDiv
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl mx-4 sm:mx-auto"
        >
          {/* Success Icon */}
          <div className="bg-emerald-600 p-6 text-center">
            <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4">
              <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Registration Successful!
            </h3>
            <p className="text-emerald-50">
              Welcome to {programName}
            </p>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="text-center space-y-4">
              <p className="text-gray-600">
                Thank you for registering with Noble Basketball! We&apos;re excited to have you join our program.
              </p>
              <div className="bg-emerald-50 p-4 rounded-xl">
                <p className="text-emerald-800 font-medium">
                  What happens next?
                </p>
                <ul className="text-sm text-emerald-700 mt-2 space-y-2">
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    Our team will contact you within 24 hours
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    We&apos;ll help schedule your first training session
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors duration-200"
            >
              Got it, thanks!
            </button>
          </div>
        </MotionDiv>
      </div>
    </div>
  );
};

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    childName: '',
    childAge: '',
    parentName: '',
    email: '',
    phone: '',
    message: '',
    program: {
      ageGroup: 'juniors',
      sessions: 'oneDay'
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragPosition, setDragPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const carouselRef = useRef<HTMLDivElement>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<ProgramAgeGroup | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successProgramName, setSuccessProgramName] = useState('');

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth >= 768 ? 3 : 1);
    };
    
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = Math.ceil(trainingFocus.length / itemsPerPage);

  const handleTransitionEnd = () => {
    if (currentSlide >= totalSlides + 1) {
      setIsTransitioning(true);
      setCurrentSlide(1);
      // Use double RAF for smoother transition
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(false);
        });
      });
    } else if (currentSlide <= 0) {
      setIsTransitioning(true);
      setCurrentSlide(totalSlides);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(false);
        });
      });
    }
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    setIsAutoPlaying(false);
    const pos = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragStart(pos);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const pos = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const delta = dragStart - pos;
    setDragPosition(delta);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = window.innerWidth * 0.2; // 20% of viewport width
    if (Math.abs(dragPosition) > threshold) {
      if (dragPosition > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    setDragPosition(0);
    setIsAutoPlaying(true);
  };

  const nextSlide = useCallback(() => {
    if (!isTransitioning) {
      setCurrentSlide(prev => prev + 1);
    }
  }, [isTransitioning]);

  const prevSlide = useCallback(() => {
    if (!isTransitioning) {
      setCurrentSlide(prev => prev - 1);
    }
  }, [isTransitioning]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index + 1);
    setIsAutoPlaying(false);
  }, []);

  // Auto-play functionality with easing
  useEffect(() => {
    if (!isAutoPlaying || isDragging) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 5000); // Slower interval for better UX

    return () => clearInterval(timer);
  }, [isAutoPlaying, nextSlide, isDragging]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => {
    if (!isDragging) {
      setIsAutoPlaying(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const selectedProgram = (programDetails as ProgramDetails).ageGroups[formData.program.ageGroup];
    const programCost = selectedProgram.pricing[formData.program.sessions];
    const sessionsText = formData.program.sessions === 'oneDay' ? '1 day' : '2 days';
    
    try {
      const templateParams = {
        to_name: "Noble Basketball",
        from_name: formData.parentName,
        child_name: formData.childName,
        child_age: formData.childAge,
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

      // Set success modal data
      setSuccessProgramName(selectedProgram.name);
      setShowSuccessModal(true);

      // Clear form
      setFormData({
        childName: '',
        childAge: '',
        parentName: '',
        email: '',
        phone: '',
        message: '',
        program: {
          ageGroup: 'juniors',
          sessions: 'oneDay'
        }
      });
    } catch (error) {
      console.error("Error sending email:", error);
      alert("There was an error submitting your registration. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
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
    return (programDetails as ProgramDetails).ageGroups[ageGroup].pricing[sessions];
  };

  const handleProgramSelect = (program: ProgramAgeGroup) => {
    setSelectedProgram(program);
    setIsModalOpen(true);
  };

  const handleSessionConfirm = (sessions: ProgramSessions) => {
    if (selectedProgram) {
      setFormData(prev => ({
        ...prev,
        program: {
          ageGroup: selectedProgram,
          sessions: sessions
        }
      }));
      setIsModalOpen(false);
      // Smooth scroll to registration form
      document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/noble.mp4" type="video/mp4" />
          </video>
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 text-center text-white">
          <MotionH1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg"
          >
            Elevate Your Game with Noble Basketball
          </MotionH1>
          <MotionP 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 text-white/90"
          >
            Comprehensive youth training and skill development programs for ages {programDetails.ageGroups.juniors.ageRange} and {programDetails.ageGroups.seniors.ageRange}
          </MotionP>
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <GlowingButton
              href="#contact"
              text="Join Now"
              className="text-lg"
            />
          </MotionDiv>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="relative py-20 bg-white">
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5" />
        <div className="relative container mx-auto px-4">
          {/* Gallery Section */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Training in Action</h2>
            <TrainingGallery />
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Our Training Programs</h2>
            <p className="text-xl text-gray-600">
              Comprehensive basketball training designed to develop skills, build confidence, and foster a love for the game.
            </p>
          </MotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <MotionDiv
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Program Structure</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-2">•</span>
                  <span>Skill development</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-2">•</span>
                  <span>Team plays/drills</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-2">•</span>
                  <span>Full-Body conditioning</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-2">•</span>
                  <span>Group Training</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-2">•</span>
                  <span>Tournaments/Scrimmages</span>
                </li>
              </ul>
            </MotionDiv>

            <MotionDiv
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-2xl font-bold mb-6 text-gray-900">What&apos;s Included</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-2">•</span>
                  <span>High Level Coaching</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-2">•</span>
                  <span>Flexible schedule</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-2">•</span>
                  <span>Regular progress assessments</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-2">•</span>
                  <span>Friendly environment</span>
                </li>
              </ul>
            </MotionDiv>

            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 col-span-1 md:col-span-2"
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Tournament Opportunities</h3>
              <p className="text-gray-600 mb-6">
                Players will have the opportunity to participate in local tournaments and compete as part of our Noble Basketball team. Tournament participation requires tryouts and selection to the competitive team. Additional tournament fees will be determined based on the number of tournaments entered throughout the season.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-emerald-600 mr-2">•</span>
                  <span>Regular scrimmages and game situations</span>
                </div>
                <div className="flex items-start">
                  <span className="text-emerald-600 mr-2">•</span>
                  <span>Competitive team tryouts</span>
                </div>
                <div className="flex items-start">
                  <span className="text-emerald-600 mr-2">•</span>
                  <span>Local tournament participation</span>
                </div>
                <div className="flex items-start">
                  <span className="text-emerald-600 mr-2">•</span>
                  <span>Team building and leadership development</span>
                </div>
              </div>
            </MotionDiv>
          </div>

          {/* Training Focus Carousel */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-8 text-gray-900">What You&apos;ll Learn</h2>
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden bg-white rounded-2xl shadow-lg"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative">
                {/* Desktop Carousel (3 items) */}
                <div className="hidden md:block">
                  <div 
                    ref={carouselRef}
                    className="flex touch-pan-y"
                    style={{ 
                      transform: `translateX(calc(-${currentSlide * 100}% - ${isDragging ? dragPosition : 0}px))`,
                      transition: isTransitioning ? 'none' : 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                      willChange: 'transform'
                    }}
                    onTransitionEnd={handleTransitionEnd}
                    onMouseDown={handleDragStart}
                    onMouseMove={handleDragMove}
                    onMouseUp={handleDragEnd}
                    onMouseLeave={handleDragEnd}
                    onTouchStart={handleDragStart}
                    onTouchMove={handleDragMove}
                    onTouchEnd={handleDragEnd}
                  >
                    {/* Clone last page at the beginning */}
                    <div className="w-full flex-none grid grid-cols-3 gap-6 p-8">
                      {trainingFocus.slice(-3).map((focus, index) => (
                        <div
                          key={`clone-start-${index}`}
                          className="bg-emerald-50 rounded-xl p-6 transform transition-all duration-300 hover:scale-[1.02]"
                        >
                          <h3 className="text-xl font-semibold mb-3 text-gray-900">{focus}</h3>
                          <p className="text-gray-600">
                            {focus === "Strong shooting form" && "Master proper shooting form to become a more consistent shooter."}
                            {focus === "Quick finishing" && "Develop elite finishing moves around the rim with both hands under defensive pressure."}
                            {focus === "Perimeter shooting" && "Enhance your range and accuracy from beyond the arc with game-speed shooting drills."}
                            {focus === "Advanced dribbling" && "Build confidence in your ball handling with complex dribbling combinations and moves."}
                            {focus === "Court vision" && "Learn to read the defense and make smart decisions with the ball in real game situations."}
                            {focus === "Stamina building" && "Improve your endurance and conditioning to maintain peak performance throughout the game."}
                            {focus === "Mental alertness" && "Develop quick decision-making skills and basketball IQ through situational training."}
                            {focus === "Game situations" && "Practice real-game scenarios to prepare for high-pressure moments on the court."}
                            {focus === "Team play" && "Learn to work effectively with teammates through offensive and defensive strategies."}
                            {focus === "Leadership on/off court" && "Develop leadership qualities and communication skills that extend beyond basketball."}
                            {focus === "Vertical training" && "Enhance your jumping ability and explosiveness through specialized exercises."}
                            {focus === "Body Strength and Conditioning" && "Build basketball-specific strength and agility for improved on-court performance."}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Original slides */}
                    {Array.from({ length: Math.ceil(trainingFocus.length / 3) }).map((_, pageIndex) => (
                      <div key={pageIndex} className="w-full flex-none grid grid-cols-3 gap-6 p-8">
                        {trainingFocus.slice(pageIndex * 3, (pageIndex + 1) * 3).map((focus, index) => (
                          <div
                            key={index}
                            className="bg-emerald-50 rounded-xl p-6 transform transition-all duration-300 hover:scale-[1.02]"
                          >
                            <h3 className="text-xl font-semibold mb-3 text-gray-900">{focus}</h3>
                            <p className="text-gray-600">
                              {focus === "Strong shooting form" && "Master proper shooting form to become a more consistent shooter."}
                              {focus === "Quick finishing" && "Develop elite finishing moves around the rim with both hands under defensive pressure."}
                              {focus === "Perimeter shooting" && "Enhance your range and accuracy from beyond the arc with game-speed shooting drills."}
                              {focus === "Advanced dribbling" && "Build confidence in your ball handling with complex dribbling combinations and moves."}
                              {focus === "Court vision" && "Learn to read the defense and make smart decisions with the ball in real game situations."}
                              {focus === "Stamina building" && "Improve your endurance and conditioning to maintain peak performance throughout the game."}
                              {focus === "Mental alertness" && "Develop quick decision-making skills and basketball IQ through situational training."}
                              {focus === "Game situations" && "Practice real-game scenarios to prepare for high-pressure moments on the court."}
                              {focus === "Team play" && "Learn to work effectively with teammates through offensive and defensive strategies."}
                              {focus === "Leadership on/off court" && "Develop leadership qualities and communication skills that extend beyond basketball."}
                              {focus === "Vertical training" && "Enhance your jumping ability and explosiveness through specialized exercises."}
                              {focus === "Body Strength and Conditioning" && "Build basketball-specific strength and agility for improved on-court performance."}
                            </p>
                          </div>
                        ))}
                      </div>
                    ))}

                    {/* Clone first page at the end */}
                    <div className="w-full flex-none grid grid-cols-3 gap-6 p-8">
                      {trainingFocus.slice(0, 3).map((focus, index) => (
                        <div
                          key={`clone-end-${index}`}
                          className="bg-emerald-50 rounded-xl p-6 transform transition-all duration-300 hover:scale-[1.02]"
                        >
                          <h3 className="text-xl font-semibold mb-3 text-gray-900">{focus}</h3>
                          <p className="text-gray-600">
                            {focus === "Strong shooting form" && "Master proper shooting form to become a more consistent shooter."}
                            {focus === "Quick finishing" && "Develop elite finishing moves around the rim with both hands under defensive pressure."}
                            {focus === "Perimeter shooting" && "Enhance your range and accuracy from beyond the arc with game-speed shooting drills."}
                            {focus === "Advanced dribbling" && "Build confidence in your ball handling with complex dribbling combinations and moves."}
                            {focus === "Court vision" && "Learn to read the defense and make smart decisions with the ball in real game situations."}
                            {focus === "Stamina building" && "Improve your endurance and conditioning to maintain peak performance throughout the game."}
                            {focus === "Mental alertness" && "Develop quick decision-making skills and basketball IQ through situational training."}
                            {focus === "Game situations" && "Practice real-game scenarios to prepare for high-pressure moments on the court."}
                            {focus === "Team play" && "Learn to work effectively with teammates through offensive and defensive strategies."}
                            {focus === "Leadership on/off court" && "Develop leadership qualities and communication skills that extend beyond basketball."}
                            {focus === "Vertical training" && "Enhance your jumping ability and explosiveness through specialized exercises."}
                            {focus === "Body Strength and Conditioning" && "Build basketball-specific strength and agility for improved on-court performance."}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mobile Carousel (1 item) */}
                <div className="md:hidden">
                  <div 
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ 
                      transform: `translateX(-${currentSlide * 100}%)`,
                      transitionProperty: isTransitioning ? 'none' : 'transform'
                    }}
                    onTransitionEnd={handleTransitionEnd}
                  >
                    {/* Clone last item at the beginning */}
                    <div className="w-full flex-none p-6">
                      <div className="bg-emerald-50 rounded-xl p-6">
                        <h3 className="text-xl font-semibold mb-3 text-gray-900">{trainingFocus[trainingFocus.length - 1]}</h3>
                        <p className="text-gray-600">
                          {trainingFocus[trainingFocus.length - 1] === "Strong shooting form" && "Master proper shooting form to become a more consistent shooter."}
                          {trainingFocus[trainingFocus.length - 1] === "Quick finishing" && "Develop elite finishing moves around the rim with both hands under defensive pressure."}
                          {trainingFocus[trainingFocus.length - 1] === "Perimeter shooting" && "Enhance your range and accuracy from beyond the arc with game-speed shooting drills."}
                          {trainingFocus[trainingFocus.length - 1] === "Advanced dribbling" && "Build confidence in your ball handling with complex dribbling combinations and moves."}
                          {trainingFocus[trainingFocus.length - 1] === "Court vision" && "Learn to read the defense and make smart decisions with the ball in real game situations."}
                          {trainingFocus[trainingFocus.length - 1] === "Stamina building" && "Improve your endurance and conditioning to maintain peak performance throughout the game."}
                          {trainingFocus[trainingFocus.length - 1] === "Mental alertness" && "Develop quick decision-making skills and basketball IQ through situational training."}
                          {trainingFocus[trainingFocus.length - 1] === "Game situations" && "Practice real-game scenarios to prepare for high-pressure moments on the court."}
                          {trainingFocus[trainingFocus.length - 1] === "Team play" && "Learn to work effectively with teammates through offensive and defensive strategies."}
                          {trainingFocus[trainingFocus.length - 1] === "Leadership on/off court" && "Develop leadership qualities and communication skills that extend beyond basketball."}
                          {trainingFocus[trainingFocus.length - 1] === "Vertical training" && "Enhance your jumping ability and explosiveness through specialized exercises."}
                          {trainingFocus[trainingFocus.length - 1] === "Body Strength and Conditioning" && "Build basketball-specific strength and agility for improved on-court performance."}
                        </p>
                      </div>
                    </div>

                    {/* Original items */}
                    {trainingFocus.map((focus, index) => (
                      <div
                        key={index}
                        className="w-full flex-none p-6"
                      >
                        <div className="bg-emerald-50 rounded-xl p-6">
                          <h3 className="text-xl font-semibold mb-3 text-gray-900">{focus}</h3>
                          <p className="text-gray-600">
                            {focus === "Strong shooting form" && "Master proper shooting form to become a more consistent shooter."}
                            {focus === "Quick finishing" && "Develop elite finishing moves around the rim with both hands under defensive pressure."}
                            {focus === "Perimeter shooting" && "Enhance your range and accuracy from beyond the arc with game-speed shooting drills."}
                            {focus === "Advanced dribbling" && "Build confidence in your ball handling with complex dribbling combinations and moves."}
                            {focus === "Court vision" && "Learn to read the defense and make smart decisions with the ball in real game situations."}
                            {focus === "Stamina building" && "Improve your endurance and conditioning to maintain peak performance throughout the game."}
                            {focus === "Mental alertness" && "Develop quick decision-making skills and basketball IQ through situational training."}
                            {focus === "Game situations" && "Practice real-game scenarios to prepare for high-pressure moments on the court."}
                            {focus === "Team play" && "Learn to work effectively with teammates through offensive and defensive strategies."}
                            {focus === "Leadership on/off court" && "Develop leadership qualities and communication skills that extend beyond basketball."}
                            {focus === "Vertical training" && "Enhance your jumping ability and explosiveness through specialized exercises."}
                            {focus === "Body Strength and Conditioning" && "Build basketball-specific strength and agility for improved on-court performance."}
                          </p>
                        </div>
                      </div>
                    ))}

                    {/* Clone first item at the end */}
                    <div className="w-full flex-none p-6">
                      <div className="bg-emerald-50 rounded-xl p-6">
                        <h3 className="text-xl font-semibold mb-3 text-gray-900">{trainingFocus[0]}</h3>
                        <p className="text-gray-600">
                          {trainingFocus[0] === "Strong shooting form" && "Master proper shooting form to become a more consistent shooter."}
                          {trainingFocus[0] === "Quick finishing" && "Develop elite finishing moves around the rim with both hands under defensive pressure."}
                          {trainingFocus[0] === "Perimeter shooting" && "Enhance your range and accuracy from beyond the arc with game-speed shooting drills."}
                          {trainingFocus[0] === "Advanced dribbling" && "Build confidence in your ball handling with complex dribbling combinations and moves."}
                          {trainingFocus[0] === "Court vision" && "Learn to read the defense and make smart decisions with the ball in real game situations."}
                          {trainingFocus[0] === "Stamina building" && "Improve your endurance and conditioning to maintain peak performance throughout the game."}
                          {trainingFocus[0] === "Mental alertness" && "Develop quick decision-making skills and basketball IQ through situational training."}
                          {trainingFocus[0] === "Game situations" && "Practice real-game scenarios to prepare for high-pressure moments on the court."}
                          {trainingFocus[0] === "Team play" && "Learn to work effectively with teammates through offensive and defensive strategies."}
                          {trainingFocus[0] === "Leadership on/off court" && "Develop leadership qualities and communication skills that extend beyond basketball."}
                          {trainingFocus[0] === "Vertical training" && "Enhance your jumping ability and explosiveness through specialized exercises."}
                          {trainingFocus[0] === "Body Strength and Conditioning" && "Build basketball-specific strength and agility for improved on-court performance."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation Dots */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                  {Array.from({ length: totalSlides }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-500 ${
                        index === (currentSlide - 1) % totalSlides 
                          ? 'bg-emerald-600 w-8' 
                          : 'bg-emerald-200 hover:bg-emerald-300'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-gray-600 hover:bg-white hover:scale-110 transition-all duration-300"
                  aria-label="Previous slide"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-gray-600 hover:bg-white hover:scale-110 transition-all duration-300"
                  aria-label="Next slide"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </MotionDiv>
          </div>

          {/* Pricing Section */}
          <section id="program-pricing" className="w-full py-16 px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Program Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Juniors Program */}
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-emerald-600 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{programDetails.ageGroups.juniors.name}</h3>
                  <p className="text-emerald-100">Ages {programDetails.ageGroups.juniors.ageRange}</p>
                </div>
                <div className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-baseline">
                      <span className="text-gray-600">1 Day per Week</span>
                      <span className="text-2xl font-bold text-gray-900">${programDetails.ageGroups.juniors.pricing.oneDay}/month</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-gray-600">2 Days per Week</span>
                      <span className="text-2xl font-bold text-gray-900">${programDetails.ageGroups.juniors.pricing.twoDays}/month</span>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {programDetails.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <svg className="h-5 w-5 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    onClick={() => handleProgramSelect('juniors')}
                    className="block w-full text-center px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer"
                  >
                    Register Now
                  </a>
                </div>
              </MotionDiv>

              {/* Seniors Program */}
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-emerald-700 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{programDetails.ageGroups.seniors.name}</h3>
                  <p className="text-emerald-100">Ages {programDetails.ageGroups.seniors.ageRange}</p>
                </div>
                <div className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-baseline">
                      <span className="text-gray-600">1 Day per Week</span>
                      <span className="text-2xl font-bold text-gray-900">${programDetails.ageGroups.seniors.pricing.oneDay}/month</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-gray-600">2 Days per Week</span>
                      <span className="text-2xl font-bold text-gray-900">${programDetails.ageGroups.seniors.pricing.twoDays}/month</span>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {programDetails.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <svg className="h-5 w-5 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    onClick={() => handleProgramSelect('seniors')}
                    className="block w-full text-center px-6 py-3 bg-emerald-700 text-white font-semibold rounded-lg hover:bg-emerald-800 transition-colors cursor-pointer"
                  >
                    Register Now
                  </a>
                </div>
              </MotionDiv>
            </div>
          </section>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-20 bg-emerald-50">
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5" />
        <div className="relative container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Meet Our Coaches</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            {coaches.map((coach, index) => (
              <MotionDiv
                key={coach.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  {coach.image && (
                    <Image
                      src={coach.image}
                      alt={coach.name}
                      fill
                      className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-1">{coach.name}</h3>
                    <p className="text-emerald-400 font-medium">{coach.title}</p>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <p className="text-gray-600">{coach.bio}</p>
                  <div className="flex items-center space-x-4 pt-4">
                    {coach.certifications?.map((cert, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-sm font-medium"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex space-x-4">
                      {coach.social?.linkedin && (
                        <a
                          href={coach.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        </a>
                      )}
                      {coach.social?.instagram && (
                        <a
                          href={coach.social.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                        </a>
                      )}
                    </div>
                    <button
                      className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
                      onClick={() => window.location.href = '#contact'}
                    >
                      Book a Session
                    </button>
                  </div>
                </div>
              </MotionDiv>
            ))}
          </div>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300"
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-8 text-gray-900">Our Sponsors</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative">
                    <div className="mb-4 h-16 w-16 mx-auto">
                      <Image
                        src="/images/exotic-detailing-logo.png"
                        alt="Exotic Detailing Logo"
                        width={64}
                        height={64}
                        className="object-contain"
                      />
                    </div>
                    <h4 className="text-lg font-semibold text-emerald-600 mb-2">Exotic Detailing</h4>
                    <p className="text-gray-600 mb-4">
                      Premium auto detailing services supporting local youth sports development.
                    </p>
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-sm text-gray-500 italic">
                        "Proud to support the next generation of athletes in our community."
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative">
                    <div className="mb-4 h-16 w-16 mx-auto">
                      <Image
                        src="/images/devflow-logo.png"
                        alt="DevFlow Technologies Logo"
                        width={64}
                        height={64}
                        className="object-contain"
                      />
                    </div>
                    <h4 className="text-lg font-semibold text-emerald-600 mb-2">DevFlow Technologies</h4>
                    <p className="text-gray-600 mb-4">
                      Innovative software solutions empowering the next generation of athletes.
                    </p>
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-sm text-gray-500 italic">
                        "Technology and sports go hand in hand in modern athlete development."
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-xl p-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Interested in becoming a sponsor?</h4>
                <p className="text-gray-600 mb-6">
                  Join us in shaping the future of youth basketball. Our sponsorship program offers various 
                  benefits and opportunities to make a real impact in our community.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Brand Visibility</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Community Impact</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Event Access</span>
                  </div>
                </div>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200 font-medium"
                >
                  Become a Sponsor
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 bg-white">
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5" />
        <div className="relative container mx-auto px-4">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
          >
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Register for Noble Basketball</h2>
            
            <form id="registration-form" onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="childName" className="block text-sm font-medium text-gray-700 mb-1">
                    Child&apos;s Name
                  </label>
                  <input
                    type="text"
                    id="childName"
                    name="childName"
                    value={formData.childName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
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
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="program.ageGroup" className="block text-sm font-medium text-gray-700 mb-1">
                    Program
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

              <div className="bg-emerald-50 p-4 rounded-lg">
                <p className="text-emerald-800 font-medium">
                  Selected Program Cost: ${getProgramPrice()} per month
                </p>
              </div>

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
                />
              </div>

              <div>
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
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Information (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-emerald-600 text-white py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg font-semibold ${
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
          </MotionDiv>
        </div>
      </section>

      {/* Add the modal */}
      <ProgramSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        program={selectedProgram || 'juniors'}
        onConfirm={handleSessionConfirm}
      />

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        programName={successProgramName}
      />
    </>
  );
}
