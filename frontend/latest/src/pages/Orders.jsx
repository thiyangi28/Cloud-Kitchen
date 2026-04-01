import { useState, useEffect } from 'react';
import { orderAPI, vendorAPI } from '../api';
import { ClipboardList, Clock, Truck, CheckCircle, Search, Trash2, Edit2 } from 'lucide-react';

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
        fetchAllOrders();
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

  const handleUpdateStatus = async (order, newStatus) => {
    try {
      await orderAPI.update({
        id: order.id,
        customerName: order.customerName,
        status: newStatus,
        vendorId: order.vendorId
      });
      fetchAllOrders();
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await orderAPI.delete(id);
        fetchAllOrders();
      } catch (err) {
        console.error(err);
        alert("Failed to delete order");
      }
    }
  };

  const getStatusBadge = (status) => {
    const s = status ? status.toLowerCase() : 'pending';
    if (s === 'completed' || s === 'delivered') return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"><CheckCircle size={14}/> {status}</span>;
    if (s === 'preparing') return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20"><Clock size={14}/> {status}</span>;
    if (s === 'out for delivery') return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20"><Truck size={14}/> {status}</span>;
    return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-700 text-slate-300 border border-slate-600">{status || 'Pending'}</span>;
  };

  return (
    <div className="pb-20">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">Order Management</h1>
      </div>

      <div className="bg-slate-800 border border-slate-700/80 p-4 rounded-xl mb-8 flex gap-6 items-center flex-wrap shadow-sm">
        <div className="flex items-center gap-3 text-slate-400 font-medium whitespace-nowrap">
          <Search size={20} className="text-blue-500" />
          <span>Filter by Vendor:</span>
        </div>
        <select 
          className="max-w-[300px] bg-slate-900 border-slate-700 text-white rounded-lg focus:ring-blue-500" 
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
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="bg-slate-800 border border-slate-700/80 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/50">
                <th className="px-6 py-4 text-xs tracking-wider uppercase text-slate-400 font-semibold border-b border-slate-700">Order #</th>
                <th className="px-6 py-4 text-xs tracking-wider uppercase text-slate-400 font-semibold border-b border-slate-700">Customer</th>
                <th className="px-6 py-4 text-xs tracking-wider uppercase text-slate-400 font-semibold border-b border-slate-700">Total Price</th>
                <th className="px-6 py-4 text-xs tracking-wider uppercase text-slate-400 font-semibold border-b border-slate-700 text-center">Status</th>
                <th className="px-6 py-4 text-xs tracking-wider uppercase text-slate-400 font-semibold border-b border-slate-700 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-700/20 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 font-mono font-medium text-slate-300">
                      <div className="p-1.5 bg-indigo-500/10 text-indigo-400 rounded-md">
                        <ClipboardList size={16} />
                      </div>
                      <span className="text-sm">{order.orderNumber}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-200">{order.customerName}</div>
                    <div className="text-xs text-slate-500">ID: #{order.id}</div>
                  </td>
                  <td className="px-6 py-4 font-bold text-emerald-400">
                    ${order.totalPrice ? order.totalPrice.toFixed(2) : '0.00'}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center gap-2">
                      {getStatusBadge(order.status)}
                      <select 
                        className="text-[10px] py-1 px-2 bg-slate-900 border-slate-700 text-slate-400 rounded focus:ring-1"
                        value={order.status || 'PENDING'}
                        onChange={(e) => handleUpdateStatus(order, e.target.value)}
                      >
                        <option value="PENDING">Pending</option>
                        <option value="PREPARING">Preparing</option>
                        <option value="OUT FOR DELIVERY">Out for Delivery</option>
                        <option value="DELIVERED">Delivered</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleDelete(order.id)}
                      className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                      title="Delete Order"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-16 text-center text-slate-400 bg-slate-800/20">
                    No orders found.
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
