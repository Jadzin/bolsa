import { Header } from './Header';
import { ServicesList } from './ServicesList';
import { BottomNavigation } from './BottomNavigation';
import { PopupBolsaFamilia } from './PopupBolsaFamilia';
import { useParams } from 'wouter';

interface BankingAppProps {
  userName?: string;
  userId?: string;
}

export function BankingApp({ 
  userName = "Olá, Edson", 
  userId = "381.764.755-72" 
}: BankingAppProps) {
  // Extrair o nome e CPF dos parâmetros da URL
  const params = useParams();
  const { nome, cpf } = params;

  return (
    <div className="max-w-md mx-auto h-screen flex flex-col bg-white">
      <Header userName={userName} userId={userId} />
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-2 border-b border-gray-200">
          <h2 className="text-base font-medium text-gray-700 ml-2 mt-1 mb-2">Serviços e Produtos</h2>
        </div>
        
        <ServicesList />
      </div>
      
      <BottomNavigation />
      
      {/* Popup que aparece após 2 segundos */}
      <PopupBolsaFamilia nome={nome} cpf={cpf} />
    </div>
  );
}
