import { useState, useRef } from "react";
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
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { data: user, isLoading } = useUser();
  const logout = useLogout();
  const [, setLocation] = useLocation();
  const [transferOpen, setTransferOpen] = useState(false);
  
  const { avatarUrl, setAvatarUrl } = useAppStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-6">
      <TopBar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {/* Header & Balance */}
          <motion.div variants={itemVariants} className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-border/50 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 relative z-10">
              <div>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Solde Total</p>
                <div className="flex items-center gap-4">
                  <h2 className="text-4xl sm:text-5xl font-display font-bold text-foreground tracking-tight">
                    {formattedBalance}
                  </h2>
                  {isBlocked && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-destructive/10 text-destructive text-sm font-semibold border border-destructive/20 shadow-sm">
                      <Lock className="w-3.5 h-3.5" />
                      Bloqué
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* 1. Comptes & Cartes */}
            <motion.div variants={itemVariants} className="col-span-1 lg:col-span-1 space-y-4">
              <h3 className="font-display font-semibold text-lg px-1 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" /> Comptes & Cartes
              </h3>
              <div className="hover-elevate cursor-pointer">
                <VisaCard accountNumber={accNumber} accountName={accountHolder} />
              </div>
            </motion.div>

            {/* 2. Épargne & Placements */}
            <motion.div variants={itemVariants} className="col-span-1 flex flex-col space-y-4">
              <h3 className="font-display font-semibold text-lg px-1 flex items-center gap-2">
                <PiggyBank className="w-5 h-5 text-primary" /> Épargne & Placements
              </h3>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-border/50 flex-1 hover:border-primary/30 transition-colors group">
                <div className="h-full flex flex-col justify-center">
                  <p className="text-sm text-muted-foreground mb-1">Total Placements</p>
                  <p className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">{formattedBalance}</p>
                  <div className="mt-4 pt-4 border-t border-border flex justify-between text-sm">
                    <span className="text-muted-foreground">Livret A</span>
                    <span className="font-medium">1 800 000 €</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 3. Virements & Paiements */}
            <motion.div variants={itemVariants} className="col-span-1 flex flex-col space-y-4">
              <h3 className="font-display font-semibold text-lg px-1 flex items-center gap-2">
                <ArrowRightLeft className="w-5 h-5 text-primary" /> Virements & Paiements
              </h3>
              <div className="bg-gradient-to-br from-primary/10 to-transparent rounded-2xl p-6 border border-primary/20 flex-1 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm text-primary">
                  <ArrowRightLeft className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Effectuer un virement</h4>
                  <p className="text-sm text-muted-foreground mt-1 text-balance">Transférez de l'argent vers un bénéficiaire.</p>
                </div>
                <Button 
                  onClick={() => setTransferOpen(true)}
                  className="w-full rounded-xl bg-primary hover:bg-primary/90 shadow-md shadow-primary/20"
                >
                  Nouveau Virement
                </Button>
              </div>
            </motion.div>

            {/* 4. Crédits & Préts */}
            <motion.div variants={itemVariants} className="col-span-1 flex flex-col space-y-4">
              <h3 className="font-display font-semibold text-lg px-1 flex items-center gap-2">
                <Landmark className="w-5 h-5 text-primary" /> Crédits & Prêts
              </h3>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-border/50 flex-1">
                <div className="h-full flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary">
                    <Landmark className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">En cours</p>
                    <p className="text-2xl font-bold text-foreground">0,00 €</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 5. Assurances & Sécurité */}
            <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col space-y-4">
              <h3 className="font-display font-semibold text-lg px-1 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" /> Assurances & Sécurité
              </h3>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-border/50 flex-1 space-y-4">
                <div className="flex gap-3">
                  <div className="mt-0.5"><ShieldCheck className="w-5 h-5 text-primary" /></div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    <strong className="text-foreground font-semibold">Assurance</strong> = protection financière contre les risques.
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="mt-0.5"><Lock className="w-5 h-5 text-primary" /></div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    <strong className="text-foreground font-semibold">Sécurité</strong> = protection technique et prévention des fraudes.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* 6. Profil & Paramètres */}
            <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col space-y-4">
              <h3 className="font-display font-semibold text-lg px-1 flex items-center gap-2">
                <UserCircle className="w-5 h-5 text-primary" /> Profil & Paramètres
              </h3>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-border/50 flex-1 flex flex-col justify-between">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative group">
                    <div className="w-16 h-16 rounded-full bg-secondary border-2 border-white shadow-md overflow-hidden flex items-center justify-center relative">
                      {avatarUrl ? (
                        <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-2xl font-bold text-primary/50">VM</span>
                      )}
                      
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
                    <h4 className="font-bold text-lg">{accountHolder}</h4>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Client Premium</p>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full rounded-xl text-destructive hover:bg-destructive hover:text-white border-destructive/30 hover:border-destructive transition-colors group"
                  onClick={() => logout.mutate()}
                  disabled={logout.isPending}
                >
                  <LogOut className="w-4 h-4 mr-2 group-hover:animate-pulse" /> 
                  {logout.isPending ? "Déconnexion..." : "Déconnexion"}
                </Button>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </main>

      <TransferModal open={transferOpen} onOpenChange={setTransferOpen} />
      <BottomNav />
    </div>
  );
}
