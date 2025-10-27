import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { DropZone } from '../components/upload/DropZone';
import { UploadForm } from '../components/upload/UploadForm';
import { useUploadImage } from '../hooks/useImages';
import { CreateImageInput } from '../types/image';
import { ArrowLeft, Upload } from 'lucide-react';
import { Button } from '../components/ui/button';

export const UploadPage = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const navigate = useNavigate();
  const uploadImageMutation = useUploadImage();

  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles(files);
  };

  const handleUpload = async (uploadData: Omit<CreateImageInput, 'file'>[]) => {
    if (selectedFiles.length === 0) {
      toast.error('Please select files to upload');
      return;
    }

    try {
      const promises = selectedFiles.map((file, index) => {
        const data = uploadData[0]; // Use same metadata for all files
        return uploadImageMutation.mutateAsync({
          ...data,
          file,
          title: selectedFiles.length > 1 ? `${data.title} (${index + 1})` : data.title
        });
      });

      await Promise.all(promises);
      
      toast.success(`Successfully uploaded ${selectedFiles.length} image${selectedFiles.length !== 1 ? 's' : ''}!`);
      
      // Reset form
      setSelectedFiles([]);
      
      // Navigate back to gallery
      navigate('/');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload images. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Gallery
          </Button>
        </div>

        <div className="text-center space-y-4">
          <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold">Upload Images</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Share your beautiful images with the world. Upload multiple files and add details to make them discoverable.
          </p>
        </div>

        {/* Upload Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Select Files</h2>
            <DropZone
              onFilesSelected={handleFilesSelected}
              maxFiles={10}
              maxSize={10 * 1024 * 1024} // 10MB
              disabled={uploadImageMutation.isPending}
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Image Details</h2>
            <UploadForm
              files={selectedFiles}
              onSubmit={handleUpload}
              loading={uploadImageMutation.isPending}
            />
          </div>
        </div>

        {/* Upload Tips */}
        <div className="bg-muted/50 rounded-lg p-6">
          <h3 className="font-semibold mb-3">Upload Tips</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <h4 className="font-medium text-foreground mb-2">Supported Formats</h4>
              <ul className="space-y-1">
                <li>• JPEG (.jpg, .jpeg)</li>
                <li>• PNG (.png)</li>
                <li>• GIF (.gif)</li>
                <li>• WebP (.webp)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Best Practices</h4>
              <ul className="space-y-1">
                <li>• Use descriptive titles</li>
                <li>• Add relevant tags</li>
                <li>• Choose appropriate category</li>
                <li>• Keep file size under 10MB</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};