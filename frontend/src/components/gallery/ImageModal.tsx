import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { AspectRatio } from '../ui/aspect-ratio';
import { ScrollArea } from '../ui/scroll-area';
import { Image } from '../../types/image';
import { Download, X, Calendar, Tag, Info, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ImageModalProps {
  image: Image | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ImageModal = ({ image, isOpen, onClose }: ImageModalProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!image) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] p-0">
        <DialogHeader className="p-4 pb-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-xl leading-tight pr-8">
                {image.title}
              </DialogTitle>
              {image.description && (
                <p className="text-muted-foreground mt-1 text-sm">
                  {image.description}
                </p>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex flex-col lg:flex-row gap-4 p-4 pt-0 min-h-0">
          <div className="flex-1 min-h-0">
            <AspectRatio ratio={16/12} className="bg-muted rounded-lg overflow-hidden">
              {!imageError ? (
                <img
                  src={image.url}
                  alt={image.title}
                  className={`h-full w-full object-contain transition-opacity ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => {
                    setImageLoaded(true);
                    setImageError(false);
                  }}
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <div className="text-center">
                    <Info className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Failed to load image</p>
                  </div>
                </div>
              )}
              {!imageLoaded && !imageError && (
                <div className="absolute inset-0 bg-muted animate-pulse" />
              )}
            </AspectRatio>
          </div>

          <div className="w-full lg:w-80 shrink-0">
            <ScrollArea className="h-full max-h-96 lg:max-h-full">
              <div className="space-y-6 pr-4">
                <div className="flex gap-2">
                  <Button onClick={handleDownload} size="sm" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Link to={`/image/${image.id}`}>
                    <Button variant="outline" size="sm" onClick={onClose}>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Details
                    </Button>
                  </Link>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Info className="h-4 w-4" />
                      Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Dimensions:</span>
                        <span>{image.dimensions.width} × {image.dimensions.height}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Size:</span>
                        <span>{formatFileSize(image.size)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type:</span>
                        <span className="uppercase">{image.mimeType.split('/')[1]}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Upload Date
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(image.uploadedAt)}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Category</h4>
                    <Badge variant="secondary" className="capitalize">
                      {image.category}
                    </Badge>
                  </div>

                  {image.tags.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Tag className="h-4 w-4" />
                        Tags
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {image.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};