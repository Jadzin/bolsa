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

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/:nome/:cpf" component={Home} />
      <Route path="/atualizacao/:nome/:cpf" component={AtualizacaoCadastral} />
      <Route path="/atualizacao-cadastral" component={AtualizacaoCadastral} />
      <Route path="/parcelas" component={ParcelasBolsaFamilia} />
      <Route path="/parcelas-bolsa-familia" component={ParcelasBolsaFamilia} />
      <Route path="/renda-mensal" component={RendaMensal} />
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
