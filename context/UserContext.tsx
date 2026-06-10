"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
    id: string;
    mobile: string;
    name?: string;
    email?: string;
    avatar?: string;
    preferences?: {
        newsletter: boolean;
        smsAlerts: boolean;
    };
    role: "customer" | "admin";
}

interface UserContextType {
    user: User | null;
    login: (mobile: string) => void;
    logout: () => void;
    updateUser: (updates: Partial<User>) => void;
    isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check local storage for existing session
        const savedUser = localStorage.getItem("leela_user");
        if (savedUser) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setUser(JSON.parse(savedUser));
        }
        setIsLoading(false);
    }, []);

    const login = (mobile: string) => {
        // Simulate login with rich mock data
        const newUser: User = {
            id: "cust_" + Math.random().toString(36).substr(2, 9),
            mobile,
            name: "Sarah Johnson", // Mock default name
            email: "sarah.j@example.com",
            avatar: "https://i.pravatar.cc/150?u=sarah",
            preferences: {
                newsletter: true,
                smsAlerts: false,
            },
            role: "customer",
        };
        setUser(newUser);
        localStorage.setItem("leela_user", JSON.stringify(newUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("leela_user");
    };

    const updateUser = (updates: Partial<User>) => {
        if (!user) return;
        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
        localStorage.setItem("leela_user", JSON.stringify(updatedUser));
    };

    return (
        <UserContext.Provider value={{ user, login, logout, updateUser, isLoading }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}
