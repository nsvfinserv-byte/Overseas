import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { countries } from '../data/countries';
import logo from '../assets/logo.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-ns-navy)] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <img src={logo} alt="NSV Overseas Logo" className="h-12 w-auto object-contain" />
              <span className="font-bold text-2xl tracking-tight text-white">NSV Overseas</span>
            </Link>
            <p className="text-slate-300 mb-6 text-sm leading-relaxed">
              Your trusted partner in international education. We guide students to top universities globally, providing end-to-end support for a seamless study abroad journey.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-300 hover:text-white transition-colors text-sm font-medium" aria-label="Facebook">
                Facebook
              </a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors text-sm font-medium" aria-label="Instagram">
                Instagram
              </a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors text-sm font-medium" aria-label="LinkedIn">
                LinkedIn
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-slate-700 pb-2">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-slate-300 hover:text-[var(--color-ns-sky)] transition-colors">Home</Link></li>
              <li><Link to="/#services" className="text-slate-300 hover:text-[var(--color-ns-sky)] transition-colors">Our Services</Link></li>
              <li><Link to="/universities" className="text-slate-300 hover:text-[var(--color-ns-sky)] transition-colors">Universities</Link></li>
              <li><Link to="/referral" className="text-slate-300 hover:text-[var(--color-ns-sky)] transition-colors">Refer a Student</Link></li>
              <li><Link to="/contact" className="text-slate-300 hover:text-[var(--color-ns-sky)] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Top Destinations */}
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-slate-700 pb-2">Top Destinations</h3>
            <ul className="space-y-3">
              {countries.slice(0, 6).map(country => (
                <li key={country.slug}>
                  <Link to={`/countries/${country.slug}`} className="text-slate-300 hover:text-[var(--color-ns-sky)] transition-colors flex items-center">
                    <span className="mr-2">{country.flag}</span> Study in {country.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-slate-700 pb-2">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-[var(--color-ns-sky)] mr-3 mt-1 flex-shrink-0" />
                <span className="text-slate-300 text-sm">Osmania Technology Business Incubator, Central Facilities For Research & Development,<br />Osmania University Main Rd, Osmania University, Amberpet, Hyderabad</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-[var(--color-ns-sky)] mr-3 flex-shrink-0" />
                <a href="tel:+919885885847" className="text-slate-300 hover:text-white transition-colors text-sm">+91 98858 85847</a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-[var(--color-ns-sky)] mr-3 flex-shrink-0" />
                <a href="mailto:overseasnsv@gmail.com" className="text-slate-300 hover:text-white transition-colors text-sm">overseasnsv@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 mt-8 text-center md:flex md:justify-between md:text-left">
          <p className="text-slate-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} NSV Overseas. All rights reserved.
          </p>
          <div className="space-x-4 text-sm">
            <Link to="#" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="text-slate-400 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
