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
import { ArrowRight, AlertCircle, CheckCircle2, RefreshCw, ShieldCheck } from "lucide-react";
import { useAppStore } from "@/store/use-app-store";
import { motion, AnimatePresence } from "framer-motion";
import background from "@assets/59dfb3fc-cf2e-4f27-a14f-815070a6fffb_1772537201421.jpeg";

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
    iban: "",
    bic: "",
    amount: "",
    reference: ""
  });

  // Reset state when opened
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setTimeout(() => {
        setStep(1);
        setError(null);
        setFormData({ iban: "", bic: "", amount: "", reference: "" });
      }, 300);
    }
    onOpenChange(newOpen);
  };

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleConfirm = () => {
    setIsProcessing(true);
    // Simulate network request
    setTimeout(() => {
      setIsProcessing(false);
      setError("Le virement ne sera pas effectué car le compte est bloqué.");
      triggerNotification();
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md rounded-3xl overflow-hidden p-0 border-0 shadow-2xl bg-white relative">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-5 pointer-events-none"
          style={{ backgroundImage: `url(${background})` }}
        />
        
        <div className="h-2 bg-slate-100 w-full relative z-10">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
        
        <div className="p-8 relative z-10">
          <DialogHeader className="mb-8 text-left">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <DialogTitle className="font-display text-2xl font-bold text-slate-900">
                  {step === 1 && "Bénéficiaire"}
                  {step === 2 && "Détails du virement"}
                  {step === 3 && "Confirmation"}
                </DialogTitle>
                <DialogDescription className="text-slate-500 font-medium">
                  Étape {step} sur 3 • Transfert sécurisé
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
                  <Label htmlFor="iban" className="text-xs font-bold uppercase tracking-wider text-slate-400">IBAN du bénéficiaire</Label>
                  <Input 
                    id="iban" 
                    placeholder="FR76 ...." 
                    className="font-mono uppercase h-14 rounded-2xl bg-slate-50 border-slate-100 focus:bg-white transition-all text-lg"
                    value={formData.iban}
                    onChange={e => setFormData({...formData, iban: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bic" className="text-xs font-bold uppercase tracking-wider text-slate-400">BIC / SWIFT</Label>
                  <Input 
                    id="bic" 
                    placeholder="Saisissez le code BIC" 
                    className="font-mono uppercase h-14 rounded-2xl bg-slate-50 border-slate-100 focus:bg-white transition-all"
                    value={formData.bic}
                    onChange={e => setFormData({...formData, bic: e.target.value})}
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
                    placeholder="Ex: Loyer, Facture, Cadeau..." 
                    className="h-14 rounded-2xl bg-slate-50 border-slate-100 focus:bg-white transition-all"
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
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-red-50 text-red-600 p-8 rounded-3xl flex flex-col items-center text-center space-y-4 border border-red-100 shadow-xl shadow-red-500/5"
                  >
                    <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/30 mb-2">
                      <AlertCircle className="w-10 h-10 text-white" />
                    </div>
                    <h4 className="font-display font-bold text-2xl">Virement impossible</h4>
                    <p className="font-bold text-sm leading-relaxed">❌ {error}</p>
                  </motion.div>
                ) : (
                  <div className="bg-slate-50 rounded-3xl p-6 space-y-5 border border-slate-100 shadow-inner">
                    <div className="flex flex-col items-center justify-center py-4 border-b border-slate-200">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Montant total</span>
                      <span className="font-display font-bold text-4xl text-primary">{formData.amount || "0.00"} €</span>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 font-bold uppercase text-[10px]">Bénéficiaire</span>
                        <span className="font-mono font-bold text-slate-700 truncate max-w-[200px]">{formData.iban || "Non renseigné"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 font-bold uppercase text-[10px]">Frais de service</span>
                        <span className="font-bold text-green-500 uppercase text-[10px]">Offert</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 font-bold uppercase text-[10px]">Motif</span>
                        <span className="font-bold text-slate-700 truncate max-w-[200px]">{formData.reference || "-"}</span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <DialogFooter className="mt-10 flex gap-4 sm:flex-row flex-col">
            {step > 1 && !error && (
              <Button variant="outline" onClick={handleBack} className="rounded-2xl h-14 px-8 font-bold border-slate-200 text-slate-600 hover:bg-slate-50">
                Précédent
              </Button>
            )}
            
            {step < 3 && (
              <Button 
                onClick={handleNext} 
                className="rounded-2xl h-14 px-10 flex-1 bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 font-bold text-lg"
                disabled={step === 1 ? !formData.iban : !formData.amount}
              >
                Continuer <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            )}

            {step === 3 && !error && (
              <Button 
                onClick={handleConfirm} 
                disabled={isProcessing}
                className="w-full rounded-2xl h-16 bg-primary hover:bg-primary/90 text-white text-xl font-bold shadow-2xl shadow-primary/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {isProcessing ? (
                  <><RefreshCw className="w-6 h-6 mr-3 animate-spin" /> Validation...</>
                ) : (
                  <><CheckCircle2 className="w-6 h-6 mr-3" /> Confirmer l'envoi</>
                )}
              </Button>
            )}

            {step === 3 && error && (
              <Button 
                onClick={() => handleOpenChange(false)} 
                variant="outline"
                className="w-full rounded-2xl h-16 font-bold text-lg border-slate-200"
              >
                Terminer
              </Button>
            )}
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
