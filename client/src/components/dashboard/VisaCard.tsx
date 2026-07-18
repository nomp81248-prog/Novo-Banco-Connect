import { motion } from "framer-motion";

interface VisaCardProps {
  accountNumber: string;
  accountName: string;
}

export function VisaCard({ accountNumber, accountName }: VisaCardProps) {
  // Format: 2345 6780 0000 0000
  const formattedNumber = accountNumber.replace(/\D/g, '').match(/.{1,4}/g)?.join(' ') || accountNumber;
  // Mask middle digits
  const maskedNumber = formattedNumber.replace(/(\d{4}) (\d{4}) (\d{4}) (\d{4})/, '$1 **** **** $4');

  return (
    <motion.div 
      whileHover={{ scale: 1.02, rotateY: 4, rotateX: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="w-full aspect-[1.58/1] rounded-2xl p-6 flex flex-col justify-between shadow-2xl shadow-[#009966]/20 text-white relative overflow-hidden border border-white/10"
      style={{
        background: "linear-gradient(135deg, #005C3B 0%, #007a52 45%, #009966 100%)"
      }}
    >
      {/* Decorative circles */}
      <div className="absolute top-[-20%] right-[-10%] w-56 h-56 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-40 h-40 bg-black/10 rounded-full blur-xl pointer-events-none" />
      <div className="absolute inset-0 opacity-5" style={{backgroundImage: "repeating-linear-gradient(60deg, transparent, transparent 30px, rgba(255,255,255,0.3) 30px, rgba(255,255,255,0.3) 31px)"}} />

      {/* Top row: chip + BNP logo */}
      <div className="flex justify-between items-start z-10">
        <div className="flex items-center gap-3">
          {/* Chip */}
          <div className="w-10 h-7 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-md flex items-center justify-center border border-yellow-200/60 shadow-inner">
            <div className="w-7 h-5 border border-black/15 rounded flex flex-wrap gap-[1px] p-[2px]">
              <div className="w-[45%] h-[45%] border-r border-b border-black/10"></div>
              <div className="w-[45%] h-[45%] border-b border-black/10"></div>
              <div className="w-[45%] h-[45%] border-r border-black/10"></div>
              <div className="w-[45%] h-[45%]"></div>
            </div>
          </div>
        </div>

        {/* BNP Paribas logo on card */}
        <div className="flex flex-col items-end">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2.5 py-1 border border-white/30">
            <div className="flex items-baseline gap-0.5">
              <span className="font-display font-black text-sm text-white leading-none">BNP</span>
              <span className="font-display font-bold text-[10px] text-white/90 ml-0.5 leading-none">Paribas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom row: number + name + visa */}
      <div className="z-10 space-y-3 mt-auto">
        <div className="font-mono text-xl sm:text-2xl tracking-[0.18em] drop-shadow-lg text-white font-medium">
          {maskedNumber}
        </div>
        
        <div className="flex justify-between items-end">
          <div>
            <span className="block text-[9px] font-bold uppercase tracking-[0.15em] text-white/60 mb-0.5">Titulaire</span>
            <span className="uppercase tracking-[0.12em] text-xs font-black text-white/95">
              {accountName}
            </span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="flex flex-col items-end">
              <span className="text-[6px] font-black uppercase tracking-widest opacity-60">VALID THRU</span>
              <span className="font-mono text-sm font-bold">12 / 28</span>
            </div>
            {/* Visa logo */}
            <div className="text-lg font-black italic tracking-tighter text-white flex items-center gap-0.5">
              <span>VISA</span>
              <div className="w-7 h-4 rounded-full flex items-center justify-center ml-1">
                <div className="w-2.5 h-2.5 rounded-full bg-[#f79e1b] -mr-1" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#eb001b] -ml-1 opacity-80" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
