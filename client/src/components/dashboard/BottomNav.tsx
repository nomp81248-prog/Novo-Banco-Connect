import { Home, CreditCard, ArrowRightLeft, UserCircle } from "lucide-react";
import { useLocation } from "wouter";
import { useAppStore } from "@/store/use-app-store";

export function BottomNav() {
  const [location] = useLocation();
  const { avatarUrl } = useAppStore();

  const navItems = [
    { icon: Home, label: "Accueil", path: "/dashboard" },
    { icon: CreditCard, label: "Comptes", path: "#comptes" }, 
    { icon: ArrowRightLeft, label: "Virement", path: "#virement" },
    { icon: UserCircle, label: "Vous", path: "#profil", avatar: true },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-slate-200 pb-safe z-40 shadow-[0_-8px_30px_rgb(0,0,0,0.05)]">
      <div className="flex items-center justify-around px-2 py-3">
        {navItems.map((item, idx) => {
          const isActive = location === item.path || (item.path === "/dashboard" && location === "/dashboard");
          return (
            <button
              key={item.label}
              data-testid={`nav-${item.label.toLowerCase()}`}
              className={`flex flex-col items-center gap-1 min-w-[4rem] transition-all active:scale-95 ${
                isActive ? "text-[#009966]" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {item.avatar ? (
                <div className={`w-7 h-7 rounded-full overflow-hidden border-2 flex items-center justify-center ${
                  isActive ? "border-[#009966] shadow-sm" : "border-transparent"
                } ${!avatarUrl ? "bg-[#009966]/10" : ""}`}>
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-black text-xs text-[#009966]">AJ</span>
                  )}
                </div>
              ) : (
                <item.icon 
                  className={`w-6 h-6`} 
                  strokeWidth={isActive ? 2.5 : 2} 
                />
              )}
              <span className={`text-[10px] font-bold tracking-tight ${isActive ? "opacity-100" : "opacity-60"}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
