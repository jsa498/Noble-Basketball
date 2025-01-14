import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
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
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden">
        <div className="relative overflow-hidden rounded-2xl bg-gray-100">
          {/* Main Image */}
          <div className="aspect-[4/3] relative">
            <Image
              src={images[currentIndex]}
              alt="Training moment"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw"
              priority
            />
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-gray-600 hover:bg-white hover:scale-110 transition-all duration-300"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-gray-600 hover:bg-white hover:scale-110 transition-all duration-300"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>

          {/* Progress Dots */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-emerald-600 w-6' : 'bg-white/70 hover:bg-white'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((src, index) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100"
          >
            <Image
              src={src}
              alt={`Training moment ${index + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        ))}
      </div>
    </>
  );
} 