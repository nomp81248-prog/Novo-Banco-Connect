import { useState, useRef, useEffect } from "react";
import { useUser, useLogout } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { TopBar } from "@/components/dashboard/TopBar";
import { BottomNav } from "@/components/dashboard/BottomNav";
import { VisaCard } from "@/components/dashboard/VisaCard";
import { TransferModal } from "@/components/dashboard/TransferModal";
import { useAppStore } from "@/store/use-app-store";
import { 
  ArrowRightLeft, 
  ShieldCheck, 
  PiggyBank, 
  Landmark, 
  LogOut, 
  Camera,
  Lock,
  CreditCard,
  UserCircle,
  Search,
  Bell,
  LifeBuoy,
  Gift,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Menu,
  AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import manAvatar from "@assets/7bc5850e-8a00-4baa-ac43-758a5b286b9a_1772537208935.jpeg";

export default function Dashboard() {
  const { data: user, isLoading } = useUser();
  const logout = useLogout();
  const [, setLocation] = useLocation();
  const [transferOpen, setTransferOpen] = useState(false);
  const { toast } = useToast();
  
  const { avatarUrl, setAvatarUrl } = useAppStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isLoading && user) {
      toast({
        title: "Alerte de Sécurité",
        description: "Votre compte est temporairement bloqué. Veuillez contacter votre conseiller.",
        variant: "destructive",
      });
    }
  }, [isLoading, user, toast]);

  // Redirect if not logged in
  if (!isLoading && !user) {
    setLocation("/login");
    return null;
  }

  if (isLoading || !user) {
    return <div className="min-h-screen bg-background" />; // Prevent flash before redirect
  }

  // Hardcoded values as requested for the mock presentation
  const accountHolder = "Vieira Manoel";
  const formattedBalance = "1 800 000 €";
  const isBlocked = true;
  const accNumber = "00056006910";

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  const ads = [
    "VOTRE EXPERTISE Un accompagnement sur mesure pour vos projets 2026",
    "Découvrez nos nouveaux placements éco-responsables",
    "Gérez vos finances en toute simplicité avec notre interface intuitive",
    "NOVO BANCO : La banque qui vous accompagne partout",
    "Profitez de nos offres exclusives sur les nouveaux comptes"
  ];
  const [currentAd, setCurrentAd] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-24 md:pb-6">
      <TopBar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {/* Virtual scrolling ad */}
          <div className="bg-primary text-white py-3 px-6 rounded-2xl shadow-lg relative overflow-hidden group">
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <AnimatePresence mode="wait">
              <motion.div
                key={currentAd}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="flex items-center justify-center gap-3 text-center"
              >
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <p className="font-medium tracking-wide">{ads[currentAd]}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Header & Balance */}
          <motion.div variants={itemVariants} className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-xl shadow-black/5 border border-white relative overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 relative z-10">
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Solde Total</p>
                <div className="flex items-center gap-4">
                  <h2 className="text-4xl sm:text-5xl font-display font-bold text-slate-900 tracking-tight">
                    {formattedBalance}
                  </h2>
                  {isBlocked && (
                    <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-red-50 text-red-600 text-xs font-bold border border-red-100 shadow-sm animate-pulse">
                      <Lock className="w-3.5 h-3.5" />
                      COMPTE BLOQUÉ
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* New Tabbed Navigation Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Search, label: "Recherche", color: "bg-blue-50 text-blue-600" },
              { icon: Bell, label: "Notifications", color: "bg-orange-50 text-orange-600" },
              { icon: LifeBuoy, label: "Support & Aide", color: "bg-purple-50 text-purple-600" },
              { icon: Gift, label: "Cadeaux", color: "bg-pink-50 text-pink-600" },
            ].map((item) => (
              <motion.div 
                key={item.label}
                variants={itemVariants}
                className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center gap-3 hover-elevate cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-slate-600">{item.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* 1. Comptes & Cartes */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="font-display font-bold text-slate-800 px-1 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" /> Comptes & Cartes
              </h3>
              <div className="hover-elevate cursor-pointer">
                <VisaCard accountNumber={accNumber} accountName={accountHolder} />
              </div>
            </motion.div>

            {/* 2. Épargne & Placements */}
            <motion.div variants={itemVariants} className="flex flex-col space-y-4">
              <h3 className="font-display font-bold text-slate-800 px-1 flex items-center gap-2">
                <PiggyBank className="w-5 h-5 text-primary" /> Épargne & Placements
              </h3>
              <div className="bg-white rounded-3xl p-6 shadow-xl shadow-black/5 border border-white flex-1 hover:border-primary/30 transition-colors group">
                <div className="h-full flex flex-col justify-center">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Placements</p>
                  <p className="text-3xl font-bold text-slate-900 group-hover:text-primary transition-colors">{formattedBalance}</p>
                  <div className="mt-6 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Livret A</span>
                      <span className="font-bold text-slate-700">1 800 000 €</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-full" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 3. Virements & Paiements */}
            <motion.div variants={itemVariants} className="flex flex-col space-y-4">
              <h3 className="font-display font-bold text-slate-800 px-1 flex items-center gap-2">
                <ArrowRightLeft className="w-5 h-5 text-primary" /> Virements & Paiements
              </h3>
              <div className="bg-gradient-to-br from-primary/5 to-white rounded-3xl p-6 border border-primary/20 flex-1 flex flex-col items-center justify-center text-center space-y-5 shadow-xl shadow-primary/5">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg text-primary border border-primary/10">
                  <ArrowRightLeft className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">Effectuer un virement</h4>
                  <p className="text-sm text-slate-500 mt-1 max-w-[200px]">Transférez vos fonds de manière sécurisée.</p>
                </div>
                <Button 
                  onClick={() => setTransferOpen(true)}
                  className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 font-bold"
                >
                  Nouveau Virement
                </Button>
              </div>
            </motion.div>

            {/* 4. Crédits & Préts */}
            <motion.div variants={itemVariants} className="flex flex-col space-y-4">
              <h3 className="font-display font-bold text-slate-800 px-1 flex items-center gap-2">
                <Landmark className="w-5 h-5 text-primary" /> Crédits & Prêts
              </h3>
              <div className="bg-white rounded-3xl p-6 shadow-xl shadow-black/5 border border-white flex-1">
                <div className="h-full flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                    <Landmark className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">En cours</p>
                    <p className="text-3xl font-bold text-slate-900">0,00 €</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 5. Assurances & Sécurité */}
            <motion.div variants={itemVariants} className="flex flex-col space-y-4">
              <h3 className="font-display font-bold text-slate-800 px-1 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" /> Assurances & Sécurité
              </h3>
              <div className="bg-white rounded-3xl p-6 shadow-xl shadow-black/5 border border-white flex-1 space-y-4">
                <div className="flex gap-4 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm leading-snug text-slate-600">
                    <strong className="text-slate-900 font-bold block mb-0.5">Assurance</strong> Protection financière totale contre les risques.
                  </p>
                </div>
                <div className="flex gap-4 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Lock className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm leading-snug text-slate-600">
                    <strong className="text-slate-900 font-bold block mb-0.5">Sécurité</strong> Protection technique et prévention avancée des fraudes.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* 6. Profil & Paramètres */}
            <motion.div variants={itemVariants} className="flex flex-col space-y-4">
              <h3 className="font-display font-bold text-slate-800 px-1 flex items-center gap-2">
                <UserCircle className="w-5 h-5 text-primary" /> Profil & Paramètres
              </h3>
              <div className="bg-white rounded-3xl p-6 shadow-xl shadow-black/5 border border-white flex-1 flex flex-col justify-between">
                <div className="flex items-center gap-5 mb-6">
                  <div className="relative group">
                    <div className="w-20 h-20 rounded-2xl bg-slate-100 border-2 border-white shadow-lg overflow-hidden flex items-center justify-center relative">
                      <img src={avatarUrl || manAvatar} alt="Avatar" className="w-full h-full object-cover" />
                      <div 
                        className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Camera className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleAvatarUpload} 
                      accept="image/*"
                      className="hidden" 
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-slate-900">{accountHolder}</h4>
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Client Platinium</p>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full h-12 rounded-xl text-red-500 hover:bg-red-50 hover:text-red-600 border-red-100 hover:border-red-200 transition-all font-bold"
                  onClick={() => logout.mutate()}
                  disabled={logout.isPending}
                >
                  <LogOut className="w-4 h-4 mr-2" /> 
                  {logout.isPending ? "Déconnexion..." : "Se déconnecter"}
                </Button>
              </div>
            </motion.div>

          </div>

          {/* Marketing Footer Section */}
          <motion.div variants={itemVariants} className="pt-8 pb-4 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900">Sécurité renforcée</h5>
                  <p className="text-xs text-slate-500">Chiffrement de bout en bout pour vos données.</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Menu className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900">Interface intuitive</h5>
                  <p className="text-xs text-slate-500">Une expérience fluide et moderne au quotidien.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center text-center space-y-6 py-6 border-t border-slate-100">
              <div className="flex gap-6">
                <Facebook className="w-6 h-6 text-slate-400 hover:text-[#1877F2] cursor-pointer transition-colors" />
                <Instagram className="w-6 h-6 text-slate-400 hover:text-[#E4405F] cursor-pointer transition-colors" />
                <Twitter className="w-6 h-6 text-slate-400 hover:text-[#1DA1F2] cursor-pointer transition-colors" />
                <Youtube className="w-6 h-6 text-slate-400 hover:text-[#FF0000] cursor-pointer transition-colors" />
              </div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em]">
                © 2026 NOVO BANCO - Expertise & Accompagnement
              </p>
            </div>
          </motion.div>
        </motion.div>
      </main>

      <TransferModal open={transferOpen} onOpenChange={setTransferOpen} />
      <BottomNav />
    </div>
  );
}
