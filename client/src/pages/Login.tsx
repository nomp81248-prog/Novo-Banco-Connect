import { useState } from "react";
import { useLogin } from "@/hooks/use-auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import background from "@assets/59dfb3fc-cf2e-4f27-a14f-815070a6fffb_1772537201421.jpeg";
import bnpLogo from "@assets/IMG_9270_1784381157800.png";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const login = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login.mutate({ username: username.trim(), password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* Background */}
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
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-[300px] z-10 px-3"
      >
        <div className="bg-white/8 backdrop-blur-lg border border-white/15 rounded-2xl p-6 flex flex-col items-center shadow-2xl">

          {/* Logo */}
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
            {/* Identifiant */}
            <div className="space-y-1.5">
              <Label htmlFor="identifiant" className="text-[10px] font-bold uppercase tracking-wider text-white/70">
                Identifiant
              </Label>
              <Input
                id="identifiant"
                data-testid="input-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                className="h-10 rounded-xl bg-white/10 border-white/15 text-white placeholder:text-white/0 focus:bg-white/15 text-sm transition-all"
                required
              />
            </div>

            {/* Mot de passe */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-[10px] font-bold uppercase tracking-wider text-white/70">
                  Mot de passe
                </Label>
                <a href="#" className="text-[10px] text-white/60 hover:text-white hover:underline font-medium">Oublié ?</a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  data-testid="input-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="h-10 rounded-xl bg-white/10 border-white/15 text-white placeholder:text-white/0 focus:bg-white/15 text-sm transition-all pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Se souvenir */}
            <div className="flex items-center justify-between pt-0.5">
              <div className="flex items-center space-x-2">
                <Switch
                  id="remember"
                  checked={remember}
                  onCheckedChange={setRemember}
                  className="data-[state=checked]:bg-[#009966] scale-90"
                />
                <Label htmlFor="remember" className="text-xs text-white/70 cursor-pointer select-none">
                  Se souvenir
                </Label>
              </div>
              <a href="#" className="text-[10px] text-white/60 hover:text-white hover:underline font-medium">
                ID oublié ?
              </a>
            </div>

            {/* Erreur */}
            {login.isError && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/20 border border-red-400/40 rounded-xl px-3 py-2 text-red-200 text-xs font-medium text-center"
              >
                Identifiant ou mot de passe incorrect
              </motion.div>
            )}

            {/* Bouton */}
            <Button
              type="submit"
              data-testid="button-submit"
              disabled={login.isPending || !username || !password}
              className="w-full h-10 rounded-xl text-sm font-bold bg-[#009966] hover:bg-[#007a52] text-white transition-all hover:-translate-y-0.5 hover:shadow-lg shadow-[#009966]/30 disabled:opacity-50"
            >
              {login.isPending ? "Connexion en cours…" : "Se connecter"}
            </Button>

            <div className="flex justify-center">
              <a href="#" className="text-[10px] text-white/55 hover:text-white underline font-medium transition-colors">
                Ouvrir un compte
              </a>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
