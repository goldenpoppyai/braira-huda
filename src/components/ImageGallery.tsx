// src/components/ImageGallery.tsx
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, Download, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface ImageGalleryProps {
  images: GalleryImage[];
  title?: string;
  className?: string;
  showThumbnails?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt?: string;
  title?: string;
  photographer?: string;
  license?: string;
  category?: string;
}

export function ImageGallery({
  images,
  title,
  className,
  showThumbnails = true,
  autoPlay = false,
  autoPlayInterval = 4000
}: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!autoPlay || paused || images.length <= 1) return;
    const id = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, autoPlayInterval);
    return () => clearInterval(id);
  }, [autoPlay, paused, images.length, autoPlayInterval]);

  const currentImage = images[currentIndex];

  const goPrev = () => setCurrentIndex(i => (i - 1 + images.length) % images.length);
  const goNext = () => setCurrentIndex(i => (i + 1) % images.length);
  const goToSlide = (index: number) => setCurrentIndex(index);

  return (
    <div className={`w-full ${className || ''}`}>
      {title && <div className="mb-2 text-sm font-medium">{title}</div>}
      <div className="relative group overflow-hidden rounded-md bg-muted">
        <div className="relative w-full h-64">
          <img
            src={currentImage.src}
            alt={currentImage.alt || 'Image'}
            loading="lazy"
            crossOrigin="anonymous"
            onError={(e) => { const img = e.currentTarget as HTMLImageElement; img.src = '/placeholder.svg'; img.onerror = null; }}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 flex items-center justify-between p-2 pointer-events-none">
            <div className="pointer-events-auto">
              <Button size="icon" variant="ghost" onClick={goPrev} aria-label="previous">
                <ChevronLeft />
              </Button>
            </div>
            <div className="pointer-events-auto">
              <Button size="icon" variant="ghost" onClick={goNext} aria-label="next">
                <ChevronRight />
              </Button>
            </div>
          </div>
        </div>

        {/* Thumbnail Strip */}
        {showThumbnails && images.length > 1 && (
          <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={image.id}
                className={`flex-shrink-0 w-20 h-16 rounded-md overflow-hidden border-2 transition-all ${
                  index === currentIndex 
                    ? 'border-primary' 
                    : 'border-transparent hover:border-primary/50'
                }`}
                onClick={() => goToSlide(index)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  crossOrigin="anonymous"
                  onError={(e) => { const img = e.currentTarget as HTMLImageElement; img.src = '/placeholder.svg'; img.onerror = null; }}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Attribution */}
        {currentImage.photographer && (
          <div className="mt-2 text-xs text-muted-foreground">
            Photo by {currentImage.photographer}
            {currentImage.license && ` • ${currentImage.license}`}
          </div>
        )}
      </div>
    </div>
  );
}
