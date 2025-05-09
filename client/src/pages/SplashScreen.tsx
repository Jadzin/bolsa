import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import caixaTemLogo from '@assets/logo-caixa-tem.png';
import { prepareUrlWithParams } from '../lib/utmHandler';

export default function SplashScreen() {
  const [, navigate] = useLocation();

  // Efeito para redirecionar após 2.5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(prepareUrlWithParams('/welcome'));
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-r from-blue-700 to-blue-500">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-48 h-auto"
      >
        <img src={caixaTemLogo} alt="CAIXA Tem" className="w-full h-auto" />
      </motion.div>
    </div>
  );
}