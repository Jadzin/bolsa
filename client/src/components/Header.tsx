import { useState } from 'react';
import { Eye, EyeOff, Bell, PlaySquare, Search, MoreVertical, ChevronDown, Share2 } from 'lucide-react';

interface HeaderProps {
  userName: string;
  userId: string;
}

export function Header({ userName, userId }: HeaderProps) {
  const [showBalance, setShowBalance] = useState(false);

  const toggleBalance = () => {
    setShowBalance(!showBalance);
  };

  return (
    <header className="header-gradient text-white">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between p-4">
        <div>
          {/* CAIXA tem! logo */}
          <div className="text-xl font-bold">
            <span className="text-white">CAIXA</span>
            <span className="text-[hsl(var(--caixa-green))]">tem!</span>
          </div>
        </div>
        
        {/* Right Icons */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-400 rounded-full"></span>
          </div>
          <PlaySquare className="h-5 w-5" />
          <Search className="h-5 w-5" />
          <MoreVertical className="h-5 w-5" />
        </div>
      </div>
      
      {/* Divider Line */}
      <div className="h-[1px] bg-blue-400 opacity-40"></div>
      
      {/* User Profile Section */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center">
          {/* User Profile */}
          <div className="w-14 h-14 rounded-full overflow-hidden mr-3">
            <img 
              src="https://randomuser.me/api/portraits/women/44.jpg" 
              alt="User" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center">
              <div className="font-medium text-lg">{userName}</div>
              <ChevronDown className="h-4 w-4 ml-1" />
            </div>
            <div className="text-sm text-gray-100">{userId}</div>
          </div>
        </div>
        
        {/* Share Button */}
        <div className="bg-blue-400 bg-opacity-20 p-2 rounded-md">
          <Share2 className="h-5 w-5" />
        </div>
      </div>

      {/* Balance Display - Centered */}
      <div className="flex justify-center pb-6">
        <div className="flex items-center">
          <span className="text-base mr-2 font-medium">R$</span>
          <button 
            onClick={toggleBalance}
            className="bg-[#a9cced] text-[#1a478c] text-sm rounded px-5 py-1.5 flex items-center shadow-sm"
          >
            {showBalance ? 'Ocultar saldo' : 'Mostrar saldo'}
          </button>
          <span className="ml-3 text-white">
            {showBalance ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <div className="eye-slash">
                <Eye className="h-5 w-5" />
              </div>
            )}
          </span>
        </div>
      </div>
    </header>
  );
}
