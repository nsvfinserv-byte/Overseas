import { motion } from 'framer-motion';
import { Globe, Compass, FileText, Edit, BookOpen, Banknote, GraduationCap, User, Plane } from 'lucide-react';

const servicesList = [
  {
    title: "University & Country Selection",
    description: "Expert guidance in selecting the right universities and countries based on your profile and career goals",
    icon: Globe
  },
  {
    title: "Study Abroad Guidance",
    description: "Comprehensive counselling for study abroad planning, application process, and career planning",
    icon: Compass
  },
  {
    title: "Admissions Support",
    description: "Complete admissions assistance including application preparation, document submission, and follow-ups",
    icon: FileText
  },
  {
    title: "SOP & Documentation",
    description: "Professional SOP writing, LOR assistance, and complete documentation support for applications",
    icon: Edit
  },
  {
    title: "Visa Guidance & Interview Preparation",
    description: "Comprehensive visa assistance, interview preparation, and embassy application support",
    icon: BookOpen
  },
  {
    title: "Education Loans Assistance",
    description: "Help securing education loans with competitive rates from trusted financial partners",
    icon: Banknote
  },
  {
    title: "Scholarship Assistance",
    description: "Guidance on available scholarships, merit-based awards, and financial aid opportunities",
    icon: GraduationCap
  },
  {
    title: "Career & Course Counselling",
    description: "Personalized career counselling and course selection based on your interests and market trends",
    icon: User
  },
  {
    title: "Pre-Departure Briefing",
    description: "Comprehensive pre-departure guidance and post-landing support for smooth transition abroad",
    icon: Plane
  }
];

export default function WhatWeDo() {
  return (
    <section className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-extrabold text-[var(--color-ns-navy)] mb-4 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            What NSV Overseas Does
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div 
                key={index}
                className="bg-white rounded-2xl p-8 transition-transform hover:-translate-y-1 relative"
                style={{
                  boxShadow: "-8px 8px 0px var(--color-ns-gold)"
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-[#d4af37]/10 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-[var(--color-ns-gold)]" />
                </div>
                <h3 className="text-xl font-bold text-[var(--color-ns-navy)] mb-3 leading-snug">
                  {service.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
