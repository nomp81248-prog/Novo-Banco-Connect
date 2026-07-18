import { Bell, Search, Menu, LogOut, Settings, Shield, User, HelpCircle, X, MapPin, MessageCircle, Phone, AlertCircle, Receipt, Package } from "lucide-react";
import { useUser, useLogout } from "@/hooks/use-auth";
import { useAppStore } from "@/store/use-app-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import bnpLogo from "@assets/IMG_9270_1784381157800.png";

export function TopBar() {
  const { data: user } = useUser();
  const logout = useLogout();
  const { hasNotification, clearNotification } = useAppStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        
        {/* Left: hamburger + logo */}
        <div className="flex items-center gap-3 shrink-0">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" data-testid="button-hamburger" className="rounded-xl text-slate-500 hover:bg-slate-100">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0 border-0 bg-white overflow-y-auto">
              <SheetHeader className="p-6 bg-[#009966] text-white text-left">
                <div className="flex justify-between items-center mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-white/30">
                      <img src={bnpLogo} alt="BNP" className="w-full h-full object-cover" />
                    </div>
                    <SheetTitle className="text-white font-display font-bold text-lg">BNP Paribas</SheetTitle>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)} className="text-white/80 hover:text-white hover:bg-white/10 rounded-xl">
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-bold">AJ</div>
                  <div>
                    <p className="font-bold text-sm">Alexandra Jade Clara</p>
                    <p className="text-xs text-white/60">Titulaire · Compte en cours de déblocage</p>
                  </div>
                </div>
              </SheetHeader>
              <div className="p-4 space-y-1">
                {[
                  { icon: User, label: "Mon Profil" },
                  { icon: Shield, label: "Sécurité & Confidentialité" },
                  { icon: Settings, label: "Paramètres du compte" },
                  { icon: HelpCircle, label: "Aide & Support" },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl transition-all font-bold text-sm text-slate-600 hover:bg-slate-50"
                  >
                    <item.icon className="w-5 h-5 text-[#009966]" />
                    {item.label}
                  </button>
                ))}
                <div className="my-2 border-t border-slate-100" />
                <button
                  onClick={() => { logout.mutate(); setIsMenuOpen(false); }}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl transition-all font-bold text-sm text-red-500 hover:bg-red-50"
                >
                  <LogOut className="w-5 h-5" />
                  Déconnexion
                </button>
              </div>
            </SheetContent>
          </Sheet>
          
          {/* BNP logo + name */}
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-9 h-9 rounded-xl overflow-hidden shadow-md border border-slate-100">
              <img src={bnpLogo} alt="BNP Paribas" className="w-full h-full object-cover" />
            </div>
            <div className="hidden sm:flex items-baseline gap-0.5">
              <span className="font-display font-black text-lg text-[#009966]">BNP</span>
              <span className="font-display font-black text-lg text-slate-800 ml-0.5">Paribas</span>
            </div>
          </div>
        </div>

        {/* Center: search bar (desktop) */}
        <div className="hidden md:flex flex-1 max-w-xs relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Rechercher transactions, produits, agences..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-9 h-9 rounded-xl text-sm bg-slate-50 border-slate-100 focus:bg-white"
          />
        </div>

        {/* Right: icons */}
        <div className="flex items-center gap-1 shrink-0">

          {/* Search (mobile) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" data-testid="button-search" className="md:hidden rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100">
                <Search className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72 rounded-2xl p-3 shadow-2xl border-slate-100">
              <DropdownMenuLabel className="font-bold text-slate-900 px-2 pb-2">Recherche</DropdownMenuLabel>
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input placeholder="Rechercher..." className="pl-9 h-9 rounded-xl text-sm bg-slate-50 border-slate-100" />
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="rounded-xl p-3 font-medium text-slate-600 cursor-pointer">
                  <Receipt className="w-4 h-4 mr-3 text-[#009966]" /> Rechercher transactions
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-xl p-3 font-medium text-slate-600 cursor-pointer">
                  <Package className="w-4 h-4 mr-3 text-[#009966]" /> Rechercher produits
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-xl p-3 font-medium text-slate-600 cursor-pointer">
                  <MapPin className="w-4 h-4 mr-3 text-[#009966]" /> Localiser une agence
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <DropdownMenu onOpenChange={(open) => !open && clearNotification()}>
            <DropdownMenuTrigger asChild>
              <Button 
                data-testid="button-notifications"
                variant="ghost" 
                size="icon" 
                className="relative rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100"
              >
                <Bell className="w-5 h-5" />
                {hasNotification && (
                  <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-bounce" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 rounded-2xl p-3 shadow-2xl border-slate-100">
              <DropdownMenuLabel className="font-bold text-slate-900 px-2 pb-2">Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {hasNotification ? (
                <div className="p-4 flex gap-3 bg-red-50/60 rounded-xl border border-red-100 mt-2">
                  <div className="w-9 h-9 rounded-full bg-red-500 flex items-center justify-center shrink-0">
                    <X className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Virement rejeté</p>
                    <p className="text-xs text-slate-500 mt-0.5">Opération impossible : compte en cours de déblocage.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 mt-2">
                  {[
                    { label: "Alertes de solde", desc: "Aucune alerte active", icon: AlertCircle },
                    { label: "Avis de transaction", desc: "Aucune nouvelle transaction", icon: Receipt },
                    { label: "Messages importants", desc: "Aucun message", icon: Bell },
                  ].map(item => (
                    <div key={item.label} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                      <item.icon className="w-4 h-4 text-slate-400" />
                      <div>
                        <p className="text-xs font-bold text-slate-700">{item.label}</p>
                        <p className="text-[10px] text-slate-400">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Support */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" data-testid="button-support" className="hidden sm:flex rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100">
                <HelpCircle className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 rounded-2xl p-2 shadow-2xl border-slate-100">
              <DropdownMenuLabel className="font-bold text-slate-900 px-3 py-2">Support & Aide</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="rounded-xl p-3 font-medium text-slate-600 cursor-pointer">
                <HelpCircle className="w-4 h-4 mr-3 text-[#009966]" /> Aide & FAQ
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-xl p-3 font-medium text-slate-600 cursor-pointer">
                <MessageCircle className="w-4 h-4 mr-3 text-[#009966]" /> Chat en ligne
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-xl p-3 font-medium text-slate-600 cursor-pointer">
                <Phone className="w-4 h-4 mr-3 text-[#009966]" /> Contacter conseiller
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="hidden sm:flex items-center gap-2 px-2 py-2 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-[#009966] text-white flex items-center justify-center font-bold text-sm shadow-md">AJ</div>
                <div className="text-left hidden lg:block">
                  <p className="text-sm font-bold text-slate-900 leading-none mb-1">{user?.name?.split(' ')[0] || "Alexandra"}</p>
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
