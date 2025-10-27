export interface Image {
  id: string;
  title: string;
  description?: string;
  url: string;
  thumbnailUrl: string;
  category: string;
  tags: string[];
  uploadedAt: string;
  size: number;
  dimensions: {
    width: number;
    height: number;
  };
  mimeType: string;
}

export interface CreateImageInput {
  title: string;
  description?: string;
  category: string;
  tags: string[];
  file: File;
}

export interface UpdateImageInput {
  title?: string;
  description?: string;
  category?: string;
  tags?: string[];
}

export interface ImageFilters {
  category?: string;
  tags?: string[];
  search?: string;
}

export interface UploadProgress {
  id: string;
  file: File;
  progress: number;
  status: 'uploading' | 'success' | 'error';
  error?: string;
}