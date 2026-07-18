import { useState, useRef, useEffect } from "react";
import { useUser, useLogout } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { useAppStore } from "@/store/use-app-store";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  CreditCard,
  ArrowRightLeft,
  UserCircle,
  Bell,
  Menu,
  X,
  LogOut,
  Camera,
  ShieldCheck,
  Lock,
  PiggyBank,
  Landmark,
  ArrowRight,
  AlertCircle,
  RefreshCw,
  ChevronLeft,
  Search,
  HelpCircle,
  MessageCircle,
  Phone,
  Star,
  TrendingUp,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import bnpLogo from "@assets/IMG_9270_1784381157800.png";

const ACCOUNT_HOLDER = "Alexandra Jade Clara";
const ACCOUNT_NUMBER = "00056006910";
const BALANCE = "167 000";
const ACCOUNT_STATUS = "Compte en cours de déblocage";

type Tab = "home" | "accounts" | "transfer" | "profile";

export default function Dashboard() {
  const { data: user, isLoading } = useUser();
  const logout = useLogout();
  const [, setLocation] = useLocation();
  const { avatarUrl, setAvatarUrl, hasNotification, triggerNotification, clearNotification } = useAppStore();

  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [currentAd, setCurrentAd] = useState(0);
  const [transferStep, setTransferStep] = useState(1);
  const [transferProcessing, setTransferProcessing] = useState(false);
  const [transferError, setTransferError] = useState<string | null>(null);
  const [transferForm, setTransferForm] = useState({
    beneficiary: "",
    iban: "",
    bic: "",
    amount: "",
    motif: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const ads = [
    "🏦 BNP Paribas — La banque d'un monde qui change",
    "📈 Investissez avec confiance grâce à nos conseillers experts",
    "💳 Découvrez nos offres exclusives sur les nouveaux comptes 2026",
    "🌍 Votre partenaire financier en France et à l'international",
    "🔒 Sécurité renforcée — Votre argent protégé 24h/24",
    "💡 Gérez votre patrimoine facilement depuis votre espace personnel",
  ];

  useEffect(() => {
    if (!isLoading && !user) {
      setLocation("/login");
    }
  }, [isLoading, user]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
    }
  };

  const resetTransfer = () => {
    setTransferStep(1);
    setTransferError(null);
    setTransferProcessing(false);
    setTransferForm({ beneficiary: "", iban: "", bic: "", amount: "", motif: "" });
  };

  const handleTransferConfirm = () => {
    setTransferProcessing(true);
    setTimeout(() => {
      setTransferProcessing(false);
      setTransferError("Opération impossible : compte en cours de déblocage");
      triggerNotification();
    }, 1800);
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-[#f4f8f6] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#009966] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const cardDigits = ACCOUNT_NUMBER.replace(/\D/g, "").padStart(16, "0");
  const maskedCard = `${cardDigits.slice(0, 4)} **** **** ${cardDigits.slice(-4)}`;

  return (
    <div className="min-h-screen bg-[#f4f8f6] flex flex-col">

      {/* ── TOP BAR ── */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              data-testid="button-menu"
              onClick={() => setMenuOpen(true)}
              className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg overflow-hidden shadow border border-slate-100">
                <img src={bnpLogo} alt="BNP" className="w-full h-full object-cover" />
              </div>
              <span className="font-black text-base">
                <span className="text-[#009966]">BNP</span>
                <span className="text-slate-800 ml-0.5">Paribas</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              data-testid="button-notifications"
              onClick={() => { setNotifOpen(!notifOpen); if (notifOpen) clearNotification(); }}
              className="relative w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
            >
              <Bell className="w-5 h-5" />
              {hasNotification && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ── NOTIFICATION PANEL ── */}
      <AnimatePresence>
        {notifOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setNotifOpen(false); clearNotification(); }}
              className="fixed inset-0 z-40 bg-black/20"
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="fixed top-16 right-4 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden"
            >
              <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                <span className="font-bold text-slate-900">Notifications</span>
                <button onClick={() => { setNotifOpen(false); clearNotification(); }}>
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              </div>
              <div className="p-3">
                {hasNotification ? (
                  <div className="p-4 flex gap-3 bg-red-50 rounded-xl border border-red-100">
                    <div className="w-9 h-9 rounded-full bg-red-500 flex items-center justify-center shrink-0">
                      <AlertCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Virement rejeté</p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Opération impossible : compte en cours de déblocage.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="py-6 text-center text-sm text-slate-400">
                    Aucune notification
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── SIDE MENU ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/40"
            />
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-2xl flex flex-col"
            >
              <div className="bg-[#009966] p-6 text-white">
                <div className="flex justify-between items-center mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg overflow-hidden border-2 border-white/30">
                      <img src={bnpLogo} alt="BNP" className="w-full h-full object-cover" />
                    </div>
                    <span className="font-black text-lg">BNP Paribas</span>
                  </div>
                  <button onClick={() => setMenuOpen(false)} className="text-white/80 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center gap-3 bg-white/15 rounded-xl p-3">
                  <div className="w-10 h-10 rounded-xl bg-white/25 flex items-center justify-center font-bold text-sm overflow-hidden">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      "AJ"
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{ACCOUNT_HOLDER}</p>
                    <p className="text-xs text-white/65">{ACCOUNT_STATUS}</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 p-4 space-y-1">
                {[
                  { icon: Home, label: "Accueil", tab: "home" as Tab },
                  { icon: CreditCard, label: "Comptes", tab: "accounts" as Tab },
                  { icon: ArrowRightLeft, label: "Virement", tab: "transfer" as Tab },
                  { icon: UserCircle, label: "Mon profil", tab: "profile" as Tab },
                  { icon: HelpCircle, label: "Aide & Support", tab: null },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => { if (item.tab) setActiveTab(item.tab); setMenuOpen(false); }}
                    className="w-full flex items-center gap-4 p-3.5 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    <item.icon className="w-5 h-5 text-[#009966]" />
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="p-4 border-t border-slate-100">
                <button
                  onClick={() => { logout.mutate(); setMenuOpen(false); }}
                  className="w-full flex items-center gap-4 p-3.5 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Déconnexion
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-5 pb-24 space-y-5">
        <AnimatePresence mode="wait">

          {/* ═══════════════ TAB: ACCUEIL ═══════════════ */}
          {activeTab === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="space-y-5"
            >
              {/* Greeting */}
              <div>
                <p className="text-sm text-slate-500 font-medium">Bonjour,</p>
                <h1 className="text-2xl font-black text-slate-900">{ACCOUNT_HOLDER}</h1>
              </div>

              {/* Balance hero */}
              <div
                className="rounded-3xl p-6 text-white relative overflow-hidden shadow-2xl shadow-[#009966]/30"
                style={{ background: "linear-gradient(135deg, #003d2b 0%, #005C3B 45%, #009966 100%)" }}
              >
                <div className="absolute top-0 right-0 w-56 h-56 bg-white/8 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-36 h-36 bg-black/15 rounded-full blur-2xl translate-y-1/3 -translate-x-1/3" />
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-1">Solde disponible</p>
                      <p className="text-4xl font-black tracking-tight">{BALANCE} <span className="text-2xl">€</span></p>
                    </div>
                    <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/20 shadow-md">
                      <img src={bnpLogo} alt="BNP" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-white/15 border border-white/20 rounded-xl px-3 py-2 w-fit">
                    <Lock className="w-3.5 h-3.5 text-amber-300" />
                    <span className="text-xs font-bold text-amber-200">{ACCOUNT_STATUS}</span>
                  </div>
                </div>
              </div>

              {/* Ticker */}
              <div className="bg-gradient-to-r from-[#007a52] to-[#009966] text-white py-2.5 px-5 rounded-xl overflow-hidden relative">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentAd}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-center text-sm font-medium"
                  >
                    {ads[currentAd]}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* 6 Sections */}
              <div className="space-y-4">

                {/* 1. Comptes & Carte */}
                <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-[#009966]/10 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-[#009966]" />
                    </div>
                    <h3 className="font-bold text-slate-900">Comptes & Carte</h3>
                  </div>
                  <VisaCard number={maskedCard} name={ACCOUNT_HOLDER} />
                  <div className="mt-3 bg-slate-50 rounded-2xl px-4 py-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">N° de compte</p>
                    <p className="font-mono font-bold text-slate-700">{ACCOUNT_NUMBER}</p>
                  </div>
                </div>

                {/* 2. Épargne & Placements */}
                <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-[#009966]/10 rounded-lg flex items-center justify-center">
                      <PiggyBank className="w-4 h-4 text-[#009966]" />
                    </div>
                    <h3 className="font-bold text-slate-900">Épargne & Placements</h3>
                  </div>
                  <p className="text-3xl font-black text-slate-900 mb-4">167 000 €</p>
                  <div className="space-y-3">
                    {[
                      { label: "Compte courant", value: "167 000 €", pct: 100, color: "#009966" },
                      { label: "Livret A", value: "0,00 €", pct: 0, color: "#64748b" },
                      { label: "Investissements", value: "0,00 €", pct: 0, color: "#94a3b8" },
                    ].map((row) => (
                      <div key={row.label}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-500">{row.label}</span>
                          <span className="font-bold text-slate-700">{row.value}</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{ width: `${row.pct}%`, backgroundColor: row.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Virements & Paiements */}
                <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-[#009966]/10 rounded-lg flex items-center justify-center">
                      <ArrowRightLeft className="w-4 h-4 text-[#009966]" />
                    </div>
                    <h3 className="font-bold text-slate-900">Virements & Paiements</h3>
                  </div>
                  <p className="text-sm text-slate-500 mb-4">Effectuez un virement sécurisé vers n'importe quel compte.</p>
                  <Button
                    onClick={() => setActiveTab("transfer")}
                    data-testid="button-go-transfer"
                    className="w-full h-12 rounded-2xl bg-[#009966] hover:bg-[#007a52] text-white font-bold shadow-lg shadow-[#009966]/20"
                  >
                    <ArrowRightLeft className="w-4 h-4 mr-2" /> Nouveau virement
                  </Button>
                </div>

                {/* 4. Crédits & Prêts */}
                <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-[#009966]/10 rounded-lg flex items-center justify-center">
                      <Landmark className="w-4 h-4 text-[#009966]" />
                    </div>
                    <h3 className="font-bold text-slate-900">Crédits & Prêts</h3>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center">
                      <Landmark className="w-7 h-7 text-slate-300" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-0.5">En cours</p>
                      <p className="text-3xl font-black text-slate-900">0,00 €</p>
                    </div>
                  </div>
                </div>

                {/* 5. Assurances & Sécurité */}
                <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-[#009966]/10 rounded-lg flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4 text-[#009966]" />
                    </div>
                    <h3 className="font-bold text-slate-900">Assurances & Sécurité</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <ShieldCheck className="w-5 h-5 text-[#009966] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-sm text-slate-900">Assurance</p>
                        <p className="text-xs text-slate-500 mt-0.5">Protection financière contre les risques et imprévus.</p>
                      </div>
                    </div>
                    <div className="flex gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <Lock className="w-5 h-5 text-[#009966] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-sm text-slate-900">Sécurité</p>
                        <p className="text-xs text-slate-500 mt-0.5">Protection technique et prévention des fraudes.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 6. Profil & Paramètres */}
                <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-[#009966]/10 rounded-lg flex items-center justify-center">
                      <UserCircle className="w-4 h-4 text-[#009966]" />
                    </div>
                    <h3 className="font-bold text-slate-900">Profil & Paramètres</h3>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden bg-[#009966]/10 flex items-center justify-center font-black text-lg text-[#009966] shrink-0">
                      {avatarUrl ? (
                        <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                      ) : "AJ"}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{ACCOUNT_HOLDER}</p>
                      <p className="text-xs text-[#009966] font-bold uppercase tracking-wider">Titulaire du compte</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => setActiveTab("profile")}
                    variant="outline"
                    className="w-full mt-4 h-10 rounded-2xl border-slate-200 font-bold text-slate-600"
                  >
                    Voir mon profil
                  </Button>
                </div>

              </div>

              {/* Footer */}
              <div className="pt-2 pb-2 border-t border-slate-200 flex flex-col items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg overflow-hidden">
                    <img src={bnpLogo} alt="BNP" className="w-full h-full object-cover" />
                  </div>
                  <span className="font-black text-base"><span className="text-[#009966]">BNP</span><span className="text-slate-800 ml-0.5">Paribas</span></span>
                </div>
                <div className="flex gap-4">
                  <Facebook className="w-4 h-4 text-slate-400 hover:text-[#1877F2] cursor-pointer transition-colors" />
                  <Instagram className="w-4 h-4 text-slate-400 hover:text-[#E4405F] cursor-pointer transition-colors" />
                  <Twitter className="w-4 h-4 text-slate-400 hover:text-[#1DA1F2] cursor-pointer transition-colors" />
                  <Youtube className="w-4 h-4 text-slate-400 hover:text-red-500 cursor-pointer transition-colors" />
                </div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">© 2026 BNP Paribas</p>
              </div>
            </motion.div>
          )}

          {/* ═══════════════ TAB: COMPTES ═══════════════ */}
          {activeTab === "accounts" && (
            <motion.div
              key="accounts"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="space-y-5"
            >
              <h2 className="text-xl font-black text-slate-900">Comptes & Carte</h2>

              <VisaCard number={maskedCard} name={ACCOUNT_HOLDER} />

              <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-4">
                <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider text-slate-400">Détails du compte</h3>
                {[
                  { label: "Titulaire", value: ACCOUNT_HOLDER },
                  { label: "N° de compte", value: ACCOUNT_NUMBER },
                  { label: "Type", value: "Compte courant particulier" },
                  { label: "Statut", value: ACCOUNT_STATUS },
                  { label: "Devise", value: "EUR — Euro" },
                  { label: "Solde disponible", value: `${BALANCE} €` },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                    <span className="text-sm text-slate-500 font-medium">{row.label}</span>
                    <span className="text-sm font-bold text-slate-800 text-right max-w-[55%]">{row.value}</span>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-[#009966]/8 to-white rounded-3xl p-5 border border-[#009966]/20">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-[#009966]" />
                  <span className="font-bold text-slate-900 text-sm">Épargne & Placements</span>
                </div>
                <p className="text-3xl font-black text-[#009966]">167 000 €</p>
                <p className="text-xs text-slate-500 mt-1">Solde total disponible</p>
              </div>
            </motion.div>
          )}

          {/* ═══════════════ TAB: VIREMENT ═══════════════ */}
          {activeTab === "transfer" && (
            <motion.div
              key="transfer"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="space-y-5"
            >
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-black text-slate-900">Virement</h2>
              </div>

              {/* Progress bar */}
              <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#009966] rounded-full transition-all duration-500"
                      style={{ width: `${(transferStep / 3) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-400">Étape {transferStep}/3</span>
                </div>
                <div className="flex gap-2 mt-2">
                  {["Bénéficiaire", "Montant", "Confirmation"].map((s, i) => (
                    <span
                      key={s}
                      className={`text-[10px] font-bold uppercase tracking-wider flex-1 text-center ${
                        i + 1 === transferStep ? "text-[#009966]" : i + 1 < transferStep ? "text-slate-400" : "text-slate-200"
                      }`}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                <AnimatePresence mode="wait">

                  {/* Step 1 */}
                  {transferStep === 1 && (
                    <motion.div key="ts1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-[#009966]/10 rounded-xl flex items-center justify-center">
                          <ArrowRightLeft className="w-5 h-5 text-[#009966]" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">Bénéficiaire</p>
                          <p className="text-xs text-slate-400">Renseignez les coordonnées bancaires</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">Nom du bénéficiaire</Label>
                        <Input
                          data-testid="input-beneficiary"
                          placeholder="Ex : Jean Martin"
                          value={transferForm.beneficiary}
                          onChange={(e) => setTransferForm({ ...transferForm, beneficiary: e.target.value })}
                          className="h-12 rounded-2xl bg-slate-50 border-slate-100"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">IBAN</Label>
                        <Input
                          data-testid="input-iban"
                          placeholder="Ex : FR76 3000 6000 0112 3456 7890 189"
                          value={transferForm.iban}
                          onChange={(e) => setTransferForm({ ...transferForm, iban: e.target.value.toUpperCase() })}
                          className="h-12 rounded-2xl bg-slate-50 border-slate-100 font-mono"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">BIC / SWIFT</Label>
                        <Input
                          data-testid="input-bic"
                          placeholder="Ex : BNPAFRPPXXX"
                          value={transferForm.bic}
                          onChange={(e) => setTransferForm({ ...transferForm, bic: e.target.value.toUpperCase() })}
                          className="h-12 rounded-2xl bg-slate-50 border-slate-100 font-mono uppercase"
                        />
                      </div>
                      <Button
                        onClick={() => setTransferStep(2)}
                        disabled={!transferForm.iban.trim()}
                        data-testid="button-transfer-next-1"
                        className="w-full h-12 rounded-2xl bg-[#009966] hover:bg-[#007a52] text-white font-bold shadow-lg shadow-[#009966]/20"
                      >
                        Continuer <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </motion.div>
                  )}

                  {/* Step 2 */}
                  {transferStep === 2 && (
                    <motion.div key="ts2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-[#009966]/10 rounded-xl flex items-center justify-center">
                          <ArrowRightLeft className="w-5 h-5 text-[#009966]" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">Montant & Motif</p>
                          <p className="text-xs text-slate-400">Indiquez la somme et la raison</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">Montant (€)</Label>
                        <div className="relative">
                          <Input
                            data-testid="input-amount"
                            type="number"
                            placeholder="0.00"
                            value={transferForm.amount}
                            onChange={(e) => setTransferForm({ ...transferForm, amount: e.target.value })}
                            className="h-20 rounded-2xl text-4xl pl-6 pr-14 font-black bg-slate-50 border-slate-100"
                          />
                          <span className="absolute right-5 top-1/2 -translate-y-1/2 text-2xl font-bold text-slate-300">€</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">Motif du virement</Label>
                        <Input
                          data-testid="input-motif"
                          placeholder="Ex : Loyer, Remboursement, Facture..."
                          value={transferForm.motif}
                          onChange={(e) => setTransferForm({ ...transferForm, motif: e.target.value })}
                          className="h-12 rounded-2xl bg-slate-50 border-slate-100"
                        />
                      </div>
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          onClick={() => setTransferStep(1)}
                          className="h-12 rounded-2xl border-slate-200 font-bold px-6"
                        >
                          <ChevronLeft className="w-4 h-4 mr-1" /> Retour
                        </Button>
                        <Button
                          onClick={() => setTransferStep(3)}
                          disabled={!transferForm.amount}
                          data-testid="button-transfer-next-2"
                          className="flex-1 h-12 rounded-2xl bg-[#009966] hover:bg-[#007a52] text-white font-bold shadow-lg shadow-[#009966]/20"
                        >
                          Continuer <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3 */}
                  {transferStep === 3 && (
                    <motion.div key="ts3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                      {transferError ? (
                        <motion.div
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="flex flex-col items-center text-center py-4 space-y-4"
                        >
                          <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center shadow-xl shadow-red-500/30">
                            <AlertCircle className="w-10 h-10 text-white" />
                          </div>
                          <div>
                            <p className="font-black text-xl text-slate-900">Virement impossible</p>
                            <p className="text-sm text-red-500 font-bold mt-2">{transferError}</p>
                          </div>
                          <Button
                            onClick={resetTransfer}
                            variant="outline"
                            data-testid="button-transfer-retry"
                            className="w-full h-12 rounded-2xl border-slate-200 font-bold"
                          >
                            Nouveau virement
                          </Button>
                        </motion.div>
                      ) : (
                        <>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-[#009966]/10 rounded-xl flex items-center justify-center">
                              <ShieldCheck className="w-5 h-5 text-[#009966]" />
                            </div>
                            <div>
                              <p className="font-bold text-slate-900">Confirmation</p>
                              <p className="text-xs text-slate-400">Vérifiez les informations</p>
                            </div>
                          </div>
                          <div className="bg-slate-50 rounded-2xl p-5 space-y-3 border border-slate-100">
                            <div className="text-center pb-3 border-b border-slate-200">
                              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Montant</p>
                              <p className="text-4xl font-black text-[#009966]">{transferForm.amount} €</p>
                            </div>
                            {[
                              { label: "Bénéficiaire", value: transferForm.beneficiary || "—" },
                              { label: "IBAN", value: transferForm.iban || "—" },
                              { label: "BIC", value: transferForm.bic || "—" },
                              { label: "Motif", value: transferForm.motif || "—" },
                              { label: "Frais", value: "Offerts" },
                            ].map((row) => (
                              <div key={row.label} className="flex justify-between items-center text-sm">
                                <span className="text-slate-400 font-bold text-xs uppercase tracking-wider">{row.label}</span>
                                <span className={`font-bold text-slate-700 text-right max-w-[55%] truncate ${row.label === "Frais" ? "text-[#009966]" : ""}`}>{row.value}</span>
                              </div>
                            ))}
                          </div>
                          <div className="flex gap-3">
                            <Button
                              variant="outline"
                              onClick={() => setTransferStep(2)}
                              className="h-12 rounded-2xl border-slate-200 font-bold px-6"
                            >
                              <ChevronLeft className="w-4 h-4 mr-1" /> Retour
                            </Button>
                            <Button
                              onClick={handleTransferConfirm}
                              disabled={transferProcessing}
                              data-testid="button-confirm-transfer"
                              className="flex-1 h-12 rounded-2xl bg-[#009966] hover:bg-[#007a52] text-white font-bold shadow-lg shadow-[#009966]/20"
                            >
                              {transferProcessing ? (
                                <><RefreshCw className="w-4 h-4 mr-2 animate-spin" /> Validation...</>
                              ) : (
                                "Envoyer le virement"
                              )}
                            </Button>
                          </div>
                        </>
                      )}
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* ═══════════════ TAB: VOUS ═══════════════ */}
          {activeTab === "profile" && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="space-y-5"
            >
              <h2 className="text-xl font-black text-slate-900">Mon Profil</h2>

              {/* Profile card */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-3xl overflow-hidden bg-[#009966]/10 flex items-center justify-center font-black text-3xl text-[#009966] border-4 border-white shadow-xl shadow-[#009966]/10">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    ) : "AJ"}
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    data-testid="button-upload-avatar"
                    className="absolute -bottom-2 -right-2 w-9 h-9 bg-[#009966] rounded-xl flex items-center justify-center shadow-lg text-white hover:bg-[#007a52] transition-colors"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleAvatarUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
                <h3 className="font-black text-xl text-slate-900">{ACCOUNT_HOLDER}</h3>
                <p className="text-xs font-bold uppercase tracking-widest text-[#009966] mt-1">Titulaire du compte</p>
              </div>

              {/* Info */}
              <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-1">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Informations personnelles</p>
                {[
                  { label: "Nom complet", value: ACCOUNT_HOLDER },
                  { label: "N° de compte", value: ACCOUNT_NUMBER },
                  { label: "Statut", value: ACCOUNT_STATUS },
                  { label: "Sexe", value: "Féminin" },
                  { label: "Langue", value: "Français" },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between items-center py-3 border-b border-slate-50 last:border-0">
                    <span className="text-sm text-slate-500">{row.label}</span>
                    <span className="text-sm font-bold text-slate-800">{row.value}</span>
                  </div>
                ))}
              </div>

              {/* Security */}
              <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Sécurité</p>
                <div className="flex gap-3 p-4 bg-slate-50 rounded-2xl">
                  <ShieldCheck className="w-5 h-5 text-[#009966] shrink-0" />
                  <div>
                    <p className="font-bold text-sm text-slate-900">Assurance</p>
                    <p className="text-xs text-slate-500">Protection financière contre les risques.</p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 bg-slate-50 rounded-2xl">
                  <Lock className="w-5 h-5 text-[#009966] shrink-0" />
                  <div>
                    <p className="font-bold text-sm text-slate-900">Sécurité</p>
                    <p className="text-xs text-slate-500">Protection technique et prévention des fraudes.</p>
                  </div>
                </div>
              </div>

              {/* Logout */}
              <Button
                variant="outline"
                data-testid="button-logout"
                onClick={() => logout.mutate()}
                disabled={logout.isPending}
                className="w-full h-13 rounded-2xl border-red-100 text-red-500 hover:bg-red-50 hover:border-red-200 font-bold text-base"
              >
                <LogOut className="w-4 h-4 mr-2" />
                {logout.isPending ? "Déconnexion..." : "Se déconnecter"}
              </Button>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* ── BOTTOM NAV ── */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-100 shadow-[0_-4px_24px_rgba(0,0,0,0.06)] z-40">
        <div className="max-w-2xl mx-auto flex items-center justify-around px-2 py-2">
          {([
            { icon: Home, label: "Accueil", tab: "home" as Tab },
            { icon: CreditCard, label: "Comptes", tab: "accounts" as Tab },
            { icon: ArrowRightLeft, label: "Virement", tab: "transfer" as Tab, special: true },
            { icon: UserCircle, label: "Vous", tab: "profile" as Tab, avatar: true },
          ] as { icon: any; label: string; tab: Tab; special?: boolean; avatar?: boolean }[]).map((item) => {
            const isActive = activeTab === item.tab;
            return (
              <button
                key={item.tab}
                data-testid={`nav-${item.tab}`}
                onClick={() => {
                  setActiveTab(item.tab);
                  if (item.tab === "transfer") resetTransfer();
                }}
                className={`flex flex-col items-center gap-1 min-w-[64px] py-1 transition-all active:scale-95 ${
                  isActive ? "text-[#009966]" : "text-slate-400"
                }`}
              >
                {item.special ? (
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-all ${
                    isActive ? "bg-[#009966] text-white shadow-[#009966]/30" : "bg-[#009966]/10 text-[#009966]"
                  }`}>
                    <item.icon className="w-6 h-6" strokeWidth={2.5} />
                  </div>
                ) : item.avatar ? (
                  <div className={`w-7 h-7 rounded-full border-2 overflow-hidden flex items-center justify-center transition-all ${
                    isActive ? "border-[#009966]" : "border-transparent"
                  } ${!avatarUrl ? "bg-[#009966]/10" : ""}`}>
                    {avatarUrl ? (
                      <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-[10px] font-black text-[#009966]">AJ</span>
                    )}
                  </div>
                ) : (
                  <item.icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
                )}
                {!item.special && (
                  <span className={`text-[10px] font-bold tracking-tight ${isActive ? "opacity-100" : "opacity-50"}`}>
                    {item.label}
                  </span>
                )}
                {item.special && (
                  <span className={`text-[10px] font-bold tracking-tight ${isActive ? "opacity-100 text-[#009966]" : "opacity-50"}`}>
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

/* ── Visa Card Component ── */
function VisaCard({ number, name }: { number: string; name: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="w-full aspect-[1.58/1] rounded-3xl p-6 flex flex-col justify-between shadow-2xl shadow-[#009966]/25 text-white relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #003d2b 0%, #005C3B 50%, #009966 100%)" }}
    >
      <div className="absolute top-0 right-0 w-52 h-52 bg-white/8 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/12 rounded-full blur-2xl translate-y-1/3 -translate-x-1/3" />

      {/* Top row */}
      <div className="relative z-10 flex justify-between items-start">
        <div className="w-10 h-7 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-md shadow-inner border border-yellow-200/50 flex items-center justify-center">
          <div className="w-7 h-4 border border-black/20 rounded grid grid-cols-2 gap-[2px] p-[2px]">
            <div className="border-r border-b border-black/10" />
            <div className="border-b border-black/10" />
            <div className="border-r border-black/10" />
            <div />
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-lg px-2 py-1 border border-white/20">
          <div className="w-5 h-5 rounded overflow-hidden">
            <img src={bnpLogo} alt="BNP" className="w-full h-full object-cover" />
          </div>
          <span className="font-black text-xs text-white">BNP Paribas</span>
        </div>
      </div>

      {/* Bottom */}
      <div className="relative z-10 space-y-2">
        <p className="font-mono text-xl tracking-[0.2em] drop-shadow text-white font-medium">{number}</p>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-widest text-white/55 mb-0.5">Titulaire</p>
            <p className="text-xs font-black uppercase tracking-wide text-white/95">{name}</p>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <div className="text-right">
              <p className="text-[7px] font-black uppercase tracking-widest text-white/50">VALID THRU</p>
              <p className="font-mono text-sm font-bold">12 / 28</p>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-base font-black italic text-white">VISA</span>
              <div className="flex">
                <div className="w-3.5 h-3.5 rounded-full bg-[#eb001b] opacity-90" />
                <div className="w-3.5 h-3.5 rounded-full bg-[#f79e1b] -ml-1.5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
