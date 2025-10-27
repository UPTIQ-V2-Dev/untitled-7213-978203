import { Outlet } from 'react-router-dom';
import { Navbar } from '../navigation/Navbar';

export const AppLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
};