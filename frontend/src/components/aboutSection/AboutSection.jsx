import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AboutCard from './AboutCard';

const processSteps = [
  { number: '1', text: 'Conception et Design' },
  { number: '2', text: 'Développement de l Interface' },
  { number: '3', text: 'Tests Utilisateurs' },
  { number: '4', text: 'Lancement et Support' },
];

const AboutSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section ref={ref} className="bg-dark-purple py-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {processSteps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: index * 0.5 }}
          >
            <AboutCard
              number={step.number}
              text={step.text}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;