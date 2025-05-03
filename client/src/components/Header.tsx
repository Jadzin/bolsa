import { useState } from 'react';
import { Eye, EyeOff, Bell, PlaySquare, Search, MoreVertical, ChevronDown, Share2 } from 'lucide-react';
import caixaTemLogo from '../assets/caixa tem logo.png';

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
          <div className="h-8">
            <img 
              src={caixaTemLogo} 
              alt="CAIXA tem!" 
              className="h-full"
            />
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
      <div className="p-4 flex items-center">
        <div className="flex items-center flex-1">
          {/* User Profile */}
          <div className="w-14 h-14 rounded-full bg-[#4a9de7] flex items-center justify-center mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex items-center">
              <div className="font-medium text-lg">{userName}</div>
              <ChevronDown className="h-4 w-4 ml-1" />
              
              {/* Share Button - Moved next to the name */}
              <div className="bg-blue-400 bg-opacity-20 p-1.5 rounded-md ml-2">
                <Share2 className="h-4 w-4" />
              </div>
            </div>
            <div className="text-sm text-gray-100">{userId}</div>
          </div>
        </div>
      </div>

      {/* Balance Display - Centered */}
      <div className="flex justify-center pb-6">
        <div className="flex items-center">
          <span className="text-xl mr-3 font-medium">R$</span>
          <button 
            onClick={toggleBalance}
            className="bg-[#a9cced] text-[#1a478c] rounded px-5 py-1 flex items-center shadow-sm h-7"
          >
            {/* Botão vazio, sem texto */}
            <span className="w-12"></span>
          </button>
          <span className="ml-3 text-white">
            {showBalance ? (
              <EyeOff className="h-6 w-6" />
            ) : (
              <div className="eye-slash">
                <Eye className="h-6 w-6" />
              </div>
            )}
          </span>
        </div>
      </div>
    </header>
  );
}
