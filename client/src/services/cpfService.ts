interface CpfResponse {
  nome: string;
  mae?: string;
  sexo?: string;
  data_nascimento?: string;
  [key: string]: any;
}

/**
 * Consulta a API de CPF para obter dados do usuário
 * @param cpf CPF do usuário (apenas números)
 * @returns Dados do usuário ou null em caso de erro
 */
export async function consultarCpf(cpf: string): Promise<CpfResponse | null> {
  // Remover caracteres não numéricos do CPF
  const cpfLimpo = cpf.replace(/\D/g, '');
  
  // Validar o comprimento do CPF
  if (cpfLimpo.length !== 11) {
    console.log('CPF inválido - comprimento incorreto');
    return null;
  }

  try {
    console.log('Iniciando consulta à API...');
    const url = `https://app.konsulta.pro/api/pessoa?cpf=${cpfLimpo}`;
    console.log('URL da requisição:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'token': '9b9e0838a86a4c569f722e713a6739fb'
      }
    });

    console.log('Status da resposta:', response.status);

    if (!response.ok) {
      console.error('Erro na consulta - status:', response.status);
      return null;
    }

    const data = await response.json();
    console.log('Dados recebidos:', data);

    if (data.nome) {
      console.log('Consulta bem sucedida');
      return data;
    } else {
      console.log('CPF não encontrado ou dados incompletos');
      return null;
    }
  } catch (error) {
    console.error('Erro na consulta:', error);
    return null;
  }
}

/**
 * Formata um CPF adicionando pontos e traço
 * @param cpf CPF do usuário (apenas números)
 * @returns CPF formatado (000.000.000-00)
 */
export function formatarCpf(cpf: string): string {
  const cpfLimpo = cpf.replace(/\D/g, '');
  
  if (cpfLimpo.length !== 11) {
    return cpf; // Retorna o original se não tiver 11 dígitos
  }
  
  return cpfLimpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

/**
 * Formata uma data para o formato DD/MM/YYYY
 * @param data Data (aceita tanto formato ISO YYYY-MM-DD quanto DD/MM/YYYY)
 * @returns Data formatada ou string vazia se inválida
 */
export function formatarData(data?: string): string {
  if (!data) return '';
  
  try {
    // Verificar se a data já está no formato DD/MM/YYYY
    if (data.includes('/') && data.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
      return data;
    }
    
    // Verificar se a data está no formato ISO (YYYY-MM-DD)
    const partes = data.split('-');
    if (partes.length === 3) {
      return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }
    
    return data;
  } catch (error) {
    return data || '';
  }
}