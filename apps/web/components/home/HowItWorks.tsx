'use client';

import React from 'react';
import styles from './HowItWorks.module.css';
import { Home, Hammer, Sofa, CreditCard } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

export function HowItWorks() {
  const { t } = useI18n();
  
  const steps = [
    {
      icon: <Home size={28} />,
      title: t('howItWorks.step1Title'),
      description: t('howItWorks.step1Desc'),
    },
    {
      icon: <CreditCard size={28} />,
      title: t('howItWorks.step2Title'),
      description: t('howItWorks.step2Desc'),
    },
    {
      icon: <Hammer size={28} />,
      title: t('howItWorks.step3Title'),
      description: t('howItWorks.step3Desc'),
    },
    {
      icon: <Sofa size={28} />,
      title: t('howItWorks.step4Title'),
      description: t('howItWorks.step4Desc'),
    },
  ];

  return (
    <section className="section bg-warm">
      <div className="container">
        <div className={styles.header}>
          <h2 className="section-header-title">{t('howItWorks.title')}</h2>
          <p className="section-header-desc">
            {t('howItWorks.desc')}
          </p>
        </div>

        <div className={styles.timeline}>
          {steps.map((step, index) => (
            <div key={index} className={styles.step}>
              <div className={styles.iconContainer}>
                {step.icon}
                {index < steps.length - 1 && <div className={styles.connector} />}
              </div>
              <div className={styles.content}>
                <div className={styles.stepNumber}>{t('howItWorks.stepLabel')} 0{index + 1}</div>
                <h3 className={styles.title}>{step.title}</h3>
                <p className={styles.description}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
