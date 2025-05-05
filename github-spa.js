// Este script permite que o aplicativo React funcione como um SPA no GitHub Pages
// preservando os parâmetros UTM e outros

(function() {
  // Script para GitHub Pages SPA redirection
  // Baseado em: https://github.com/rafgraph/spa-github-pages
  
  // Essa solução funciona preservando os parâmetros UTM
  // Parse e mantenha os parâmetros de consulta como ?utm_source=...
  
  // Esse script só deve ser executado no GitHub Pages
  if (!window.location.hostname.includes('github.io')) {
    console.log('Este script só funciona no GitHub Pages');
    return;
  }
  
  console.log('GitHub Pages SPA script carregado');
  
  // Se chegamos a uma rota direta que não seja o index, e não é um arquivo real,
  // redireciona para o index com o caminho na query string
  const segmentCount = 1; // número de segmentos no path para preservar
  const basePath = '/bolsa'; // base path do projeto no GitHub Pages
  
  const l = window.location;
  
  // Verifique se já estamos no index.html ou se o URL já tem o formato ?/
  if (l.pathname.includes('index.html') || l.search.startsWith('?/')) {
    return;
  }
  
  // Verifica se estamos em uma rota que deve ser tratada pelo SPA router
  if (l.pathname.startsWith(basePath) && 
      !l.pathname.includes('.')) { // não é um arquivo com extensão
    
    // Extrai o caminho depois do basePath
    const path = l.pathname.replace(basePath, '');
    
    // Se o path estiver vazio, não faz nada (estamos na raiz)
    if (path === '' || path === '/') {
      return;
    }
    
    // Redireciona para o formato /?/caminho com parâmetros UTM preservados
    const redirectUrl = 
      l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
      l.pathname.split('/').slice(0, 1 + segmentCount).join('/') + '/?/' +
      l.pathname.slice(1).split('/').slice(segmentCount).join('/').replace(/&/g, '~and~') +
      (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
      l.hash;
    
    // Redirecionar para a URL formatada
    console.log('Redirecionando para:', redirectUrl);
    window.location.replace(redirectUrl);
  }
})();

// Segunda parte do script, para restaurar a URL depois do redirecionamento
(function(l) {
  if (l.search[1] === '/') {
    var decoded = l.search.slice(1).split('&').map(function(s) { 
      return s.replace(/~and~/g, '&');
    }).join('?');
    
    window.history.replaceState(
      null, 
      null,
      l.pathname.slice(0, -1) + decoded + l.hash
    );
  }
}(window.location));