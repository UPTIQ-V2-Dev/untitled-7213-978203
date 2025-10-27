import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ImageViewer } from '../components/image/ImageViewer';
import { ImageInfo } from '../components/image/ImageInfo';
import { RelatedImages } from '../components/image/RelatedImages';
import { useImage, useRelatedImages } from '../hooks/useImages';
import { ArrowLeft, Share, AlertCircle } from 'lucide-react';

export const ImageDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: image, isLoading, error } = useImage(id!);
  const { data: relatedImages = [], isLoading: loadingRelated } = useRelatedImages(id!);

  const handleShare = async () => {
    if (!image) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: image.title,
          text: image.description || 'Check out this image',
          url: window.location.href,
        });
      } catch (error) {
        // User canceled sharing or sharing failed
        console.log('Share canceled or failed:', error);
      }
    } else {
      // Fallback: copy URL to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        // In a real app, show a toast notification here
        console.log('URL copied to clipboard');
      } catch (error) {
        console.error('Failed to copy URL:', error);
      }
    }
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="gap-2 mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Gallery
          </Button>

          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="h-24 w-24 mb-4 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertCircle className="h-12 w-12 text-destructive" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Image Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The image you're looking for doesn't exist or may have been removed.
            </p>
            <Button onClick={() => navigate('/')}>
              Back to Gallery
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading || !image) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-8 w-20 bg-muted animate-pulse rounded" />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="aspect-[16/12] bg-muted animate-pulse rounded-lg" />
            </div>
            <div className="space-y-4">
              <div className="h-64 bg-muted animate-pulse rounded-lg" />
              <div className="h-48 bg-muted animate-pulse rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Gallery
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="gap-2"
          >
            <Share className="h-4 w-4" />
            Share
          </Button>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Image Viewer */}
          <div className="lg:col-span-2">
            <ImageViewer image={image} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <ImageInfo image={image} />
            <RelatedImages 
              images={relatedImages} 
              loading={loadingRelated} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};