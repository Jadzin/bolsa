import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Calendar, ArrowRight, DollarSign } from 'lucide-react';
import { useUserStore } from '../store/userStore';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function ReceberParcelas() {
  const [, navigate] = useLocation();
  const { userData } = useUserStore();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Obter apenas o primeiro nome
  const primeiroNome = userData.nome.split(' ')[0];

  // Gerar datas das parcelas (meses anteriores até o atual)
  const currentDate = new Date();
  const parcelas = [];
  
  // Adiciona 4 parcelas dos meses anteriores
  for (let i = 4; i >= 1; i--) {
    const date = new Date();
    date.setMonth(currentDate.getMonth() - i);
    
    const month = format(date, 'MMMM', { locale: ptBR });
    // Primeira letra maiúscula
    const formattedMonth = month.charAt(0).toUpperCase() + month.slice(1);
    
    parcelas.push({
      numero: 5 - i,
      mes: formattedMonth,
      valor: 600
    });
  }
  
  // Adiciona parcela atual com valor maior
  parcelas.push({
    numero: 5,
    mes: "Atual",
    data: format(currentDate, "dd 'de' MMMM", { locale: ptBR }),
    valor: 1298
  });

  // Calcula o valor total
  const valorTotal = parcelas.reduce((total, parcela) => total + parcela.valor, 0);
  
  const handleReceber = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Cabeçalho com gradiente azul */}
      <div className="relative">
        <header className="bg-gradient-to-r from-[#0066b3] to-[#03a9f4] text-white p-4 flex items-center justify-center">
          <span className="text-lg font-medium">Parcelas do Bolsa Família</span>
        </header>
        {/* Barra inferior */}
        <div className="h-1 bg-white w-full absolute bottom-0 opacity-20"></div>
      </div>

      <div className="flex-1 p-4 flex flex-col">
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-bold mb-4 text-[#0066b3]">
            Parcelas que você tem a receber agora:
          </h2>
        </motion.div>

        {/* Lista de parcelas */}
        <div className="mb-8">
          {parcelas.map((parcela, index) => (
            <motion.div
              key={parcela.numero}
              className="mb-4 bg-white rounded-lg shadow p-4 border-l-4 border-[#0066b3]"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-[#0066b3]" />
                  <div>
                    <span className="font-bold">Parcela {parcela.numero} </span>
                    <span className="text-gray-600">
                      {parcela.numero === 5 
                        ? `[${parcela.data}]` 
                        : `[${parcela.mes}]`}
                    </span>
                  </div>
                </div>
                <div className="font-bold text-green-600">
                  R$ {parcela.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Valor total */}
        <motion.div
          className="mb-8 bg-gray-100 p-4 rounded-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.95 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <h3 className="text-lg font-bold mb-2 text-center text-gray-800">
            VALOR TOTAL A RECEBER DO BOLSA FAMÍLIA:
          </h3>
          <p className="text-3xl font-bold text-center text-green-600 mt-2">
            R$ {valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </motion.div>

        {/* Botão receber parcela */}
        <motion.button
          className="w-full py-4 bg-[#ee8435] text-white font-bold rounded-md hover:bg-[#df7426] uppercase flex items-center justify-center mt-auto"
          onClick={handleReceber}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          RECEBER PARCELA
          <ArrowRight className="ml-2 h-5 w-5" />
        </motion.button>
        
        {/* Espaço para respiro */}
        <div className="h-16"></div>
      </div>
    </div>
  );
}