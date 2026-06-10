import { Truck, ShieldCheck, CreditCard } from "lucide-react";

const trustDetails = [
    {
        icon: Truck,
        title: "Free Doorstep Delivery",
        description: "On all orders above ₹2000 across India.",
    },
    {
        icon: ShieldCheck,
        title: "Premium Quality Output",
        description: "Premium quality fabrics and perfect fitting.",
    },
    {
        icon: CreditCard,
        title: "Secure Payments",
        description: "UPI, Cards, and Cash accepted safely.",
    }
];

export default function ShopTrustBanners() {
    return (
        <section className="py-10 mt-16 border-t border-zinc-100 bg-zinc-50/50 rounded-3xl mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-zinc-200">
                {trustDetails.map((item, idx) => (
                    <div key={idx} className={`flex flex-col items-center text-center px-4 ${idx !== 0 ? "pt-8 md:pt-0" : ""}`}>
                        <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-zinc-100 flex items-center justify-center mb-4 text-primary">
                            <item.icon className="w-5 h-5" />
                        </div>
                        <h4 className="text-[15px] font-semibold text-[#1a1a1a] mb-1.5">{item.title}</h4>
                        <p className="text-[13px] text-zinc-500 leading-relaxed max-w-[200px]">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
