import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { Camera, Upload, Image as ImageIcon, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';

export const Navbar = () => {
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <Camera className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">ImageApp</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-6">
              <Link to="/">
                <Button 
                  variant={isActive('/') ? 'default' : 'ghost'} 
                  size="sm"
                  className="gap-2"
                >
                  <ImageIcon className="h-4 w-4" />
                  Gallery
                </Button>
              </Link>
              <Link to="/upload">
                <Button 
                  variant={isActive('/upload') ? 'default' : 'ghost'} 
                  size="sm"
                  className="gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Upload
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="gap-2"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {isDark ? 'Light' : 'Dark'}
            </Button>

            {/* Mobile menu */}
            <div className="flex md:hidden items-center gap-2">
              <Link to="/">
                <Button 
                  variant={isActive('/') ? 'default' : 'ghost'} 
                  size="sm"
                >
                  <ImageIcon className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/upload">
                <Button 
                  variant={isActive('/upload') ? 'default' : 'ghost'} 
                  size="sm"
                >
                  <Upload className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};