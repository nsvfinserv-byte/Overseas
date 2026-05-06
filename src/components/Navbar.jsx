import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Megaphone, ChevronDown, Search } from 'lucide-react';
import { countries } from '../data/countries';
import logo from '../assets/logo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showReferralBar, setShowReferralBar] = useState(true);
  const [isCountriesOpen, setIsCountriesOpen] = useState(false);
  const [isMobileCountriesOpen, setIsMobileCountriesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    const handleClickOutside = (event) => {
      if (!event.target.closest('.countries-dropdown-container')) {
        setIsCountriesOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/#services' },
    { name: 'Countries', path: '/#countries' },
    { name: 'Courses', path: '/#courses' },
    { name: 'Universities', path: '/universities' },
    { name: 'Referral', path: '/referral' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleNavClick = () => {
    setIsOpen(false);
  };

  const navClass = `w-full transition-all duration-300 ${scrolled || !isHome ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
    }`;

  const textClass = scrolled || !isHome ? 'text-slate-800' : 'text-white';
  const logoClass = scrolled || !isHome ? 'text-slate-800' : 'text-white';

  return (
    <header className="fixed w-full z-50 top-0 left-0 flex flex-col">
      <nav className={navClass}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-3" onClick={handleNavClick}>
              <img src={logo} alt="NSV Overseas Logo" className="h-12 w-auto object-contain" />
              <div className="flex flex-col">
                <span className={`font-bold text-xl tracking-tight leading-none ${logoClass}`}>NSV Overseas</span>
                <span className="text-[var(--color-ns-gold)] text-[0.65rem] font-medium tracking-wide mt-1">Your Trusted Global Education Partner</span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => {
                if (link.name === 'Countries') {
                  return (
                    <div key={link.name} className="relative countries-dropdown-container">
                      <button
                        onClick={() => setIsCountriesOpen(!isCountriesOpen)}
                        className={`flex items-center font-medium hover:text-[var(--color-ns-sky)] transition-colors ${textClass} focus:outline-none`}
                      >
                        {link.name}
                        <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-200 ${isCountriesOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {isCountriesOpen && (
                        <div className="absolute top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50 left-1/2 transform -translate-x-1/2">
                          <div className="p-3 border-b border-slate-100 bg-slate-50">
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                              <input
                                type="text"
                                placeholder="Search countries..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[var(--color-ns-sky)] focus:border-transparent"
                              />
                            </div>
                          </div>
                          <div className="max-h-60 overflow-y-auto py-2 custom-scrollbar">
                            {filteredCountries.length > 0 ? (
                              filteredCountries.map((country) => (
                                <Link
                                  key={country.slug}
                                  to={`/country/${country.slug}`}
                                  onClick={() => {
                                    setIsCountriesOpen(false);
                                    setSearchQuery('');
                                  }}
                                  className="flex items-center px-4 py-2 hover:bg-slate-50 text-slate-700 hover:text-[var(--color-ns-royal)] transition-colors"
                                >
                                  <span className="text-xl mr-3">{country.flag}</span>
                                  <span className="font-medium text-sm">{country.name}</span>
                                </Link>
                              ))
                            ) : (
                              <div className="px-4 py-3 text-sm text-slate-500 text-center">No countries found</div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`font-medium hover:text-[var(--color-ns-sky)] transition-colors ${textClass}`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <Link
                to="/auth"
                className="bg-[var(--color-ns-gold)] hover:bg-[#b5952f] text-white px-5 py-2 rounded-full font-medium transition-colors shadow-lg shadow-[#d4af37]/30"
              >
                Login / Register
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`${textClass} hover:text-[var(--color-ns-sky)] focus:outline-none`}
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl py-4 flex flex-col space-y-4 px-6 border-t">
            {navLinks.map((link) => {
              if (link.name === 'Countries') {
                return (
                  <div key={link.name} className="flex flex-col space-y-2">
                    <button
                      onClick={() => setIsMobileCountriesOpen(!isMobileCountriesOpen)}
                      className="flex items-center justify-between text-slate-800 font-medium hover:text-[var(--color-ns-royal)] w-full text-left"
                    >
                      {link.name}
                      <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isMobileCountriesOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isMobileCountriesOpen && (
                      <div className="pl-4 py-2 flex flex-col space-y-3 border-l-2 border-slate-100">
                        <div className="relative mb-2">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                          <input
                            type="text"
                            placeholder="Search countries..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[var(--color-ns-sky)]"
                          />
                        </div>
                        <div className="max-h-48 overflow-y-auto flex flex-col space-y-3">
                          {filteredCountries.length > 0 ? (
                            filteredCountries.map((country) => (
                              <Link
                                key={country.slug}
                                to={`/country/${country.slug}`}
                                onClick={() => {
                                  handleNavClick();
                                  setIsMobileCountriesOpen(false);
                                  setSearchQuery('');
                                }}
                                className="flex items-center text-slate-600 hover:text-[var(--color-ns-royal)]"
                              >
                                <span className="mr-3 text-lg">{country.flag}</span>
                                <span className="text-sm font-medium">{country.name}</span>
                              </Link>
                            ))
                          ) : (
                            <span className="text-sm text-slate-500">No countries found</span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={handleNavClick}
                  className="text-slate-800 font-medium hover:text-[var(--color-ns-royal)]"
                >
                  {link.name}
                </Link>
              );
            })}
            <Link
              to="/auth"
              onClick={handleNavClick}
              className="bg-[var(--color-ns-gold)] text-white text-center px-4 py-2 rounded-full font-medium mt-4 inline-block"
            >
              Login / Register
            </Link>
          </div>
        )}
      </nav>

      {/* Referral Sticky Bar */}
      {showReferralBar && (
        <div className="bg-[var(--color-ns-navy)] w-full py-2.5 px-4 sm:px-6 lg:px-8 border-t border-white/10 shadow-lg">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center space-x-3 text-center md:text-left">
              <Megaphone className="h-5 w-5 text-[var(--color-ns-gold)] shrink-0 hidden sm:block" />
              <span className="text-white text-sm font-medium">Refer & Earn up to ₹50,000 for every successful student abroad journey referral!</span>
            </div>
            <div className="flex items-center justify-center space-x-3 sm:space-x-4 w-full md:w-auto">
              <Link
                to="/referral"
                className="bg-[var(--color-ns-gold)] text-[var(--color-ns-navy)] px-4 py-1.5 rounded-md font-bold text-xs sm:text-sm hover:bg-[#b5952f] transition-colors whitespace-nowrap"
              >
                Start Earning
              </Link>
              <Link
                to="/referral"
                className="bg-transparent border border-[var(--color-ns-gold)] text-white px-4 py-1.5 rounded-md font-semibold text-xs sm:text-sm hover:bg-white/5 transition-colors whitespace-nowrap hidden sm:inline-block"
              >
                Join Referral Program
              </Link>
              <button
                onClick={() => setShowReferralBar(false)}
                className="text-slate-300 hover:text-white transition-colors focus:outline-none p-1"
                aria-label="Close referral bar"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
