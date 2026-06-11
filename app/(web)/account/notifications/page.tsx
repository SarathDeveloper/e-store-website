"use client";

import { useEffect, useState } from "react";
import { Notification, mockApi } from "@/lib/mock-account-api";
import { Bell, Package, Tag, Info, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNotifications(mockApi.getNotifications());
  }, []);

  const handleMarkAsRead = (id: string) => {
    const updated = notifications.map(n => n.id === id ? { ...n, isRead: true } : n);
    setNotifications(updated);
    mockApi.saveNotifications(updated);
  };

  const handleMarkAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, isRead: true }));
    setNotifications(updated);
    mockApi.saveNotifications(updated);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "order": return <Package className="w-5 h-5 text-blue-500" />;
      case "promo": return <Tag className="w-5 h-5 text-primary" />;
      default: return <Info className="w-5 h-5 text-zinc-500" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case "order": return "bg-blue-50";
      case "promo": return "bg-primary/10";
      default: return "bg-zinc-100";
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="space-y-8 max-w-3xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-zinc-900 tracking-tight flex items-center gap-3">
            Notifications 
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center justify-center -translate-y-1">
                {unreadCount} New
              </span>
            )}
          </h1>
          <p className="text-sm md:text-base text-zinc-500 mt-2">Stay updated on your orders and exclusive offers.</p>
        </div>
        {unreadCount > 0 && (
          <button 
            onClick={handleMarkAllAsRead}
            className="flex items-center text-xs md:text-sm font-semibold text-primary hover:opacity-80 transition-opacity"
          >
            Mark all as read
          </button>
        )}
      </div>

      <div className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <div 
              key={notif.id} 
              className={cn(
                "p-4 md:p-6 rounded-3xl border transition-all flex gap-4 md:gap-6 relative overflow-hidden",
                !notif.isRead ? "border-primary/20 bg-white shadow-sm shadow-primary/5" : "border-zinc-100 bg-zinc-50/50"
              )}
            >
              {!notif.isRead && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />}
              
              <div className={cn("w-12 h-12 rounded-full flex items-center justify-center shrink-0", getBgColor(notif.type))}>
                {getIcon(notif.type)}
              </div>
              
              <div className="flex-grow">
                <div className="flex justify-between items-start gap-4 mb-1">
                  <h3 className={cn("text-sm md:text-base font-bold text-[#1a1a1a]", !notif.isRead && "text-primary")}>{notif.title}</h3>
                  <span className="text-[11px] text-zinc-400 shrink-0 mt-1 whitespace-nowrap">
                    {new Date(notif.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-xs md:text-sm text-zinc-600 leading-relaxed mb-3">{notif.message}</p>
                
                {!notif.isRead && (
                  <button 
                    onClick={() => handleMarkAsRead(notif.id)}
                    className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-primary hover:opacity-80 flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" /> Mark as read
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-12 rounded-3xl border border-zinc-100 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mb-4">
              <Bell className="w-8 h-8 text-zinc-300" />
            </div>
            <h3 className="text-base md:text-lg font-bold text-[#1a1a1a] mb-2">You&apos;re all caught up!</h3>
            <p className="text-sm md:text-base text-zinc-500">No new notifications to display.</p>
          </div>
        )}
      </div>
    </div>
  );
}
