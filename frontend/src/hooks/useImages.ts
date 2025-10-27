import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getImages, getImageById, uploadImage, updateImage, deleteImage, getRelatedImages } from '../services/imageService';
import { Image, CreateImageInput, UpdateImageInput, ImageFilters } from '../types/image';

export const useImages = (filters?: ImageFilters) => {
  return useQuery({
    queryKey: ['images', filters],
    queryFn: () => getImages(filters),
  });
};

export const useImage = (id: string) => {
  return useQuery({
    queryKey: ['image', id],
    queryFn: () => getImageById(id),
    enabled: !!id,
  });
};

export const useRelatedImages = (id: string) => {
  return useQuery({
    queryKey: ['images', 'related', id],
    queryFn: () => getRelatedImages(id),
    enabled: !!id,
  });
};

export const useUploadImage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (imageData: CreateImageInput) => uploadImage(imageData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['images'] });
    },
  });
};

export const useUpdateImage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateImageInput }) => 
      updateImage(id, data),
    onSuccess: (updatedImage: Image) => {
      queryClient.invalidateQueries({ queryKey: ['images'] });
      queryClient.setQueryData(['image', updatedImage.id], updatedImage);
    },
  });
};

export const useDeleteImage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => deleteImage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['images'] });
    },
  });
};