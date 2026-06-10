"use client";

import { useUser } from "@/context/UserContext";
import { useState } from "react";
import { User, Mail, Phone, Camera, Save, Bell } from "lucide-react";
import Image from "next/image";

export default function ProfilePage() {
  const { user, updateUser } = useUser();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
  });
  const [preferences, setPreferences] = useState({
    newsletter: user?.preferences?.newsletter ?? true,
    smsAlerts: user?.preferences?.smsAlerts ?? false,
  });

  if (!user) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      updateUser({ ...formData, preferences });
      setIsSaving(false);
      // In a real app, you'd show a toast notification here
      alert("Profile updated successfully!");
    }, 800);
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-lg md:text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">Profile Details</h1>
        <p className="text-zinc-500 mt-2">Manage your personal information and preferences.</p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-3xl border border-zinc-100 shadow-sm">
        <form onSubmit={handleSave} className="space-y-8">
          {/* Avatar Section */}
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border border-zinc-200 group">
              {user.avatar ? (
                <Image src={user.avatar} alt="Avatar" fill className="object-cover" />
              ) : (
                <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl md:text-3xl">
                  {formData.name.charAt(0) || "U"}
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-[#1a1a1a] mb-1">Profile Picture</h3>
              <p className="text-[10px] md:text-xs text-zinc-500 mb-3">PNG, JPG under 5MB</p>
              <div className="flex gap-3">
                <button type="button" className="text-xs md:text-sm font-semibold text-primary hover:opacity-80">Upload New</button>
                <button type="button" className="text-xs md:text-sm font-semibold text-red-500 hover:opacity-80">Remove</button>
              </div>
            </div>
          </div>

          <div className="h-px bg-zinc-100" />

          {/* Personal Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-[#1a1a1a] text-base md:text-lg">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] md:text-xs font-bold text-zinc-500 uppercase tracking-wider">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-zinc-400" />
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-xs md:text-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] md:text-xs font-bold text-zinc-500 uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-zinc-400" />
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-xs md:text-sm"
                  />
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] md:text-xs font-bold text-zinc-500 uppercase tracking-wider">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-zinc-400" />
                  <input 
                    type="tel" 
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-xs md:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="h-px bg-zinc-100" />

          {/* Preferences */}
          <div className="space-y-4">
            <h3 className="font-semibold text-[#1a1a1a] text-base md:text-lg flex items-center gap-2">
              <Bell className="w-5 h-5 text-zinc-400" /> Notifications & Preferences
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={preferences.newsletter}
                  onChange={(e) => setPreferences({ ...preferences, newsletter: e.target.checked })}
                  className="w-4 h-4 text-primary rounded border-zinc-300 focus:ring-primary"
                />
                <span className="text-xs md:text-sm text-zinc-700">Subscribe to newsletter (Get 10% off your next order)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={preferences.smsAlerts}
                  onChange={(e) => setPreferences({ ...preferences, smsAlerts: e.target.checked })}
                  className="w-4 h-4 text-primary rounded border-zinc-300 focus:ring-primary"
                />
                <span className="text-xs md:text-sm text-zinc-700">Receive order updates via SMS</span>
              </label>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-70"
            >
              <Save className="w-4 h-4" />
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
