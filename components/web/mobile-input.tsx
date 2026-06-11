"use client";

import React, { forwardRef } from "react";
import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    value: string;
    onChange: (value: string) => void;
    error?: string;
    containerClassName?: string;
}

export const MobileInput = forwardRef<HTMLInputElement, MobileInputProps>(
    ({ value, onChange, error, className, containerClassName, ...props }, ref) => {
        
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            // Remove any non-digit character
            const cleaned = e.target.value.replace(/\D/g, "");
            if (cleaned.length <= 10) {
                onChange(cleaned);
            }
        };

        return (
            <div className={cn("space-y-2", containerClassName)}>
                <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                    <span className="absolute left-9 top-1/2 -translate-y-1/2 text-[13px] md:text-sm font-medium text-zinc-500 pointer-events-none">
                        +91
                    </span>
                    <input
                        ref={ref}
                        type="tel"
                        maxLength={10}
                        placeholder="10-digit number"
                        className={cn(
                            "w-full pl-[4.5rem] pr-4 h-11 rounded-xl bg-zinc-50 border transition-all text-[13px] md:text-sm outline-none",
                            error ? "border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-zinc-200 focus:border-primary focus:ring-1 focus:ring-primary",
                            className
                        )}
                        value={value}
                        onChange={handleChange}
                        {...props}
                    />
                </div>
                {error && <p className="text-[10px] md:text-xs text-red-500 font-medium ml-1">{error}</p>}
            </div>
        );
    }
);

MobileInput.displayName = "MobileInput";
