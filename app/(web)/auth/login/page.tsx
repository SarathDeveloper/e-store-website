"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MobileInput } from "@/components/web/mobile-input";
import { Store, ArrowLeft, CheckCircle2, User, Mail, MapPin, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const Label = ({ children, htmlFor, className }: { children: React.ReactNode, htmlFor?: string, className?: string }) => (
    <label htmlFor={htmlFor} className={`text-xs md:text-sm font-medium leading-none text-zinc-700 ${className}`}>
        {children}
    </label>
);

const ErrorMsg = ({ msg }: { msg?: string }) => {
    if (!msg) return null;
    return <p className="text-[10px] md:text-xs text-red-500 mt-1 font-medium">{msg}</p>;
};

function UnifiedAuthForm() {
    const router = useRouter();
    const { login, register, checkUserExists } = useUser();

    // 1: Mobile Entry, 2: OTP Verification, 3: Profile Completion (New Users)
    const [step, setStep] = useState<1 | 2 | 3>(1); 
    const [isExistingUser, setIsExistingUser] = useState(false);
    
    const [isLoading, setIsLoading] = useState(false);
    const [countdown, setCountdown] = useState(30);
    const [showAddress, setShowAddress] = useState(false);

    // Mobile Number
    const [mobile, setMobile] = useState("");
    const [mobileError, setMobileError] = useState("");

    // OTP State
    const [otp, setOtp] = useState("");
    const [otpError, setOtpError] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    // Registration Form State
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: {
            houseNumber: "",
            street: "",
            area: "",
            city: "",
            state: "",
            pincode: ""
        }
    });
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (step === 2 && countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [step, countdown]);

    const handleMobileSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setMobileError("");
        if (mobile.length !== 10) {
            setMobileError("Please enter a valid 10-digit mobile number.");
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            const exists = checkUserExists(mobile);
            setIsExistingUser(exists);
            
            // Move to OTP regardless of whether they exist or not
            setStep(2);
            setCountdown(30);
        }, 800);
    };

    const handleVerifyOtp = (e: React.FormEvent) => {
        e.preventDefault();
        setOtpError("");
        if (otp !== "1234") {
            setOtpError("Invalid verification code. Please enter 1234.");
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            
            if (isExistingUser) {
                // Existing user: Login and success
                setIsSuccess(true);
                login(mobile);
                setTimeout(() => {
                    router.push("/");
                }, 1500);
            } else {
                // New user: Move to Profile Step
                setStep(3);
            }
        }, 1200);
    };

    const handleResendOtp = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setCountdown(30);
            setOtpError("");
        }, 1000);
    };

    const validateRegistrationForm = () => {
        const newErrors: Record<string, string> = {};
        const nameRegex = /^[A-Za-z\s]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.firstName || formData.firstName.length < 2 || !nameRegex.test(formData.firstName)) {
            newErrors.firstName = "Valid First Name required";
        }
        if (!formData.lastName || formData.lastName.length < 2 || !nameRegex.test(formData.lastName)) {
            newErrors.lastName = "Valid Last Name required";
        }
        if (!emailRegex.test(formData.email)) {
            newErrors.email = "Valid email address required";
        }
        
        // Only validate address if the section is shown and user tried to fill it
        if (showAddress) {
            const pinRegex = /^[0-9]{6}$/;
            if (!formData.address.houseNumber.trim()) newErrors.houseNumber = "Required";
            if (!formData.address.street.trim()) newErrors.street = "Required";
            if (!formData.address.city.trim()) newErrors.city = "Required";
            if (!formData.address.state.trim()) newErrors.state = "Required";
            if (!pinRegex.test(formData.address.pincode)) {
                newErrors.pincode = "Valid 6-digit Pincode required";
            }
        }

        setFormErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegistrationSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateRegistrationForm()) {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                setIsSuccess(true);
                
                // Register with provided details
                register(mobile, {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    address: showAddress ? {
                        street: `${formData.address.houseNumber}, ${formData.address.street}`,
                        area: formData.address.area || "",
                        city: formData.address.city,
                        state: formData.address.state,
                        pincode: formData.address.pincode
                    } : undefined
                });

                setTimeout(() => router.push("/"), 1500);
            }, 1000);
        }
    };

    const handleSkipRegistration = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setIsSuccess(true);
            
            // Register with just mobile
            register(mobile);

            setTimeout(() => router.push("/"), 1500);
        }, 800);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#fcfcfc] px-4 py-12 pb-24 md:pb-12">
            <div className="max-w-xl w-full space-y-8 bg-white p-6 md:p-10 rounded-3xl shadow-xl shadow-zinc-200/50 border border-zinc-100 relative overflow-hidden">
                
                {/* Success Overlay */}
                <AnimatePresence>
                    {isSuccess && (
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            className="absolute inset-0 bg-primary z-50 flex flex-col items-center justify-center text-white"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", bounce: 0.5 }}
                                className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-6"
                            >
                                <CheckCircle2 className="w-10 h-10 text-white" />
                            </motion.div>
                            <h2 className="text-2xl font-serif font-bold mb-2">
                                {isExistingUser ? "Welcome Back!" : "Account Created!"}
                            </h2>
                            <p className="text-primary-foreground/80 text-center px-6">
                                {isExistingUser ? "You have successfully logged in." : "Welcome to E-Store. We're glad you're here!"}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="text-center">
                    <Link href="/" className="inline-flex items-center gap-2 group mb-6">
                        <div className="bg-primary p-2 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
                            <Store className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-lg md:text-xl font-bold tracking-tight uppercase">E-Store</h1>
                    </Link>
                    <h2 className="text-xl md:text-2xl font-serif font-semibold text-[#4a3a6b]">
                        {step === 1 && "Sign In / Register"}
                        {step === 2 && "Verify Your Mobile"}
                        {step === 3 && "Complete Your Profile"}
                    </h2>
                    <p className="text-zinc-500 mt-2 text-xs md:text-sm max-w-sm mx-auto">
                        {step === 1 && "Enter your mobile number to get started."}
                        {step === 2 && `We've sent a 4-digit code to +91 ${mobile}`}
                        {step === 3 && "Tell us a bit about yourself. You can always do this later."}
                    </p>
                </div>

                <AnimatePresence mode="wait">
                    {/* STEP 1: MOBILE ENTRY */}
                    {step === 1 && (
                        <motion.form 
                            key="step1"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="mt-8 space-y-6" 
                            onSubmit={handleMobileSubmit}
                        >
                            <div className="space-y-4 max-w-sm mx-auto">
                                <div className="space-y-2">
                                    <Label htmlFor="mobile">Mobile Number *</Label>
                                    <MobileInput
                                        id="mobile"
                                        value={mobile}
                                        onChange={setMobile}
                                        error={mobileError}
                                        autoFocus
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full h-12 rounded-xl font-semibold shadow-lg shadow-primary/20 mt-6"
                                    disabled={isLoading || mobile.length !== 10}
                                >
                                    {isLoading ? "Sending OTP..." : "Continue"}
                                </Button>
                                <p className="text-center text-[10px] md:text-xs text-zinc-400 mt-4">
                                    By continuing, you agree to our Terms and Privacy Policy.
                                </p>
                            </div>
                        </motion.form>
                    )}

                    {/* STEP 2: OTP VERIFICATION */}
                    {step === 2 && (
                        <motion.form 
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="mt-8 space-y-6" 
                            onSubmit={handleVerifyOtp}
                        >
                            <div className="space-y-4 max-w-sm mx-auto">
                                <div className="space-y-2">
                                    <Label htmlFor="otp" className="text-center block">Enter 4-digit OTP</Label>
                                    <div className="relative">
                                        <CheckCircle2 className="absolute left-4 top-3.5 h-5 w-5 text-zinc-400" />
                                        <Input
                                            id="otp"
                                            type="text"
                                            placeholder="1 2 3 4"
                                            className="pl-12 h-12 rounded-xl tracking-[1em] text-center font-bold text-lg"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                            maxLength={4}
                                            autoFocus
                                            required
                                        />
                                    </div>
                                    <ErrorMsg msg={otpError} />
                                    <p className="text-center text-xs text-primary font-medium mt-2">
                                        (Demo: Use 1234)
                                    </p>
                                </div>

                                <div className="flex flex-col gap-4 mt-6">
                                    <Button
                                        type="submit"
                                        className="w-full h-12 rounded-xl font-semibold shadow-lg shadow-primary/20"
                                        disabled={isLoading || otp.length < 4}
                                    >
                                        {isLoading ? "Verifying..." : "Verify OTP"}
                                    </Button>

                                    <div className="flex justify-between items-center px-1 border-t border-zinc-100 pt-4">
                                        <button
                                            type="button"
                                            onClick={() => setStep(1)}
                                            className="text-[10px] md:text-xs text-zinc-500 font-medium hover:text-zinc-800 flex items-center gap-1"
                                            disabled={isLoading}
                                        >
                                            <ArrowLeft className="w-3 h-3" /> Change Number
                                        </button>
                                        
                                        <button 
                                            type="button" 
                                            onClick={handleResendOtp}
                                            disabled={countdown > 0 || isLoading}
                                            className={countdown > 0 ? "text-[10px] md:text-xs text-zinc-400" : "text-[10px] md:text-xs text-primary font-medium hover:underline"}
                                        >
                                            {countdown > 0 ? `Resend OTP in ${countdown}s` : "Resend OTP"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.form>
                    )}

                    {/* STEP 3: POST-VERIFICATION SIGNUP */}
                    {step === 3 && (
                        <motion.form 
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="mt-8 space-y-8" 
                            onSubmit={handleRegistrationSubmit}
                        >
                            {/* Personal Details */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-100 pb-2">Personal Details</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">First Name</Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                                            <Input
                                                id="firstName"
                                                placeholder="e.g. Meera"
                                                className="pl-10 h-11 rounded-xl"
                                                value={formData.firstName}
                                                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                                            />
                                        </div>
                                        <ErrorMsg msg={formErrors.firstName} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                                            <Input
                                                id="lastName"
                                                placeholder="e.g. Reddy"
                                                className="pl-10 h-11 rounded-xl"
                                                value={formData.lastName}
                                                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                                            />
                                        </div>
                                        <ErrorMsg msg={formErrors.lastName} />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="you@example.com"
                                                className="pl-10 h-11 rounded-xl"
                                                value={formData.email}
                                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                            />
                                        </div>
                                        <ErrorMsg msg={formErrors.email} />
                                    </div>
                                </div>
                            </div>

                            {/* Address Details (Expandable) */}
                            <div className="space-y-4">
                                <button
                                    type="button"
                                    onClick={() => setShowAddress(!showAddress)}
                                    className="flex items-center justify-between w-full text-sm font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-100 pb-2 hover:text-zinc-600 transition-colors"
                                >
                                    <span>Complete Address (Optional)</span>
                                    {showAddress ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                </button>
                                
                                <AnimatePresence>
                                    {showAddress && (
                                        <motion.div 
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="houseNumber">House / Flat No.</Label>
                                                    <div className="relative">
                                                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                                                        <Input
                                                            id="houseNumber"
                                                            placeholder="Flat 2B, Tower C"
                                                            className="pl-10 h-11 rounded-xl"
                                                            value={formData.address.houseNumber}
                                                            onChange={(e) => setFormData({...formData, address: {...formData.address, houseNumber: e.target.value}})}
                                                        />
                                                    </div>
                                                    <ErrorMsg msg={formErrors.houseNumber} />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="street">Street Address</Label>
                                                    <Input
                                                        id="street"
                                                        placeholder="Main Road, Cross Street"
                                                        className="h-11 rounded-xl"
                                                        value={formData.address.street}
                                                        onChange={(e) => setFormData({...formData, address: {...formData.address, street: e.target.value}})}
                                                    />
                                                    <ErrorMsg msg={formErrors.street} />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="city">City</Label>
                                                    <Input
                                                        id="city"
                                                        placeholder="e.g. Chennai"
                                                        className="h-11 rounded-xl"
                                                        value={formData.address.city}
                                                        onChange={(e) => setFormData({...formData, address: {...formData.address, city: e.target.value}})}
                                                    />
                                                    <ErrorMsg msg={formErrors.city} />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="state">State</Label>
                                                    <Input
                                                        id="state"
                                                        placeholder="e.g. Tamil Nadu"
                                                        className="h-11 rounded-xl"
                                                        value={formData.address.state}
                                                        onChange={(e) => setFormData({...formData, address: {...formData.address, state: e.target.value}})}
                                                    />
                                                    <ErrorMsg msg={formErrors.state} />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="pincode">Pincode</Label>
                                                    <Input
                                                        id="pincode"
                                                        maxLength={6}
                                                        placeholder="6-digit PIN"
                                                        className="h-11 rounded-xl tracking-widest"
                                                        value={formData.address.pincode}
                                                        onChange={(e) => setFormData({...formData, address: {...formData.address, pincode: e.target.value.replace(/\D/g, '')}})}
                                                    />
                                                    <ErrorMsg msg={formErrors.pincode} />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="flex flex-col gap-4 mt-8">
                                <Button
                                    type="submit"
                                    className="w-full h-12 rounded-xl font-semibold shadow-lg shadow-primary/20"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Saving..." : "Complete Profile & Shop"}
                                </Button>
                                
                                <button
                                    type="button"
                                    onClick={handleSkipRegistration}
                                    className="w-full h-12 rounded-xl border-2 border-zinc-200 text-zinc-600 font-semibold hover:bg-zinc-50 hover:text-zinc-900 transition-all"
                                    disabled={isLoading}
                                >
                                    Skip for Now
                                </button>
                                
                                <p className="text-center text-xs text-zinc-400 mt-2">
                                    You can always complete your profile later from your account settings.
                                </p>
                            </div>
                        </motion.form>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default function AuthPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <UnifiedAuthForm />
        </Suspense>
    );
}
