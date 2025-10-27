import { Image } from '../types/image';

export const MOCK_IMAGES: Image[] = [
  {
    id: '1',
    title: 'Mountain Landscape',
    description: 'Beautiful mountain scenery during golden hour',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
    category: 'nature',
    tags: ['mountain', 'landscape', 'sunset', 'nature'],
    uploadedAt: '2024-01-15T10:30:00Z',
    size: 2150000,
    dimensions: {
      width: 800,
      height: 600
    },
    mimeType: 'image/jpeg'
  },
  {
    id: '2',
    title: 'City Lights',
    description: 'Urban nightscape with vibrant colors',
    url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=200&fit=crop',
    category: 'urban',
    tags: ['city', 'night', 'lights', 'urban'],
    uploadedAt: '2024-01-14T18:45:00Z',
    size: 1850000,
    dimensions: {
      width: 800,
      height: 600
    },
    mimeType: 'image/jpeg'
  },
  {
    id: '3',
    title: 'Ocean Waves',
    description: 'Peaceful ocean waves meeting the shore',
    url: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=600&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=300&h=200&fit=crop',
    category: 'nature',
    tags: ['ocean', 'waves', 'beach', 'water'],
    uploadedAt: '2024-01-13T14:20:00Z',
    size: 1950000,
    dimensions: {
      width: 800,
      height: 600
    },
    mimeType: 'image/jpeg'
  },
  {
    id: '4',
    title: 'Forest Path',
    description: 'A winding path through a dense forest',
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=200&fit=crop',
    category: 'nature',
    tags: ['forest', 'path', 'trees', 'hiking'],
    uploadedAt: '2024-01-12T09:15:00Z',
    size: 2250000,
    dimensions: {
      width: 800,
      height: 600
    },
    mimeType: 'image/jpeg'
  },
  {
    id: '5',
    title: 'Modern Architecture',
    description: 'Contemporary building with geometric design',
    url: 'https://images.unsplash.com/photo-1448630360428-65456885c650?w=800&h=600&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1448630360428-65456885c650?w=300&h=200&fit=crop',
    category: 'architecture',
    tags: ['architecture', 'building', 'modern', 'geometric'],
    uploadedAt: '2024-01-11T16:00:00Z',
    size: 1750000,
    dimensions: {
      width: 800,
      height: 600
    },
    mimeType: 'image/jpeg'
  },
  {
    id: '6',
    title: 'Abstract Art',
    description: 'Colorful abstract composition',
    url: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=200&fit=crop',
    category: 'art',
    tags: ['abstract', 'colorful', 'art', 'creative'],
    uploadedAt: '2024-01-10T12:30:00Z',
    size: 1650000,
    dimensions: {
      width: 800,
      height: 600
    },
    mimeType: 'image/jpeg'
  }
];

export const IMAGE_CATEGORIES = [
  'all',
  'nature',
  'urban',
  'architecture',
  'art',
  'people',
  'animals',
  'technology'
];