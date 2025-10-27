import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { AspectRatio } from '../ui/aspect-ratio';
import { Image } from '../../types/image';
import { Calendar, Eye, Tag } from 'lucide-react';

interface ImageCardProps {
  image: Image;
  onClick?: (image: Image) => void;
}

export const ImageCard = ({ image, onClick }: ImageCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick(image);
    }
  };

  return (
    <Card className="group cursor-pointer overflow-hidden transition-all hover:shadow-lg hover:scale-[1.02]">
      <CardContent className="p-0">
        <AspectRatio ratio={4/3} className="relative overflow-hidden">
          {!imageError ? (
            <>
              <img
                src={image.thumbnailUrl}
                alt={image.title}
                className={`h-full w-full object-cover transition-all group-hover:scale-105 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
              {!imageLoaded && (
                <div className="absolute inset-0 bg-muted animate-pulse" />
              )}
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <Eye className="h-8 w-8 text-muted-foreground" />
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          
          <div className="absolute bottom-2 left-2 right-2 translate-y-2 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
            <div className="flex items-center gap-1 text-white text-xs">
              <Calendar className="h-3 w-3" />
              {formatDate(image.uploadedAt)}
              <span className="ml-auto">
                {formatFileSize(image.size)}
              </span>
            </div>
          </div>
        </AspectRatio>

        <div className="p-4 space-y-3">
          <div>
            <Link 
              to={`/image/${image.id}`}
              className="font-semibold text-lg leading-tight hover:underline line-clamp-2"
              onClick={handleCardClick}
            >
              {image.title}
            </Link>
            {image.description && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {image.description}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs capitalize">
              {image.category}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {image.dimensions.width} × {image.dimensions.height}
            </span>
          </div>

          {image.tags.length > 0 && (
            <div className="flex items-center gap-1 flex-wrap">
              <Tag className="h-3 w-3 text-muted-foreground" />
              {image.tags.slice(0, 3).map((tag, index) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {image.tags.length > 3 && (
                <span className="text-xs text-muted-foreground">
                  +{image.tags.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};