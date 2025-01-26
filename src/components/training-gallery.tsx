//src//components//training-gallery.tsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Image gallery configuration
const images = [
  '/images/083CB076-315E-4D93-BE67-B70131B3DF91.JPG',
  '/images/1BFD9662-6B1A-4883-8E5F-58C765F491F8.JPG',
  '/images/3E4A2C59-39AE-4719-859D-E775DD95AE96.JPG',
  '/images/405398B1-8102-4DE6-9537-D1BC39251D31.JPG',
  '/images/C1C6C6B2-432B-4D76-9C95-457DB7A4B411.JPG',
  '/images/FD1DDED5-064B-4483-9E1B-1FD4C11ABC48.JPG',
];

export default function TrainingGallery() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragPosition, setDragPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = isDesktop ? Math.ceil(images.length / 3) : images.length;

  const carouselRef = useRef<HTMLDivElement>(null);

  const handleTransitionEnd = () => {
    if (currentSlide >= totalSlides + 1) {
      setIsTransitioning(true);
      setCurrentSlide(1);
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
    const threshold = window.innerWidth * 0.2;
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

  useEffect(() => {
    if (!isAutoPlaying || isDragging) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, nextSlide, isDragging]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => {
    if (!isDragging) {
      setIsAutoPlaying(true);
    }
  };

  // Update slide calculation for desktop view
  const getSlideTransform = () => {
    const baseTransform = `translateX(calc(-${currentSlide * 100}%`;
    const dragTransform = isDragging ? ` - ${dragPosition}px` : '';
    return `${baseTransform}${dragTransform}))`;
  };

  return (
    <div 
      className="relative overflow-hidden bg-white rounded-2xl shadow-lg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Desktop View (3 images) */}
      <div className="hidden md:block">
        <div 
          ref={carouselRef}
          className="flex touch-pan-y"
          style={{ 
            transform: getSlideTransform(),
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
          {/* Clone last group at the beginning */}
          <div className="w-full flex-none grid grid-cols-3 gap-4 p-4">
            {images.slice(-3).map((src, index) => (
              <div key={`clone-start-${index}`} className="aspect-[4/3] relative">
                <Image
                  src={src}
                  alt="Training moment"
                  fill
                  className="object-cover rounded-lg"
                  sizes="(min-width: 768px) 33vw, 100vw"
                  priority
                />
              </div>
            ))}
          </div>

          {/* Original images in groups of 3 */}
          {Array.from({ length: Math.ceil(images.length / 3) }).map((_, groupIndex) => (
            <div key={groupIndex} className="w-full flex-none grid grid-cols-3 gap-4 p-4">
              {images.slice(groupIndex * 3, (groupIndex + 1) * 3).map((src, index) => (
                <div key={src} className="aspect-[4/3] relative">
                  <Image
                    src={src}
                    alt={`Training moment ${groupIndex * 3 + index + 1}`}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(min-width: 768px) 33vw, 100vw"
                    priority={groupIndex === 0 && index === 0}
                  />
                </div>
              ))}
            </div>
          ))}

          {/* Clone first group at the end */}
          <div className="w-full flex-none grid grid-cols-3 gap-4 p-4">
            {images.slice(0, 3).map((src, index) => (
              <div key={`clone-end-${index}`} className="aspect-[4/3] relative">
                <Image
                  src={src}
                  alt="Training moment"
                  fill
                  className="object-cover rounded-lg"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile View (single image) */}
      <div className="md:hidden">
        <div 
          className="flex touch-pan-y"
          style={{ 
            transform: getSlideTransform(),
            transition: isTransitioning ? 'none' : 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
            willChange: 'transform'
          }}
          onTransitionEnd={handleTransitionEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          {/* Clone last image at the beginning */}
          <div className="w-full flex-none">
            <div className="aspect-[16/9] relative">
              <Image
                src={images[images.length - 1]}
                alt="Training moment"
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>
          </div>

          {/* Original images */}
          {images.map((src, index) => (
            <div key={src} className="w-full flex-none">
              <div className="aspect-[16/9] relative">
                <Image
                  src={src}
                  alt={`Training moment ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority={index === 0}
                />
              </div>
            </div>
          ))}

          {/* Clone first image at the end */}
          <div className="w-full flex-none">
            <div className="aspect-[16/9] relative">
              <Image
                src={images[0]}
                alt="Training moment"
                fill
                className="object-cover"
                sizes="100vw"
              />
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
                : 'bg-white hover:bg-white/80'
            }`}
            aria-label={`Go to ${isDesktop ? 'group ' : 'image '}${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-gray-600 hover:bg-white hover:scale-110 transition-all duration-300"
        aria-label="Previous image"
      >
        <ChevronLeft size={16} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-gray-600 hover:bg-white hover:scale-110 transition-all duration-300"
        aria-label="Next image"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
} 