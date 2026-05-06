import { motion } from 'framer-motion';
import { Cpu, Laptop, Brain, TrendingUp, GraduationCap, Settings, FlaskConical, Utensils, Calculator, Palette } from 'lucide-react';

const courses = [
  { name: "Engineering", icon: Cpu },
  { name: "Computer Science & IT", icon: Laptop },
  { name: "Data Science & AI", icon: Brain },
  { name: "MBA / Management", icon: TrendingUp },
  { name: "Masters", icon: GraduationCap },
  { name: "MTech", icon: Settings },
  { name: "Health & Life Sciences", icon: FlaskConical },
  { name: "Hospitality & Tourism", icon: Utensils },
  { name: "Finance & Accounting", icon: Calculator },
  { name: "Arts & Design", icon: Palette }
];

export default function Courses() {
  return (
    <section id="courses" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-5xl font-extrabold text-[var(--color-ns-navy)] mb-4 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Courses You Can Join Through Us
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {courses.map((course, index) => {
            const Icon = course.icon;
            return (
              <motion.div 
                key={index}
                className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all hover:-translate-y-1 hover:shadow-lg border border-slate-100 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="mb-4">
                  <Icon className="w-12 h-12 text-[var(--color-ns-gold)]" strokeWidth={2} />
                </div>
                <h3 className="text-sm font-bold text-[var(--color-ns-navy)] leading-tight px-2">
                  {course.name}
                </h3>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
