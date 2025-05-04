import { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Checkbox } from '@/components/ui/checkbox';
import caixaTemLogo from '@assets/logo-caixa-tem.png';
import { prepareUrlWithParams } from '../lib/utmHandler';

export default function Welcome() {
  const [, navigate] = useLocation();
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const handleContinue = () => {
    navigate(prepareUrlWithParams('/login'));
  };

  const handleNeedHelp = () => {
    // Aqui poderia abrir uma página de ajuda
    console.log('Usuário precisa de ajuda');
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-r from-blue-700 to-blue-500 p-6">
      <div className="flex-1 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-48 h-auto"
        >
          <img src={caixaTemLogo} alt="CAIXA Tem" className="w-full h-auto" />
        </motion.div>
      </div>
      
      <div className="w-full max-w-md space-y-4 mb-12">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          onClick={handleContinue}
          className="w-full py-4 bg-[#f49c00] hover:bg-[#e07d00] text-white font-medium rounded-md transition-colors"
        >
          Entrar no CAIXA Tem
        </motion.button>
        
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          onClick={handleNeedHelp}
          className="w-full py-2 text-white font-medium transition-colors text-center"
        >
          Preciso de ajuda
        </motion.button>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex items-center space-x-2 justify-center mt-4"
        >
          <Checkbox 
            id="dontShowAgain" 
            checked={dontShowAgain}
            onCheckedChange={(checked) => setDontShowAgain(checked as boolean)}
            className="border-white data-[state=checked]:bg-white data-[state=checked]:text-blue-600"
          />
          <label
            htmlFor="dontShowAgain"
            className="text-sm font-medium leading-none text-white"
          >
            Não mostrar novamente
          </label>
        </motion.div>
      </div>
      
      <div className="text-white text-xs opacity-70">
        v1.91.6
      </div>
    </div>
  );
}