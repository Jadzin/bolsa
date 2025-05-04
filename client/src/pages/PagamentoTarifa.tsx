import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock, FileText, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

export default function PagamentoTarifa() {
  const [, navigate] = useLocation();
  const [showProtocoloGerado, setShowProtocoloGerado] = useState(false);
  const [showRedirecionamento, setShowRedirecionamento] = useState(false);
  const [showBotao, setShowBotao] = useState(false);
  const [protocolo, setProtocolo] = useState('');

  // Valor da tarifa do imposto (importado da página anterior)
  const valorTarifa = 51.48;

  useEffect(() => {
    // Gera um número de protocolo aleatório
    const gerarProtocolo = () => {
      const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const numeros = '0123456789';
      let codigo = '';
      
      // Formato: XXX-NNNNNN-X (3 letras, 6 números, 1 letra)
      for (let i = 0; i < 3; i++) {
        codigo += letras.charAt(Math.floor(Math.random() * letras.length));
      }
      
      codigo += '-';
      
      for (let i = 0; i < 6; i++) {
        codigo += numeros.charAt(Math.floor(Math.random() * numeros.length));
      }
      
      codigo += '-';
      codigo += letras.charAt(Math.floor(Math.random() * letras.length));
      
      return codigo;
    };

    // Sequência de animações
    const protocoloTimer = setTimeout(() => {
      setProtocolo(gerarProtocolo());
      setShowProtocoloGerado(true);
    }, 3000);

    const redirecionamentoTimer = setTimeout(() => {
      setShowRedirecionamento(true);
    }, 4000);

    const botaoTimer = setTimeout(() => {
      setShowBotao(true);
    }, 5000);

    return () => {
      clearTimeout(protocoloTimer);
      clearTimeout(redirecionamentoTimer);
      clearTimeout(botaoTimer);
    };
  }, []);

  const handleProsseguir = () => {
    // Redireciona para a página inicial ou outra página
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Cabeçalho com gradiente azul */}
      <div className="relative">
        <header className="bg-gradient-to-r from-[#0066b3] to-[#03a9f4] text-white p-4 flex items-center justify-center">
          <span className="text-lg font-medium">Pagamento da Tarifa</span>
        </header>
        {/* Barra inferior */}
        <div className="h-1 bg-white w-full absolute bottom-0 opacity-20"></div>
      </div>

      <div className="flex-1 p-5 flex flex-col">
        {/* Headline com aviso de expiração */}
        <motion.div
          className="bg-red-50 border-l-4 border-red-500 p-3 rounded-r-md mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-start">
            <Clock className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-red-800 text-sm leading-tight">
              <span className="font-bold">Nosso sistema irá gerar um protocolo de pagamento, que expira em 15 minutos</span>, caso não for pago dentro desse período, seu processo de liberação será cancelado!
            </p>
          </div>
        </motion.div>

        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Área de geração de protocolo */}
          {!showProtocoloGerado ? (
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Loader2 className="h-16 w-16 text-blue-600 animate-spin mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-800">
                Gerando protocolo de pagamento...
              </h2>
            </motion.div>
          ) : (
            <AnimatePresence>
              <motion.div 
                className="text-center mb-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 25
                }}
              >
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-green-600 mb-4">
                  PROTOCOLO GERADO!
                </h2>
                
                {/* Box do protocolo */}
                <motion.div 
                  className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-5 inline-block"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <FileText className="h-5 w-5 text-blue-600 mx-auto mb-2" />
                  <div className="font-mono text-lg font-bold tracking-wider text-blue-800">
                    {protocolo}
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          )}

          {/* Mensagem de redirecionamento */}
          <AnimatePresence>
            {showRedirecionamento && (
              <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-gray-700 mb-1">
                  Você será redirecionado para a página do governo para pagamento da tarifa de
                </p>
                <p className="text-xl font-bold text-green-600 mb-6">
                  R$ {valorTarifa.toFixed(2).replace('.', ',')}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Botão de prosseguir */}
          <AnimatePresence>
            {showBotao && (
              <motion.div
                className="w-full max-w-xs"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-center text-gray-600 mb-3">
                  Clique no botão para prosseguir:
                </p>
                <motion.button
                  className="w-full py-4 bg-[#ee8435] text-white font-bold rounded-md hover:bg-[#df7426] uppercase flex items-center justify-center"
                  onClick={handleProsseguir}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  PAGAR AGORA
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}