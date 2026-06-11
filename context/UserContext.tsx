"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    address: {
        street: string;
        area: string;
        city: string;
        state: string;
        pincode: string;
    };
    isVerified: boolean;
    isLoggedIn: boolean;
    
    // Legacy / optional fields for backward compatibility or future use
    name?: string; 
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
    register: (mobile: string, profileData?: Partial<Omit<User, "id" | "isVerified" | "isLoggedIn" | "role" | "name" | "mobile">>) => void;
    logout: () => void;
    updateUser: (updates: Partial<User>) => void;
    checkUserExists: (mobile: string) => boolean;
    isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Simulated Database for Demo
    const getUsersDB = (): Record<string, User> => {
        if (typeof window === "undefined") return {};
        const db = localStorage.getItem("leela_users_db");
        return db ? JSON.parse(db) : {};
    };

    const saveUsersDB = (db: Record<string, User>) => {
        if (typeof window !== "undefined") {
            localStorage.setItem("leela_users_db", JSON.stringify(db));
        }
    };

    useEffect(() => {
        // Check local storage for existing session
        const savedUser = localStorage.getItem("leela_user");
        if (savedUser) {
            const parsedUser = JSON.parse(savedUser);
            // Ensure the active session matches the DB if we want persistence sync
            // For now, simply setting it is fine.
            setUser(parsedUser);
        }
        setIsLoading(false);
    }, []);

    const checkUserExists = (mobile: string) => {
        const db = getUsersDB();
        return !!db[mobile];
    };

    const login = (mobile: string) => {
        const db = getUsersDB();
        if (db[mobile]) {
            const existingUser = db[mobile];
            existingUser.isLoggedIn = true;
            setUser(existingUser);
            localStorage.setItem("leela_user", JSON.stringify(existingUser));
            return;
        }

        // Fallback for demo if somehow calling login without DB entry
        const newUser: User = {
            id: "cust_" + Math.random().toString(36).substr(2, 9),
            mobile,
            firstName: "Sarah",
            lastName: "Johnson",
            name: "Sarah Johnson",
            email: "sarah.j@example.com",
            address: {
                street: "123 Main St",
                area: "Downtown",
                city: "Chennai",
                state: "Tamil Nadu",
                pincode: "600001"
            },
            isVerified: true,
            isLoggedIn: true,
            avatar: "https://i.pravatar.cc/150?u=sarah",
            preferences: {
                newsletter: true,
                smsAlerts: false,
            },
            role: "customer",
        };
        db[mobile] = newUser;
        saveUsersDB(db);
        setUser(newUser);
        localStorage.setItem("leela_user", JSON.stringify(newUser));
    };

    const register = (mobile: string, profileData?: Partial<Omit<User, "id" | "isVerified" | "isLoggedIn" | "role" | "name" | "mobile">>) => {
        const firstName = profileData?.firstName || "";
        const lastName = profileData?.lastName || "";
        const name = firstName || lastName ? `${firstName} ${lastName}`.trim() : "Account";
        
        const newUser: User = {
            id: "cust_" + Math.random().toString(36).substr(2, 9),
            mobile,
            firstName,
            lastName,
            name,
            email: profileData?.email || "",
            address: profileData?.address || {
                street: "",
                area: "",
                city: "",
                state: "",
                pincode: ""
            },
            isVerified: true,
            isLoggedIn: true,
            role: "customer",
            avatar: firstName ? `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random` : undefined,
        };
        
        const db = getUsersDB();
        db[newUser.mobile] = newUser;
        saveUsersDB(db);

        setUser(newUser);
        localStorage.setItem("leela_user", JSON.stringify(newUser));
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem("leela_user");
    };

    const updateUser = (updates: Partial<User>) => {
        if (!user) return;
        const updatedUser = { ...user, ...updates };
        
        // Update both active session and DB
        setUser(updatedUser);
        localStorage.setItem("leela_user", JSON.stringify(updatedUser));
        
        const db = getUsersDB();
        if (db[updatedUser.mobile]) {
            db[updatedUser.mobile] = updatedUser;
            saveUsersDB(db);
        }
    };

    return (
        <UserContext.Provider value={{ user, login, register, logout, updateUser, checkUserExists, isLoading }}>
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
