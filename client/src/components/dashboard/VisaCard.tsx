import { motion } from "framer-motion";

interface VisaCardProps {
  accountNumber: string;
  accountName: string;
}

export function VisaCard({ accountNumber, accountName }: VisaCardProps) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02, rotateY: 5, rotateX: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="visa-card-bg w-full aspect-[1.58/1] rounded-2xl p-6 flex flex-col justify-between shadow-xl shadow-primary/20 text-white relative group"
    >
      <div className="flex justify-between items-start z-10">
        <div className="w-12 h-9 bg-yellow-400/80 rounded-md flex items-center justify-center border border-yellow-300/50 shadow-inner">
          {/* Mock EMV Chip */}
          <div className="w-8 h-6 border border-yellow-600/30 rounded flex flex-wrap gap-[1px] p-[2px]">
            <div className="w-[45%] h-[45%] border-r border-b border-yellow-600/30"></div>
            <div className="w-[45%] h-[45%] border-b border-yellow-600/30"></div>
            <div className="w-[45%] h-[45%] border-r border-yellow-600/30"></div>
            <div className="w-[45%] h-[45%]"></div>
          </div>
        </div>
        <div className="text-xl font-bold italic tracking-widest opacity-90">VISA</div>
      </div>

      <div className="z-10 space-y-4">
        <div className="font-mono text-2xl sm:text-3xl tracking-widest drop-shadow-md">
          {accountNumber.match(/.{1,4}/g)?.join(' ') || accountNumber}
        </div>
        
        <div className="flex justify-between items-end">
          <div className="uppercase tracking-wider text-sm font-medium text-white/90">
            {accountName}
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[8px] uppercase opacity-75">Valid Thru</span>
            <span className="font-mono text-sm">12/28</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
