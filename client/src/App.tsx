import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import AtualizacaoCadastral from "./pages/AtualizacaoCadastral";
import ParcelasBolsaFamilia from "./pages/ParcelasBolsaFamilia";
import RendaMensal from "./pages/RendaMensal";
import AtualizacaoEndereco from "./pages/AtualizacaoEndereco";
import Confirmacao from "./pages/Confirmacao";
import Processando from "./pages/Processando";
import Sucesso from "./pages/Sucesso";
import TarifaGoverno from "./pages/TarifaGoverno";
import ReceberParcelas from "./pages/ReceberParcelas";
import CalculoTarifas from "./pages/CalculoTarifas";
import PagamentoTarifa from "./pages/PagamentoTarifa";
import SplashScreen from "./pages/SplashScreen";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import LoginSenha from "./pages/LoginSenha";

function Router() {
  return (
    <Switch>
      {/* Sequência de Login */}
      <Route path="/" component={SplashScreen} />
      <Route path="/welcome" component={Welcome} />
      <Route path="/login" component={Login} />
      <Route path="/login-senha" component={LoginSenha} />
      
      {/* Página principal e outras rotas */}
      <Route path="/home" component={Home} />
      <Route path="/home/:nome/:cpf" component={Home} />
      <Route path="/atualizacao/:nome/:cpf" component={AtualizacaoCadastral} />
      <Route path="/atualizacao-cadastral" component={AtualizacaoCadastral} />
      <Route path="/parcelas" component={ParcelasBolsaFamilia} />
      <Route path="/parcelas-bolsa-familia" component={ParcelasBolsaFamilia} />
      <Route path="/renda-mensal" component={RendaMensal} />
      <Route path="/atualizacao-endereco" component={AtualizacaoEndereco} />
      <Route path="/confirmacao" component={Confirmacao} />
      <Route path="/confirmacao/:cpf" component={Confirmacao} />
      <Route path="/processando" component={Processando} />
      <Route path="/tarifa-governo" component={TarifaGoverno} />
      <Route path="/receber-parcelas" component={ReceberParcelas} />
      <Route path="/calculo-tarifas" component={CalculoTarifas} />
      <Route path="/pagamento-tarifa" component={PagamentoTarifa} />
      
      {/* Mantenha a rota sucesso, mas usamos ela apenas para redirecionamento */}
      <Route path="/sucesso">
        {() => <Home />}
      </Route>
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
