'use client';

import { Instagram, Phone, Mail, Map } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="relative bg-white border-t border-gray-100">
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5" />
      <div className="relative container mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-6">
          {/* Logo */}
          <div className="h-12 w-12 relative">
            <Image
              src="/nobleLogo.jpg"
              alt="Noble Basketball Logo"
              fill
              className="object-contain rounded-full"
            />
          </div>

          {/* Contact Links */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <a 
              href="https://www.instagram.com/noblebasketball/?igsh=MXBzN2RzYnNhN3BqMg%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors"
            >
              <Instagram size={20} />
              <span>@noblebasketball</span>
            </a>
            <a 
              href="tel:6045120061"
              className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors"
            >
              <Phone size={20} />
              <span>(604) 512-0061</span>
            </a>
            <a 
              href="mailto:nobull.basketball@gmail.com"
              className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors"
            >
              <Mail size={20} />
              <span>nobull.basketball@gmail.com</span>
            </a>
            <a 
              href="https://maps.google.com/?q=10677+124+St,+Surrey,+BC+V3V+0B1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors"
            >
              <Map size={20} />
              <span>Khalsa School Old Yale Elementary<br />10677 124 St, Surrey, BC V3V 0B1</span>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} Noble Basketball. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
} 