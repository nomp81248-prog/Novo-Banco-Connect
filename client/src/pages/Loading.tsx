import { useEffect } from "react";
import { useLocation } from "wouter";
import logo from "@assets/IMG_8962_1772536532286.webp";
import { motion } from "framer-motion";

export default function Loading() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Simulate loading for 2 seconds before redirecting to dashboard
    const timer = setTimeout(() => {
      setLocation("/dashboard");
    }, 2000);

    return () => clearTimeout(timer);
  }, [setLocation]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.5, 1, 0.5] 
        }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
        className="w-32 h-32 bg-white rounded-3xl shadow-xl p-4 flex items-center justify-center mb-8"
      >
        <img src={logo} alt="Loading" className="w-full h-full object-contain" />
      </motion.div>
      
      <div className="flex flex-col items-center space-y-4">
        <div className="flex space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut"
              }}
              className="w-3 h-3 bg-primary rounded-full"
            />
          ))}
        </div>
        <h2 className="font-display text-xl font-medium text-foreground tracking-wide">
          Chargement de votre compte...
        </h2>
      </div>
    </div>
  );
}
