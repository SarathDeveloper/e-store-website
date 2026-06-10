"use client";

import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Store, ArrowLeft, Smartphone, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const Label = ({ children, htmlFor, className }: { children: React.ReactNode, htmlFor?: string, className?: string }) => (
    <label htmlFor={htmlFor} className={`text-xs md:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}>
        {children}
    </label>
);

function LoginForm() {
    const [step, setStep] = useState(1); // 1: Mobile, 2: OTP
    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const { login } = useUser();

    const handleSendOtp = (e: React.FormEvent) => {
        e.preventDefault();
        if (!mobile || mobile.length < 10) return;

        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setStep(2);
        }, 1500);
    };

    const handleVerifyOtp = (e: React.FormEvent) => {
        e.preventDefault();
        if (!otp || otp.length < 4) return;

        setIsLoading(true);
        // Simulate verification
        setTimeout(() => {
            setIsLoading(false);
            login(mobile);
            router.push("/");
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#fcfcfc] px-4 py-12">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-3xl shadow-xl shadow-zinc-200/50 border border-zinc-100">
                <div className="text-center">
                    <Link href="/" className="inline-flex items-center gap-2 group mb-6">
                        <div className="bg-primary p-2 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
                            <Store className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-lg md:text-xl font-bold tracking-tight">E-Store</h1>
                    </Link>
                    <h2 className="text-xl md:text-2xl font-serif font-semibold text-[#4a3a6b]">
                        {step === 1 ? "Welcome Back" : "Verify OTP"}
                    </h2>
                    <p className="text-zinc-500 mt-2 text-xs md:text-sm">
                        {step === 1
                            ? "Login to manage your orders and appointments"
                            : `We've sent a code to +91 ${mobile}`}
                    </p>
                </div>

                {step === 1 ? (
                    <form className="mt-8 space-y-6" onSubmit={handleSendOtp}>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="mobile">Mobile Number</Label>
                                <div className="relative">
                                    <Smartphone className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                                    <Input
                                        id="mobile"
                                        type="tel"
                                        placeholder="Enter your 10 digit mobile number"
                                        className="pl-10 h-11 rounded-xl"
                                        value={mobile}
                                        onChange={(e) => setMobile(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-11 rounded-xl font-semibold shadow-lg shadow-primary/20"
                            disabled={isLoading || mobile.length < 10}
                        >
                            {isLoading ? "Sending..." : "Send OTP"}
                        </Button>

                        <p className="text-center text-[10px] md:text-xs text-zinc-400">
                            By continuing, you agree to our Terms and Privacy Policy.
                        </p>
                    </form>
                ) : (
                    <form className="mt-8 space-y-6" onSubmit={handleVerifyOtp}>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="otp">Enter 6-digit OTP</Label>
                                <div className="relative">
                                    <CheckCircle2 className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                                    <Input
                                        id="otp"
                                        type="text"
                                        placeholder="Enter OTP"
                                        className="pl-10 h-11 rounded-xl tracking-[0.5em] text-center font-bold"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        maxLength={6}
                                        required
                                    />
                                </div>
                                <div className="flex justify-between items-center px-1">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="text-[10px] md:text-xs text-primary font-medium hover:underline flex items-center gap-1"
                                    >
                                        <ArrowLeft className="w-3 h-3" /> Change number
                                    </button>
                                    <button type="button" className="text-[10px] md:text-xs text-zinc-400 hover:text-primary transition-colors">
                                        Resend OTP
                                    </button>
                                </div>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-11 rounded-xl font-semibold shadow-lg shadow-primary/20"
                            disabled={isLoading || otp.length < 4}
                        >
                            {isLoading ? "Verifying..." : "Verify & Login"}
                        </Button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginForm />
        </Suspense>
    );
}
