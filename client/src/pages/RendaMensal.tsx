import { ArrowLeft, Lock, MessageSquare } from 'lucide-react';
import { useParams, useLocation } from 'wouter';

export default function RendaMensal() {
  const [, navigate] = useLocation();
  
  const handleBackClick = () => {
    navigate('/atualizacao-cadastral');
  };

  const handleContinueClick = () => {
    // Navegar para a próxima página (que ainda criaremos depois)
    navigate('/confirmacao');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Cabeçalho com gradiente azul */}
      <div className="relative">
        <header className="bg-gradient-to-r from-[#0066b3] to-[#03a9f4] text-white p-4 flex items-center">
          <button onClick={handleBackClick} className="mr-4">
            <ArrowLeft size={24} />
          </button>
          <div className="flex items-center">
            <div className="bg-white rounded-full p-1 mr-2 flex items-center justify-center">
              <Lock size={20} color="#0066b3" />
            </div>
            <span className="text-lg font-medium">Atualização cadastral</span>
          </div>
        </header>
        {/* Barra inferior */}
        <div className="h-1 bg-white w-full absolute bottom-0 opacity-20"></div>
      </div>

      <div className="flex-1 p-6">
        {/* Título */}
        <h1 className="text-2xl font-bold text-[#0066b3] mb-6">
          Qual a sua renda mensal?
        </h1>

        {/* Campo de entrada */}
        <div className="mb-6">
          <input 
            type="text" 
            className="w-full p-4 border border-gray-300 rounded-lg text-gray-500"
            placeholder="Renda"
          />
        </div>

        {/* Cartões informativos */}
        <div className="space-y-4 mb-8">
          <div className="bg-[#f1f9ff] p-4 rounded-lg flex">
            <div className="mr-3 text-[#03a9f4]">
              <MessageSquare size={24} />
            </div>
            <p className="text-gray-600">
              Se você é empregado com carteira assinada, pode preencher com o valor do seu salário bruto (sem descontos).
            </p>
          </div>

          <div className="bg-[#f1f9ff] p-4 rounded-lg flex">
            <div className="mr-3 text-[#03a9f4]">
              <MessageSquare size={24} />
            </div>
            <p className="text-gray-600">
              Se é autônomo, você pode informar uma média quanto recebe todo mês.
            </p>
          </div>

          <div className="bg-[#f1f9ff] p-4 rounded-lg flex">
            <div className="mr-3 text-[#03a9f4]">
              <MessageSquare size={24} />
            </div>
            <p className="text-gray-600">
              Para ter acesso ao SIM Digital - Crédito CAIXA Tem você precisa ter uma renda maior que R$ 200,00.
            </p>
          </div>
        </div>
        
        {/* Botão Continuar */}
        <button
          type="button"
          className="w-full py-4 bg-[#ee8435] text-white font-medium rounded-md hover:bg-[#df7426] uppercase"
          onClick={handleContinueClick}
        >
          Continuar
        </button>
      </div>
    </div>
  );
}