import { useEffect, useState } from 'react';
import { vendorAPI, orderAPI, userAPI } from '../api';
import { Users, Store, ClipboardList, TrendingUp } from 'lucide-react';
import Carousel from '../components/Carousel';

const Dashboard = () => {
  const [stats, setStats] = useState({ vendors: 0, orders: 0, revenue: 0, users: 0 });

  const carouselImages = [
    {
      url: '/dashboard_food_1_1774981440769.png',
      title: 'Exquisite Pasta Creations',
      subtitle: 'Experience the art of Italian cuisine with our handcrafted gourmet pasta.'
    },
    {
      url: '/dashboard_food_2_1774981462002.png',
      title: 'Premium Burger Collection',
      subtitle: 'Indulge in juicy, charcoal-grilled burgers crafted with the finest ingredients.'
    },
    {
      url: '/dashboard_food_3_1774981478929.png',
      title: 'Artistic Sushi Selection',
      subtitle: 'Fresh, vibrant sushi rolls prepared by our master chefs for a true taste of Japan.'
    }
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [vendorsRes, ordersRes, usersRes] = await Promise.all([
        vendorAPI.getAll(),
        orderAPI.getAll(),
        userAPI.getAll()
      ]);
      
      const orders = ordersRes.data || [];
      const revenue = orders.reduce((acc, order) => acc + (order.totalPrice || 0), 0);

      setStats({
        vendors: vendorsRes.data?.length || 0,
        orders: orders.length,
        revenue: revenue,
        users: usersRes.data?.length || 0
      });
    } catch (error) {
      console.error('Error fetching dashboard stats', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">Dashboard Overview</h1>
      </div>

      <Carousel images={carouselImages} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-800 border border-slate-700/50 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 hover:border-blue-500/50">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl">
              <Store size={24} />
            </div>
            <div>
              <div className="text-slate-400 text-sm font-medium">Total Vendors</div>
              <h3 className="text-3xl font-bold text-slate-50">{stats.vendors}</h3>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700/50 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 hover:border-emerald-500/50">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
              <ClipboardList size={24} />
            </div>
            <div>
              <div className="text-slate-400 text-sm font-medium">Total Orders</div>
              <h3 className="text-3xl font-bold text-slate-50">{stats.orders}</h3>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700/50 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 hover:border-indigo-500/50">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl">
              <TrendingUp size={24} />
            </div>
            <div>
              <div className="text-slate-400 text-sm font-medium">Total Revenue</div>
              <h3 className="text-3xl font-bold text-slate-50">${stats.revenue.toFixed(2)}</h3>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700/50 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 hover:border-red-500/50">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-red-500/10 text-red-500 rounded-xl">
              <Users size={24} />
            </div>
            <div>
              <div className="text-slate-400 text-sm font-medium">Active Users</div>
              <h3 className="text-3xl font-bold text-slate-50">{stats.users}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
