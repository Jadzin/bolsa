import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'wouter';
import { ArrowRight, CheckCircle, Loader2, Search, Calculator, Database, FileCheck, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CalculoTarifas() {
  const [, navigate] = useLocation();
  const [calculationStep, setCalculationStep] = useState(0);
  const [calculationText, setCalculationText] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showInss, setShowInss] = useState(false);
  const [showPis, setShowPis] = useState(false);
  const [showCofins, setShowCofins] = useState(false);
  const [showTotal, setShowTotal] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [percentage, setPercentage] = useState(0);

  // Mensagens de cálculo
  const calculationMessages = [
    "Analisando dados do beneficiário...",
    "Consultando tabela de contribuições...",
    "Calculando valor base de contribuição...",
    "Verificando histórico de recolhimentos...",
    "Aplicando alíquotas progressivas...",
    "Finalizando cálculo de tributos..."
  ];
  
  // Valores das tarifas
  const inss = 20.45;
  const pis = 14.26;
  const cofins = 16.77;
  const total = inss + pis + cofins;

  // Timer ref para controlar as animações
  const timerRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    // Função para limpar timers
    const clearTimers = () => {
      timerRef.current.forEach(timer => clearTimeout(timer));
      timerRef.current = [];
    };

    // Sequência de animações para simulação de cálculo
    let step = 0;
    const calcInterval = setInterval(() => {
      if (step < calculationMessages.length) {
        setCalculationText(calculationMessages[step]);
        setCalculationStep(step + 1);
        
        // Incrementa a barra de progresso
        setPercentage(prevPercentage => 
          Math.min(100, prevPercentage + (100 / calculationMessages.length))
        );
        
        step++;
      } else {
        clearInterval(calcInterval);
        
        // Mostrar sucesso após o cálculo
        const successTimer = setTimeout(() => {
          setShowSuccess(true);
        }, 1000);
        timerRef.current.push(successTimer);
        
        // Mostrar INSS
        const inssTimer = setTimeout(() => {
          setShowInss(true);
        }, 2500);
        timerRef.current.push(inssTimer);
        
        // Mostrar PIS
        const pisTimer = setTimeout(() => {
          setShowPis(true);
        }, 3500);
        timerRef.current.push(pisTimer);
        
        // Mostrar COFINS
        const cofinsTimer = setTimeout(() => {
          setShowCofins(true);
        }, 4500);
        timerRef.current.push(cofinsTimer);
        
        // Mostrar total
        const totalTimer = setTimeout(() => {
          setShowTotal(true);
        }, 5500);
        timerRef.current.push(totalTimer);
        
        // Mostrar botão
        const buttonTimer = setTimeout(() => {
          setShowButton(true);
        }, 6500);
        timerRef.current.push(buttonTimer);
      }
    }, 1800);

    return () => {
      clearInterval(calcInterval);
      clearTimers();
    };
  }, []);

  // Função para renderizar o ícone de acordo com o passo
  const renderStepIcon = () => {
    switch(calculationStep) {
      case 1:
        return <Search className="h-6 w-6 text-blue-600" />;
      case 2:
        return <Database className="h-6 w-6 text-blue-600" />;
      case 3:
        return <Calculator className="h-6 w-6 text-blue-600" />;
      case 4:
        return <FileCheck className="h-6 w-6 text-blue-600" />;
      case 5:
        return <DollarSign className="h-6 w-6 text-blue-600" />;
      case 6:
        return <Calculator className="h-6 w-6 text-blue-600" />;
      default:
        return <Loader2 className="h-6 w-6 text-blue-600" />;
    }
  };

  const handleContinuar = () => {
    navigate('/pagamento-tarifa');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Cabeçalho com gradiente azul */}
      <div className="relative">
        <header className="bg-gradient-to-r from-[#0066b3] to-[#03a9f4] text-white p-4 flex items-center justify-center">
          <span className="text-lg font-medium">Cálculo de Tarifas</span>
        </header>
        {/* Barra inferior */}
        <div className="h-1 bg-white w-full absolute bottom-0 opacity-20"></div>
      </div>

      <div className="flex-1 flex flex-col items-center p-6">
        <div className="w-full max-w-md">
          {/* Área de processamento */}
          {!showSuccess && (
            <motion.div 
              className="mb-6 w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Ícone de carregamento */}
              <div className="flex justify-center mb-6">
                <Loader2 className="h-16 w-16 text-blue-600 animate-spin" />
              </div>
              
              {/* Título do processamento */}
              <h2 className="text-xl font-bold text-center text-gray-800 mb-8">
                CALCULANDO TARIFA GOVERNAMENTAL...
              </h2>
              
              {/* Etapa atual de cálculo */}
              {calculationText && (
                <motion.div 
                  className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100"
                  key={calculationText}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center">
                    <div className="mr-3">
                      {renderStepIcon()}
                    </div>
                    <p className="text-blue-800 font-medium">{calculationText}</p>
                  </div>
                </motion.div>
              )}
              
              {/* Barra de progresso */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                <motion.div 
                  className="bg-blue-600 h-2 rounded-full" 
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </motion.div>
          )}
          
          {/* Resultado do cálculo */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
              >
                {/* Ícone de sucesso */}
                <div className="flex justify-center mb-5">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  >
                    <CheckCircle className="h-16 w-16 text-green-600" />
                  </motion.div>
                </div>
                
                {/* Mensagem de sucesso */}
                <motion.div className="text-center mb-8">
                  <h2 className="text-xl font-bold text-green-600 mb-4">
                    TARIFA DE IMPOSTO GERADA COM SUCESSO!
                  </h2>
                  <p className="text-gray-600 text-lg">
                    O valor da tarifa é de acordo com o que você tem para receber
                  </p>
                </motion.div>
                
                {/* Detalhamento das tarifas */}
                <motion.div 
                  className="bg-white rounded-lg shadow-md p-5 border-l-4 border-blue-600 mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  {/* INSS */}
                  <AnimatePresence>
                    {showInss && (
                      <motion.div
                        className="flex justify-between items-center mb-4"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                          <span className="font-semibold text-gray-700">INSS:</span>
                        </div>
                        <span className="font-bold text-gray-800">
                          R$ {inss.toFixed(2).replace('.', ',')}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* PIS */}
                  <AnimatePresence>
                    {showPis && (
                      <motion.div
                        className="flex justify-between items-center mb-4"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                          <span className="font-semibold text-gray-700">PIS:</span>
                        </div>
                        <span className="font-bold text-gray-800">
                          R$ {pis.toFixed(2).replace('.', ',')}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* COFINS */}
                  <AnimatePresence>
                    {showCofins && (
                      <motion.div
                        className="flex justify-between items-center"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          <span className="font-semibold text-gray-700">COFINS:</span>
                        </div>
                        <span className="font-bold text-gray-800">
                          R$ {cofins.toFixed(2).replace('.', ',')}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
                
                {/* Total */}
                <AnimatePresence>
                  {showTotal && (
                    <motion.div 
                      className="bg-gradient-to-r from-blue-50 to-blue-100 p-5 rounded-lg mb-5"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3 className="text-lg font-bold mb-3 text-center text-gray-800">
                        TOTAL DO IMPOSTO:
                      </h3>
                      <p className="text-2xl font-bold text-center text-green-600">
                        R$ {total.toFixed(2).replace('.', ',')}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Botão de continuar */}
                <AnimatePresence>
                  {showButton && (
                    <motion.button
                      className="w-full py-4 bg-[#ee8435] text-white font-bold rounded-md hover:bg-[#df7426] uppercase flex items-center justify-center"
                      onClick={handleContinuar}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      CONTINUAR
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}