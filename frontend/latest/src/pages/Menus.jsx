import { useState, useEffect } from 'react';
import { menuAPI, vendorAPI } from '../api';
import { Plus, UtensilsCrossed, Package, Star, Store } from 'lucide-react';

const Menus = () => {
  const [menus, setMenus] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [selectedVendorId, setSelectedVendorId] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', description: '', price: '', vendorId: '' });

  useEffect(() => {
    fetchVendors();
  }, []);

  useEffect(() => {
    if (selectedVendorId) {
      fetchMenus(selectedVendorId);
    } else {
      setMenus([]);
      setLoading(false);
    }
  }, [selectedVendorId]);

  const fetchVendors = async () => {
    try {
      const res = await vendorAPI.getAll();
      setVendors(res.data);
      if (res.data.length > 0) {
        setSelectedVendorId(res.data[0].id.toString());
      } else {
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const fetchMenus = async (vendorId) => {
    setLoading(true);
    try {
      const res = await menuAPI.getByVendor(vendorId);
      setMenus(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await menuAPI.add({
        name: newItem.name,
        description: newItem.description,
        price: parseFloat(newItem.price),
        vendor: { id: parseInt(newItem.vendorId || selectedVendorId) }
      });
      setShowAdd(false);
      setNewItem({ name: '', description: '', price: '', vendorId: '' });
      fetchMenus(selectedVendorId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">Menu Management</h1>
        <button 
          className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-colors shadow-lg shadow-blue-500/20" 
          onClick={() => setShowAdd(!showAdd)}
        >
          <Plus size={20} /> Add Item
        </button>
      </div>

      <div className="mb-8">
        <div className="inline-flex items-center gap-4 bg-slate-800 border border-slate-700 p-2 pl-4 rounded-xl shadow-sm">
          <Store size={20} className="text-blue-500" />
          <span className="text-slate-300 font-medium">Select Vendor:</span>
          <select 
            className="w-[240px] border-none bg-slate-900 focus:ring-1 focus:ring-blue-500" 
            value={selectedVendorId} 
            onChange={(e) => setSelectedVendorId(e.target.value)}
          >
            {vendors.map(v => (
              <option key={v.id} value={v.id}>{v.name}</option>
            ))}
          </select>
        </div>
      </div>

      {showAdd && (
        <div className="bg-slate-800 border-t-4 border-t-blue-500 shadow-xl p-6 rounded-2xl mb-8">
          <h3 className="text-xl font-bold text-white mb-6">Add Menu Item</h3>
          <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Item Name</label>
              <input type="text" className="w-full" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Price ($)</label>
              <input type="number" step="0.01" className="w-full" value={newItem.price} onChange={e => setNewItem({...newItem, price: e.target.value})} required />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Description</label>
              <textarea className="w-full" rows="3" value={newItem.description} onChange={e => setNewItem({...newItem, description: e.target.value})}></textarea>
            </div>
            <div className="md:col-span-2 flex justify-end gap-3 mt-2">
              <button type="button" className="px-5 py-2.5 rounded-xl font-medium text-red-400 hover:bg-red-500/10 transition-colors" onClick={() => setShowAdd(false)}>Cancel</button>
              <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-colors">
                <UtensilsCrossed size={18} /> Save Item
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : menus.length === 0 ? (
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-3xl text-center py-20 px-8">
          <div className="inline-flex justify-center items-center w-20 h-20 rounded-full bg-slate-800 mb-6 border border-slate-700">
            <Package size={40} className="text-slate-500" />
          </div>
          <h3 className="text-2xl font-bold text-slate-200 mb-2">No Menu Items Found</h3>
          <p className="text-slate-400">This vendor doesn't have any items yet. Add one to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {menus.map((item) => (
            <div key={item.id} className="group relative bg-slate-800 border border-slate-700 overflow-hidden rounded-2xl p-5 hover:border-blue-500/50 transition-colors hover:shadow-lg hover:shadow-blue-500/5">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-400 to-indigo-600 transform origin-left group-hover:scale-y-100 transition-transform"></div>
              
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-lg text-slate-100 flex items-center gap-2 pr-4 leading-tight">
                  {item.name}
                  {item.available && <Star size={16} className="text-amber-400 fill-amber-400 flex-shrink-0" />}
                </h3>
                <span className="inline-flex px-3 py-1 font-bold text-sm bg-emerald-500/10 text-emerald-400 rounded-lg flex-shrink-0 border border-emerald-500/20">
                  ${item.price.toFixed(2)}
                </span>
              </div>
              
              <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                {item.description || 'No description available for this item.'}
              </p>
              
              <div className="mt-auto pt-4 border-t border-slate-700/50 flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-500 bg-slate-900 px-2 py-1 rounded">ID: #{item.id}</span>
                <span className={`px-2 py-1 rounded-full border ${item.available ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10' : 'text-red-400 border-red-500/20 bg-red-500/10'}`}>
                  {item.available ? 'Available' : 'Out of Stock'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menus;
