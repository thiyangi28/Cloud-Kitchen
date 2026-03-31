import { useState, useEffect } from 'react';
import { orderAPI, vendorAPI } from '../api';
import { ClipboardList, Clock, Truck, CheckCircle, Search } from 'lucide-react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [filterVendorId, setFilterVendorId] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVendors();
    fetchAllOrders();
  }, []);

  const fetchVendors = async () => {
    try {
      const res = await vendorAPI.getAll();
      setVendors(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAllOrders = async () => {
    setLoading(true);
    try {
      const res = await orderAPI.getAll();
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchVendorOrders = async (vendorId) => {
    setLoading(true);
    try {
      if (vendorId === 'all') {
        const res = await orderAPI.getAll();
        setOrders(res.data);
      } else {
        const res = await orderAPI.getByVendor(vendorId);
        setOrders(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterVendorId(value);
    fetchVendorOrders(value);
  };

  const getStatusBadge = (status) => {
    const s = status ? status.toLowerCase() : 'pending';
    if (s === 'completed' || s === 'delivered') return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"><CheckCircle size={14}/> {status}</span>;
    if (s === 'preparing') return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20"><Clock size={14}/> {status}</span>;
    if (s === 'out for delivery') return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20"><Truck size={14}/> {status}</span>;
    return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-700 text-slate-300 border border-slate-600">{status || 'Pending'}</span>;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">Order History</h1>
      </div>

      <div className="bg-slate-800 border border-slate-700/80 p-4 rounded-xl mb-8 flex gap-6 items-center flex-wrap shadow-sm">
        <div className="flex items-center gap-3 text-slate-400 font-medium whitespace-nowrap">
          <Search size={20} className="text-blue-500" />
          <span>Filter by Vendor:</span>
        </div>
        <select 
          className="max-w-[300px]" 
          value={filterVendorId} 
          onChange={handleFilterChange}
        >
          <option value="all">All Vendors</option>
          {vendors.map(v => (
            <option key={v.id} value={v.id}>{v.name}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="bg-slate-800 border border-slate-700/80 rounded-2xl overflow-x-auto shadow-sm">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-slate-800/50">
                <th className="px-6 py-4 text-xs tracking-wider uppercase text-slate-400 font-semibold border-b border-slate-700">Order #</th>
                <th className="px-6 py-4 text-xs tracking-wider uppercase text-slate-400 font-semibold border-b border-slate-700">Customer Name</th>
                <th className="px-6 py-4 text-xs tracking-wider uppercase text-slate-400 font-semibold border-b border-slate-700">Vendor</th>
                <th className="px-6 py-4 text-xs tracking-wider uppercase text-slate-400 font-semibold border-b border-slate-700">Total Price</th>
                <th className="px-6 py-4 text-xs tracking-wider uppercase text-slate-400 font-semibold border-b border-slate-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-700/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 font-mono font-medium text-slate-300">
                      <div className="p-1.5 bg-indigo-500/10 text-indigo-400 rounded-md">
                        <ClipboardList size={16} />
                      </div>
                      {order.orderNumber}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-200">{order.customerName}</td>
                  <td className="px-6 py-4 text-slate-400">{order.vendor?.name || 'N/A'}</td>
                  <td className="px-6 py-4 font-bold text-emerald-400">
                    ${order.totalPrice ? order.totalPrice.toFixed(2) : '0.00'}
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-16 text-center text-slate-400 bg-slate-800/20">
                    <div className="max-w-xs mx-auto">
                      No orders found matching the filter criteria.
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
