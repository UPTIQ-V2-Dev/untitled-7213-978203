import { useState } from 'react';
import { AspectRatio } from '../ui/aspect-ratio';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Image } from '../../types/image';
import { ZoomIn, ZoomOut, RotateCw, Download, Info } from 'lucide-react';

interface ImageViewerProps {
  image: Image;
  className?: string;
}

export const ImageViewer = ({ image, className = '' }: ImageViewerProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 300));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 25));
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(image.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${image.title.replace(/[^a-z0-9]/gi, '_')}.${image.mimeType.split('/')[1]}`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download image:', error);
    }
  };

  const resetView = () => {
    setZoom(100);
    setRotation(0);
  };

  return (
    <Card className={className}>
      <CardContent className="p-4">
        {/* Controls */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomOut}
              disabled={zoom <= 25}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium min-w-[60px] text-center">
              {zoom}%
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomIn}
              disabled={zoom >= 300}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRotate}
            >
              <RotateCw className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={resetView}
              disabled={zoom === 100 && rotation === 0}
            >
              Reset
            </Button>
          </div>

          <Button
            onClick={handleDownload}
            size="sm"
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>

        {/* Image Container */}
        <AspectRatio ratio={16/12} className="bg-muted rounded-lg overflow-hidden">
          <div className="h-full w-full overflow-auto">
            {!imageError ? (
              <div className="flex items-center justify-center min-h-full p-4">
                <img
                  src={image.url}
                  alt={image.title}
                  className={`transition-all duration-200 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                    maxWidth: 'none',
                    maxHeight: 'none'
                  }}
                  onLoad={() => {
                    setImageLoaded(true);
                    setImageError(false);
                  }}
                  onError={() => setImageError(true)}
                />
              </div>
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <div className="text-center">
                  <Info className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">Failed to load image</h3>
                  <p className="text-sm text-muted-foreground">
                    The image could not be loaded. Please try again later.
                  </p>
                </div>
              </div>
            )}
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 bg-muted animate-pulse" />
            )}
          </div>
        </AspectRatio>
      </CardContent>
    </Card>
  );
};