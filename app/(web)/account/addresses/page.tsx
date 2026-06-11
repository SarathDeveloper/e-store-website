"use client";

import { useEffect, useState } from "react";
import { Address, mockApi } from "@/lib/mock-account-api";
import { Plus, Edit2, Trash2, MapPin, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAddresses(mockApi.getAddresses());
  }, []);

  const handleSetDefault = (id: string) => {
    const updated = addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    }));
    setAddresses(updated);
    mockApi.saveAddresses(updated);
  };

  const handleDelete = (id: string) => {
    const updated = addresses.filter(addr => addr.id !== id);
    setAddresses(updated);
    mockApi.saveAddresses(updated);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-sm md:text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">Saved Addresses</h1>
          <p className="text-zinc-500 mt-2">Manage your delivery addresses for quick checkout.</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-primary rounded-xl text-xs md:text-sm font-semibold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all shrink-0">
          <Plus className="w-5 h-5" /> Add New Address
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((addr) => (
          <div 
            key={addr.id} 
            className={cn(
              "p-6 rounded-3xl border transition-all relative group",
              addr.isDefault ? "border-primary bg-primary/5 shadow-sm" : "border-zinc-200 bg-white hover:border-zinc-300"
            )}
          >
            {addr.isDefault && (
              <span className="absolute top-6 right-6 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 uppercase tracking-wider">
                <Check className="w-3 h-3" /> Default
              </span>
            )}
            
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-zinc-100 text-zinc-600 px-2 py-1 rounded text-[10px] md:text-xs font-bold uppercase tracking-wider">
                {addr.type}
              </span>
            </div>

            <h3 className="font-bold text-[#1a1a1a] text-xs md:text-lg mb-2">{addr.fullName}</h3>
            <p className="text-zinc-600 text-xs md:text-sm leading-relaxed mb-4">
              {addr.streetAddress}<br />
              {addr.city}, {addr.state} {addr.pincode}
            </p>
            <p className="text-zinc-600 text-xs md:text-sm font-medium flex items-center gap-2 mb-6">
              Phone: {addr.phone}
            </p>

            <div className="flex items-center gap-3 pt-4 border-t border-zinc-200/50">
              <button className="flex items-center gap-1.5 text-xs md:text-sm font-semibold text-primary hover:opacity-80 transition-opacity">
                <Edit2 className="w-4 h-4" /> Edit
              </button>
              <button 
                onClick={() => handleDelete(addr.id)}
                className="flex items-center gap-1.5 text-xs md:text-sm font-semibold text-red-500 hover:opacity-80 transition-opacity"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
              
              {!addr.isDefault && (
                <button 
                  onClick={() => handleSetDefault(addr.id)}
                  className="ml-auto text-[10px] md:text-xs font-bold text-zinc-500 hover:text-[#1a1a1a] transition-colors"
                >
                  Set as Default
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {addresses.length === 0 && (
        <div className="bg-white p-12 rounded-3xl border border-zinc-100 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mb-4">
            <MapPin className="w-8 h-8 text-zinc-300" />
          </div>
          <h3 className="text-xs md:text-lg font-bold text-[#1a1a1a] mb-2">No addresses saved</h3>
          <p className="text-zinc-500 mb-6">Add a delivery address to make checkout faster.</p>
          <button className="bg-primary px-6 py-3 rounded-xl text-white font-medium text-xs md:text-sm hover:opacity-90 transition-opacity flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Address
          </button>
        </div>
      )}
    </div>
  );
}
