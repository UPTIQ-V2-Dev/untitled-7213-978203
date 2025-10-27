import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import { Image } from '../../types/image';
import { Calendar, Tag, Info, Image as ImageIcon } from 'lucide-react';

interface ImageInfoProps {
  image: Image;
  className?: string;
}

export const ImageInfo = ({ image, className = '' }: ImageInfoProps) => {
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

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5" />
          Image Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Info */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">{image.title}</h3>
          {image.description && (
            <p className="text-muted-foreground leading-relaxed">
              {image.description}
            </p>
          )}
        </div>

        <Separator />

        {/* Technical Details */}
        <div className="space-y-4">
          <h4 className="font-medium flex items-center gap-2">
            <Info className="h-4 w-4" />
            Technical Details
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Dimensions:</span>
              <p className="font-medium">
                {image.dimensions.width} × {image.dimensions.height} px
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">File Size:</span>
              <p className="font-medium">{formatFileSize(image.size)}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Format:</span>
              <p className="font-medium uppercase">
                {image.mimeType.split('/')[1]}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Aspect Ratio:</span>
              <p className="font-medium">
                {(image.dimensions.width / image.dimensions.height).toFixed(2)}:1
              </p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Upload Date */}
        <div className="space-y-2">
          <h4 className="font-medium flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Upload Date
          </h4>
          <p className="text-sm text-muted-foreground">
            {formatDate(image.uploadedAt)}
          </p>
        </div>

        <Separator />

        {/* Category */}
        <div className="space-y-2">
          <h4 className="font-medium">Category</h4>
          <Badge variant="secondary" className="capitalize">
            {image.category}
          </Badge>
        </div>

        {/* Tags */}
        {image.tags.length > 0 && (
          <>
            <Separator />
            <div className="space-y-3">
              <h4 className="font-medium flex items-center gap-2">
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
          </>
        )}
      </CardContent>
    </Card>
  );
};