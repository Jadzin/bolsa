import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

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
    <header className="header-gradient text-white p-4 pb-10">
      <div className="flex items-center mb-4">
        <div className="flex-1">
          {/* CAIXA tem! logo */}
          <div className="text-xl font-bold">
            <span className="text-white">CAIXA</span>
            <span className="text-[hsl(var(--caixa-green))]">tem!</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center">
        {/* User Profile */}
        <div className="flex items-center flex-1">
          <div className="w-12 h-12 rounded-full bg-[#4a9de7] flex items-center justify-center mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div>
            <div className="font-medium text-lg">{userName}</div>
            <div className="text-sm text-gray-100">{userId}</div>
          </div>
        </div>
      </div>

      {/* Balance Display - Centered */}
      <div className="flex justify-center mt-6">
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
