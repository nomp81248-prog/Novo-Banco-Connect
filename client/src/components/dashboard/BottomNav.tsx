import { Home, CreditCard, ArrowRightLeft, UserCircle } from "lucide-react";
import { Link, useLocation } from "wouter";

export function BottomNav() {
  const [location] = useLocation();

  const navItems = [
    { icon: Home, label: "Accueil", path: "/dashboard" },
    { icon: CreditCard, label: "Comptes", path: "#" }, // Mock paths for UI
    { icon: ArrowRightLeft, label: "Virement", path: "#" },
    { icon: UserCircle, label: "Vous", path: "#" },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border/50 pb-safe z-40">
      <div className="flex items-center justify-around px-2 py-3">
        {navItems.map((item, idx) => {
          const isActive = location === item.path || (item.path === "#" && idx === 0);
          return (
            <button
              key={item.label}
              className={`flex flex-col items-center gap-1 min-w-[4rem] ${
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              } transition-colors`}
            >
              <item.icon className={`w-6 h-6 ${isActive ? "fill-primary/20" : ""}`} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
