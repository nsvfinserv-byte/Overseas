import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, Loader2, AlertCircle } from 'lucide-react';
import { submitContactInquiry } from '../services/contactService';

export default function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const form = e.target;
    try {
      await submitContactInquiry({
        name:    form.name.value,
        email:   form.email.value,
        phone:   form.phone.value,
        country: form.country.value,
        message: form.message.value,
      });
      setIsSubmitted(true);
      form.reset();
      setTimeout(() => setIsSubmitted(false), 6000);
    } catch (err) {
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl flex items-center space-x-3 text-sm">
                      <AlertCircle size={18} className="flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                      <input id="contact-name" type="text" name="name" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[var(--color-ns-sky)] focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white" placeholder="John Doe" />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                      <input id="contact-email" type="email" name="email" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[var(--color-ns-sky)] focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white" placeholder="john@example.com" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="contact-phone" className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                      <input id="contact-phone" type="tel" name="phone" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[var(--color-ns-sky)] focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white" placeholder="+91 98858 85847" />
                    </div>
                    <div>
                      <label htmlFor="contact-country" className="block text-sm font-medium text-slate-700 mb-2">Interested Country</label>
                      <select id="contact-country" name="country" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[var(--color-ns-sky)] focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white">
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
                    <label htmlFor="contact-message" className="block text-sm font-medium text-slate-700 mb-2">Your Message</label>
                    <textarea id="contact-message" name="message" rows={4} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[var(--color-ns-sky)] focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white resize-none" placeholder="Tell us about your study plans..." />
                  </div>

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
