'use client';

import React from 'react';
import styles from './MapView.module.css';
import { Property } from '@/types/property';
import { formatCurrency } from '@/lib/utils';
import { MapPin } from 'lucide-react';

interface MapViewProps {
  properties: Property[];
}

export function MapView({ properties }: MapViewProps) {
  return (
    <div className={styles.mapContainer}>
      {/* 
        This is a placeholder for a real map (e.g. Google Maps or Mapbox).
        For now, we just simulate map pins floating on a background.
      */}
      <div className={styles.mapImagePlaceholder}>
        {properties.map((p, index) => {
          // Simulate some random positions for the demo
          // In real life we'd use p.coordinates.lat/lng with a map library
          const top = 20 + (index * 15) % 60 + '%';
          const left = 30 + (index * 25) % 50 + '%';
          
          return (
            <div 
              key={p.id} 
              className={styles.mapPin}
              style={{ top, left }}
            >
              <div className={styles.pinLabel}>
                {formatCurrency(p.price, true)}
              </div>
              <MapPin size={24} className={styles.pinIcon} />
            </div>
          );
        })}
      </div>
      
      <div className={styles.mapOverlay}>
        <div className={styles.mapControl}>
          <button className={styles.controlBtn}>+</button>
          <button className={styles.controlBtn}>-</button>
        </div>
      </div>
    </div>
  );
}
