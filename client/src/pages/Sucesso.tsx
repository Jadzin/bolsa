import { CheckCircle, Home } from 'lucide-react';
import { useLocation } from 'wouter';
import { useUserStore } from '../store/userStore';

export default function Sucesso() {
  const [, navigate] = useLocation();
  const { userData } = useUserStore();
  
  const handleVoltarHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Cabeçalho com gradiente azul */}
      <div className="relative">
        <header className="bg-gradient-to-r from-[#0066b3] to-[#03a9f4] text-white p-4 flex items-center justify-center">
          <span className="text-lg font-medium">Atualização concluída</span>
        </header>
        {/* Barra inferior */}
        <div className="h-1 bg-white w-full absolute bottom-0 opacity-20"></div>
      </div>

      <div className="flex-1 p-6 flex flex-col items-center justify-center">
        <div className="text-center space-y-6 max-w-md mb-12">
          {/* Ícone de sucesso */}
          <div className="flex justify-center mb-4">
            <CheckCircle size={80} className="text-green-500" />
          </div>
          
          {/* Título */}
          <h1 className="text-2xl font-bold text-[#0066b3]">
            Atualização cadastral concluída!
          </h1>
          
          {/* Mensagem */}
          <p className="text-gray-600">
            Olá, <strong>{userData.nome}</strong>! Seu cadastro foi atualizado com sucesso. 
            As parcelas do Bolsa Família serão liberadas em breve.
          </p>
          
          <div className="bg-[#f1f9ff] p-4 rounded-lg">
            <p className="text-gray-700">
              As parcelas do seu Bolsa Família foram recalculadas com base nas novas informações.
              Não se esqueça de verificar a página de parcelas para mais detalhes.
            </p>
          </div>
        </div>
        
        {/* Botão Voltar para o início */}
        <button
          type="button"
          className="w-full py-4 bg-[#ee8435] text-white font-medium rounded-md hover:bg-[#df7426] uppercase flex items-center justify-center"
          onClick={handleVoltarHome}
        >
          <Home size={20} className="mr-2" />
          Página inicial
        </button>
      </div>
    </div>
  );
}