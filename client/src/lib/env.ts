/**
 * Utilitários para lidar com ambiente de produção vs desenvolvimento
 */

// Detecta se estamos no GitHub Pages
export const isGitHubPages = window.location.hostname.includes('github.io');

// Base path para assets e rotas (vazio em dev, '/bolsa' em GitHub Pages)
export const basePath = isGitHubPages ? '/bolsa' : '';

// Função para criar URLs completas para assets
export function assetPath(path: string): string {
  // Remove a barra inicial se existir para evitar paths duplicados
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  return `${basePath}/${cleanPath}`;
}

// Função para criar URLs completas para rotas de navegação
export function routePath(path: string): string {
  // Adiciona barra inicial se não existir
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${cleanPath}`;
}