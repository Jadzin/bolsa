import { ArrowLeft, Lock, Check } from 'lucide-react';
import { useParams, useLocation } from 'wouter';
import { useEffect, useState } from 'react';
import { useUserStore } from '../store/userStore';
import { consultarCpf, formatarCpf, formatarData } from '../services/cpfService';
import { preserveUrlParams } from '../lib/utmHandler';

export default function Confirmacao() {
  const [, navigate] = useLocation();
  const { userData, setUserData } = useUserStore();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const cpfParam = params.cpf || '';
  
  // Buscar dados do usuário da API
  useEffect(() => {
    // Se já temos os dados, não precisamos buscar novamente
    if (userData.nome) return;
    
    const fetchUserData = async () => {
      setLoading(true);
      
      try {
        // Buscar o CPF da URL ou do estado
        const cpfToQuery = userData.cpf || cpfParam;
        
        if (!cpfToQuery) {
          console.log('CPF não encontrado');
          return;
        }
        
        const data = await consultarCpf(cpfToQuery);
        
        if (data) {
          // Salvar os dados do usuário no store
          setUserData({
            cpf: cpfToQuery,
            nome: data.nome || '',
            nascimento: data.data_nascimento || '',
          });
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [cpfParam, userData.cpf, userData.nome, setUserData]);
  
  const handleBackClick = () => {
    const urlWithParams = preserveUrlParams('/atualizacao-endereco');
    navigate(urlWithParams);
  };

  const handleContinueClick = () => {
    // Navegar para a página de processamento com parâmetros UTM preservados
    const urlWithParams = preserveUrlParams('/processando');
    navigate(urlWithParams);
  };

  // Formatar o endereço completo
  const enderecoCompleto = `${userData.endereco.rua}, ${userData.endereco.numero}, ${userData.endereco.bairro}, ${userData.endereco.cidade} - ${userData.endereco.estado}`;

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
            <span className="text-lg font-medium">Confirmação de dados</span>
          </div>
        </header>
        {/* Barra inferior */}
        <div className="h-1 bg-white w-full absolute bottom-0 opacity-20"></div>
      </div>

      <div className="flex-1 p-6">
        {/* Título */}
        <h1 className="text-2xl font-bold text-[#0066b3] mb-6">
          Confirme seus dados:
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0066b3]"></div>
          </div>
        ) : (
          <div className="space-y-6 mb-8">
            {/* Dados pessoais */}
            <div className="bg-[#f1f9ff] p-4 rounded-lg space-y-2">
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm">Nome:</span>
                <span className="font-medium">{userData.nome}</span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm">Nascimento:</span>
                <span className="font-medium">{formatarData(userData.nascimento)}</span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm">CPF:</span>
                <span className="font-medium">{formatarCpf(userData.cpf)}</span>
              </div>
            </div>
            
            {/* Endereço */}
            <div>
              <h2 className="text-lg font-bold text-[#0066b3] mb-2">
                Endereço completo:
              </h2>
              <div className="bg-[#f1f9ff] p-4 rounded-lg">
                <p className="font-medium">{enderecoCompleto}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Botão Continuar */}
        <button
          type="button"
          className="w-full py-4 bg-[#ee8435] text-white font-medium rounded-md hover:bg-[#df7426] uppercase flex items-center justify-center"
          onClick={handleContinueClick}
          disabled={loading}
        >
          <Check size={20} className="mr-2" />
          Confirmar
        </button>
      </div>
    </div>
  );
}