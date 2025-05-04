import { useLocation } from 'wouter';
import { ArrowLeft, AlertTriangle, AlertCircle } from 'lucide-react';
import bolsaFamiliaLogo from '../assets/bolsa-familia-logo.webp';
import { useEffect, useState } from 'react';

// Tipo para as parcelas
interface Parcela {
  mes: string;
  programa: string;
  valor: string;
  validade: string;
  status: 'bloqueado' | 'pago' | 'pendente';
  iconeEhAlerta?: boolean;
}

export default function ParcelasBolsaFamilia() {
  const [, navigate] = useLocation();
  const [parcelasALiberar, setParcelasALiberar] = useState<Parcela[]>([]);
  const [demaisParcelas, setDemaisParcelas] = useState<Parcela[]>([]);
  const [dataAtualizada, setDataAtualizada] = useState<string>('');

  useEffect(() => {
    // Lógica para gerar as parcelas automaticamente, similar ao código HTML
    const meses = ["JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO", "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"];
    const hoje = new Date();
    const anoAtual = hoje.getFullYear();
    const mesAtualIndex = hoje.getMonth();

    const dataFormatada = hoje.toLocaleDateString('pt-BR');

    // Parcelas a serem liberadas (próximos 2 meses)
    const validadeFutura = new Date(hoje.getTime() + 32 * 24 * 60 * 60 * 1000);
    const diaFinal = Math.floor(Math.random() * 6) + 20;
    const validadeFinal = new Date(anoAtual, validadeFutura.getMonth() + 4, diaFinal).toLocaleDateString('pt-BR');

    const parcelas = [
      {
        mes: `${meses[mesAtualIndex]} DE ${anoAtual}`,
        programa: 'PROG BOLSA FAMILIA',
        valor: 'R$ 1.298,00',
        validade: dataFormatada,
        status: 'bloqueado' as 'bloqueado',
        iconeEhAlerta: true
      },
      {
        mes: `${meses[(mesAtualIndex + 1) % 12]} DE ${anoAtual}`,
        programa: 'PROG BOLSA FAMILIA',
        valor: 'R$ 1.298,00',
        validade: `${validadeFutura.toLocaleDateString('pt-BR')} à ${validadeFinal}`,
        status: 'bloqueado' as 'bloqueado',
        iconeEhAlerta: true
      }
    ];

    // Demais parcelas (restante do ano)
    const parcelas2 = [];
    for (let i = mesAtualIndex + 2; i <= 11; i++) {
      const diaInicio = Math.floor(Math.random() * 7) + 20;
      const diaFim = Math.floor(Math.random() * 7) + 20;
      const dataInicio = new Date(anoAtual, i, diaInicio);
      const dataFim = new Date(anoAtual, i + 4, diaFim);
      parcelas2.push({
        mes: `${meses[i]} DE ${anoAtual}`,
        programa: 'PROG BOLSA FAMILIA',
        valor: 'R$ 600,00',
        validade: `${dataInicio.toLocaleDateString('pt-BR')} à ${dataFim.toLocaleDateString('pt-BR')}`,
        status: 'pendente' as 'pendente',
        iconeEhAlerta: true
      });
    }

    setParcelasALiberar(parcelas);
    setDemaisParcelas(parcelas2);

    // Atualiza a data e hora
    const agora = new Date();
    const formatado = agora.toLocaleDateString('pt-BR') + ' às ' + agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    setDataAtualizada(formatado);
  }, []);

  const handleBackClick = () => {
    navigate('/');
  };

  const handleUpdateClick = () => {
    navigate('/atualizacao/edson/38176475572');
  };

  // Renderiza uma parcela individual
  const renderParcela = (parcela: Parcela) => {
    // Define a cor do ícone com base no status
    const corIcone = parcela.status === 'bloqueado' 
      ? 'bg-orange-300' 
      : parcela.status === 'pago' 
        ? 'bg-green-400' 
        : 'bg-yellow-400';
    
    // Define a cor e texto do status
    const statusInfo = parcela.status === 'bloqueado'
      ? { cor: 'text-red-500', texto: 'BLOQUEADO' }
      : parcela.status === 'pago'
        ? { cor: 'text-green-600', texto: 'PAGO' }
        : { cor: 'text-yellow-600', texto: 'PENDENTE' };
    
    return (
      <div className="flex justify-between py-4 border-b border-gray-100">
        <div className="flex">
          <div className="w-6 relative flex justify-center">
            <div className={`absolute z-10 top-0 left-[-5px] ${corIcone} rounded-full w-[34px] h-[34px] flex items-center justify-center`}>
              {parcela.iconeEhAlerta
                ? <AlertTriangle size={16} className="text-white" />
                : <span className="text-white font-bold">$</span>
              }
            </div>
          </div>
          <div className="ml-6">
            <div className="font-medium text-[#0b66a7] text-lg">{parcela.mes}</div>
            <div className="font-medium text-gray-800">{parcela.programa}</div>
            <div className={`${statusInfo.cor} text-sm font-medium`}>
              {statusInfo.texto} - Validade: {parcela.validade}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-bold text-[#0b66a7] text-sm">R$<span className="text-base"> {parcela.valor.replace('R$ ', '')}</span></div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f0f0f0]">
      {/* Cabeçalho com gradiente */}
      <header className="bg-gradient-to-r from-[#194a8c] to-[#4a8fd2] text-white p-4 flex items-center">
        <button onClick={handleBackClick} className="mr-4">
          <ArrowLeft size={24} />
        </button>
        <div className="flex items-center">
          <div className="bg-white rounded-full p-1 mr-2">
            <img src={bolsaFamiliaLogo} 
                 alt="Bolsa Família" 
                 className="h-6 w-6 object-contain" />
          </div>
          <span className="text-lg font-medium">Bolsa Família</span>
        </div>
      </header>

      {/* Navegação de abas com bordas arredondadas */}
      <div className="flex border-b relative bg-white">
        <div className="flex-1">
          <div className="bg-[#2563eb] text-white py-2 text-center font-medium text-sm rounded-full mx-6 my-2">
            ÚLTIMAS PARCELAS
          </div>
        </div>
        <div className="absolute left-1/2 top-4 bottom-4 w-[1px] bg-gray-300 z-20"></div>
        <div className="flex-1">
          <div className="text-gray-600 py-2 text-center font-medium text-sm mx-6 my-2">
            PARCELAS
          </div>
        </div>
      </div>

      {/* Mensagem - Movida para o topo conforme solicitado */}
      <div className="bg-[#fff9e6] p-4">
        <h3 className="font-bold text-gray-700 mb-2">Mensagem do Bolsa Família</h3>
        <p className="text-gray-700 text-sm mb-2">
          BENEFÍCIO BLOQUEADO POR PENDÊNCIA NO CADASTRO. É NECESSÁRIO ATUALIZAR OS DADOS DO BOLSA FAMÍLIA NO CAIXA TEM ATÉ O DIA DE HOJE ({new Date().toLocaleDateString('pt-BR')}). CASO NÃO ATUALIZAR, SEU BENEFICÍCIO SERÁ SUSPENSO.
        </p>
      </div>

      {/* Botão de atualização - Movido para logo abaixo da mensagem */}
      <div className="p-4">
        <button
          onClick={handleUpdateClick}
          className="w-full py-4 bg-[#ee8435] hover:bg-[#df7426] text-white font-medium rounded-md transition-colors"
        >
          Atualizar Cadastro
        </button>
      </div>

      {/* Seção: Parcelas a serem liberadas */}
      <div className="bg-white p-4">
        <h3 className="font-bold text-[#0b66a7] text-lg mb-2">PARCELAS A SEREM LIBERADAS</h3>
        <div className="flex flex-col">
          {parcelasALiberar.map((parcela, index) => (
            <div key={index}>{renderParcela(parcela)}</div>
          ))}
        </div>
      </div>

      {/* Seção: Demais parcelas */}
      <div className="bg-white p-4 mt-4">
        <h3 className="font-bold text-[#0b66a7] text-lg mb-2">DEMAIS PARCELAS</h3>
        <div className="flex flex-col">
          {demaisParcelas.map((parcela, index) => (
            <div key={index}>{renderParcela(parcela)}</div>
          ))}
        </div>
      </div>

      {/* Data de atualização */}
      <div className="text-center text-gray-500 text-sm p-4">
        Dados atualizados em: {dataAtualizada}
      </div>
    </div>
  );
}