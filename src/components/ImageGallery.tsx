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
  description?: string;
  category?: string;
  photographer?: string;
  license?: string;
}

export function ImageGallery({
  images,
  title,
  className = '',
  showThumbnails = true,
  autoPlay = false,
  autoPlayInterval = 5000
}: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const currentImage = images[currentIndex];

  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;
    const id = setInterval(() => {
      setCurrentIndex((idx) => (idx + 1) % images.length);
    }, autoPlayInterval);
    return () => clearInterval(id);
  }, [autoPlay, autoPlayInterval, images.length]);

  function prevSlide() {
    setCurrentIndex((idx) => (idx - 1 + images.length) % images.length);
  }

  function nextSlide() {
    setCurrentIndex((idx) => (idx + 1) % images.length);
  }

  function goToSlide(index: number) {
    setCurrentIndex(index);
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Header */}
      {(title || images.length > 0) && (
        <div className="flex items-center justify-between mb-4">
          {title && <h3 className="text-2xl font-semibold mb-2">{title}</h3>}
          <div className="flex items-center space-x-2">
            <Badge variant="outline">{images.length} images</Badge>
            {currentImage?.category && (
              <Badge variant="secondary">{currentImage.category}</Badge>
            )}
          </div>
        </div>
      )}

      {/* Main Image Display */}
      <div className="relative w-full h-96 md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden elegant-shadow group">
        <img
          src={currentImage?.src}
          alt={currentImage?.alt || "Hotel image"}
          loading="lazy"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          onError={(e) => { const img = e.currentTarget as HTMLImageElement; img.onerror = null; img.src = '/placeholder.svg'; }}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isZoomed ? 'scale-110' : 'scale-100'
          }`}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={nextSlide}
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </Button>

            {/* Zoom & Actions */}
            <div className="absolute right-4 bottom-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="ghost" size="sm" className="p-2" onClick={() => setIsZoomed((z) => !z)}>
                <ZoomIn className="h-4 w-4 text-white" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Download className="h-4 w-4 text-white" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Share2 className="h-4 w-4 text-white" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Heart className="h-4 w-4 text-white" />
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Thumbnail Strip */}
      {showThumbnails && images.length > 1 && (
        <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              className={`flex-shrink-0 w-20 h-16 rounded-md overflow-hidden border-2 transition-all ${
                index === currentIndex ? 'border-primary' : 'border-transparent hover:border-primary/50'
              }`}
              onClick={() => goToSlide(index)}
            >
              <img
                src={image.src}
                alt={image.alt || "Thumbnail"}
                loading="lazy"
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
                onError={(e) => { const img = e.currentTarget as HTMLImageElement; img.onerror = null; img.src = '/placeholder.svg'; }}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Attribution */}
      {currentImage?.photographer && (
        <div className="mt-2 text-xs text-muted-foreground">
          Photo by {currentImage.photographer}
          {currentImage.license && ` • ${currentImage.license}`}
        </div>
      )}
    </div>
  );
}
