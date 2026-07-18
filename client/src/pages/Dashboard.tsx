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
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  TrendingUp,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import bnpLogo from "@assets/IMG_9270_1784381157800.png";

export default function Dashboard() {
  const { data: user, isLoading } = useUser();
  const logout = useLogout();
  const [, setLocation] = useLocation();
  const [transferOpen, setTransferOpen] = useState(false);
  
  const { avatarUrl, setAvatarUrl } = useAppStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isLoading && !user) {
    setLocation("/login");
    return null;
  }

  if (isLoading || !user) {
    return <div className="min-h-screen bg-background" />;
  }

  const accountHolder = "Alexandra Jade Clara";
  const formattedBalance = "167 000 €";
  const accNumber = "2345678000000000";
  const accountStatus = "Compte en cours de déblocage";

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  const ads = [
    "🏦 BNP Paribas — La banque d'un monde qui change",
    "📈 Investissez avec confiance grâce à nos conseillers experts",
    "💳 Découvrez nos offres exclusives sur les nouveaux comptes 2026",
    "🌍 Votre partenaire financier en France et à l'international",
    "🔒 Sécurité renforcée — Votre argent protégé 24h/24",
    "💡 Gérez votre patrimoine facilement depuis votre espace personnel"
  ];
  const [currentAd, setCurrentAd] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#f4f8f6] pb-24 md:pb-6">
      <TopBar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >

          {/* ── BANNIÈRE VISUELLE PRINCIPALE ── */}
          <motion.div
            variants={itemVariants}
            className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#009966]/20 min-h-[180px] sm:min-h-[220px] flex items-center"
            style={{ background: "linear-gradient(135deg, #003d2b 0%, #005C3B 40%, #009966 100%)" }}
          >
            {/* Decorative pattern */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: "radial-gradient(circle at 20% 80%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
              backgroundSize: "40px 40px"
            }} />
            <div className="absolute top-[-30%] right-[-5%] w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-[-20%] left-[-5%] w-48 h-48 bg-black/15 rounded-full blur-2xl pointer-events-none" />

            {/* Logo watermark */}
            <div className="absolute right-6 bottom-4 opacity-20 w-20 h-20">
              <img src={bnpLogo} alt="" className="w-full h-full object-contain filter brightness-0 invert" />
            </div>

            <div className="relative z-10 px-8 py-8 sm:px-12 sm:py-10 max-w-xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/30">
                  <img src={bnpLogo} alt="BNP" className="w-full h-full object-cover" />
                </div>
                <span className="text-white/70 text-xs font-bold uppercase tracking-[0.2em]">BNP Paribas</span>
              </div>
              <h2 className="font-display font-black text-white text-2xl sm:text-3xl leading-tight tracking-tight mb-2">
                VOTRE EXPERTISE
              </h2>
              <p className="text-white/85 text-sm sm:text-base font-medium leading-relaxed">
                Un accompagnement sur mesure<br />pour vos projets 2026
              </p>
              <div className="flex gap-2 mt-5">
                <div className="flex items-center gap-1.5 bg-white/15 border border-white/20 rounded-full px-3 py-1">
                  <Star className="w-3 h-3 text-yellow-300 fill-yellow-300" />
                  <span className="text-white text-[11px] font-bold">Service Premium</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/15 border border-white/20 rounded-full px-3 py-1">
                  <ShieldCheck className="w-3 h-3 text-white" />
                  <span className="text-white text-[11px] font-bold">100% Sécurisé</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── DÉFILANT PUBLICITAIRE ── */}
          <div className="bg-gradient-to-r from-[#007a52] to-[#009966] text-white py-2.5 px-5 rounded-xl shadow-md relative overflow-hidden">
            <div className="absolute inset-0 opacity-8" style={{backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(255,255,255,0.08) 50px, rgba(255,255,255,0.08) 51px)"}} />
            <AnimatePresence mode="wait">
              <motion.p
                key={currentAd}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="text-center font-medium text-sm tracking-wide"
              >
                {ads[currentAd]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* ── SOLDE & STATUT ── */}
          <motion.div variants={itemVariants} className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-xl shadow-black/5 border border-white relative overflow-hidden">
            <div className="absolute right-0 top-0 w-72 h-72 bg-[#009966]/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 relative z-10">
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Solde disponible</p>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-4xl sm:text-5xl font-display font-bold text-slate-900 tracking-tight">
                    {formattedBalance}
                  </h2>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-600 text-xs font-bold border border-amber-100 shadow-sm">
                    <Lock className="w-3.5 h-3.5" />
                    {accountStatus}
                  </div>
                </div>
                <p className="text-sm text-slate-500 font-medium">{accountHolder} &nbsp;·&nbsp; Titulaire (F)</p>
              </div>
              {/* BNP logo mini */}
              <div className="shrink-0 w-12 h-12 rounded-xl overflow-hidden shadow-md opacity-70">
                <img src={bnpLogo} alt="BNP" className="w-full h-full object-cover" />
              </div>
            </div>
          </motion.div>

          {/* ── MARKETING BLOCS ── */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-[#009966]/15 rounded-2xl p-4 flex items-center gap-4 shadow-sm hover-elevate cursor-pointer">
              <div className="w-11 h-11 rounded-xl bg-[#009966]/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-[#009966]" />
              </div>
              <div>
                <h5 className="font-bold text-slate-900 text-sm">Sécurité renforcée</h5>
                <p className="text-xs text-slate-500">Chiffrement de bout en bout pour vos données</p>
              </div>
            </div>
            <div className="bg-white border border-[#009966]/15 rounded-2xl p-4 flex items-center gap-4 shadow-sm hover-elevate cursor-pointer">
              <div className="w-11 h-11 rounded-xl bg-[#009966]/10 flex items-center justify-center shrink-0">
                <TrendingUp className="w-6 h-6 text-[#009966]" />
              </div>
              <div>
                <h5 className="font-bold text-slate-900 text-sm">Interface intuitive</h5>
                <p className="text-xs text-slate-500">Une expérience bancaire fluide et moderne</p>
              </div>
            </div>
          </motion.div>

          {/* ── 6 SECTIONS ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* 1. Comptes & Cartes */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="font-display font-bold text-slate-800 px-1 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#009966]" /> Comptes & Cartes
              </h3>
              <div className="hover-elevate cursor-pointer">
                <VisaCard accountNumber={accNumber} accountName={accountHolder} />
              </div>
              <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">N° de compte</p>
                <p className="font-mono font-bold text-slate-700 text-sm">2345 6780 0000 0000</p>
              </div>
            </motion.div>

            {/* 2. Épargne & Placements */}
            <motion.div variants={itemVariants} className="flex flex-col space-y-4">
              <h3 className="font-display font-bold text-slate-800 px-1 flex items-center gap-2">
                <PiggyBank className="w-5 h-5 text-[#009966]" /> Épargne & Placements
              </h3>
              <div className="bg-white rounded-3xl p-6 shadow-xl shadow-black/5 border border-white flex-1 hover:border-[#009966]/30 transition-colors group">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total placements</p>
                <p className="text-3xl font-bold text-slate-900 group-hover:text-[#009966] transition-colors mb-5">167 000 €</p>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-500">Solde principal</span>
                      <span className="font-bold text-slate-700">167 000 €</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#009966] w-full rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-500">Investissements</span>
                      <span className="font-bold text-slate-700">0,00 €</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-200 w-0 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 3. Virements & Paiements */}
            <motion.div variants={itemVariants} className="flex flex-col space-y-4">
              <h3 className="font-display font-bold text-slate-800 px-1 flex items-center gap-2">
                <ArrowRightLeft className="w-5 h-5 text-[#009966]" /> Virements & Paiements
              </h3>
              <div className="bg-gradient-to-br from-[#009966]/8 to-white rounded-3xl p-6 border border-[#009966]/20 flex-1 flex flex-col items-center justify-center text-center space-y-5 shadow-xl shadow-[#009966]/5">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg text-[#009966] border border-[#009966]/10">
                  <ArrowRightLeft className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">Effectuer un virement</h4>
                  <p className="text-sm text-slate-500 mt-1">Transférez vos fonds de manière sécurisée.</p>
                </div>
                <Button 
                  onClick={() => setTransferOpen(true)}
                  data-testid="button-new-transfer"
                  className="w-full h-12 rounded-xl bg-[#009966] hover:bg-[#007a52] text-white shadow-lg font-bold"
                >
                  Nouveau Virement
                </Button>
              </div>
            </motion.div>

            {/* 4. Crédits & Prêts */}
            <motion.div variants={itemVariants} className="flex flex-col space-y-4">
              <h3 className="font-display font-bold text-slate-800 px-1 flex items-center gap-2">
                <Landmark className="w-5 h-5 text-[#009966]" /> Crédits & Prêts
              </h3>
              <div className="bg-white rounded-3xl p-6 shadow-xl shadow-black/5 border border-white flex-1">
                <div className="flex items-center gap-4">
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
                <ShieldCheck className="w-5 h-5 text-[#009966]" /> Assurances & Sécurité
              </h3>
              <div className="bg-white rounded-3xl p-6 shadow-xl shadow-black/5 border border-white flex-1 space-y-4">
                <div className="flex gap-4 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-[#009966]/10 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-[#009966]" />
                  </div>
                  <p className="text-sm leading-snug text-slate-600">
                    <strong className="text-slate-900 font-bold block mb-0.5">Assurance</strong>
                    Protection financière contre les risques et imprévus.
                  </p>
                </div>
                <div className="flex gap-4 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-[#009966]/10 flex items-center justify-center shrink-0">
                    <Lock className="w-5 h-5 text-[#009966]" />
                  </div>
                  <p className="text-sm leading-snug text-slate-600">
                    <strong className="text-slate-900 font-bold block mb-0.5">Sécurité</strong>
                    Protection technique et prévention des fraudes.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* 6. Profil & Paramètres */}
            <motion.div variants={itemVariants} className="flex flex-col space-y-4">
              <h3 className="font-display font-bold text-slate-800 px-1 flex items-center gap-2">
                <UserCircle className="w-5 h-5 text-[#009966]" /> Profil & Paramètres
              </h3>
              <div className="bg-white rounded-3xl p-6 shadow-xl shadow-black/5 border border-white flex-1 flex flex-col justify-between">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative group">
                    <div className="w-20 h-20 rounded-2xl border-2 border-white shadow-lg overflow-hidden flex items-center justify-center relative bg-[#009966]/10">
                      {avatarUrl ? (
                        <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <span className="font-display font-black text-2xl text-[#009966]">AJ</span>
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
                    <h4 className="font-bold text-lg text-slate-900">{accountHolder}</h4>
                    <p className="text-[10px] font-black text-[#009966] uppercase tracking-[0.2em]">Titulaire du compte</p>
                    <p className="text-xs text-slate-500 mt-0.5">Sexe : F</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  data-testid="button-logout"
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

          {/* ── FOOTER ── */}
          <motion.div variants={itemVariants} className="pt-4 pb-2 border-t border-slate-200">
            <div className="flex flex-col items-center gap-5 py-4">
              {/* Logo + nom */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg overflow-hidden">
                  <img src={bnpLogo} alt="BNP" className="w-full h-full object-cover" />
                </div>
                <div className="flex items-baseline gap-0.5">
                  <span className="font-display font-black text-lg text-[#009966]">BNP</span>
                  <span className="font-display font-black text-lg text-slate-800 ml-0.5">Paribas</span>
                </div>
              </div>
              {/* Réseaux sociaux */}
              <div className="flex gap-5">
                <a href="https://facebook.com/bnpparibas" target="_blank" rel="noopener noreferrer">
                  <Facebook className="w-5 h-5 text-slate-400 hover:text-[#1877F2] cursor-pointer transition-colors" />
                </a>
                <a href="https://instagram.com/bnpparibas" target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-5 h-5 text-slate-400 hover:text-[#E4405F] cursor-pointer transition-colors" />
                </a>
                <a href="https://twitter.com/bnpparibas" target="_blank" rel="noopener noreferrer">
                  <Twitter className="w-5 h-5 text-slate-400 hover:text-[#1DA1F2] cursor-pointer transition-colors" />
                </a>
                <a href="https://youtube.com/@bnpparibas" target="_blank" rel="noopener noreferrer">
                  <Youtube className="w-5 h-5 text-slate-400 hover:text-[#FF0000] cursor-pointer transition-colors" />
                </a>
              </div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.25em]">
                © 2026 BNP Paribas — Tous droits réservés
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
