// Script para fazer o GitHub Pages funcionar com Single Page Applications
// Isso é necessário porque o GitHub Pages não suporta SPAs nativamente

(function() {
  // Este script só deve executar no GitHub Pages
  if (!window.location.hostname.includes('github.io')) return;

  // Esta parte é executada quando redirecionado de 404.html
  const segmentCount = 0;
  const l = window.location;

  // Extrair a rota real das URLs de redirecionamento especiais do GitHub Pages
  if (l.search.includes('?/')) {
    const path = l.search.slice(1).split('&')[0];
    const cleanPath = path.replace(/~and~/g, '&');
    l.pathname = l.pathname.slice(0, -1) + cleanPath;
    
    // Remove a parte de busca que contém nossa rota codificada
    window.history.replaceState(
      null,
      '',
      l.pathname + (l.search.match(/[&?](.+)/) ? '?' + l.search.match(/[&?](.+)/)[1] : '') + l.hash
    );
  }
}());