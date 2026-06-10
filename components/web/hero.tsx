"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, MessageSquare } from "lucide-react";

export default function Hero() {
    return (
        <section id="home" className="py-12 md:py-24 flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-12 md:gap-20">
            <div className="flex-1 flex flex-col items-center md:items-start">
                <div className="mb-6 inline-block rounded-full bg-secondary px-4 py-1.5 text-[10px] md:text-xs font-semibold tracking-wider text-secondary-foreground uppercase">
                    Expert Tailoring Services
                </div>

                <h1 className="mb-4 text-2xl md:text-3xl sm:text-4xl md:text-5xl font-serif text-foreground leading-tight max-w-2xl">
                    Custom Tailoring <br /> in <span className="text-primary italic">Medavakkam</span>
                </h1>

                <p className="mb-10 text-muted-foreground text-xs md:text-sm md:text-base max-w-md leading-relaxed">
                    Personalized tailoring with doorstep pick-up and delivery for your perfect fit. Experience the luxury of custom-made fashion.
                </p>

                <Link href="/services" className="mb-10 inline-block rounded-full bg-primary px-8 py-3 text-primary-foreground text-xs md:text-sm md:text-base font-semibold shadow-xl hover:bg-primary/90 transition-all cursor-pointer active:scale-95">
                    Book Our Services
                </Link>

                <div className="flex items-center gap-6 mb-12">
                    <a
                        href="https://wa.me/yournumber"
                        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:scale-110 transition-transform"
                        aria-label="WhatsApp"
                    >
                        <MessageSquare className="h-7 w-7 fill-current" />
                    </a>
                    <a
                        href="tel:+910000000000"
                        className="flex items-center gap-3 rounded-full border-2 border-border bg-background px-6 py-3 text-xs md:text-sm md:text-base font-medium text-foreground shadow-md hover:bg-muted transition-colors"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-border">
                            <Phone className="h-5 w-5" />
                        </div>
                        Call Now
                    </a>
                </div>
            </div>

            <div className="flex-1 relative w-full aspect-square md:aspect-4/5 max-w-[550px] overflow-hidden rounded-[40px] md:rounded-[60px] shadow-2xl">
                <Image
                    src="/hero-tailor.png"
                    alt="Tailor measuring purple fabric"
                    fill
                    className="object-cover"
                    priority
                />
            </div>
        </section>
    );
}
