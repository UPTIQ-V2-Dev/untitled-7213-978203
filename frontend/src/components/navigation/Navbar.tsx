import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { CheckSquare, ListTodo, Tags, Moon, Sun, LogOut, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

export const Navbar = () => {
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

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

  // Don't show navbar on auth pages
  if (['/login', '/signup'].includes(location.pathname)) {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <CheckSquare className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">TodoApp</span>
            </Link>
            
            {isAuthenticated && (
              <div className="hidden md:flex items-center gap-6">
                <Link to="/">
                  <Button 
                    variant={isActive('/') ? 'default' : 'ghost'} 
                    size="sm"
                    className="gap-2"
                  >
                    <ListTodo className="h-4 w-4" />
                    My Todos
                  </Button>
                </Link>
                <Link to="/categories">
                  <Button 
                    variant={isActive('/categories') ? 'default' : 'ghost'} 
                    size="sm"
                    className="gap-2"
                  >
                    <Tags className="h-4 w-4" />
                    Categories
                  </Button>
                </Link>
              </div>
            )}
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

            {isAuthenticated ? (
              <>
                {/* User menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <User className="h-4 w-4" />
                      <span className="hidden md:inline">{user?.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => logout()}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Mobile menu */}
                <div className="flex md:hidden items-center gap-2">
                  <Link to="/">
                    <Button 
                      variant={isActive('/') ? 'default' : 'ghost'} 
                      size="sm"
                    >
                      <ListTodo className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/categories">
                    <Button 
                      variant={isActive('/categories') ? 'default' : 'ghost'} 
                      size="sm"
                    >
                      <Tags className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};