import { apiClient } from '../lib/api';
import { Image, CreateImageInput, UpdateImageInput, ImageFilters } from '../types/image';
import { MOCK_IMAGES } from '../data/imageData';

// Get all images with optional filters
export const getImages = async (filters?: ImageFilters): Promise<Image[]> => {
  if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
    let filteredImages = MOCK_IMAGES;
    
    if (filters?.category && filters.category !== 'all') {
      filteredImages = filteredImages.filter(img => img.category === filters.category);
    }
    
    if (filters?.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredImages = filteredImages.filter(img => 
        img.title.toLowerCase().includes(searchTerm) ||
        img.description?.toLowerCase().includes(searchTerm) ||
        img.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }
    
    if (filters?.tags?.length) {
      filteredImages = filteredImages.filter(img =>
        filters.tags!.some(tag => img.tags.includes(tag))
      );
    }
    
    return filteredImages;
  }
  
  const params = new URLSearchParams();
  if (filters?.category) params.append('category', filters.category);
  if (filters?.search) params.append('search', filters.search);
  if (filters?.tags?.length) {
    filters.tags.forEach(tag => params.append('tags', tag));
  }
  
  const response = await apiClient.get<Image[]>(`/images?${params.toString()}`);
  return response.data;
};

// Get single image by ID
export const getImageById = async (id: string): Promise<Image> => {
  if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
    const image = MOCK_IMAGES.find(img => img.id === id);
    if (!image) {
      throw new Error('Image not found');
    }
    return image;
  }
  
  const response = await apiClient.get<Image>(`/images/${id}`);
  return response.data;
};

// Upload single image
export const uploadImage = async (imageData: CreateImageInput): Promise<Image> => {
  if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
    const newImage: Image = {
      id: Date.now().toString(),
      title: imageData.title,
      description: imageData.description,
      url: URL.createObjectURL(imageData.file),
      thumbnailUrl: URL.createObjectURL(imageData.file),
      category: imageData.category,
      tags: imageData.tags,
      uploadedAt: new Date().toISOString(),
      size: imageData.file.size,
      dimensions: {
        width: 800,
        height: 600
      },
      mimeType: imageData.file.type
    };
    return newImage;
  }
  
  const formData = new FormData();
  formData.append('file', imageData.file);
  formData.append('title', imageData.title);
  if (imageData.description) formData.append('description', imageData.description);
  formData.append('category', imageData.category);
  imageData.tags.forEach(tag => formData.append('tags', tag));
  
  const response = await apiClient.post<Image>('/images/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

// Update image metadata
export const updateImage = async (id: string, imageData: UpdateImageInput): Promise<Image> => {
  if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
    const existingImage = MOCK_IMAGES.find(img => img.id === id);
    if (!existingImage) {
      throw new Error('Image not found');
    }
    return {
      ...existingImage,
      ...imageData
    };
  }
  
  const response = await apiClient.put<Image>(`/images/${id}`, imageData);
  return response.data;
};

// Delete image
export const deleteImage = async (id: string): Promise<void> => {
  if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
    // Mock deletion - just return success
    return;
  }
  
  await apiClient.delete(`/images/${id}`);
};

// Get related images
export const getRelatedImages = async (id: string): Promise<Image[]> => {
  if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
    const currentImage = MOCK_IMAGES.find(img => img.id === id);
    if (!currentImage) return [];
    
    // Return images with similar tags or category
    return MOCK_IMAGES
      .filter(img => img.id !== id)
      .filter(img => 
        img.category === currentImage.category ||
        img.tags.some(tag => currentImage.tags.includes(tag))
      )
      .slice(0, 4);
  }
  
  const response = await apiClient.get<Image[]>(`/images/${id}/related`);
  return response.data;
};