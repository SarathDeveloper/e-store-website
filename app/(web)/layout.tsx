import Navbar from "@/components/web/navbar";
import JsonLd from "@/components/web/json-ld";
import { CartProvider } from "@/context/CartContext";
import { UserProvider } from "@/context/UserContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { RecentlyViewedProvider } from "@/context/RecentlyViewedContext";
import FirstVisitPopup from "@/components/web/first-visit-popup";
import FloatingActionButtons from "@/components/web/floating-action-buttons";
import MobileBottomNav from "@/components/web/mobile-bottom-nav";

export default function WebLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <UserProvider>
            <CartProvider>
                <WishlistProvider>
                    <RecentlyViewedProvider>
                        <JsonLd />
                        <FirstVisitPopup />
                        <FloatingActionButtons />
                        <Navbar />
                        <main className="w-full pb-20 md:pb-0">
                            {children}
                        </main>
                        <MobileBottomNav />
                    </RecentlyViewedProvider>
                </WishlistProvider>
            </CartProvider>
        </UserProvider>
    );
}
