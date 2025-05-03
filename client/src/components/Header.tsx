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
    <header className="header-gradient text-white p-4 pb-6">
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
          <div className="w-10 h-10 rounded-full bg-[hsl(var(--caixa-blue-light))] flex items-center justify-center mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div>
            <div className="font-medium">{userName}</div>
            <div className="text-xs text-gray-100">{userId}</div>
          </div>
        </div>
      </div>

      {/* Balance Display - Centered */}
      <div className="flex justify-center mt-3">
        <div className="flex items-center">
          <span className="text-sm mr-2">R$</span>
          <button 
            onClick={toggleBalance}
            className="bg-[#c2d8e9] text-[#1a478c] text-xs rounded px-4 py-1 flex items-center shadow-sm"
          >
            {showBalance ? 'Ocultar saldo' : 'Mostrar saldo'}
          </button>
          <span className="ml-2 text-white">
            {showBalance ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <div className="eye-slash">
                <Eye className="h-4 w-4" />
              </div>
            )}
          </span>
        </div>
      </div>
    </header>
  );
}
