import { motion } from 'framer-motion';
import { Star, Rocket, Handshake, UserCheck, Compass, Settings } from 'lucide-react';

const features = [
  {
    title: "Student-Centric & Transparent",
    description: "Process focused on student needs with complete transparency",
    icon: Star
  },
  {
    title: "High Visa Success Rate",
    description: "98% visa success rate with proven track record",
    icon: Rocket
  },
  {
    title: "Global University Partnerships",
    description: "Trusted partnerships with universities worldwide",
    icon: Handshake
  },
  {
    title: "Dedicated Counsellors",
    description: "Each student gets a dedicated counsellor for personalized support",
    icon: UserCheck
  },
  {
    title: "End-to-End Support",
    description: "From counselling to abroad settlement, we're with you",
    icon: Compass
  },
  {
    title: "Process Driven Approach",
    description: "Structured, systematic process ensuring nothing is missed in your application",
    icon: Settings
  }
];

export default function KeyFeatures() {
  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-5xl font-extrabold text-[var(--color-ns-navy)] mb-4 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Key Features of NSV Overseas
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div 
                key={index}
                className="bg-[#f8f9fa] rounded-2xl p-8 flex flex-col items-center text-center transition-transform hover:-translate-y-1 hover:shadow-md border border-transparent hover:border-slate-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="mb-4">
                  <Icon className="w-10 h-10 text-[var(--color-ns-gold)] fill-[var(--color-ns-gold)]" />
                </div>
                <h3 className="text-xl font-bold text-[var(--color-ns-navy)] mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
