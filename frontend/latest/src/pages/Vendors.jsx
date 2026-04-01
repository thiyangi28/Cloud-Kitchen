import { useState, useEffect } from 'react';
import { vendorAPI } from '../api';
import { Plus, Store, Check, Edit2, Trash2, X } from 'lucide-react';

const Vendors = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [editingVendor, setEditingVendor] = useState(null);
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
      if (editingVendor) {
        await vendorAPI.update({ ...newVendor, id: editingVendor.id });
        setEditingVendor(null);
      } else {
        await vendorAPI.add(newVendor);
      }
      setShowAdd(false);
      setNewVendor({ name: '', contact: '', location: '' });
      fetchVendors();
    } catch (err) {
      console.error(err);
      alert("Failed to save vendor!");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this vendor?")) {
      try {
        await vendorAPI.delete(id);
        fetchVendors();
      } catch (err) {
        console.error(err);
        alert("Failed to delete vendor!");
      }
    }
  };

  const startEdit = (vendor) => {
    setEditingVendor(vendor);
    setNewVendor({ name: vendor.name, contact: vendor.contact, location: vendor.location });
    setShowAdd(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">Manage Vendors</h1>
        <button
          className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-colors shadow-lg shadow-blue-500/20"
          onClick={() => {
            setShowAdd(!showAdd);
            if (showAdd) {
              setEditingVendor(null);
              setNewVendor({ name: '', contact: '', location: '' });
            }
          }}
        >
          {showAdd ? <X size={20} /> : <Plus size={20} />}
          {showAdd ? 'Cancel' : 'Add Vendor'}
        </button>
      </div>

      {showAdd && (
        <div className="bg-slate-800 border border-slate-700/80 p-6 rounded-2xl mb-8 shadow-sm scale-in">
          <h3 className="text-lg font-semibold text-white mb-4">
            {editingVendor ? 'Edit Vendor' : 'Add New Vendor'}
          </h3>
          <form onSubmit={handleAdd} className="flex flex-wrap items-end gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Name</label>
              <input
                type="text"
                className="w-full bg-slate-900/50 border-slate-700 text-white rounded-xl focus:ring-blue-500 focus:border-blue-500"
                value={newVendor.name}
                onChange={e => setNewVendor({ ...newVendor, name: e.target.value })}
                required
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Contact</label>
              <input
                type="text"
                className="w-full bg-slate-900/50 border-slate-700 text-white rounded-xl focus:ring-blue-500 focus:border-blue-500"
                value={newVendor.contact}
                onChange={e => setNewVendor({ ...newVendor, contact: e.target.value })}
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Location</label>
              <input
                type="text"
                className="w-full bg-slate-900/50 border-slate-700 text-white rounded-xl focus:ring-blue-500 focus:border-blue-500"
                value={newVendor.location}
                onChange={e => setNewVendor({ ...newVendor, location: e.target.value })}
              />
            </div>
            <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-emerald-500/20">
              <Check size={20} /> {editingVendor ? 'Update' : 'Save'}
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="bg-slate-800 border border-slate-700/80 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/50">
                <th className="px-6 py-4 text-xs tracking-wider uppercase text-slate-400 font-semibold border-b border-slate-700">ID</th>
                <th className="px-6 py-4 text-xs tracking-wider uppercase text-slate-400 font-semibold border-b border-slate-700">Name</th>
                <th className="px-6 py-4 text-xs tracking-wider uppercase text-slate-400 font-semibold border-b border-slate-700">Contact</th>
                <th className="px-6 py-4 text-xs tracking-wider uppercase text-slate-400 font-semibold border-b border-slate-700">Location</th>
                <th className="px-6 py-4 text-xs tracking-wider uppercase text-slate-400 font-semibold border-b border-slate-700">Status</th>
                <th className="px-6 py-4 text-xs tracking-wider uppercase text-slate-400 font-semibold border-b border-slate-700 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {vendors.map(vendor => (
                <tr key={vendor.id} className="hover:bg-slate-700/20 transition-colors group">
                  <td className="px-6 py-4 text-slate-500 font-mono text-sm">#{vendor.id}</td>
                  <td className="px-6 py-4 font-medium text-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 group-hover:scale-110 transition-transform"><Store size={18} /></div>
                      {vendor.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{vendor.contact}</td>
                  <td className="px-6 py-4 text-slate-300">{vendor.location}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 tracking-tighter uppercase">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => startEdit(vendor)}
                        className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                        title="Edit Vendor"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(vendor.id)}
                        className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                        title="Delete Vendor"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
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
