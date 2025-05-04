import { ArrowLeft, Lock } from 'lucide-react';
import { useParams, useLocation } from 'wouter';
import { useState } from 'react';

export default function AtualizacaoEndereco() {
  const [, navigate] = useLocation();
  const [estadoSelecionado, setEstadoSelecionado] = useState('');
  const [cidadeSelecionada, setCidadeSelecionada] = useState('');
  
  const handleBackClick = () => {
    navigate('/renda-mensal');
  };

  const handleContinueClick = () => {
    // Navegar para a próxima página (que ainda criaremos depois)
    navigate('/confirmacao');
  };
  
  // Resetar a cidade selecionada quando o estado mudar
  const handleEstadoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEstadoSelecionado(e.target.value);
    setCidadeSelecionada('');
  };

  // Lista de estados brasileiros com nomes completos
  const estados = [
    "Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará",
    "Distrito Federal", "Espírito Santo", "Goiás", "Maranhão",
    "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Pará",
    "Paraíba", "Paraná", "Pernambuco", "Piauí", "Rio de Janeiro",
    "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia",
    "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"
  ];

  // Mapeamento de estados para cidades (versão simplificada para demonstração)
  const cidadesPorEstado: Record<string, string[]> = {
    "Acre": ["Rio Branco", "Cruzeiro do Sul", "Sena Madureira"],
    "Alagoas": ["Maceió", "Arapiraca", "Palmeira dos Índios"],
    "Amapá": ["Macapá", "Santana", "Laranjal do Jari"],
    "Amazonas": ["Manaus", "Parintins", "Itacoatiara"],
    "Bahia": ["Salvador", "Feira de Santana", "Vitória da Conquista"],
    "Ceará": ["Fortaleza", "Caucaia", "Juazeiro do Norte"],
    "Distrito Federal": ["Brasília", "Ceilândia", "Taguatinga"],
    "Espírito Santo": ["Vitória", "Vila Velha", "Serra"],
    "Goiás": ["Goiânia", "Aparecida de Goiânia", "Anápolis"],
    "Maranhão": ["São Luís", "Imperatriz", "Timon"],
    "Mato Grosso": ["Cuiabá", "Várzea Grande", "Rondonópolis"],
    "Mato Grosso do Sul": ["Campo Grande", "Dourados", "Três Lagoas"],
    "Minas Gerais": ["Belo Horizonte", "Uberlândia", "Contagem"],
    "Pará": ["Belém", "Ananindeua", "Santarém"],
    "Paraíba": ["João Pessoa", "Campina Grande", "Santa Rita"],
    "Paraná": ["Curitiba", "Londrina", "Maringá"],
    "Pernambuco": ["Recife", "Jaboatão dos Guararapes", "Olinda"],
    "Piauí": ["Teresina", "Parnaíba", "Picos"],
    "Rio de Janeiro": ["Rio de Janeiro", "São Gonçalo", "Duque de Caxias"],
    "Rio Grande do Norte": ["Natal", "Mossoró", "Parnamirim"],
    "Rio Grande do Sul": ["Porto Alegre", "Caxias do Sul", "Pelotas"],
    "Rondônia": ["Porto Velho", "Ji-Paraná", "Ariquemes"],
    "Roraima": ["Boa Vista", "Rorainópolis", "Caracaraí"],
    "Santa Catarina": ["Florianópolis", "Joinville", "Blumenau"],
    "São Paulo": ["São Paulo", "Guarulhos", "Campinas"],
    "Sergipe": ["Aracaju", "Nossa Senhora do Socorro", "Lagarto"],
    "Tocantins": ["Palmas", "Araguaína", "Gurupi"]
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
          Vamos atualizar seu endereço de residência:
        </h1>

        <div className="space-y-4 mb-8">
          {/* Estado */}
          <div>
            <label className="block text-gray-700 mb-2">Estado:</label>
            <select 
              className="w-full p-4 border border-gray-300 rounded-lg text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#0066b3]"
              value={estadoSelecionado}
              onChange={handleEstadoChange}
            >
              <option value="">Selecione o estado</option>
              {estados.map(estado => (
                <option key={estado} value={estado}>{estado}</option>
              ))}
            </select>
          </div>

          {/* Cidade */}
          <div>
            <label className="block text-gray-700 mb-2">Cidade:</label>
            <select 
              className="w-full p-4 border border-gray-300 rounded-lg text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#0066b3]"
              disabled={!estadoSelecionado}
              value={cidadeSelecionada}
              onChange={(e) => setCidadeSelecionada(e.target.value)}
            >
              <option value="">
                {!estadoSelecionado 
                  ? "Selecione um estado primeiro" 
                  : "Selecione a cidade"
                }
              </option>
              {estadoSelecionado && 
                (cidadesPorEstado[estadoSelecionado] || []).map((cidade: string) => (
                  <option key={cidade} value={cidade}>{cidade}</option>
                ))
              }
            </select>
          </div>

          {/* Bairro */}
          <div>
            <label className="block text-gray-700 mb-2">Bairro:</label>
            <input 
              type="text" 
              className="w-full p-4 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0066b3]"
              placeholder="Seu bairro"
            />
          </div>

          {/* Rua */}
          <div>
            <label className="block text-gray-700 mb-2">Rua:</label>
            <input 
              type="text" 
              className="w-full p-4 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0066b3]"
              placeholder="Nome da rua"
            />
          </div>

          {/* Número */}
          <div>
            <label className="block text-gray-700 mb-2">Número:</label>
            <input 
              type="text" 
              className="w-full p-4 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0066b3]"
              placeholder="Número"
            />
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