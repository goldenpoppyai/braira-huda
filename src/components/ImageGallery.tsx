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
  alt: string;
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
  const [loading, setLoading] = useState(true);
  const [favorited, setFavorited] = useState<Set<string>>(new Set());

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, autoPlayInterval);
      
      return () => clearInterval(interval);
    }
  }, [autoPlay, autoPlayInterval, images.length]);

  // Preload images
  useEffect(() => {
    const preloadImages = () => {
      images.forEach((image) => {
        const img = new Image();
        img.src = image.src;
      });
      setLoading(false);
    };
    
    preloadImages();
  }, [images]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const toggleFavorite = (imageId: string) => {
    setFavorited(prev => {
      const newSet = new Set(prev);
      if (newSet.has(imageId)) {
        newSet.delete(imageId);
      } else {
        newSet.add(imageId);
      }
      return newSet;
    });
  };

  const handleShare = async (image: GalleryImage) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: image.title || 'Braira Al Olaya',
          text: image.description || 'Beautiful view from Braira Al Olaya Riyadh',
          url: window.location.href
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const downloadImage = (image: GalleryImage) => {
    const link = document.createElement('a');
    link.href = image.src;
    link.download = `braira-${image.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading || images.length === 0) {
    return (
      <div className={`relative w-full h-96 bg-muted rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-muted-foreground">Loading gallery...</div>
      </div>
    );
  }

  const currentImage = images[currentIndex];

  return (
    <div className={`relative w-full ${className}`}>
      {title && (
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">{title}</h3>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">{images.length} images</Badge>
            {currentImage.category && (
              <Badge variant="secondary">{currentImage.category}</Badge>
            )}
          </div>
        </div>
      )}

      {/* Main Image Display */}
      <div className="relative w-full h-96 md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden elegant-shadow group">
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isZoomed ? 'scale-110' : 'scale-100'
          }`}
          loading="lazy"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        
        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 text-white hover:bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 text-white hover:bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={goToNext}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="sm"
            className="bg-black/20 text-white hover:bg-black/40"
            onClick={() => setIsZoomed(!isZoomed)}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`bg-black/20 text-white hover:bg-black/40 ${
              favorited.has(currentImage.id) ? 'text-red-400' : ''
            }`}
            onClick={() => toggleFavorite(currentImage.id)}
          >
            <Heart className={`h-4 w-4 ${favorited.has(currentImage.id) ? 'fill-current' : ''}`} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="bg-black/20 text-white hover:bg-black/40"
            onClick={() => handleShare(currentImage)}
          >
            <Share2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="bg-black/20 text-white hover:bg-black/40"
            onClick={() => downloadImage(currentImage)}
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>

        {/* Image Info */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h4 className="text-lg font-semibold mb-1">{currentImage.title}</h4>
          {currentImage.description && (
            <p className="text-sm text-white/80 mb-2">{currentImage.description}</p>
          )}
          
          {/* Image Indicators */}
          {images.length > 1 && (
            <div className="flex items-center justify-between">
              <div className="flex space-x-1">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex ? 'bg-white' : 'bg-white/40'
                    }`}
                    onClick={() => goToSlide(index)}
                  />
                ))}
              </div>
              <div className="text-xs text-white/60">
                {currentIndex + 1} / {images.length}
              </div>
            </div>
          )}
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
                className="w-full h-full object-cover"
                loading="lazy"
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
  );
}