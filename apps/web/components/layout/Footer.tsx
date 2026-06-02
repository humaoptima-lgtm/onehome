'use client';

import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/lib/i18n';

// Social SVGs
const FacebookIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
const TwitterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>;
const InstagramIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>;
const LinkedinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>;

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useI18n();

  return (
    <footer className={styles.footer}>
      <div className={cn('container', styles.container)}>
        <div className={styles.grid}>
          
          {/* Column 1: Brand & About */}
          <div className={styles.brandCol}>
            <Link href="/" className={styles.logo}>One Home</Link>
            <p className={styles.description}>
              {t('footer.description')}
            </p>
            <div className={styles.socials}>
              <a href="#" className={styles.socialLink} aria-label="Facebook"><FacebookIcon /></a>
              <a href="#" className={styles.socialLink} aria-label="Twitter"><TwitterIcon /></a>
              <a href="#" className={styles.socialLink} aria-label="Instagram"><InstagramIcon /></a>
              <a href="#" className={styles.socialLink} aria-label="LinkedIn"><LinkedinIcon /></a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>{t('footer.platform')}</h4>
            <ul className={styles.linkList}>
              <li><Link href="/properties">{t('footer.buyProperty')}</Link></li>
              <li><Link href="/design">Arsitektur & Interior</Link></li>
              <li><Link href="/vendors">{t('footer.findVendors')}</Link></li>
              <li><Link href="/tender/create">{t('footer.openTender')}</Link></li>
              <li><Link href="/financing">{t('footer.financing')}</Link></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>{t('footer.company')}</h4>
            <ul className={styles.linkList}>
              <li><Link href="/about">{t('footer.aboutUs')}</Link></li>
              <li><Link href="/careers">{t('footer.careers')}</Link></li>
              <li><Link href="/press">{t('footer.press')}</Link></li>
              <li><Link href="/contact">{t('footer.contact')}</Link></li>
              <li><Link href="/partners">{t('footer.partnerWithUs')}</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className={styles.newsletterCol}>
            <h4 className={styles.colTitle}>{t('footer.stayUpdated')}</h4>
            <p className={styles.newsletterDesc}>
              {t('footer.newsletterDesc')}
            </p>
            <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder={t('footer.placeholderEmail')} 
                className={styles.input}
                required
              />
              <Button type="submit" size="icon" className={`${styles.submitBtn} bg-[var(--color-emerald)] hover:bg-[var(--color-emerald-hover)] text-white`}>
                <ArrowRight size={18} />
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>&copy; {currentYear} One Home. {t('footer.copyright')}</p>
          <div className={styles.legalLinks}>
            <Link href="/privacy">{t('footer.privacyPolicy')}</Link>
            <Link href="/terms">{t('footer.termsOfService')}</Link>
            <Link href="/cookies">{t('footer.cookiePolicy')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
