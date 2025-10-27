import { Image } from '../../types/image';
import { ImageCard } from './ImageCard';

interface ImageGridProps {
  images: Image[];
  loading?: boolean;
  onImageClick?: (image: Image) => void;
}

export const ImageGrid = ({ images, loading, onImageClick }: ImageGridProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="aspect-[4/3] bg-muted animate-pulse rounded-lg"
          />
        ))}
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="h-24 w-24 mb-4 rounded-full bg-muted flex items-center justify-center">
          <span className="text-2xl">📷</span>
        </div>
        <h3 className="text-lg font-semibold mb-2">No images found</h3>
        <p className="text-muted-foreground max-w-md">
          Try adjusting your filters or search terms to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {images.map((image) => (
        <ImageCard
          key={image.id}
          image={image}
          onClick={onImageClick}
        />
      ))}
    </div>
  );
};