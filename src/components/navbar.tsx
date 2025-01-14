'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { siteConfig } from '@/lib/constants';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollPosition(currentScrollY);
      
      if (currentScrollY > lastScrollY) {
        if (currentScrollY > 50) {
          setIsVisible(false);
        }
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);

      // Update active section based on scroll position
      const sections = ['home', 'programs', 'about', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // Height of the navbar plus some padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      setIsOpen(false);
    }
  };

  const navClasses = `
    fixed z-[100] transition-all duration-300 
    w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] 
    left-1/2 -translate-x-1/2 top-2 lg:top-4
    bg-white/90 backdrop-blur-lg shadow-lg rounded-full
    ${isVisible ? 'translate-y-0' : '-translate-y-[150%]'}
  `;

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex-shrink-0">
            <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center">
              <div className="h-12 w-12 relative">
                <Image
                  src="/nobleLogo.jpg"
                  alt="Noble Basketball Logo"
                  fill
                  className="object-contain rounded-full"
                  priority
                />
              </div>
            </a>
          </div>

          <div className="hidden md:flex items-center justify-center space-x-1">
            <AnimatePresence mode="wait">
              {siteConfig.mainNav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`
                    relative px-4 py-2 transition-colors rounded-md
                    ${item.href.slice(1) === activeSection 
                      ? 'text-emerald-600 font-medium' 
                      : 'text-gray-600 hover:text-emerald-600'
                    }
                  `}
                  onMouseOver={() => setActiveSection(item.href.slice(1))}
                  onMouseLeave={() => {
                    // Reset to current section based on scroll position
                    const sections = ['home', 'programs', 'about', 'contact'];
                    for (const section of sections) {
                      const element = document.getElementById(section);
                      if (element) {
                        const rect = element.getBoundingClientRect();
                        if (rect.top <= 100 && rect.bottom >= 100) {
                          setActiveSection(section);
                          break;
                        }
                      }
                    }
                  }}
                >
                  <span className="relative z-10">{item.title}</span>
                  {item.href.slice(1) === activeSection && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-emerald-50 rounded-md -z-0"
                      transition={{
                        type: "spring",
                        bounce: 0.15,
                        duration: 0.5,
                      }}
                    />
                  )}
                </a>
              ))}
            </AnimatePresence>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="px-6 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors"
            >
              Join Now
            </a>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-emerald-600 hover:text-emerald-700 transition-colors p-2 relative z-50"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-20 left-4 right-4 md:hidden"
          >
            <motion.div
              className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-gray-100"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
            >
              <div className="flex flex-col p-6 space-y-4">
                {siteConfig.mainNav.map((item) => {
                  const isActive = item.href.slice(1) === activeSection;
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="flex items-center justify-center"
                    >
                      <span
                        className={`
                          px-6 py-2 text-lg transition-all duration-300 rounded-full
                          ${isActive 
                            ? 'text-white font-semibold bg-emerald-600' 
                            : 'text-gray-600 hover:text-emerald-600 font-normal'
                          }
                        `}
                      >
                        {item.title}
                      </span>
                    </a>
                  );
                })}
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="flex items-center justify-center"
                >
                  <span className="px-6 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors">
                    Join Now
                  </span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
} 