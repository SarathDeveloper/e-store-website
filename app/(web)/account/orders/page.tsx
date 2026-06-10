"use client";

import { useEffect, useState } from "react";
import { Order, mockApi } from "@/lib/mock-account-api";
import { Package, ChevronRight, Download } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setOrders(mockApi.getOrders());
  }, []);

  const filteredOrders = filter === "All" 
    ? orders 
    : orders.filter(o => o.status === filter);

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Delivered": return "bg-green-100 text-green-700";
      case "Processing": return "bg-blue-100 text-blue-700";
      case "Shipped": return "bg-purple-100 text-purple-700";
      case "Cancelled": return "bg-red-100 text-red-700";
      default: return "bg-orange-100 text-orange-700";
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg md:text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">Order History</h1>
          <p className="text-zinc-500 mt-2">Track, manage and view your past orders.</p>
        </div>
        
        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
          {["All", "Pending", "Processing", "Shipped", "Delivered"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-4 py-2 rounded-full text-[10px] md:text-xs font-bold tracking-wider uppercase transition-colors whitespace-nowrap",
                filter === f 
                  ? "bg-[#1a1a1a] text-white" 
                  : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {filteredOrders.length > 0 ? (
          filteredOrders.map(order => (
            <div key={order.id} className="bg-white rounded-3xl border border-zinc-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              {/* Order Header */}
              <div className="bg-zinc-50 px-6 py-4 border-b border-zinc-100 flex flex-wrap justify-between items-center gap-4">
                <div className="flex flex-wrap gap-x-8 gap-y-2">
                  <div>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Order Placed</p>
                    <p className="text-xs md:text-sm font-semibold text-[#1a1a1a]">{new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Total</p>
                    <p className="text-xs md:text-sm font-semibold text-[#1a1a1a]">₹{order.total.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Order ID</p>
                    <p className="text-xs md:text-sm font-semibold text-[#1a1a1a]">{order.id}</p>
                  </div>
                </div>
                <Link 
                  href={`/account/orders/${order.id}`}
                  className="text-xs md:text-sm font-semibold text-primary hover:opacity-80 flex items-center gap-1"
                >
                  View Details <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Order Body */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className={cn("px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase flex items-center gap-1.5", getStatusColor(order.status))}>
                    <Package className="w-3.5 h-3.5" />
                    {order.status}
                  </div>
                  {order.estimatedDelivery && order.status !== "Delivered" && (
                    <span className="text-xs md:text-sm text-zinc-500 font-medium">
                      Estimated delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                    </span>
                  )}
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
                  {/* Items */}
                  <div className="flex flex-wrap gap-4">
                    {order.items.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="relative w-20 h-24 rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200 shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                        {item.quantity > 1 && (
                          <span className="absolute top-1 right-1 bg-[#1a1a1a]/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                            x{item.quantity}
                          </span>
                        )}
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="w-20 h-24 rounded-xl bg-zinc-50 border border-zinc-200 border-dashed flex items-center justify-center text-zinc-500 font-bold text-xs md:text-sm shrink-0">
                        +{order.items.length - 3}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-white border border-zinc-200 rounded-xl text-xs md:text-sm font-semibold text-[#1a1a1a] hover:bg-zinc-50 transition-colors w-full sm:w-auto">
                      <Download className="w-4 h-4" /> Invoice
                    </button>
                    <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-primary rounded-xl text-xs md:text-sm font-semibold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors w-full sm:w-auto">
                      Buy Again
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-12 rounded-3xl border border-zinc-100 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mb-4">
              <Package className="w-8 h-8 text-zinc-300" />
            </div>
            <h3 className="text-base md:text-lg font-bold text-[#1a1a1a] mb-2">No orders found</h3>
            <p className="text-zinc-500 mb-6">Looks like you haven&apos;t placed any orders with this status yet.</p>
            <Link href="/shop" className="bg-primary px-6 py-3 rounded-xl text-white font-medium text-xs md:text-sm hover:opacity-90 transition-opacity">
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
