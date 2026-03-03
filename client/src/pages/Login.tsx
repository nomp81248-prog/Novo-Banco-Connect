import { useState } from "react";
import { useLogin } from "@/hooks/use-auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import logo from "@assets/IMG_8962_1772536532286.webp";
import background from "@assets/59dfb3fc-cf2e-4f27-a14f-815070a6fffb_1772537201421.jpeg";
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
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: `url(${background})` }}
      />
      
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[100px]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-[320px] z-10 px-4"
      >
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 flex flex-col items-center shadow-2xl">
          <div className="w-20 h-20 bg-white rounded-2xl shadow-md p-2 mb-6 flex items-center justify-center">
            <img src={logo} alt="NOVO BANCO Logo" className="w-full h-full object-contain" />
          </div>
          
          <h2 className="font-display text-2xl font-bold text-white mb-1">Bienvenue</h2>
          <p className="text-sm text-white/70 mb-8 text-center">
            Connectez-vous à votre espace NOVO BANCO
          </p>

          <form onSubmit={handleSubmit} className="w-full space-y-5">
            <div className="space-y-2">
              <Label htmlFor="identifiant" className="text-xs font-semibold uppercase tracking-wider text-white/80">Identifiant</Label>
              <Input
                id="identifiant"
                type="text"
                placeholder="Ex: Manoel11"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-11 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/20 focus:ring-primary/30 transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-white/80">Mot de passe</Label>
                <a href="#" className="text-xs text-primary-foreground/80 hover:underline font-medium">Oublié ?</a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/20 focus:ring-primary/30 transition-all"
                required
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="remember" 
                  checked={remember} 
                  onCheckedChange={setRemember}
                  className="data-[state=checked]:bg-primary"
                />
                <Label htmlFor="remember" className="text-sm text-white/80 cursor-pointer select-none">Se souvenir de moi</Label>
              </div>
              <a href="#" className="text-xs text-primary-foreground/80 hover:underline font-medium">ID oublié ?</a>
            </div>

            <Button 
              type="submit" 
              disabled={login.isPending}
              className="w-full h-12 mt-4 rounded-xl text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all bg-primary text-white"
            >
              {login.isPending ? "Connexion..." : "Se connecter"}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
