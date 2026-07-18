import { useState } from "react";
import { useLogin } from "@/hooks/use-auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import background from "@assets/59dfb3fc-cf2e-4f27-a14f-815070a6fffb_1772537201421.jpeg";
import bnpLogo from "@assets/IMG_9270_1784381157800.png";
import { motion } from "framer-motion";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  
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
      <div className="absolute inset-0 bg-[#009966]/25" />
      <div className="absolute top-[-10%] left-[-10%] w-[35%] h-[35%] bg-[#009966]/30 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[35%] h-[35%] bg-[#009966]/20 rounded-full blur-[100px]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="w-full max-w-[300px] z-10 px-3"
      >
        {/* Tiny, transparent card */}
        <div className="bg-white/8 backdrop-blur-lg border border-white/15 rounded-2xl p-6 flex flex-col items-center shadow-2xl">
          
          {/* BNP Paribas Real Logo */}
          <div className="mb-5 flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-xl overflow-hidden shadow-lg">
              <img src={bnpLogo} alt="BNP Paribas" className="w-full h-full object-cover" />
            </div>
            <div className="flex items-baseline gap-0.5">
              <span className="font-display font-black text-lg text-white">BNP</span>
              <span className="font-display font-black text-lg text-white/90 ml-0.5">Paribas</span>
            </div>
          </div>
          
          <h2 className="font-display text-base font-bold text-white mb-1">Bienvenue</h2>
          <p className="text-xs text-white/65 mb-6 text-center leading-relaxed">
            Connectez-vous à votre espace personnel
          </p>

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="identifiant" className="text-[10px] font-bold uppercase tracking-wider text-white/70">Identifiant</Label>
              <Input
                id="identifiant"
                data-testid="input-username"
                type="text"
                placeholder="Ex: Clara-jade01"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                className="h-10 rounded-xl bg-white/10 border-white/15 text-white placeholder:text-white/35 focus:bg-white/15 text-sm transition-all"
                required
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-[10px] font-bold uppercase tracking-wider text-white/70">Mot de passe</Label>
                <a href="#" className="text-[10px] text-white/60 hover:text-white hover:underline font-medium">Oublié ?</a>
              </div>
              <Input
                id="password"
                data-testid="input-password"
                type="password"
                placeholder="Saisissez votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="h-10 rounded-xl bg-white/10 border-white/15 text-white placeholder:text-white/35 focus:bg-white/15 text-sm transition-all"
                required
              />
            </div>

            <div className="flex items-center justify-between pt-0.5">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="remember" 
                  checked={remember} 
                  onCheckedChange={setRemember}
                  className="data-[state=checked]:bg-[#009966] scale-90"
                />
                <Label htmlFor="remember" className="text-xs text-white/70 cursor-pointer select-none">Se souvenir</Label>
              </div>
              <a href="#" className="text-[10px] text-white/60 hover:text-white hover:underline font-medium">ID oublié ?</a>
            </div>

            <Button 
              type="submit" 
              data-testid="button-submit"
              disabled={login.isPending}
              className="w-full h-10 rounded-xl text-sm font-bold bg-[#009966] hover:bg-[#007a52] text-white transition-all hover:-translate-y-0.5 hover:shadow-lg shadow-[#009966]/30"
            >
              {login.isPending ? "Connexion..." : "Se connecter"}
            </Button>

            <div className="flex justify-center">
              <a href="#" className="text-[10px] text-white/55 hover:text-white underline font-medium transition-colors">Ouvrir un compte</a>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
