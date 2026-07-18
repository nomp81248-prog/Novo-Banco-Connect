import { motion } from "framer-motion";
import bnpLogo from "@assets/IMG_9270_1784381157800.png";

interface VisaCardProps {
  accountNumber: string;
  accountName: string;
}

export function VisaCard({ accountNumber, accountName }: VisaCardProps) {
  const digits = accountNumber.replace(/\D/g, '');
  // Show: 2345 **** **** 0000
  const masked = `${digits.slice(0,4)} **** **** ${digits.slice(12,16)}`;

  return (
    <motion.div 
      whileHover={{ scale: 1.02, rotateY: 4, rotateX: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="w-full aspect-[1.58/1] rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-2xl shadow-[#009966]/25 text-white relative overflow-hidden border border-white/10"
      style={{ background: "linear-gradient(135deg, #003d2b 0%, #005C3B 50%, #009966 100%)" }}
    >
      {/* Decorative layers */}
      <div className="absolute top-[-25%] right-[-10%] w-60 h-60 bg-white/8 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-44 h-44 bg-black/12 rounded-full blur-xl pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "repeating-linear-gradient(60deg, white, white 1px, transparent 1px, transparent 30px)"
      }} />

      {/* Top row */}
      <div className="flex justify-between items-start z-10">
        {/* Chip */}
        <div className="w-10 h-7 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-md flex items-center justify-center border border-yellow-200/50 shadow-inner">
          <div className="w-7 h-5 border border-black/15 rounded flex flex-wrap gap-[1px] p-[2px]">
            <div className="w-[45%] h-[45%] border-r border-b border-black/10" />
            <div className="w-[45%] h-[45%] border-b border-black/10" />
            <div className="w-[45%] h-[45%] border-r border-black/10" />
            <div className="w-[45%] h-[45%]" />
          </div>
        </div>

        {/* BNP Paribas real logo on card */}
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-lg px-2 py-1 border border-white/25">
            <div className="w-5 h-5 rounded overflow-hidden">
              <img src={bnpLogo} alt="BNP" className="w-full h-full object-cover" />
            </div>
            <div className="flex items-baseline gap-0">
              <span className="font-display font-black text-xs text-white leading-none">BNP</span>
              <span className="font-display font-bold text-[9px] text-white/85 ml-0.5 leading-none">Paribas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="z-10 space-y-3 mt-auto">
        <div className="font-mono text-xl sm:text-2xl tracking-[0.18em] drop-shadow text-white font-medium">
          {masked}
        </div>
        <div className="flex justify-between items-end">
          <div>
            <span className="block text-[9px] font-bold uppercase tracking-[0.15em] text-white/55 mb-0.5">Titulaire</span>
            <span className="uppercase tracking-[0.1em] text-xs font-black text-white/95">{accountName}</span>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <div className="text-right">
              <span className="block text-[6px] font-black uppercase tracking-widest opacity-55">VALID THRU</span>
              <span className="font-mono text-sm font-bold">12 / 28</span>
            </div>
            {/* Visa circles */}
            <div className="flex items-center">
              <span className="text-base font-black italic tracking-tighter text-white mr-1">VISA</span>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#eb001b] opacity-90" />
                <div className="w-3 h-3 rounded-full bg-[#f79e1b] -ml-1.5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
