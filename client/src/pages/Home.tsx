import { BankingApp } from '../components/BankingApp';
import { useParams } from 'wouter';

export default function Home() {
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

  return <BankingApp userName={formatName(nome)} userId={formatCPF(cpf)} />;
}
