import { Check } from 'lucide-react';
import { useLocation } from 'wouter';
import { useUserStore } from '../store/userStore';

export default function Sucesso() {
  const [, navigate] = useLocation();
  const { userData } = useUserStore();
  
  const handleContinuar = () => {
    navigate('/');
  };

  // Obter apenas o primeiro nome
  const primeiroNome = userData.nome.split(' ')[0];

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="max-w-sm w-full p-6 text-center">
        {/* Ícone de sucesso */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 text-green-500">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="8" />
              <path d="M30 50L45 65L70 35" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        
        {/* Título */}
        <h1 className="text-2xl font-bold text-green-500 mb-8">
          Cadastro atualizado com sucesso!
        </h1>
        
        {/* Mensagem */}
        <div className="bg-[#f1f9ff] p-4 rounded-lg mb-8">
          <p className="text-gray-700">
            <span className="font-medium">{primeiroNome}</span>, resta apenas uma <span className="font-bold text-[#ee8435]">ÚLTIMA ETAPA</span> para sacar suas <span className="font-bold text-[#ee8435]">PARCELAS DO BOLSA FAMÍLIA</span>!
          </p>
        </div>
        
        {/* Botão continuar */}
        <button
          type="button"
          className="w-full py-4 bg-[#ee8435] text-white font-medium rounded-md hover:bg-[#df7426] uppercase"
          onClick={handleContinuar}
        >
          CONTINUAR
        </button>
      </div>
    </div>
  );
}