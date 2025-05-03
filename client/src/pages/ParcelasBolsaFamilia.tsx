import { useLocation } from 'wouter';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

export default function ParcelasBolsaFamilia() {
  const [, navigate] = useLocation();

  const handleBackClick = () => {
    navigate('/');
  };

  const handleUpdateClick = () => {
    navigate('/atualizacao/edson/38176475572');
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
            <img src="https://www.gov.br/pt-br/noticias/assistencia-social/2023/09/caixa-tem-tera-novas-funcionalidades-para-beneficiarios-do-bolsa-familia/copy4_of_bolsa_familia_logo_v1_0.png/@@images/efcae3b7-f70d-4f9d-b9a3-6eee386284e5.png" 
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
        <p className="text-gray-700 text-xs">
          CÓD. P2-39 | MOTIVO: DADOS DESATUALIZADOS
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

      {/* Lista de parcelas */}
      <div className="bg-white">
        {/* Implementação sem a linha vertical */}
        <div className="relative px-4">
          {/* Os ícones precisam ter largura fixa e posicionamento preciso */}
          <div className="flex flex-col pl-2">
            {/* PROG BOLSA FAMILIA */}
            <div className="flex justify-between py-4">
              <div className="flex">
                <div className="w-6 relative flex justify-center">
                  <div className="absolute z-10 top-0 left-[-5px] bg-orange-300 rounded-full w-[34px] h-[34px] flex items-center justify-center">
                    <AlertTriangle size={16} className="text-white" />
                  </div>
                </div>
                <div className="ml-6">
                  <div className="font-medium text-gray-800">PROG BOLSA FAMILIA</div>
                  <div className="text-red-500 text-sm font-medium">BLOQUEADO - Referência (07/2023)</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-[#4a8fd2] text-sm">R$<span className="text-base"> 600,00</span></div>
              </div>
            </div>

            {/* ADICIONAL */}
            <div className="flex justify-between py-4">
              <div className="flex">
                <div className="w-6 relative flex justify-center">
                  <div className="absolute z-10 top-0 left-[-5px] bg-green-400 rounded-full w-[34px] h-[34px] flex items-center justify-center">
                    <span className="text-white font-bold">$</span>
                  </div>
                </div>
                <div className="ml-6">
                  <div className="font-medium text-gray-800">ADICIONAL</div>
                  <div className="text-green-600 text-sm font-medium">PAGO - Referência (05/2023)</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-[#4a8fd2] text-sm">R$<span className="text-base"> 200,00</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}