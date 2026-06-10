"use client";

import { Shield, Key, Smartphone, Laptop } from "lucide-react";
import { useState } from "react";

export default function SecurityPage() {
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-lg md:text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">Security Settings</h1>
        <p className="text-zinc-500 mt-2">Manage your password and secure your account.</p>
      </div>

      {/* Password Management */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-zinc-100 shadow-sm space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <Key className="w-5 h-5 text-primary" />
          <h2 className="text-base md:text-lg font-serif font-bold text-[#1a1a1a]">Change Password</h2>
        </div>
        
        {isChangingPassword ? (
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsChangingPassword(false); alert("Password updated"); }}>
            <div className="space-y-2">
              <label className="text-[10px] md:text-xs font-bold text-zinc-500 uppercase tracking-wider">Current Password</label>
              <input type="password" required className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] md:text-xs font-bold text-zinc-500 uppercase tracking-wider">New Password</label>
              <input type="password" required className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] md:text-xs font-bold text-zinc-500 uppercase tracking-wider">Confirm New Password</label>
              <input type="password" required className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
            </div>
            <div className="pt-2 flex gap-3">
              <button type="submit" className="px-6 py-2.5 bg-primary text-white rounded-xl font-semibold shadow-md hover:bg-primary/90 transition-all text-xs md:text-sm">Save Password</button>
              <button type="button" onClick={() => setIsChangingPassword(false)} className="px-6 py-2.5 bg-zinc-100 text-[#1a1a1a] rounded-xl font-semibold hover:bg-zinc-200 transition-all text-xs md:text-sm">Cancel</button>
            </div>
          </form>
        ) : (
          <div>
            <p className="text-xs md:text-sm text-zinc-600 mb-4">It&apos;s a good idea to use a strong password that you&apos;re not using elsewhere.</p>
            <button 
              onClick={() => setIsChangingPassword(true)}
              className="px-6 py-2.5 bg-white border border-zinc-200 text-[#1a1a1a] rounded-xl font-semibold hover:bg-zinc-50 transition-all text-xs md:text-sm"
            >
              Update Password
            </button>
          </div>
        )}
      </div>

      {/* 2FA */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-zinc-100 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-5 h-5 text-primary" />
          <h2 className="text-base md:text-lg font-serif font-bold text-[#1a1a1a]">Two-Factor Authentication</h2>
        </div>
        <p className="text-xs md:text-sm text-zinc-600 mb-6">Add an extra layer of security to your account by requiring an OTP sent to your phone when logging in.</p>
        
        <div className="flex items-center justify-between p-4 border border-zinc-200 rounded-2xl bg-zinc-50">
          <div>
            <p className="font-semibold text-[#1a1a1a] text-xs md:text-sm">SMS Authentication</p>
            <p className="text-[10px] md:text-xs text-zinc-500 mt-1">Status: <span className="text-red-500 font-bold">Disabled</span></p>
          </div>
          <button className="px-4 py-2 bg-primary text-white rounded-lg font-semibold text-[10px] md:text-xs shadow-sm hover:bg-primary/90 transition-all">
            Enable
          </button>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-zinc-100 shadow-sm">
        <h2 className="text-base md:text-lg font-serif font-bold text-[#1a1a1a] mb-6">Active Sessions</h2>
        <div className="space-y-4">
          <div className="flex items-start justify-between p-4 border border-primary/20 bg-primary/5 rounded-2xl">
            <div className="flex gap-4">
              <div className="mt-1">
                <Laptop className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-[#1a1a1a] text-xs md:text-sm flex items-center gap-2">Windows PC · Chrome <span className="bg-primary text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">Current</span></p>
                <p className="text-[10px] md:text-xs text-zinc-500 mt-1">Mumbai, India · IP: 192.168.1.1</p>
                <p className="text-[10px] md:text-xs text-zinc-500">Active right now</p>
              </div>
            </div>
          </div>

          <div className="flex items-start justify-between p-4 border border-zinc-100 rounded-2xl">
            <div className="flex gap-4">
              <div className="mt-1">
                <Smartphone className="w-5 h-5 text-zinc-400" />
              </div>
              <div>
                <p className="font-semibold text-[#1a1a1a] text-xs md:text-sm">iPhone 13 · Safari</p>
                <p className="text-[10px] md:text-xs text-zinc-500 mt-1">Delhi, India · IP: 10.0.0.1</p>
                <p className="text-[10px] md:text-xs text-zinc-500">Last active: Yesterday at 4:30 PM</p>
              </div>
            </div>
            <button className="text-[10px] md:text-xs font-bold text-red-500 hover:text-red-600 transition-colors">Log Out</button>
          </div>
        </div>
      </div>
    </div>
  );
}
