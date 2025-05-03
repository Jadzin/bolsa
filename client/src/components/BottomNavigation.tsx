import { Home, Banknote, Bell, Settings } from 'lucide-react';

export function BottomNavigation() {
  return (
    <nav className="border-t border-gray-200 bg-white flex justify-between py-2 px-8">
      <button className="flex flex-col items-center justify-center space-y-1 flex-1">
        <Home className="h-5 w-5 text-[hsl(var(--caixa-blue))]" />
        <span className="text-xs text-[hsl(var(--caixa-blue))]">Serviços</span>
      </button>
      
      <button className="flex flex-col items-center justify-center space-y-1 flex-1">
        <div className="text-center text-gray-500 font-medium">R$</div>
        <span className="text-xs text-gray-500">Pagar</span>
      </button>
      
      <button className="flex flex-col items-center justify-center space-y-1 flex-1 relative">
        <Bell className="h-5 w-5 text-gray-500" />
        <div className="absolute top-0 right-5 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-white text-[9px]">1</span>
        </div>
        <span className="text-xs text-gray-500">Notificações</span>
      </button>
      
      <button className="flex flex-col items-center justify-center space-y-1 flex-1">
        <Settings className="h-5 w-5 text-gray-500" />
        <span className="text-xs text-gray-500">Ajustes</span>
      </button>
    </nav>
  );
}
