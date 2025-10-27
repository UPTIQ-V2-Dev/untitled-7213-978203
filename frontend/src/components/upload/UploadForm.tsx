import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { IMAGE_CATEGORIES } from '../../data/imageData';
import { CreateImageInput } from '../../types/image';
import { Tag, X } from 'lucide-react';

const uploadFormSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  category: z.string().min(1, 'Category is required'),
  tags: z.array(z.string()).max(10, 'Maximum 10 tags allowed').optional(),
});

type UploadFormData = z.infer<typeof uploadFormSchema>;

interface UploadFormProps {
  files: File[];
  onSubmit: (data: Omit<CreateImageInput, 'file'>[]) => void;
  loading?: boolean;
}

export const UploadForm = ({ files, onSubmit, loading }: UploadFormProps) => {
  const [currentTagInput, setCurrentTagInput] = useState('');

  const form = useForm<UploadFormData>({
    resolver: zodResolver(uploadFormSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      tags: [],
    },
  });

  const watchedTags = form.watch('tags') || [];

  const handleSubmit = (data: UploadFormData) => {
    const uploadData = files.map(file => ({
      title: data.title,
      description: data.description,
      category: data.category,
      tags: data.tags || [],
    }));
    
    onSubmit(uploadData);
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const tag = currentTagInput.trim().toLowerCase();
      
      if (tag && !watchedTags.includes(tag) && watchedTags.length < 10) {
        form.setValue('tags', [...watchedTags, tag]);
        setCurrentTagInput('');
      }
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const updatedTags = watchedTags.filter(tag => tag !== tagToRemove);
    form.setValue('tags', updatedTags);
  };

  if (files.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">Select files to upload first</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Image Details</CardTitle>
        <p className="text-sm text-muted-foreground">
          Add details for your {files.length} selected image{files.length !== 1 ? 's' : ''}
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter a descriptive title" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add a description for your images..."
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {IMAGE_CATEGORIES.filter(cat => cat !== 'all').map((category) => (
                        <SelectItem key={category} value={category} className="capitalize">
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={() => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <div className="space-y-3">
                      <Input
                        placeholder="Add tags (press Enter or comma to add)"
                        value={currentTagInput}
                        onChange={(e) => setCurrentTagInput(e.target.value)}
                        onKeyDown={handleAddTag}
                        disabled={watchedTags.length >= 10}
                      />
                      
                      {watchedTags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {watchedTags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="gap-1 pr-1"
                            >
                              <Tag className="h-3 w-3" />
                              {tag}
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                                onClick={() => handleRemoveTag(tag)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </Badge>
                          ))}
                        </div>
                      )}
                      
                      <p className="text-xs text-muted-foreground">
                        {10 - watchedTags.length} tags remaining
                      </p>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={loading || files.length === 0}
                className="flex-1"
              >
                {loading ? 'Uploading...' : `Upload ${files.length} Image${files.length !== 1 ? 's' : ''}`}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};