import { Bell } from "lucide-react";
import { useAppStore } from "@/store/use-app-store";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import logo from "@assets/IMG_8962_1772536532286.webp";

export function TopBar() {
  const { hasNotification, clearNotification } = useAppStore();

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-primary/10 flex items-center justify-center p-1">
            <img src={logo} alt="NOVO BANCO" className="w-full h-full object-contain" />
          </div>
          <h1 className="font-display font-bold text-xl text-primary tracking-tight hidden sm:block">
            NOVO BANCO
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <Popover onOpenChange={(open) => { if (open) clearNotification(); }}>
            <PopoverTrigger asChild>
              <button className="relative p-2 rounded-full hover:bg-secondary transition-colors group">
                <Bell className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
                {hasNotification && (
                  <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-destructive rounded-full border-2 border-white animate-pulse" />
                )}
              </button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 rounded-2xl shadow-xl">
              <div className="space-y-3">
                <h3 className="font-semibold font-display text-lg">Notifications</h3>
                {hasNotification ? (
                  <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-xl flex gap-3 items-start">
                    <span className="text-xl">❌</span>
                    <div>
                      <p className="text-sm font-medium text-destructive">Virement refusé</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Le virement n'a pas pu être effectué car votre compte est bloqué.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="py-6 text-center text-muted-foreground text-sm">
                    Aucune nouvelle notification
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}
