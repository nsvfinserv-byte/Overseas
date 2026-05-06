import { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import * as Icons from 'lucide-react';
import { services } from '../data/services';
import logo from '../assets/logo.png';

const ServiceCard = ({ service, index }) => {
  const IconComponent = Icons[service.icon] || Icons.CheckCircle;
  const isEven = index % 2 === 0;

  return (
    <motion.div
      className={`relative flex items-center justify-between md:justify-normal w-full mb-16 ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Timeline dot */}
      <div className="timeline-dot hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-white border-4 border-[var(--color-ns-sky)] z-10 items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-[var(--color-ns-navy)]" />
      </div>

      {/* Content */}
      <div className={`w-full md:w-5/12 ${isEven ? 'md:pl-16' : 'md:pr-16'}`}>
        <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow border border-slate-100 group relative overflow-hidden">
          {/* Subtle background gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 opacity-0 group-hover:opacity-100 transition-opacity z-0" />

          <div className="relative z-10">
            <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center mb-4 text-[var(--color-ns-royal)] group-hover:scale-110 transition-transform group-hover:bg-[var(--color-ns-sky)] group-hover:text-white">
              <IconComponent size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">{service.title}</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              {service.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function ServicesTrail() {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const [timelineParams, setTimelineParams] = useState({ height: 1000, dots: [] });

  useEffect(() => {
    if (!timelineRef.current) return;
    const observer = new ResizeObserver(() => {
      const container = timelineRef.current;
      const dotElements = container.querySelectorAll('.timeline-dot');
      const dots = Array.from(dotElements).map(el => {
        let y = 0;
        let currentEl = el;
        while (currentEl && currentEl !== container) {
          y += currentEl.offsetTop;
          currentEl = currentEl.offsetParent;
        }
        return y + el.offsetHeight / 2;
      });
      setTimelineParams({ height: container.offsetHeight, dots });
    });
    observer.observe(timelineRef.current);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 15,
    restDelta: 0.001
  });

  const planeY = useTransform(smoothProgress, [0, 0.1, 0.9, 1], [
    -0.1 * timelineParams.height,
    0,
    timelineParams.height,
    1.1 * timelineParams.height
  ]);

  const planeX = useTransform(planeY, y => {
    const { dots, height } = timelineParams;
    if (!dots || dots.length === 0) return 0;

    const firstDot = dots[0];
    const lastDot = dots[dots.length - 1];

    if (y <= firstDot) return 0;
    if (y >= lastDot) {
      const progress = (y - lastDot) / (height - lastDot);
      return progress * 400; // Fly off to right
    }

    for (let i = 0; i < dots.length - 1; i++) {
      if (y >= dots[i] && y <= dots[i + 1]) {
        const t = (y - dots[i]) / (dots[i + 1] - dots[i]);
        const direction = i % 2 === 0 ? 1 : -1;
        return Math.sin(t * Math.PI) * 150 * direction;
      }
    }
    return 0;
  });

  const planeRotate = useTransform(planeY, y => {
    const { dots, height } = timelineParams;
    if (!dots || dots.length === 0) return 180;

    const firstDot = dots[0];
    const lastDot = dots[dots.length - 1];

    if (y <= firstDot) return 180;
    if (y >= lastDot) {
      const progress = (y - lastDot) / (height - lastDot);
      return 180 - progress * 60; // curve right
    }

    for (let i = 0; i < dots.length - 1; i++) {
      if (y >= dots[i] && y <= dots[i + 1]) {
        const t = (y - dots[i]) / (dots[i + 1] - dots[i]);
        const direction = i % 2 === 0 ? 1 : -1;
        const derivative = Math.cos(t * Math.PI);
        return 180 - derivative * 50 * direction;
      }
    }
    return 180;
  });

  const planeScale = useTransform(smoothProgress, p => {
    if (p < 0.1) return 1 + ((0.1 - p) / 0.1) * 1; // Scale down from 2 to 1
    if (p > 0.9) return 1 + ((p - 0.9) / 0.1) * 1; // Scale up from 1 to 2
    return 1;
  });

  const planeOpacity = useTransform(smoothProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  const pathString = useMemo(() => {
    const { dots, height } = timelineParams;
    if (!dots || dots.length === 0) return "";

    let d = `M 0 -500 L 0 ${dots[0]} `;

    for (let i = 0; i < dots.length - 1; i++) {
      const yStart = dots[i];
      const yEnd = dots[i + 1];
      const direction = i % 2 === 0 ? 1 : -1;

      for (let j = 1; j <= 20; j++) {
        const t = j / 20;
        const y = yStart + t * (yEnd - yStart);
        const x = Math.sin(t * Math.PI) * 150 * direction;
        d += `L ${x} ${y} `;
      }
    }

    d += `L 400 ${height + 500} `;
    return d;
  }, [timelineParams]);

  return (
    <section id="services" ref={containerRef} className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-slate-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Your Journey With Us
          </motion.h2>
          <motion.p
            className="text-lg text-slate-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            A step-by-step seamless process ensuring your study abroad dreams become reality.
          </motion.p>
        </div>

        <div className="relative" ref={timelineRef}>
          {/* Center Timeline Line */}
          <motion.div
            className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-slate-200"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {/* Dotted Flight Path Trail */}
          {/* Dotted Flight Path Trail */}
          <motion.div
            className="hidden md:block absolute left-0 right-0 z-20 pointer-events-none overflow-hidden"
            style={{
              top: "-500px",
              height: useTransform(planeY, y => Math.max(0, y + 500))
            }}
          >
            <svg
              className="absolute pointer-events-none"
              style={{
                top: "500px",
                left: "50%",
                marginLeft: "-500px",
                width: "1000px",
                height: timelineParams.height
              }}
              viewBox={`-500 0 1000 ${timelineParams.height}`}
            >
              <path
                d={pathString}
                fill="none"
                stroke="var(--color-ns-gold)"
                strokeWidth="4"
                strokeDasharray="8 8"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>

          {/* Scroll-Animated Plane on Timeline */}
          <motion.div
            className="hidden md:flex absolute left-1/2 -translate-x-1/2 -ml-[2px] z-30"
            style={{
              top: planeY,
              x: planeX,
              y: "-100%",
              rotate: planeRotate,
              scale: planeScale,
              opacity: planeOpacity,
              originY: 1,
              originX: 0.5
            }}
          >
            <div className="bg-white p-2 rounded-full shadow-lg border border-slate-100 flex items-center justify-center">
              <img src={logo} alt="Flight" className="w-8 h-8 object-contain rotate-180" />
            </div>
          </motion.div>

          <div className="relative z-10 flex flex-col items-center">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
