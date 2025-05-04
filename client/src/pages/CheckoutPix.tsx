import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock, Copy, Check, AlertCircle } from 'lucide-react';

export default function CheckoutPix() {
  const [, navigate] = useLocation();
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState(15 * 60); // 15 minutos em segundos
  const [showAlert, setShowAlert] = useState(false);
  
  // Valor do PIX
  const valorPix = 51.48;
  
  // Chave PIX fictícia
  const chavePix = 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6';
  
  // QR Code do PIX (aqui usamos uma imagem de exemplo)
  const qrCodeUrl = 'data:image/png;base64,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';

  useEffect(() => {
    // Timer para o countdown
    const timer = setInterval(() => {
      setCountdown(prevCountdown => {
        if (prevCountdown <= 1) {
          clearInterval(timer);
          setShowAlert(true);
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Formata o tempo em MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Copia a chave PIX para o clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(chavePix).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Simula retorno após pagamento
  const handlePagamentoFinalizado = () => {
    navigate('/sucesso');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Cabeçalho com gradiente azul */}
      <div className="relative">
        <header className="bg-gradient-to-r from-[#0066b3] to-[#03a9f4] text-white p-4 flex items-center justify-center">
          <span className="text-lg font-medium">Pagamento via PIX</span>
        </header>
        {/* Barra inferior */}
        <div className="h-1 bg-white w-full absolute bottom-0 opacity-20"></div>
      </div>

      <div className="flex-1 p-4 flex flex-col">
        {/* Timer para expiração */}
        <div className="mb-3 flex justify-center">
          <div className="flex items-center bg-red-50 rounded-full px-3 py-1 text-red-700 text-sm border border-red-200">
            <Clock className="h-4 w-4 mr-1.5" />
            <span className="font-bold">{formatTime(countdown)}</span>
          </div>
        </div>

        {/* QR Code */}
        <div className="flex flex-col items-center mb-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm mb-2"
          >
            <img src={qrCodeUrl} alt="QR Code PIX" className="w-48 h-48" />
          </motion.div>
          <p className="text-sm text-gray-600 text-center">
            Escaneie o QR Code acima com o app do seu banco
          </p>
        </div>

        {/* Valor */}
        <div className="mb-4 text-center">
          <p className="text-sm text-gray-600">Valor a pagar:</p>
          <p className="text-xl font-bold text-green-600">
            R$ {valorPix.toFixed(2).replace('.', ',')}
          </p>
        </div>

        {/* Chave PIX */}
        <div className="mb-5">
          <p className="text-sm text-gray-600 mb-1 text-center">Ou copie a chave PIX:</p>
          <div 
            className="bg-gray-100 rounded p-2 flex items-center justify-between mb-1 text-sm"
            onClick={copyToClipboard}
          >
            <span className="font-mono text-gray-800 truncate">{chavePix}</span>
            <button 
              className="ml-2 bg-white p-1 rounded-full border border-gray-200"
              onClick={copyToClipboard}
            >
              {copied ? 
                <Check className="h-4 w-4 text-green-600" /> : 
                <Copy className="h-4 w-4 text-gray-600" />
              }
            </button>
          </div>
          {copied && (
            <p className="text-xs text-green-600 text-center">Chave PIX copiada!</p>
          )}
        </div>

        {/* Instruções */}
        <div className="bg-blue-50 p-3 rounded-md mb-5">
          <p className="text-sm text-blue-800 leading-tight">
            Após realizar o pagamento, aguarde alguns instantes para a confirmação automática.
            Não feche esta página até a confirmação.
          </p>
        </div>

        {/* Alerta de expiração */}
        <AnimatePresence>
          {showAlert && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-4 bg-red-50 border border-red-200 p-3 rounded-md"
            >
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-sm text-red-800 font-bold">Tempo expirado!</p>
                  <p className="text-xs text-red-700">
                    O tempo para pagamento expirou. Para continuar, será necessário gerar um novo QR Code.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Botão de confirmação (para simulação) */}
        <motion.button
          className="mt-auto w-full py-3 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 uppercase flex items-center justify-center"
          onClick={handlePagamentoFinalizado}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          SIMULAÇÃO: CONFIRMAR PAGAMENTO
          <ArrowRight className="ml-2 h-5 w-5" />
        </motion.button>
      </div>
    </div>
  );
}