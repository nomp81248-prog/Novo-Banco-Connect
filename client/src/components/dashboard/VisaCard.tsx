import { motion } from "framer-motion";
import logo from "@assets/IMG_8962_1772536532286.webp";

interface VisaCardProps {
  accountNumber: string;
  accountName: string;
}

export function VisaCard({ accountNumber, accountName }: VisaCardProps) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02, rotateY: 5, rotateX: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-gradient-to-br from-[#009b9b] to-[#006666] w-full aspect-[1.58/1] rounded-2xl p-6 flex flex-col justify-between shadow-2xl shadow-primary/20 text-white relative group overflow-hidden border border-white/10"
    >
      {/* Decorative patterns */}
      <div className="absolute top-[-20%] right-[-10%] w-60 h-60 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-40 h-40 bg-black/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex justify-between items-start z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-7 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-md flex items-center justify-center border border-yellow-200/50 shadow-inner">
            <div className="w-7 h-5 border border-black/10 rounded flex flex-wrap gap-[1px] p-[2px]">
              <div className="w-[45%] h-[45%] border-r border-b border-black/10"></div>
              <div className="w-[45%] h-[45%] border-b border-black/10"></div>
              <div className="w-[45%] h-[45%] border-r border-black/10"></div>
              <div className="w-[45%] h-[45%]"></div>
            </div>
          </div>
          <div className="w-10 h-10 bg-white rounded-lg p-1 shadow-md">
            <img src={logo} alt="Logo" className="w-full h-full object-contain" />
          </div>
        </div>
        <div className="text-xl font-black italic tracking-tighter opacity-100 flex items-center gap-1">
          <span className="text-white">VISA</span>
          <div className="w-8 h-5 rounded-full bg-white/20 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-[#f79e1b] -mr-1" />
            <div className="w-3 h-3 rounded-full bg-[#eb001b] -ml-1 opacity-80" />
          </div>
        </div>
      </div>

      <div className="z-10 space-y-4 mt-auto">
        <div className="font-mono text-2xl sm:text-3xl tracking-[0.2em] drop-shadow-lg text-white font-medium">
          {accountNumber.match(/.{1,4}/g)?.join(' ') || accountNumber}
        </div>
        
        <div className="flex justify-between items-end">
          <div className="uppercase tracking-[0.15em] text-xs font-black text-white/90">
            {accountName}
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[6px] font-black uppercase tracking-widest opacity-70">VALID THRU</span>
            <span className="font-mono text-sm font-bold">12 / 28</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
