import { useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";

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
      {/* BNP Paribas Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <div className="bg-white rounded-3xl px-10 py-6 shadow-xl border border-slate-100 flex flex-col items-center">
          <div className="flex items-baseline gap-0.5 mb-1">
            <span className="font-display font-black text-4xl tracking-tight text-[#009966]">BNP</span>
            <span className="font-display font-black text-4xl tracking-tight text-slate-800 ml-1.5">Paribas</span>
          </div>
          <div className="h-1 w-16 bg-[#009966] rounded-full mt-1" />
        </div>
      </motion.div>
      
      <div className="flex flex-col items-center space-y-5">
        <div className="flex space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 0.7,
                repeat: Infinity,
                delay: i * 0.18,
                ease: "easeInOut"
              }}
              className="w-3 h-3 bg-[#009966] rounded-full"
            />
          ))}
        </div>
        <h2 className="font-display text-lg font-semibold text-slate-600 tracking-wide">
          Chargement de votre compte…
        </h2>
      </div>
    </div>
  );
}
