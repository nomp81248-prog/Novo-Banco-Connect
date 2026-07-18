import { useState } from "react";
import { useLogin } from "@/hooks/use-auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import background from "@assets/59dfb3fc-cf2e-4f27-a14f-815070a6fffb_1772537201421.jpeg";
import { motion } from "framer-motion";

export default function Login() {
  const [username, setUsername] = useState("Clara-jade1");
  const [password, setPassword] = useState("Moi12");
  const [remember, setRemember] = useState(true);
  
  const login = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login.mutate({ username, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-55"
        style={{ backgroundImage: `url(${background})` }}
      />
      
      {/* Green BNP overlay tint */}
      <div className="absolute inset-0 bg-[#009966]/30" />
      
      {/* Decorative blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#009966]/25 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#009966]/20 rounded-full blur-[100px]" />

      <motion.div 
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-[340px] z-10 px-4"
      >
        <div className="bg-white/12 backdrop-blur-xl border border-white/25 rounded-3xl p-8 flex flex-col items-center shadow-2xl">
          
          {/* BNP Paribas Logo (text-based) */}
          <div className="mb-6 flex flex-col items-center">
            <div className="bg-white rounded-2xl px-5 py-3 shadow-lg mb-3">
              <div className="flex items-baseline gap-0.5">
                <span className="font-display font-black text-2xl tracking-tight text-[#009966]">BNP</span>
                <span className="font-display font-black text-2xl tracking-tight text-slate-800 ml-1">Paribas</span>
              </div>
            </div>
          </div>
          
          <h2 className="font-display text-xl font-bold text-white mb-1">Bienvenue</h2>
          <p className="text-sm text-white/70 mb-7 text-center">
            Connectez-vous à votre espace BNP Paribas
          </p>

          <form onSubmit={handleSubmit} className="w-full space-y-5">
            <div className="space-y-2">
              <Label htmlFor="identifiant" className="text-xs font-semibold uppercase tracking-wider text-white/80">Identifiant</Label>
              <Input
                id="identifiant"
                data-testid="input-username"
                type="text"
                placeholder="Ex: Clara-jade1"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-11 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/20 transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-white/80">Mot de passe</Label>
                <a href="#" className="text-xs text-white/70 hover:text-white hover:underline font-medium">Mot de passe oublié</a>
              </div>
              <Input
                id="password"
                data-testid="input-password"
                type="password"
                placeholder="••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/20 transition-all"
                required
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="remember" 
                  checked={remember} 
                  onCheckedChange={setRemember}
                  className="data-[state=checked]:bg-[#009966]"
                />
                <Label htmlFor="remember" className="text-sm text-white/80 cursor-pointer select-none">Se souvenir de moi</Label>
              </div>
              <a href="#" className="text-xs text-white/70 hover:text-white hover:underline font-medium">Identifiant oublié</a>
            </div>

            <Button 
              type="submit" 
              data-testid="button-submit"
              disabled={login.isPending}
              className="w-full h-12 mt-2 rounded-xl text-base font-bold shadow-lg bg-[#009966] hover:bg-[#007a52] text-white transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              {login.isPending ? "Connexion..." : "Se connecter"}
            </Button>

            <div className="flex justify-center pt-1">
              <a href="#" className="text-xs text-white/60 hover:text-white underline font-medium transition-colors">Ouvrir un compte</a>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
