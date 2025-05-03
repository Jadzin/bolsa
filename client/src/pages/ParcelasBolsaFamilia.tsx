import { useLocation } from 'wouter';
import { ArrowLeft } from 'lucide-react';

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
      {/* Cabeçalho */}
      <header className="bg-[#1a478c] text-white p-4 flex items-center">
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

      {/* Navegação de abas */}
      <div className="flex border-b">
        <div className="flex-1 bg-[#4285f4] text-white py-3 text-center font-medium">
          ÚLTIMAS PARCELAS
        </div>
        <div className="flex-1 bg-white text-gray-600 py-3 text-center font-medium">
          PARCELAS
        </div>
      </div>

      {/* Lista de parcelas */}
      <div className="bg-white">
        {/* PROG BOLSA FAMILIA */}
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-start gap-2">
            <div className="bg-yellow-400 rounded-full p-1 mt-1">
              <span className="text-yellow-700 text-xs">R$</span>
            </div>
            <div>
              <div className="font-medium text-gray-800">PROG BOLSA FAMILIA</div>
              <div className="text-red-500 text-sm font-medium">BLOQUEADO - Referência (02/2025)</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-gray-800">R$ 900,00</div>
          </div>
        </div>

        {/* AUX GAS DOS BRASILEIROS */}
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-start gap-2">
            <div className="bg-yellow-400 rounded-full p-1 mt-1">
              <span className="text-yellow-700 text-xs">R$</span>
            </div>
            <div>
              <div className="font-medium text-gray-800">AUX GAS DOS BRASILEIROS</div>
              <div className="text-red-500 text-sm font-medium">BLOQUEADO - Referência (02/2025)</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-gray-800">R$ 106,00</div>
          </div>
        </div>

        {/* TARIFA SOCIAL DE ENERGIA ELÉTRICA */}
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-start gap-2">
            <div className="bg-yellow-400 rounded-full p-1 mt-1">
              <span className="text-yellow-700 text-xs">R$</span>
            </div>
            <div>
              <div className="font-medium text-gray-800">TARIFA SOCIAL DE ENERGIA ELÉTRICA</div>
              <div className="text-red-500 text-sm font-medium">BLOQUEADO - Referência (02/2025)</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-gray-800">R$ 150,00</div>
          </div>
        </div>

        {/* BPC/LOAS - PRESTAÇÃO CONTINUADA */}
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-start gap-2">
            <div className="bg-yellow-400 rounded-full p-1 mt-1">
              <span className="text-yellow-700 text-xs">R$</span>
            </div>
            <div>
              <div className="font-medium text-gray-800">BPC/LOAS - PRESTAÇÃO CONTINUADA</div>
              <div className="text-red-500 text-sm font-medium">BLOQUEADO - Referência (02/2025)</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-gray-800">R$ 1.412,00</div>
          </div>
        </div>

        {/* TARIFA SOCIAL DE ÁGUA E ESGOTO */}
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-start gap-2">
            <div className="bg-yellow-400 rounded-full p-1 mt-1">
              <span className="text-yellow-700 text-xs">R$</span>
            </div>
            <div>
              <div className="font-medium text-gray-800">TARIFA SOCIAL DE ÁGUA E ESGOTO</div>
              <div className="text-red-500 text-sm font-medium">BLOQUEADO - Referência (02/2025)</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-gray-800">R$ 150,00</div>
          </div>
        </div>
      </div>

      {/* Mensagem */}
      <div className="bg-[#fff9e6] p-4">
        <h3 className="font-bold text-gray-700 mb-2">Mensagem do Bolsa Família</h3>
        <p className="text-gray-700 text-sm mb-2">
          BENEFÍCIOS BLOQUEADOS POR INCONSISTÊNCIA CADASTRAL. É NECESSÁRIO ATUALIZAR OS DADOS VINCULADOS AO BOLSA FAMÍLIA NO APP CAIXA TEM ATÉ 02/05. A AUSÊNCIA DE ATUALIZAÇÃO RESULTARÁ NA SUSPENSÃO DE TODOS OS BENEFÍCIOS VINCULADOS AO PROGRAMA.
        </p>
        <p className="text-gray-700 text-sm">
          CÓD. P2-39 | MOTIVO: DADOS DESATUALIZADOS
        </p>
      </div>

      {/* Botão de atualização */}
      <div className="p-4">
        <button
          onClick={handleUpdateClick}
          className="w-full py-4 bg-[#ee8435] hover:bg-[#df7426] text-white font-medium rounded-md transition-colors"
        >
          Atualizar Cadastro
        </button>
      </div>
    </div>
  );
}