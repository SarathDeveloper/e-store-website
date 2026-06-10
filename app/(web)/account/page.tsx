"use client";

import { useUser } from "@/context/UserContext";
import { mockApi } from "@/lib/mock-account-api";
import { useWishlist } from "@/context/WishlistContext";
import { ShoppingBag, Heart, Award, ChevronRight, PackageOpen } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AccountDashboard() {
  const { user } = useUser();
  const { items: wishlistItems } = useWishlist();
  
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    rewardPoints: 0,
    addressCount: 0
  });

  useEffect(() => {
    // Fetch mock data
    const orders = mockApi.getOrders();
    const rewards = mockApi.getRewards();
    const addresses = mockApi.getAddresses();

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStats({
      totalOrders: orders.length,
      pendingOrders: orders.filter(o => o.status === "Pending" || o.status === "Processing").length,
      rewardPoints: rewards.reduce((acc, curr) => curr.type === "earned" ? acc + curr.points : acc - curr.points, 0),
      addressCount: addresses.length
    });
  }, []);

  if (!user) return null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-lg md:text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">Welcome Back, {user.name?.split(' ')[0] || 'Customer'}!</h1>
        <p className="text-zinc-500 mt-2">Here is an overview of your account activity.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Link href="/account/orders" className="bg-white p-6 rounded-3xl border border-zinc-100 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all group">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <ShoppingBag className="w-6 h-6 text-primary" />
          </div>
          <p className="text-xl md:text-2xl font-bold text-[#1a1a1a] mb-1">{stats.totalOrders}</p>
          <p className="text-xs md:text-sm font-medium text-zinc-500">Total Orders</p>
        </Link>

        <Link href="/account/orders?filter=pending" className="bg-white p-6 rounded-3xl border border-zinc-100 hover:border-orange-500/20 hover:shadow-lg hover:shadow-orange-500/5 transition-all group">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <PackageOpen className="w-6 h-6 text-orange-500" />
          </div>
          <p className="text-xl md:text-2xl font-bold text-[#1a1a1a] mb-1">{stats.pendingOrders}</p>
          <p className="text-xs md:text-sm font-medium text-zinc-500">Pending Orders</p>
        </Link>

        <Link href="/account/wishlist" className="bg-white p-6 rounded-3xl border border-zinc-100 hover:border-red-500/20 hover:shadow-lg hover:shadow-red-500/5 transition-all group">
          <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Heart className="w-6 h-6 text-red-500" />
          </div>
          <p className="text-xl md:text-2xl font-bold text-[#1a1a1a] mb-1">{wishlistItems.length}</p>
          <p className="text-xs md:text-sm font-medium text-zinc-500">Wishlist Items</p>
        </Link>

        <Link href="/account/rewards" className="bg-white p-6 rounded-3xl border border-zinc-100 hover:border-yellow-500/20 hover:shadow-lg hover:shadow-yellow-500/5 transition-all group">
          <div className="w-12 h-12 rounded-2xl bg-yellow-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Award className="w-6 h-6 text-yellow-600" />
          </div>
          <p className="text-xl md:text-2xl font-bold text-[#1a1a1a] mb-1">{stats.rewardPoints}</p>
          <p className="text-xs md:text-sm font-medium text-zinc-500">Reward Points</p>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Orders Overview */}
        <div className="bg-white p-6 rounded-3xl border border-zinc-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-base md:text-lg font-serif font-bold text-[#1a1a1a]">Recent Orders</h2>
            <Link href="/account/orders" className="text-primary text-xs md:text-sm font-medium flex items-center hover:opacity-80 transition-opacity">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="space-y-4">
            {stats.totalOrders > 0 ? (
              mockApi.getOrders().slice(0, 2).map((order) => (
                <div key={order.id} className="flex justify-between items-center p-4 rounded-2xl border border-zinc-50 bg-zinc-50/50">
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-xl bg-white border border-zinc-100 flex items-center justify-center shrink-0">
                      <ShoppingBag className="w-5 h-5 text-zinc-400" />
                    </div>
                    <div>
                      <p className="text-xs md:text-sm font-semibold text-[#1a1a1a]">{order.id}</p>
                      <p className="text-[11px] text-zinc-500">{new Date(order.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs md:text-sm font-bold text-[#1a1a1a]">₹{order.total.toLocaleString()}</p>
                    <span className="inline-block px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-bold tracking-wider uppercase mt-1">
                      {order.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-zinc-400 text-xs md:text-sm">No recent orders found.</div>
            )}
          </div>
        </div>

        {/* Profile Completion */}
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-3xl border border-primary/10 flex flex-col justify-between">
          <div>
            <h2 className="text-base md:text-lg font-serif font-bold text-[#1a1a1a] mb-2">Complete Your Profile</h2>
            <p className="text-xs md:text-sm text-zinc-600 mb-6">Add more details to personalize your shopping experience and earn extra reward points.</p>
          </div>
          <Link href="/account/profile" className="w-full py-3 bg-white text-primary text-center rounded-xl font-semibold shadow-sm hover:shadow-md transition-all">
            Update Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
