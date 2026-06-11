"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import AccountSidebar from "@/components/web/account-sidebar";
import Footer from "@/components/web/footer";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login?role=customer");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-[#fcfcfc] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfc] font-sans">
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar - Shows as the main menu on mobile when at /account, otherwise hidden on sub-pages */}
          <aside className={cn("w-full md:w-80 shrink-0", pathname !== "/account" && "hidden md:block")}>
            <div className="sticky top-24">
              <AccountSidebar />
            </div>
          </aside>

          {/* Main Content Area - Hidden on mobile when at /account so the menu takes full focus */}
          <section className={cn("flex-grow min-w-0", pathname === "/account" && "hidden md:block")}>
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
