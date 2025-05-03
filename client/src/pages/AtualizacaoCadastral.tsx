import { Header } from '../components/Header';
import { BottomNavigation } from '../components/BottomNavigation';
import { useParams } from 'wouter';

export default function AtualizacaoCadastral() {
  // Obter parâmetros da URL
  const params = useParams();
  const { nome, cpf } = params;
  
  // Formatar o nome do usuário (capitalizar e adicionar "Olá, ")
  const formatName = (name: string | undefined) => {
    if (!name) return "Olá, Edson";
    
    // Decodificar o nome da URL
    const decodedName = decodeURIComponent(name);
    
    // Capitalizar cada palavra do nome
    const formattedName = decodedName
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
      
    return `Olá, ${formattedName}`;
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

  return (
    <div className="max-w-md mx-auto h-screen flex flex-col bg-white">
      <Header userName={formatName(nome)} userId={formatCPF(cpf)} />
      
      <div className="flex-1 overflow-y-auto p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Atualização Cadastral</h1>
        
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <p className="text-blue-800">Seus dados precisam ser atualizados para manter seu cadastro ativo no programa Bolsa Família.</p>
        </div>
        
        <form className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Nome completo</label>
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded-md"
              disabled
              value={nome ? decodeURIComponent(nome) : "Edson Silva"}
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">CPF</label>
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded-md"
              disabled
              value={formatCPF(cpf)}
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">Telefone</label>
            <input 
              type="tel" 
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="(00) 00000-0000"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">Endereço</label>
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Seu endereço completo"
            />
          </div>
          
          <button
            type="button"
            className="w-full py-3 bg-[#ed8936] text-white font-medium rounded-md hover:bg-[#dd7d26]"
          >
            Confirmar atualização
          </button>
        </form>
      </div>
      
      <BottomNavigation />
    </div>
  );
}