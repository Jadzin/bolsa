import { ArrowLeft, Lock } from 'lucide-react';
import { useParams, useLocation } from 'wouter';
import { useState, useEffect } from 'react';
import { useUserStore } from '../store/userStore';

export default function AtualizacaoEndereco() {
  const [, navigate] = useLocation();
  const { userData, setUserEndereco } = useUserStore();
  
  // Estados para os campos do formulário
  const [estadoSelecionado, setEstadoSelecionado] = useState(userData.endereco.estado || '');
  const [cidade, setCidade] = useState(userData.endereco.cidade || '');
  const [bairro, setBairro] = useState(userData.endereco.bairro || '');
  const [rua, setRua] = useState(userData.endereco.rua || '');
  const [numero, setNumero] = useState(userData.endereco.numero || '');
  
  // Salvar valores no store ao mudar
  useEffect(() => {
    setUserEndereco({
      estado: estadoSelecionado,
      cidade: cidade,
      bairro: bairro,
      rua: rua,
      numero: numero
    });
  }, [estadoSelecionado, cidade, bairro, rua, numero, setUserEndereco]);
  
  const handleBackClick = () => {
    navigate('/renda-mensal');
  };

  const handleContinueClick = () => {
    // Salvar dados de endereço no store
    setUserEndereco({
      estado: estadoSelecionado,
      cidade: cidade,
      bairro: bairro,
      rua: rua,
      numero: numero
    });
    
    // Navegar para a página de confirmação
    navigate('/confirmacao');
  };
  
  const handleEstadoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEstadoSelecionado(e.target.value);
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
            <input 
              type="text" 
              className="w-full p-4 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0066b3]"
              placeholder="Nome da sua cidade"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
            />
          </div>

          {/* Bairro */}
          <div>
            <label className="block text-gray-700 mb-2">Bairro:</label>
            <input 
              type="text" 
              className="w-full p-4 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0066b3]"
              placeholder="Seu bairro"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
            />
          </div>

          {/* Rua */}
          <div>
            <label className="block text-gray-700 mb-2">Rua:</label>
            <input 
              type="text" 
              className="w-full p-4 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0066b3]"
              placeholder="Nome da rua"
              value={rua}
              onChange={(e) => setRua(e.target.value)}
            />
          </div>

          {/* Número */}
          <div>
            <label className="block text-gray-700 mb-2">Número:</label>
            <input 
              type="text" 
              className="w-full p-4 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0066b3]"
              placeholder="Número"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
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