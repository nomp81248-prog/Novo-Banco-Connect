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
import { ArrowRight, AlertCircle, CheckCircle2, RefreshCw } from "lucide-react";
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
      <DialogContent className="sm:max-w-md rounded-2xl overflow-hidden p-0 border-0 shadow-2xl">
        <div className="h-2 bg-secondary w-full">
          <div 
            className="h-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
        
        <div className="p-6">
          <DialogHeader className="mb-6 text-left">
            <DialogTitle className="font-display text-2xl text-foreground">
              {step === 1 && "Bénéficiaire"}
              {step === 2 && "Détails du virement"}
              {step === 3 && "Confirmation"}
            </DialogTitle>
            <DialogDescription>
              {step === 1 && "Saisissez les coordonnées du bénéficiaire."}
              {step === 2 && "Indiquez le montant et la référence."}
              {step === 3 && "Vérifiez les informations avant de valider."}
            </DialogDescription>
          </DialogHeader>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="iban">IBAN</Label>
                  <Input 
                    id="iban" 
                    placeholder="FR76 ...." 
                    className="font-mono uppercase h-12 rounded-xl"
                    value={formData.iban}
                    onChange={e => setFormData({...formData, iban: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bic">BIC / SWIFT</Label>
                  <Input 
                    id="bic" 
                    placeholder="BIC code" 
                    className="font-mono uppercase h-12 rounded-xl"
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
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="amount">Montant (€)</Label>
                  <div className="relative">
                    <Input 
                      id="amount" 
                      type="number"
                      placeholder="0.00" 
                      className="h-14 rounded-xl text-2xl pl-4 pr-12 font-semibold"
                      value={formData.amount}
                      onChange={e => setFormData({...formData, amount: e.target.value})}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-muted-foreground">€</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reference">Motif (optionnel)</Label>
                  <Input 
                    id="reference" 
                    placeholder="Ex: Loyer, Remboursement..." 
                    className="h-12 rounded-xl"
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
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-destructive/10 text-destructive p-6 rounded-2xl flex flex-col items-center text-center space-y-3 border border-destructive/20"
                  >
                    <div className="w-16 h-16 bg-destructive rounded-full flex items-center justify-center shadow-lg shadow-destructive/30 mb-2">
                      <AlertCircle className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-display font-bold text-xl">Échec du virement</h4>
                    <p className="font-medium text-sm">❌ {error}</p>
                  </motion.div>
                ) : (
                  <div className="bg-secondary/50 rounded-2xl p-4 space-y-4 border border-border">
                    <div className="flex justify-between items-center pb-4 border-b border-border/60">
                      <span className="text-muted-foreground">Montant</span>
                      <span className="font-bold text-2xl text-primary">{formData.amount || "0.00"} €</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Vers (IBAN)</span>
                        <span className="font-mono font-medium truncate max-w-[150px]">{formData.iban || "Non renseigné"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Frais</span>
                        <span className="font-medium">0.00 €</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Motif</span>
                        <span className="font-medium truncate max-w-[150px]">{formData.reference || "-"}</span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <DialogFooter className="mt-8 flex gap-3 sm:justify-between">
            {step > 1 && !error && (
              <Button variant="outline" onClick={handleBack} className="rounded-xl h-12 px-6">
                Retour
              </Button>
            )}
            
            {step < 3 && (
              <Button 
                onClick={handleNext} 
                className="rounded-xl h-12 px-8 ml-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl transition-all"
                disabled={step === 1 ? !formData.iban : !formData.amount}
              >
                Suivant <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}

            {step === 3 && !error && (
              <Button 
                onClick={handleConfirm} 
                disabled={isProcessing}
                className="w-full rounded-xl h-14 bg-primary hover:bg-primary/90 text-primary-foreground text-lg shadow-lg shadow-primary/20 hover:shadow-xl transition-all"
              >
                {isProcessing ? (
                  <><RefreshCw className="w-5 h-5 mr-2 animate-spin" /> Traitement...</>
                ) : (
                  <><CheckCircle2 className="w-5 h-5 mr-2" /> Confirmer le virement</>
                )}
              </Button>
            )}

            {step === 3 && error && (
              <Button 
                onClick={() => handleOpenChange(false)} 
                variant="outline"
                className="w-full rounded-xl h-14"
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
