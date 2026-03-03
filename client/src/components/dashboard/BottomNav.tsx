import { Home, CreditCard, ArrowRightLeft, UserCircle, Gift, Bell, Search, LifeBuoy } from "lucide-react";
import { Link, useLocation } from "wouter";
import manAvatar from "@assets/7bc5850e-8a00-4baa-ac43-758a5b286b9a_1772537208935.jpeg";
import { useAppStore } from "@/store/use-app-store";

export function BottomNav() {
  const [location] = useLocation();
  const { avatarUrl } = useAppStore();

  const navItems = [
    { icon: Home, label: "Accueil", path: "/dashboard" },
    { icon: CreditCard, label: "Comptes", path: "#" }, 
    { icon: ArrowRightLeft, label: "Virement", path: "#" },
    { icon: UserCircle, label: "Vous", path: "#", avatar: true },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-slate-200 pb-safe z-40 shadow-[0_-8px_30px_rgb(0,0,0,0.04)]">
      <div className="flex items-center justify-around px-2 py-3">
        {navItems.map((item, idx) => {
          const isActive = location === item.path || (item.path === "#" && idx === 0);
          return (
            <button
              key={item.label}
              className={`flex flex-col items-center gap-1 min-w-[4rem] ${
                isActive ? "text-primary" : "text-slate-400 hover:text-slate-600"
              } transition-all active:scale-95`}
            >
              {item.avatar ? (
                <div className={`w-6 h-6 rounded-full overflow-hidden border-2 ${isActive ? "border-primary shadow-sm" : "border-transparent"}`}>
                  <img src={avatarUrl || manAvatar} alt="Profile" className="w-full h-full object-cover" />
                </div>
              ) : (
                <item.icon className={`w-6 h-6 ${isActive ? "fill-primary/10" : ""}`} strokeWidth={isActive ? 2.5 : 2} />
              )}
              <span className={`text-[10px] font-bold tracking-tight ${isActive ? "opacity-100" : "opacity-70"}`}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
