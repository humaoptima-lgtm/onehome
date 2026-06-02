import React from 'react';
import Image from 'next/image';
import styles from './PropertyOverview.module.css';
import { Property } from '@/types/property';
import { formatCurrency, formatArea } from '@/lib/utils';
import { MapPin, Bed, Bath, Maximize, Calendar, Shield, Share2, Heart, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface PropertyOverviewProps {
  property: Property;
}

export function PropertyOverview({ property }: PropertyOverviewProps) {
  return (
    <div className={styles.overview}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <div className={styles.badges}>
            <Badge className="bg-[var(--color-gold)] text-white border-[var(--color-gold)]">{property.status === 'tersedia' ? 'Tersedia' : property.status}</Badge>
            <Badge variant="default">{property.condition === 'baru' ? 'Proyek Baru' : 'Seken'}</Badge>
            <Badge variant="outline">{property.type.charAt(0).toUpperCase() + property.type.slice(1)}</Badge>
          </div>
          <h1 className={styles.title}>{property.title}</h1>
          <div className={styles.location}>
            <MapPin size={18} />
            <span>{property.address.full}</span>
          </div>
        </div>

        <div className={styles.actions}>
          <Button variant="outline" size="icon" aria-label="Share">
            <Share2 size={18} />
          </Button>
          <Button variant="outline" size="icon" aria-label="Save">
            <Heart size={18} />
          </Button>
        </div>
      </div>

      <div className={styles.priceRow}>
        <div className={styles.priceCol}>
          <h2 className={styles.price}>{formatCurrency(property.price)}</h2>
          {property.pricePerSqm && (
            <span className={styles.pricePerSqm}>{formatCurrency(property.pricePerSqm)} / m²</span>
          )}
        </div>
        {property.propertyScore && (
          <div className={styles.scoreBox}>
            <div className={styles.scoreLabel}>One Home Score</div>
            <div className={styles.scoreValue}>
              <Award size={20} className={styles.scoreIcon} />
              {property.propertyScore}
              <span className={styles.scoreMax}>/100</span>
            </div>
          </div>
        )}
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.stat}>
          <Bed size={24} className={styles.statIcon} />
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{property.bedrooms}</span>
            <span className={styles.statLabel}>Kamar Tidur</span>
          </div>
        </div>
        <div className={styles.stat}>
          <Bath size={24} className={styles.statIcon} />
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{property.bathrooms}</span>
            <span className={styles.statLabel}>Kamar Mandi</span>
          </div>
        </div>
        <div className={styles.stat}>
          <Maximize size={24} className={styles.statIcon} />
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{formatArea(property.buildingArea)}</span>
            <span className={styles.statLabel}>Luas Bangunan</span>
          </div>
        </div>
        <div className={styles.stat}>
          <Calendar size={24} className={styles.statIcon} />
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{property.yearBuilt}</span>
            <span className={styles.statLabel}>Tahun Dibangun</span>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Deskripsi</h3>
        <p className={styles.description}>{property.description}</p>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Fasilitas & Fitur</h3>
        <div className={styles.featuresList}>
          {property.features.map((feature, index) => (
            <div key={index} className={styles.featureItem}>
              <Shield size={16} className={styles.featureCheck} />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.agentsWrapper}>
        <div className={styles.agentCard}>
          <h4 className={styles.agentCardTitle}>Listed By</h4>
          <div className={styles.agentInfo}>
            <div className={styles.agentPhoto}>
              <Image 
                src={property.agent.photo || '/images/agent-placeholder.png'} 
                alt={property.agent.name}
                fill
                className={styles.image}
                sizes="64px"
              />
            </div>
            <div className={styles.agentDetails}>
              <span className={styles.agentName}>{property.agent.name}</span>
              <span className={styles.agentCompany}>{property.agent.company}</span>
            </div>
            <Button variant="outline" size="sm">Hubungi</Button>
          </div>
        </div>

        {property.developer && (
          <div className={styles.agentCard}>
            <h4 className={styles.agentCardTitle}>Developer</h4>
            <div className={styles.agentInfo}>
              <div className={styles.developerLogo}>
                <Image 
                  src={property.developer.logo || '/images/dev-placeholder.png'} 
                  alt={property.developer.name}
                  fill
                  className={styles.image}
                  sizes="64px"
                />
              </div>
              <div className={styles.agentDetails}>
                <span className={styles.agentName}>{property.developer.name}</span>
              </div>
              <Button variant="outline" size="sm">Profil</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
