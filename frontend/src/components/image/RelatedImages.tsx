import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { AspectRatio } from '../ui/aspect-ratio';
import { Badge } from '../ui/badge';
import { Image } from '../../types/image';
import { Images, ExternalLink } from 'lucide-react';

interface RelatedImagesProps {
  images: Image[];
  loading?: boolean;
  className?: string;
}

export const RelatedImages = ({ images, loading, className = '' }: RelatedImagesProps) => {
  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Images className="h-5 w-5" />
            Related Images
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="aspect-square bg-muted animate-pulse rounded-lg"
              />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (images.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Images className="h-5 w-5" />
            Related Images
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Images className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No related images found</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Images className="h-5 w-5" />
          Related Images
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Images with similar tags or category
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {images.map((image) => (
            <RelatedImageCard key={image.id} image={image} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

interface RelatedImageCardProps {
  image: Image;
}

const RelatedImageCard = ({ image }: RelatedImageCardProps) => {
  return (
    <Link
      to={`/image/${image.id}`}
      className="group block rounded-lg overflow-hidden border transition-all hover:shadow-md hover:border-primary/50"
    >
      <AspectRatio ratio={1} className="bg-muted">
        <img
          src={image.thumbnailUrl}
          alt={image.title}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              parent.innerHTML = `
                <div class="flex h-full items-center justify-center">
                  <span class="text-muted-foreground text-xs">No preview</span>
                </div>
              `;
            }
          }}
        />
      </AspectRatio>
      <div className="p-3 space-y-2">
        <h4 className="font-medium text-sm line-clamp-1 group-hover:text-primary">
          {image.title}
        </h4>
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs capitalize">
            {image.category}
          </Badge>
          <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-primary" />
        </div>
      </div>
    </Link>
  );
};