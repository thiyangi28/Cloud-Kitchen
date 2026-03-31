import { useState, useEffect } from 'react';
import { vendorAPI } from '../api';
import { Plus, Store, Check } from 'lucide-react';

const Vendors = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [newVendor, setNewVendor] = useState({ name: '', contact: '', location: '' });

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const res = await vendorAPI.getAll();
      setVendors(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await vendorAPI.add(newVendor);
      setShowAdd(false);
      setNewVendor({ name: '', contact: '', location: '' });
      fetchVendors();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">Manage Vendors</h1>
        <button 
          className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-colors shadow-lg shadow-blue-500/20" 
          onClick={() => setShowAdd(!showAdd)}
        >
          <Plus size={20} /> Add Vendor
        </button>
      </div>

      {showAdd && (
        <div className="bg-slate-800 border border-slate-700/80 p-6 rounded-2xl mb-8 shadow-sm">
          <h3 className="text-lg font-semibold text-white mb-4">Add New Vendor</h3>
          <form onSubmit={handleAdd} className="flex flex-wrap items-end gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Name</label>
              <input 
                type="text" 
                className="w-full" 
                value={newVendor.name} 
                onChange={e => setNewVendor({...newVendor, name: e.target.value})} 
                required 
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Contact</label>
              <input 
                type="text" 
                className="w-full" 
                value={newVendor.contact} 
                onChange={e => setNewVendor({...newVendor, contact: e.target.value})} 
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Location</label>
              <input 
                type="text" 
                className="w-full" 
                value={newVendor.location} 
                onChange={e => setNewVendor({...newVendor, location: e.target.value})} 
              />
            </div>
            <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-3 rounded-xl font-semibold flex items-center gap-2 transition-colors mt-4 md:mt-0">
              <Check size={20} /> Save
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="bg-slate-800 border border-slate-700/80 rounded-2xl overflow-x-auto shadow-sm">
          <table className="w-full text-left border-collapse min-w-max">
            <thead>
              <tr className="bg-slate-800/50">
                <th className="px-6 py-4 text-xs tracking-wider uppercase text-slate-400 font-semibold border-b border-slate-700">ID</th>
                <th className="px-6 py-4 text-xs tracking-wider uppercase text-slate-400 font-semibold border-b border-slate-700">Name</th>
                <th className="px-6 py-4 text-xs tracking-wider uppercase text-slate-400 font-semibold border-b border-slate-700">Contact</th>
                <th className="px-6 py-4 text-xs tracking-wider uppercase text-slate-400 font-semibold border-b border-slate-700">Location</th>
                <th className="px-6 py-4 text-xs tracking-wider uppercase text-slate-400 font-semibold border-b border-slate-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {vendors.map(vendor => (
                <tr key={vendor.id} className="hover:bg-slate-700/20 transition-colors">
                  <td className="px-6 py-4 text-slate-400 font-mono">#{vendor.id}</td>
                  <td className="px-6 py-4 font-medium text-slate-200">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 bg-blue-500/10 rounded-lg text-blue-400"><Store size={16} /></div>
                      {vendor.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{vendor.contact}</td>
                  <td className="px-6 py-4 text-slate-300">{vendor.location}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
              {vendors.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-400 bg-slate-800/20">No vendors found. Add your first vendor above.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Vendors;
