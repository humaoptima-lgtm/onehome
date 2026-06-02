import React from 'react';
import Image from 'next/image';
import styles from './PropertyGallery.module.css';
import { MediaItem } from '@/types/common';
import { Grid, Video, Compass, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PropertyGalleryProps {
  media: MediaItem[];
}

export function PropertyGallery({ media }: PropertyGalleryProps) {
  // Sort media by sortOrder
  const sortedMedia = [...media].sort((a, b) => a.sortOrder - b.sortOrder);
  
  // Filter for images to show in the grid
  const images = sortedMedia.filter(m => m.type === 'image');
  
  if (images.length === 0) return null;

  const mainImage = images[0];
  const sideImages = images.slice(1, 5); // Take up to 4 images for the side grid

  return (
    <div className={styles.galleryWrapper}>
      <div className={styles.grid}>
        {/* Main Image */}
        <div className={styles.mainImageContainer}>
          <Image
            src={mainImage.url}
            alt={mainImage.caption || 'Property image'}
            fill
            priority
            className={styles.image}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Side Images Grid */}
        <div className={styles.sideImagesContainer}>
          {sideImages.map((img, index) => (
            <div key={img.id} className={styles.sideImageWrapper}>
              <Image
                src={img.url}
                alt={img.caption || `Property image ${index + 2}`}
                fill
                className={styles.image}
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          ))}
          {/* Fill empty slots if less than 4 side images */}
          {Array.from({ length: Math.max(0, 4 - sideImages.length) }).map((_, i) => (
            <div key={`empty-${i}`} className={styles.emptySlot} />
          ))}
        </div>
      </div>

      <div className={styles.actions}>
        <Button variant="secondary" size="sm" className="gap-2">
          <Grid size={16} />
          View All Photos
        </Button>
        {sortedMedia.some(m => m.type === 'video') && (
          <Button variant="secondary" size="sm" className="gap-2">
            <Video size={16} />
            Video
          </Button>
        )}
        {sortedMedia.some(m => m.type === '360tour') && (
          <Button variant="secondary" size="sm" className="gap-2">
            <Compass size={16} />
            360° Tour
          </Button>
        )}
        {sortedMedia.some(m => m.type === 'floorplan') && (
          <Button variant="secondary" size="sm" className="gap-2">
            <Map size={16} />
            Floorplan
          </Button>
        )}
      </div>
    </div>
  );
}
