import { useState } from 'react';
import { Button } from '../components/ui/button';
import { SearchBar } from '../components/gallery/SearchBar';
import { FilterPanel } from '../components/gallery/FilterPanel';
import { ImageGrid } from '../components/gallery/ImageGrid';
import { ImageModal } from '../components/gallery/ImageModal';
import { useImages } from '../hooks/useImages';
import { Image, ImageFilters } from '../types/image';
import { Filter, LayoutGrid } from 'lucide-react';

export const HomePage = () => {
  const [filters, setFilters] = useState<ImageFilters>({
    category: 'all',
    tags: [],
    search: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  const { data: images = [], isLoading, error } = useImages(filters);

  const handleSearch = (query: string) => {
    setFilters(prev => ({ ...prev, search: query }));
  };

  const handleCategoryChange = (category: string) => {
    setFilters(prev => ({ ...prev, category }));
  };

  const handleTagToggle = (tag: string) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags?.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...(prev.tags || []), tag]
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      category: 'all',
      tags: [],
      search: ''
    });
  };

  const handleImageClick = (image: Image) => {
    setSelectedImage(image);
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="h-24 w-24 mb-4 rounded-full bg-destructive/10 flex items-center justify-center">
            <span className="text-2xl">❌</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Failed to load images</h3>
          <p className="text-muted-foreground">
            There was an error loading the image gallery. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Image Gallery</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover and explore our collection of beautiful images. Search, filter, and find the perfect image for your needs.
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <SearchBar 
                onSearch={handleSearch} 
                initialValue={filters.search}
                placeholder="Search by title, description, or tags..."
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={showFilters ? 'default' : 'outline'}
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              <Button variant="outline" className="gap-2">
                <LayoutGrid className="h-4 w-4" />
                Grid
              </Button>
            </div>
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              {isLoading ? 'Loading...' : `${images.length} image${images.length !== 1 ? 's' : ''} found`}
            </span>
            {(filters.category !== 'all' || filters.tags?.length || filters.search) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                Clear filters
              </Button>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Panel */}
          {showFilters && (
            <div className="w-full lg:w-80 shrink-0">
              <FilterPanel
                selectedCategory={filters.category || 'all'}
                selectedTags={filters.tags || []}
                onCategoryChange={handleCategoryChange}
                onTagToggle={handleTagToggle}
                onClearFilters={handleClearFilters}
              />
            </div>
          )}

          {/* Image Grid */}
          <div className="flex-1 min-w-0">
            <ImageGrid
              images={images}
              loading={isLoading}
              onImageClick={handleImageClick}
            />
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        image={selectedImage}
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
};