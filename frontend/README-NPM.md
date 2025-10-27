# Simple Image App

This project has been converted to use **npm** instead of pnpm.

## Available Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run eslint

# Format code
npm run prettier
```

## Project Status

✅ **Complete Image App Implementation:**
- **Gallery Page** (`/`) - Browse images with search and filtering
- **Upload Page** (`/upload`) - Drag & drop image upload
- **Image Details Page** (`/image/:id`) - Full image viewer with zoom/rotate

## Technical Stack

- React 19 + TypeScript
- Vite build tool
- Tailwind CSS + Shadcn UI components  
- React Router DOM for routing
- TanStack React Query for API state
- Mock data support with environment variables

## Environment Variables

- `VITE_USE_MOCK_DATA=true` - Use mock data instead of API calls

The project is ready to run with npm!