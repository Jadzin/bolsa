import { ArrowLeft, Lock, MessageSquare } from 'lucide-react';
import { useParams, useLocation } from 'wouter';
import { useState, useEffect } from 'react';
import { useUserStore } from '../store/userStore';
import { preserveUrlParams } from '../lib/utmHandler';

export default function RendaMensal() {
  const [, navigate] = useLocation();
  const [rendaMensal, setRendaMensal] = useState('');
  const { userData, setUserData } = useUserStore();
  
  // Utilizar os dados do store se disponíveis
  useEffect(() => {
    if (userData.renda) {
      // Formatar a renda armazenada para exibição
      const valorNumerico = parseFloat(userData.renda) || 0;
      setRendaMensal(valorNumerico.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }));
    }
  }, [userData.renda]);
  
  const handleBackClick = () => {
    const urlWithParams = preserveUrlParams('/atualizacao-cadastral');
    navigate(urlWithParams);
  };

  const handleContinueClick = () => {
    // Extrair valor numérico da renda formatada
    let valorRenda = rendaMensal.replace(/[R$\s.]/g, '').replace(',', '.');
    if (valorRenda) {
      // Salvando a renda no store
      setUserData({ renda: valorRenda });
    }
    
    // Navegar para a página de atualização de endereço
    const urlWithParams = preserveUrlParams('/atualizacao-endereco');
    navigate(urlWithParams);
  };
  
  const formatarMoeda = (valor: string) => {
    // Remove caracteres não numéricos
    valor = valor.replace(/\D/g, '');
    
    // Converte para número e divide por 100 para obter valor em reais
    const valorNumerico = parseInt(valor || '0', 10) / 100;
    
    // Formata usando a API Intl.NumberFormat
    return valorNumerico.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Pega o valor digitado pelo usuário
    const inputValue = e.target.value;
    
    // Remove o R$ e formata
    const valorLimpo = inputValue.replace(/[R$\s.]/g, '').replace(',', '');
    
    // Atualiza o estado com o valor formatado
    setRendaMensal(formatarMoeda(valorLimpo));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Cabeçalho com gradiente azul */}
      <div className="relative">
        <header className="bg-gradient-to-r from-[#0066b3] to-[#03a9f4] text-white p-4 flex items-center">
          <button onClick={handleBackClick} className="mr-4">
            <ArrowLeft size={24} />
          </button>
          <div className="flex items-center">
            <div className="bg-white rounded-full p-1 mr-2 flex items-center justify-center">
              <Lock size={20} color="#0066b3" />
            </div>
            <span className="text-lg font-medium">Atualização cadastral</span>
          </div>
        </header>
        {/* Barra inferior */}
        <div className="h-1 bg-white w-full absolute bottom-0 opacity-20"></div>
      </div>

      <div className="flex-1 p-6">
        {/* Título */}
        <h1 className="text-2xl font-bold text-[#0066b3] mb-6">
          Qual a sua renda mensal?
        </h1>

        {/* Campo de entrada */}
        <div className="mb-6">
          <input 
            type="text" 
            className="w-full p-4 border border-gray-300 rounded-lg text-gray-700 text-xl font-medium"
            placeholder="R$ 0,00"
            value={rendaMensal}
            onChange={handleInputChange}
          />
        </div>

        {/* Cartões informativos */}
        <div className="space-y-4 mb-8">
          <div className="bg-[#f1f9ff] p-4 rounded-lg flex">
            <div className="mr-3 text-[#03a9f4]">
              <MessageSquare size={24} />
            </div>
            <p className="text-gray-600">
              Se você é empregado com carteira assinada, pode preencher com o valor do seu salário bruto (sem descontos).
            </p>
          </div>

          <div className="bg-[#f1f9ff] p-4 rounded-lg flex">
            <div className="mr-3 text-[#03a9f4]">
              <MessageSquare size={24} />
            </div>
            <p className="text-gray-600">
              Se é autônomo, você pode informar uma média quanto recebe todo mês.
            </p>
          </div>
        </div>
        
        {/* Botão Continuar */}
        <button
          type="button"
          className="w-full py-4 bg-[#ee8435] text-white font-medium rounded-md hover:bg-[#df7426] uppercase"
          onClick={handleContinueClick}
        >
          Continuar
        </button>
      </div>
    </div>
  );
}