import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Store, UtensilsCrossed, ClipboardList, LogOut } from 'lucide-react';
import BackgroundCarousel from './BackgroundCarousel';

const Layout = () => {
  const location = useLocation();

  const backgroundImages = [
    '/login_bg_1_1774981499798.png',
    '/login_bg_2_1774981519376.png',
    '/login_bg_3_1774981540986.png',
  ];

  const links = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Vendors', path: '/vendors', icon: <Store size={20} /> },
    { name: 'Menues', path: '/menus', icon: <UtensilsCrossed size={20} /> },
    { name: 'Orders', path: '/orders', icon: <ClipboardList size={20} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="flex h-screen text-slate-100 relative overflow-hidden">
      <BackgroundCarousel images={backgroundImages} interval={15000} />
      
      <aside className="w-64 border-r border-white/10 bg-white/5 backdrop-blur-3xl py-6 px-4 flex flex-col gap-8 flex-shrink-0 relative z-10 w-[240px]">
        <div className="flex items-center gap-3 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500 px-2">
          <UtensilsCrossed className="text-blue-500" /> CloudKitchen
        </div>
        
        <nav className="flex-1 space-y-2 mt-4">
          <ul className="space-y-1">
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                      isActive 
                        ? 'bg-blue-500/10 text-blue-400 font-semibold border border-blue-500/20' 
                        : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                    }`}
                  >
                    {link.icon} {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <button 
          onClick={handleLogout} 
          className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors font-medium text-left w-full mt-auto"
        >
          <LogOut size={20} /> Logout
        </button>
      </aside>
      
      <main className="flex-1 p-8 overflow-y-auto w-full relative z-10">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
