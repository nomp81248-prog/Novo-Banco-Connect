import { Bell, Search, Menu, LogOut, Settings, Shield, User, HelpCircle, X } from "lucide-react";
import { useUser, useLogout } from "@/hooks/use-auth";
import { useAppStore } from "@/store/use-app-store";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

export function TopBar() {
  const { data: user } = useUser();
  const logout = useLogout();
  const { hasNotification, clearNotification } = useAppStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: hamburger + logo */}
        <div className="flex items-center gap-4">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden rounded-xl text-slate-500">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0 border-0 bg-white">
              <SheetHeader className="p-6 bg-[#009966] text-white text-left">
                <div className="flex justify-between items-center mb-5">
                  <SheetTitle className="text-white font-display font-bold text-xl">Menu</SheetTitle>
                  <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)} className="text-white/80 hover:text-white hover:bg-white/10 rounded-xl">
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center font-bold text-lg">AJ</div>
                  <div>
                    <p className="font-bold text-sm">Alexandra Jade Clara</p>
                    <p className="text-xs text-white/60">Titulaire du compte</p>
                  </div>
                </div>
              </SheetHeader>
              <div className="p-4 space-y-1">
                {[
                  { icon: User, label: "Mon Profil" },
                  { icon: Shield, label: "Sécurité" },
                  { icon: Settings, label: "Paramètres" },
                  { icon: HelpCircle, label: "Aide & Support" },
                  { icon: LogOut, label: "Déconnexion", destructive: true },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      if (item.destructive) logout.mutate();
                      setIsMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all font-bold text-sm ${
                      item.destructive ? "text-red-500 hover:bg-red-50" : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
          
          {/* BNP Paribas logo */}
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="flex items-baseline gap-0.5">
              <span className="font-display font-black text-xl tracking-tight text-[#009966] group-hover:text-[#007a52] transition-colors">BNP</span>
              <span className="font-display font-black text-xl tracking-tight text-slate-800 ml-0.5 hidden sm:block">Paribas</span>
            </div>
          </div>
        </div>

        {/* Right: search + bell + user */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Button variant="ghost" size="icon" className="hidden sm:flex rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100">
            <Search className="w-5 h-5" />
          </Button>

          <DropdownMenu onOpenChange={(open) => !open && clearNotification()}>
            <DropdownMenuTrigger asChild>
              <Button 
                data-testid="button-notifications"
                variant="ghost" 
                size="icon" 
                className="relative rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                <Bell className="w-5 h-5" />
                {hasNotification && (
                  <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-bounce" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 rounded-2xl p-2 shadow-2xl border-slate-100">
              <DropdownMenuLabel className="font-bold text-slate-900 px-3 py-2">Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {hasNotification ? (
                <div className="p-4 flex gap-4 bg-red-50/60 rounded-xl border border-red-50">
                  <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center shrink-0">
                    <X className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Virement rejeté</p>
                    <p className="text-xs text-slate-500 mt-0.5">Opération impossible : compte en cours de déblocage.</p>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-sm text-slate-400 font-medium">Aucune nouvelle notification</p>
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="hidden sm:flex items-center gap-2 px-2 py-2 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-[#009966] text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-[#009966]/20">AJ</div>
                <div className="text-left hidden lg:block">
                  <p className="text-sm font-bold text-slate-900 leading-none mb-1">{user?.name || "Alexandra"}</p>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none">Titulaire</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 shadow-2xl border-slate-100">
              <DropdownMenuItem className="rounded-xl p-3 font-bold text-slate-600 focus:bg-slate-50 cursor-pointer">
                <User className="w-4 h-4 mr-3" /> Mon Profil
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-xl p-3 font-bold text-slate-600 focus:bg-slate-50 cursor-pointer">
                <Shield className="w-4 h-4 mr-3" /> Sécurité
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => logout.mutate()}
                className="rounded-xl p-3 font-bold text-red-500 focus:bg-red-50 focus:text-red-600 cursor-pointer"
              >
                <LogOut className="w-4 h-4 mr-3" /> Déconnexion
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
