"use client";

import { useEffect, useState } from "react";
import { Order, mockApi, downloadInvoice } from "@/lib/mock-account-api";
import { ChevronLeft, Download, MapPin, CreditCard, Truck, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";

export default function OrderDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const orders = mockApi.getOrders();
    const found = orders.find(o => o.id === id);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (found) setOrder(found);
  }, [id]);

  if (!order) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  // Tracking Timeline Logic
  const steps = ["Pending", "Processing", "Shipped", "Delivered"];
  const currentStepIndex = steps.indexOf(order.status);

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link href="/account/orders" className="p-2 bg-white rounded-xl border border-zinc-200 text-zinc-500 hover:text-[#1a1a1a] hover:bg-zinc-50 transition-all">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-lg md:text-2xl font-serif font-bold text-[#1a1a1a]">Order {order.id}</h1>
          <p className="text-zinc-500 text-xs md:text-sm mt-1">Placed on {new Date(order.date).toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tracking Timeline */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-zinc-100 shadow-sm">
            <h2 className="text-xs md:text-lg font-serif font-bold text-[#1a1a1a] mb-6 flex items-center gap-2">
              <Truck className="w-5 h-5 text-primary" /> Delivery Status
            </h2>
            
            <div className="relative">
              <div className="absolute top-5 left-4 right-4 h-1 bg-zinc-100 rounded-full" />
              <div 
                className="absolute top-5 left-4 h-1 bg-primary rounded-full transition-all duration-1000" 
                style={{ width: `${(Math.max(0, currentStepIndex) / (steps.length - 1)) * 100}%` }} 
              />
              
              <div className="relative flex justify-between">
                {steps.map((step, idx) => {
                  const isCompleted = idx <= currentStepIndex;
                  const isCurrent = idx === currentStepIndex;
                  
                  return (
                    <div key={step} className="flex flex-col items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center border-4 transition-colors z-10 bg-white",
                        isCompleted ? "border-primary text-primary" : "border-zinc-100 text-zinc-300",
                        isCurrent && "ring-4 ring-primary/20"
                      )}>
                        {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <div className="w-2.5 h-2.5 rounded-full bg-zinc-200" />}
                      </div>
                      <span className={cn(
                        "text-[11px] font-bold uppercase tracking-wider text-center max-w-[80px]",
                        isCompleted ? "text-[#1a1a1a]" : "text-zinc-400"
                      )}>{step}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {order.trackingNumber && (
              <div className="mt-8 p-4 bg-zinc-50 rounded-2xl flex justify-between items-center border border-zinc-100">
                <div>
                  <p className="text-[10px] md:text-xs text-zinc-500 font-medium">Tracking Number</p>
                  <p className="font-semibold text-[#1a1a1a]">{order.trackingNumber}</p>
                </div>
                <button className="text-xs md:text-sm font-bold text-primary hover:opacity-80 transition-opacity">Track Package</button>
              </div>
            )}
          </div>

          {/* Items List */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-zinc-100 shadow-sm">
            <h2 className="text-xs md:text-lg font-serif font-bold text-[#1a1a1a] mb-6">Items in this Order</h2>
            <div className="space-y-6">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-zinc-50 border border-zinc-100 shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-[#1a1a1a]">{item.name}</h3>
                    <p className="text-xs md:text-sm text-zinc-500">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#1a1a1a]">₹{item.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="h-px bg-zinc-100 my-6" />
            <div className="flex justify-end gap-4">
              <button 
                onClick={() => downloadInvoice(order)}
                className="flex items-center justify-center gap-2 px-6 py-2.5 bg-white border border-zinc-200 rounded-xl text-xs md:text-sm font-semibold text-[#1a1a1a] hover:bg-zinc-50 transition-colors"
              >
                <Download className="w-4 h-4" /> Download Invoice
              </button>
              <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-primary rounded-xl text-xs md:text-sm font-semibold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors">
                Buy Again
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Summary */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm">
            <h2 className="text-xs md:text-lg font-serif font-bold text-[#1a1a1a] mb-4">Order Summary</h2>
            <div className="space-y-3 text-xs md:text-sm">
              <div className="flex justify-between text-zinc-600">
                <span>Subtotal</span>
                <span>₹{order.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Shipping</span>
                <span className="text-green-600 font-semibold">Free</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Discount</span>
                <span>₹0</span>
              </div>
              <div className="h-px bg-zinc-100 my-2" />
              <div className="flex justify-between font-bold text-[#1a1a1a] text-xs md:text-base">
                <span>Total</span>
                <span className="text-primary">₹{order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm space-y-6">
            <div>
              <h3 className="text-xs md:text-sm font-bold text-zinc-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Shipping Address
              </h3>
              <p className="font-semibold text-[#1a1a1a]">{order.shippingAddress.fullName}</p>
              <p className="text-xs md:text-sm text-zinc-600 mt-1">{order.shippingAddress.streetAddress}</p>
              <p className="text-xs md:text-sm text-zinc-600">{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}</p>
              <p className="text-xs md:text-sm text-zinc-600 mt-1">Phone: {order.shippingAddress.phone}</p>
            </div>
            
            <div className="h-px bg-zinc-100" />
            
            <div>
              <h3 className="text-xs md:text-sm font-bold text-zinc-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <CreditCard className="w-4 h-4" /> Payment Method
              </h3>
              <p className="text-xs md:text-sm text-[#1a1a1a] font-medium">Prepaid - UPI / Cards</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
