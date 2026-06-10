"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product, products as initialProducts } from "./CartContext";

// --- Types ---

export type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered";
export interface Order {
    id: string;
    customerName: string;
    date: string;
    total: number;
    status: OrderStatus;
    items: { productId: number; quantity: number; title: string; price: number }[];
}

export type AppointmentStatus = "Scheduled" | "Completed" | "Cancelled";
export interface Appointment {
    id: string;
    customerName: string;
    date: string;
    time: string;
    service: string;
    status: AppointmentStatus;
}

export type PickupStatus = "Pending" | "Assigned" | "Completed";
export interface Pickup {
    id: string;
    customerName: string;
    address: string;
    date: string;
    time: string;
    status: PickupStatus;
    assignedTo?: string;
}

export type EnquiryStatus = "New" | "Read" | "Resolved";
export interface Enquiry {
    id: string;
    customerName: string;
    email: string;
    message: string;
    date: string;
    status: EnquiryStatus;
}

// --- Mock Initial Data ---

const initialOrders: Order[] = [
    { id: "ORD-1024", customerName: "Priya Sharma", date: "2026-02-23", total: 11499, status: "Processing", items: [{ productId: 1, quantity: 1, title: "Royal Crimson Silk Saree", price: 8999 }, { productId: 4, quantity: 1, title: "Aari Embroidered Blouse", price: 2500 }] },
    { id: "ORD-1025", customerName: "Ananya Iyer", date: "2026-02-22", total: 6499, status: "Pending", items: [{ productId: 2, quantity: 1, title: "Purple Mysore Silk Saree", price: 6499 }] },
    { id: "ORD-1026", customerName: "Kavitha Raj", date: "2026-02-20", total: 24999, status: "Delivered", items: [{ productId: 6, quantity: 1, title: "Bridal Red Kanchipuram Set", price: 24999 }] },
];

const initialAppointments: Appointment[] = [
    { id: "APT-501", customerName: "Deepa Kumar", date: "2026-02-24", time: "10:00 AM", service: "Bridal Consultation", status: "Scheduled" },
    { id: "APT-502", customerName: "Lakshmi N.", date: "2026-02-24", time: "02:00 PM", service: "Blouse Fitting", status: "Scheduled" },
    { id: "APT-503", customerName: "Sandra M.", date: "2026-02-22", time: "11:30 AM", service: "Custom Tailoring", status: "Completed" },
];

const initialPickups: Pickup[] = [
    { id: "PKP-801", customerName: "Meera V.", address: "123 Anna Nagar, Chennai", date: "2026-02-25", time: "09:00 AM - 12:00 PM", status: "Pending" },
    { id: "PKP-802", customerName: "Sowmya R.", address: "45 Velachery Main Rd, Chennai", date: "2026-02-24", time: "02:00 PM - 05:00 PM", status: "Assigned", assignedTo: "Driver Ramesh" },
];

const initialEnquiries: Enquiry[] = [
    { id: "ENQ-301", customerName: "Neha Reddy", email: "neha@example.com", message: "Do you offer international shipping for bridal blouses?", date: "2026-02-23", status: "New" },
    { id: "ENQ-302", customerName: "Anita S.", email: "anita@example.com", message: "I want to convert my mom's old Kanchipuram saree into a lehenga. Is this possible?", date: "2026-02-21", status: "Read" },
];

// --- Context Definition ---

interface AdminContextType {
    orders: Order[];
    updateOrderStatus: (id: string, status: OrderStatus) => void;
    appointments: Appointment[];
    updateAppointmentStatus: (id: string, status: AppointmentStatus) => void;
    pickups: Pickup[];
    updatePickupStatus: (id: string, status: PickupStatus, assignedTo?: string) => void;
    enquiries: Enquiry[];
    updateEnquiryStatus: (id: string, status: EnquiryStatus) => void;
    products: Product[];
    addProduct: (product: Omit<Product, "id">) => void;
    updateProduct: (id: number, product: Partial<Product>) => void;
    deleteProduct: (id: number) => void;
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    setSidebarOpen: (open: boolean) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
    const [orders, setOrders] = useState<Order[]>(initialOrders);
    const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
    const [pickups, setPickups] = useState<Pickup[]>(initialPickups);
    const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries);
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
    const setSidebarOpen = (open: boolean) => setIsSidebarOpen(open);

    const updateOrderStatus = (id: string, status: OrderStatus) => {
        setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    };

    const updateAppointmentStatus = (id: string, status: AppointmentStatus) => {
        setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    };

    const updatePickupStatus = (id: string, status: PickupStatus, assignedTo?: string) => {
        setPickups(prev => prev.map(p => p.id === id ? { ...p, status, ...(assignedTo && { assignedTo }) } : p));
    };

    const updateEnquiryStatus = (id: string, status: EnquiryStatus) => {
        setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status } : e));
    };

    const addProduct = (productData: Omit<Product, "id">) => {
        setProducts(prev => {
            const maxId = prev.reduce((max, p) => p.id > max ? p.id : max, 0);
            return [...prev, { ...productData, id: maxId + 1 }];
        });
    };

    const updateProduct = (id: number, productData: Partial<Product>) => {
        setProducts(prev => prev.map(p => p.id === id ? { ...p, ...productData } : p));
    };

    const deleteProduct = (id: number) => {
        setProducts(prev => prev.filter(p => p.id !== id));
    };

    return (
        <AdminContext.Provider value={{
            orders, updateOrderStatus,
            appointments, updateAppointmentStatus,
            pickups, updatePickupStatus,
            enquiries, updateEnquiryStatus,
            products, addProduct, updateProduct, deleteProduct,
            isSidebarOpen, toggleSidebar, setSidebarOpen
        }}>
            {children}
        </AdminContext.Provider>
    );
}

export function useAdmin() {
    const context = useContext(AdminContext);
    if (context === undefined) {
        throw new Error("useAdmin must be used within an AdminProvider");
    }
    return context;
}
