import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CalculoTarifas() {
  const [, navigate] = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [showTarifas, setShowTarifas] = useState(false);
  const [showTotal, setShowTotal] = useState(false);
  const [showButton, setShowButton] = useState(false);

  // Valores das tarifas
  const inss = 20.45;
  const pis = 14.26;
  const cofins = 16.77;
  const total = inss + pis + cofins;

  useEffect(() => {
    // Estado inicial, já começa como calculando
    setCurrentStep(1); // "CALCULANDO TARIFA GOVERNAMENTAL..."
    
    // Sequência de animações
    const timer2 = setTimeout(() => {
      setCurrentStep(2); // "TARIFA DE IMPOSTO GERADA COM SUCESSO!"
    }, 2000);

    const timer3 = setTimeout(() => {
      setShowTarifas(true); // Mostrar detalhamento das tarifas
    }, 3000);

    const timer4 = setTimeout(() => {
      setShowTotal(true); // Mostrar o total
    }, 4000);

    const timer5 = setTimeout(() => {
      setShowButton(true); // Mostrar o botão de continuar
    }, 5000);

    return () => {
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, []);

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

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Ícone de carregamento no topo */}
          <div className="flex justify-center mb-8">
            {currentStep < 2 ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Loader2 className="h-16 w-16 text-blue-600 animate-spin" />
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle className="h-16 w-16 text-green-600" />
              </motion.div>
            )}
          </div>

          {/* Mensagem de status */}
          <motion.div
            className="mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {currentStep === 1 && (
              <h2 className="text-xl font-bold text-gray-800">
                CALCULANDO TARIFA GOVERNAMENTAL...
              </h2>
            )}
            {currentStep === 2 && (
              <>
                <h2 className="text-xl font-bold text-green-600 mb-4">
                  TARIFA DE IMPOSTO GERADA COM SUCESSO!
                </h2>
                <p className="text-gray-600 text-lg">
                  O valor da tarifa é de acordo com o que você tem para receber
                </p>
              </>
            )}
          </motion.div>

          {/* Detalhamento das tarifas */}
          {showTarifas && (
            <motion.div 
              className="mb-8 bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-600"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                className="flex justify-between items-center mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <span className="font-medium text-gray-700">INSS:</span>
                <span className="font-bold text-gray-800">
                  R$ {inss.toFixed(2).replace('.', ',')}
                </span>
              </motion.div>
              
              <motion.div
                className="flex justify-between items-center mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <span className="font-medium text-gray-700">PIS:</span>
                <span className="font-bold text-gray-800">
                  R$ {pis.toFixed(2).replace('.', ',')}
                </span>
              </motion.div>
              
              <motion.div
                className="flex justify-between items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <span className="font-medium text-gray-700">COFINS:</span>
                <span className="font-bold text-gray-800">
                  R$ {cofins.toFixed(2).replace('.', ',')}
                </span>
              </motion.div>
            </motion.div>
          )}

          {/* Total */}
          {showTotal && (
            <motion.div 
              className="mb-10 bg-gray-100 p-4 rounded-lg text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg font-bold mb-2 text-gray-800">
                TOTAL DO IMPOSTO:
              </h3>
              <p className="text-2xl font-bold text-green-600">
                R$ {total.toFixed(2).replace('.', ',')}
              </p>
            </motion.div>
          )}

          {/* Botão de continuar */}
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
        </div>
      </div>
    </div>
  );
}