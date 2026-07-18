import { useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import bnpLogo from "@assets/IMG_9270_1784381157800.png";

export default function Loading() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLocation("/dashboard");
    }, 2500);
    return () => clearTimeout(timer);
  }, [setLocation]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-10 flex flex-col items-center gap-4"
      >
        <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-2xl shadow-[#009966]/30">
          <img src={bnpLogo} alt="BNP Paribas" className="w-full h-full object-cover" />
        </div>
        <div className="flex items-baseline gap-1">
          <span className="font-display font-black text-3xl text-[#009966]">BNP</span>
          <span className="font-display font-black text-3xl text-slate-800 ml-1">Paribas</span>
        </div>
      </motion.div>
      
      <div className="flex flex-col items-center space-y-5">
        <div className="flex space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
              className="w-3 h-3 bg-[#009966] rounded-full"
            />
          ))}
        </div>
        <p className="font-display text-lg font-semibold text-slate-500 tracking-wide">
          Chargement de votre compte…
        </p>
      </div>
    </div>
  );
}
