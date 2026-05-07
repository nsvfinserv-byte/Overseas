import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, Loader2, AlertCircle } from 'lucide-react';
import { submitContactInquiry } from '../services/contactService';

/* ── Validation helpers ── */
const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
const isValidPhone = (v) => /^[+]?[\d\s\-().]{7,15}$/.test(v.trim());
const isValidName = (v) => v.trim().length >= 2 && /^[a-zA-Z\s'.'-]+$/.test(v.trim());
const isValidMessage = (v) => v.trim().length >= 20;

function validate(fields) {
  const errs = {};
  if (!isValidName(fields.name))
    errs.name = 'Enter your full name (at least 2 characters, letters only).';
  if (!isValidEmail(fields.email))
    errs.email = 'Enter a valid email address (e.g. you@example.com).';
  if (!isValidPhone(fields.phone))
    errs.phone = 'Enter a valid phone number (7–15 digits, e.g. +91 98000 00000).';
  if (!isValidMessage(fields.message))
    errs.message = 'Your message must be at least 20 characters long.';
  return errs;
}

export default function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fields, setFields] = useState({
    name: '', email: '', phone: '', country: '', message: '',
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((p) => ({ ...p, [name]: value }));
    if (fieldErrors[name]) setFieldErrors((p) => ({ ...p, [name]: undefined }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((p) => ({ ...p, [name]: true }));
    const errs = validate(fields);
    if (errs[name]) setFieldErrors((p) => ({ ...p, [name]: errs[name] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true, message: true });
    const errs = validate(fields);
    if (Object.keys(errs).length > 0) { setFieldErrors(errs); return; }

    setIsLoading(true);
    setError(null);
    try {
      await submitContactInquiry({
        name: fields.name.trim(),
        email: fields.email.trim(),
        phone: fields.phone.trim(),
        country: fields.country,
        message: fields.message.trim(),
      });
      setIsSubmitted(true);
      setFields({ name: '', email: '', phone: '', country: '', message: '' });
      setFieldErrors({});
      setTouched({});
      setTimeout(() => setIsSubmitted(false), 6000);
    } catch (err) {
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = (name) =>
    `w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-[var(--color-ns-sky)] focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white ${fieldErrors[name] && touched[name] ? 'border-red-400 bg-red-50' : 'border-slate-200'
    }`;

  const FieldError = ({ name }) =>
    fieldErrors[name] && touched[name] ? (
      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
        <AlertCircle size={12} /> {fieldErrors[name]}
      </p>
    ) : null;

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-slate-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Get in Touch
          </motion.h2>
          <motion.p
            className="text-lg text-slate-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Have questions about studying abroad? Our expert counsellors are here to help you every step of the way.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <motion.div
              className="bg-slate-50 p-8 rounded-2xl border border-slate-100"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-slate-800 mb-6">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[var(--color-ns-royal)] shadow-sm mr-4 flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">Our Office</h4>
                    <p className="text-slate-600 text-sm mt-1">Osmania Technology Business Incubator, Central Facilities For Research &amp; Development,<br />Osmania University Main Rd, Osmania University, Amberpet, Hyderabad</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[var(--color-ns-royal)] shadow-sm mr-4 flex-shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">Phone</h4>
                    <p className="text-slate-600 text-sm mt-1">+91 98858 85847</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[var(--color-ns-royal)] shadow-sm mr-4 flex-shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">Email</h4>
                    <p className="text-slate-600 text-sm mt-1">overseasnsv@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[var(--color-ns-royal)] shadow-sm mr-4 flex-shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">Business Hours</h4>
                    <p className="text-slate-600 text-sm mt-1">Mon - Sat: 10:00 AM - 6:30 PM<br />Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-slate-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Send us a message</h3>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 text-green-700 p-8 rounded-xl flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Send className="w-8 h-8 text-green-500" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Message Sent Successfully!</h4>
                  <p>Thank you for reaching out. Our counsellor will contact you shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl flex items-center space-x-3 text-sm">
                      <AlertCircle size={18} className="flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-medium text-slate-700 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={fields.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={inputClass('name')}
                        placeholder="Your Name"
                        autoComplete="name"
                      />
                      <FieldError name="name" />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-medium text-slate-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={fields.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={inputClass('email')}
                        placeholder="email@example.com"
                        autoComplete="email"
                      />
                      <FieldError name="email" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="contact-phone" className="block text-sm font-medium text-slate-700 mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        name="phone"
                        value={fields.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={inputClass('phone')}
                        placeholder="+91 98858 85847"
                        autoComplete="tel"
                      />
                      <FieldError name="phone" />
                    </div>
                    <div>
                      <label htmlFor="contact-country" className="block text-sm font-medium text-slate-700 mb-2">Interested Country</label>
                      <select
                        id="contact-country"
                        name="country"
                        value={fields.country}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[var(--color-ns-sky)] focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white"
                      >
                        <option value="">Select a country</option>
                        <option value="germany">Germany</option>
                        <option value="uk">United Kingdom</option>
                        <option value="usa">United States</option>
                        <option value="canada">Canada</option>
                        <option value="australia">Australia</option>
                        <option value="other">Not Sure Yet</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium text-slate-700 mb-2">
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      value={fields.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`resize-none ${inputClass('message')}`}
                      placeholder="Tell us about your study plans... (at least 20 characters)"
                    />
                    <div className="flex justify-between items-center mt-1">
                      <FieldError name="message" />
                      <span className={`text-xs ml-auto ${fields.message.length < 20 ? 'text-slate-400' : 'text-green-500'}`}>
                        {fields.message.length} / 20 min
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400">Fields marked <span className="text-red-500">*</span> are required.</p>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-[var(--color-ns-royal)] hover:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl transition-colors shadow-lg shadow-blue-500/20 flex items-center justify-center space-x-2 w-full md:w-auto"
                  >
                    {isLoading ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /><span>Sending...</span></>
                    ) : (
                      <><span>Send Message</span><Send size={18} /></>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
