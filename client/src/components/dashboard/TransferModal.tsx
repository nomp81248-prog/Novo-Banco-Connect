import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, AlertCircle, RefreshCw, ShieldCheck } from "lucide-react";
import { useAppStore } from "@/store/use-app-store";
import { motion, AnimatePresence } from "framer-motion";

interface TransferModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TransferModal({ open, onOpenChange }: TransferModalProps) {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { triggerNotification } = useAppStore();

  const [formData, setFormData] = useState({
    beneficiary: "",
    iban: "",
    bic: "",
    amount: "",
    reference: ""
  });

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setTimeout(() => {
        setStep(1);
        setError(null);
        setFormData({ beneficiary: "", iban: "", bic: "", amount: "", reference: "" });
        setIsProcessing(false);
      }, 300);
    }
    onOpenChange(newOpen);
  };

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setError("Opération impossible : compte en cours de déblocage");
      triggerNotification();
    }, 1800);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md rounded-3xl overflow-hidden p-0 border-0 shadow-2xl bg-white">
        
        {/* Progress bar */}
        <div className="h-1.5 bg-slate-100 w-full">
          <div 
            className="h-full bg-[#009966] transition-all duration-500 ease-out rounded-r-full"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
        
        <div className="p-8">
          <DialogHeader className="mb-7 text-left">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#009966]/10 flex items-center justify-center text-[#009966]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <DialogTitle className="font-display text-xl font-bold text-slate-900">
                  {step === 1 && "Bénéficiaire"}
                  {step === 2 && "Détails du virement"}
                  {step === 3 && "Confirmation"}
                </DialogTitle>
                <DialogDescription className="text-slate-500 font-medium text-sm">
                  Étape {step} sur 3 &nbsp;·&nbsp; Transfert sécurisé BNP Paribas
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <div className="space-y-2">
                  <Label htmlFor="beneficiary" className="text-xs font-bold uppercase tracking-wider text-slate-400">Nom du bénéficiaire</Label>
                  <Input 
                    id="beneficiary"
                    data-testid="input-beneficiary"
                    placeholder="Ex: Jean Martin" 
                    className="h-13 rounded-2xl bg-slate-50 border-slate-100 focus:bg-white transition-all"
                    value={formData.beneficiary}
                    onChange={e => setFormData({...formData, beneficiary: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="iban" className="text-xs font-bold uppercase tracking-wider text-slate-400">IBAN du bénéficiaire</Label>
                  <Input 
                    id="iban"
                    data-testid="input-iban"
                    placeholder="Ex: FR76 3000 6000 0112 3456 7890 189" 
                    className="font-mono h-13 rounded-2xl bg-slate-50 border-slate-100 focus:bg-white transition-all"
                    value={formData.iban}
                    onChange={e => setFormData({...formData, iban: e.target.value.toUpperCase()})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bic" className="text-xs font-bold uppercase tracking-wider text-slate-400">BIC / SWIFT</Label>
                  <Input 
                    id="bic"
                    data-testid="input-bic"
                    placeholder="Ex: BNPAFRPPXXX" 
                    className="font-mono uppercase h-13 rounded-2xl bg-slate-50 border-slate-100 focus:bg-white transition-all"
                    value={formData.bic}
                    onChange={e => setFormData({...formData, bic: e.target.value.toUpperCase()})}
                  />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-xs font-bold uppercase tracking-wider text-slate-400">Montant à transférer</Label>
                  <div className="relative">
                    <Input 
                      id="amount"
                      data-testid="input-amount"
                      type="number"
                      placeholder="0.00" 
                      className="h-20 rounded-2xl text-4xl pl-6 pr-16 font-display font-bold bg-slate-50 border-slate-100 focus:bg-white transition-all"
                      value={formData.amount}
                      onChange={e => setFormData({...formData, amount: e.target.value})}
                    />
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 text-2xl font-bold text-slate-300">€</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reference" className="text-xs font-bold uppercase tracking-wider text-slate-400">Motif du virement</Label>
                  <Input 
                    id="reference"
                    data-testid="input-reference"
                    placeholder="Ex: Loyer, Facture, Remboursement..." 
                    className="h-13 rounded-2xl bg-slate-50 border-slate-100 focus:bg-white transition-all"
                    value={formData.reference}
                    onChange={e => setFormData({...formData, reference: e.target.value})}
                  />
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {error ? (
                  <motion.div 
                    initial={{ scale: 0.92, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-red-50 text-red-600 p-8 rounded-3xl flex flex-col items-center text-center space-y-4 border border-red-100"
                  >
                    <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/30 mb-1">
                      <AlertCircle className="w-10 h-10 text-white" />
                    </div>
                    <h4 className="font-display font-bold text-xl">Virement impossible</h4>
                    <p className="font-bold text-sm leading-relaxed">❌ {error}</p>
                  </motion.div>
                ) : (
                  <div className="bg-slate-50 rounded-3xl p-6 space-y-4 border border-slate-100">
                    <div className="flex flex-col items-center justify-center py-3 border-b border-slate-200">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Montant total</span>
                      <span className="font-display font-bold text-4xl text-[#009966]">{formData.amount || "0.00"} €</span>
                    </div>
                    <div className="space-y-3 text-sm">
                      {formData.beneficiary && (
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400 font-bold uppercase text-[10px]">Bénéficiaire</span>
                          <span className="font-bold text-slate-700 truncate max-w-[200px]">{formData.beneficiary}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 font-bold uppercase text-[10px]">IBAN</span>
                        <span className="font-mono font-bold text-slate-700 truncate max-w-[180px] text-xs">{formData.iban || "Non renseigné"}</span>
                      </div>
                      {formData.bic && (
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400 font-bold uppercase text-[10px]">BIC</span>
                          <span className="font-mono font-bold text-slate-700">{formData.bic}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 font-bold uppercase text-[10px]">Frais</span>
                        <span className="font-bold text-[#009966] text-[10px] uppercase">Offerts</span>
                      </div>
                      {formData.reference && (
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400 font-bold uppercase text-[10px]">Motif</span>
                          <span className="font-bold text-slate-700 truncate max-w-[200px]">{formData.reference}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <DialogFooter className="mt-8 flex gap-3 sm:flex-row flex-col">
            {step > 1 && !error && (
              <Button variant="outline" onClick={handleBack} className="rounded-2xl h-13 px-6 font-bold border-slate-200 text-slate-600 hover:bg-slate-50">
                Précédent
              </Button>
            )}
            
            {step < 3 && (
              <Button 
                onClick={handleNext} 
                data-testid="button-next"
                className="rounded-2xl h-13 px-8 flex-1 bg-[#009966] hover:bg-[#007a52] text-white shadow-xl shadow-[#009966]/20 font-bold text-base"
                disabled={step === 1 ? !formData.iban : !formData.amount}
              >
                Continuer <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            )}

            {step === 3 && !error && (
              <Button 
                onClick={handleConfirm} 
                data-testid="button-confirm-transfer"
                disabled={isProcessing}
                className="w-full rounded-2xl h-14 bg-[#009966] hover:bg-[#007a52] text-white text-lg font-bold shadow-2xl shadow-[#009966]/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {isProcessing ? (
                  <><RefreshCw className="w-5 h-5 mr-3 animate-spin" /> Validation en cours...</>
                ) : (
                  <>Envoyer le virement</>
                )}
              </Button>
            )}

            {step === 3 && error && (
              <Button 
                onClick={() => handleOpenChange(false)} 
                data-testid="button-close-error"
                variant="outline"
                className="w-full rounded-2xl h-14 font-bold text-base border-slate-200"
              >
                Fermer
              </Button>
            )}
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
