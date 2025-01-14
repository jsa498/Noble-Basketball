'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { MotionDiv, MotionH1, MotionP } from '@/components/motion';
import { programDetails, trainingFocus, coaches } from '@/lib/constants';
import emailjs from '@emailjs/browser';

export default function Home() {
  const [formData, setFormData] = useState({
    childName: '',
    childAge: '',
    parentName: '',
    email: '',
    phone: '',
    message: '',
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
        subject: `New Registration: ${formData.childName} (Age ${formData.childAge})`,
        registration_details: `
          Registration Details:
          -------------------
          Child's Information:
          • Name: ${formData.childName}
          • Age: ${formData.childAge}

          Parent/Guardian Information:
          • Name: ${formData.parentName}
          • Email: ${formData.email}
          • Phone: ${formData.phone}

          Additional Information:
          ${formData.message || "None provided"}

          Program Details:
          • Two sessions per week
          • Professional coaching
          • Small group training (max 12 players)
          • Regular progress assessments
          
          Monthly Fee: $99.99
        `
      };

      await emailjs.send(
        "service_673zm8a",
        "template_o7xxojg",
        templateParams,
        "-ZsSTEgASt2WFOV-V"
      );

      // Clear form after successful submission
      setFormData({
        childName: '',
        childAge: '',
        parentName: '',
        email: '',
        phone: '',
        message: '',
      });

      // Show success message
      alert("Thank you for registering! We'll contact you shortly with next steps.");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("There was an error submitting your registration. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-emerald-800 z-0" />
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10 z-0" />
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
          }}
        />
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <MotionDiv
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-32 h-32 mx-auto mb-8 relative"
            >
        <Image
                src="/nobleLogo.jpg"
                alt="Noble Basketball Logo"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-contain rounded-full"
          priority
        />
            </MotionDiv>
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
              Comprehensive youth training and skill development programs for ages {programDetails.ageRange}
            </MotionP>
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <a 
                href="#contact"
                className="inline-block bg-white text-emerald-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-emerald-50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Join Now
              </a>
            </MotionDiv>
          </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                '/images/083CB076-315E-4D93-BE67-B70131B3DF91.JPG',
                '/images/1BFD9662-6B1A-4883-8E5F-58C765F491F8.JPG',
                '/images/3E4A2C59-39AE-4719-859D-E775DD95AE96.JPG',
                '/images/405398B1-8102-4DE6-9537-D1BC39251D31.JPG',
                '/images/C1C6C6B2-432B-4D76-9C95-457DB7A4B411.JPG',
                '/images/FD1DDED5-064B-4483-9E1B-1FD4C11ABC48.JPG',
              ].map((src, index) => (
                <MotionDiv
                  key={src}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 shadow-lg"
                >
                  <Image
                    src={src}
                    alt="Noble Basketball Training"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </MotionDiv>
              ))}
            </div>
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
                  <span>{programDetails.sessionsPerWeek} training sessions per week</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-2">•</span>
                  <span>Small group training (maximum 12 players per group)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-2">•</span>
                  <span>Age-appropriate skill development</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-2">•</span>
                  <span>Regular progress assessments</span>
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
              <h3 className="text-2xl font-bold mb-6 text-gray-900">What's Included</h3>
              <ul className="space-y-4">
                {programDetails.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-emerald-600 mr-2">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </MotionDiv>
          </div>

          {/* Training Focus Carousel */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-8 text-gray-900">What You'll Learn</h2>
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
                            Professional instruction and practice drills focused on mastering this essential skill.
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
                              Professional instruction and practice drills focused on mastering this essential skill.
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
                            Professional instruction and practice drills focused on mastering this essential skill.
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
                          Professional instruction and practice drills focused on mastering this essential skill.
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
                            Professional instruction and practice drills focused on mastering this essential skill.
                          </p>
                        </div>
                      </div>
                    ))}

                    {/* Clone first item at the end */}
                    <div className="w-full flex-none p-6">
                      <div className="bg-emerald-50 rounded-xl p-6">
                        <h3 className="text-xl font-semibold mb-3 text-gray-900">{trainingFocus[0]}</h3>
                        <p className="text-gray-600">
                          Professional instruction and practice drills focused on mastering this essential skill.
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
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-gray-600 hover:bg-white hover:scale-110 transition-all duration-300"
                  aria-label="Previous slide"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-gray-600 hover:bg-white hover:scale-110 transition-all duration-300"
                  aria-label="Next slide"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </MotionDiv>
          </div>

          <section className="w-full py-16 px-4">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-6xl mx-auto"
            >
              <div className="bg-emerald-600 rounded-[40px] overflow-hidden shadow-xl transform hover:scale-[1.02] transition-transform duration-300">
                <div className="md:flex items-center justify-between p-8 md:p-12">
                  <div className="space-y-4 md:w-1/2">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Monthly Program</h2>
                    <div className="flex items-baseline">
                      <span className="text-5xl md:text-6xl font-bold text-white">$99.99</span>
                      <span className="ml-2 text-lg text-emerald-100">/month</span>
                    </div>
                    <p className="text-emerald-100 text-lg">Join our comprehensive training program today!</p>
                  </div>
                  
                  <div className="mt-6 md:mt-0 md:w-1/2 space-y-4">
                    <div className="space-y-3">
                      {[
                        '2 sessions per week',
                        'Professional coaching',
                        'Skill development focus',
                        'Progress tracking'
                      ].map((feature, index) => (
                        <div key={index} className="flex items-center text-white">
                          <svg className="h-6 w-6 mr-2 text-emerald-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-lg">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <a href="#contact" className="mt-6 inline-block w-full md:w-auto text-center px-8 py-3 bg-white text-emerald-600 font-semibold rounded-full hover:bg-emerald-50 transition-colors duration-200">
                      Register Now
                    </a>
                  </div>
                </div>
              </div>
            </MotionDiv>
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
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={index === 0 ? '/images/FD1DDED5-064B-4483-9E1B-1FD4C11ABC48.JPG' : '/images/405398B1-8102-4DE6-9537-D1BC39251D31.JPG'}
                    alt={`${coach.name} - ${coach.title}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 group-hover:text-emerald-600 transition-colors">{coach.name}</h3>
                  <h4 className="text-emerald-600 font-semibold mb-4">{coach.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{coach.bio}</p>
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
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-emerald-600">Exotic Detailing</h4>
                  <p className="text-gray-600">
                    Premium auto detailing services supporting local youth sports development.
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-emerald-600">DevFlow Technologies</h4>
                  <p className="text-gray-600">
                    Innovative software solutions empowering the next generation of athletes.
                  </p>
                </div>
              </div>
              <div className="p-6 bg-emerald-50 rounded-xl">
                <p className="text-gray-900 font-medium mb-2">Interested in becoming a sponsor?</p>
                <p className="text-gray-600">Contact us to learn more about partnership opportunities.</p>
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
            
            <form onSubmit={handleSubmit} className="space-y-6">
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
                    max="17"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  />
                </div>
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
    </>
  );
}
