/**
 * Utilitários para lidar com ambiente de produção vs desenvolvimento
 */

// Detecta se estamos no GitHub Pages
export const isGitHubPages = window.location.hostname.includes('github.io');

// Base path para assets e rotas (vazio em dev, '/bolsa' em GitHub Pages)
export const basePath = isGitHubPages ? '/bolsa' : '';

// Detecta se é modo de produção
export const isProduction = import.meta.env.MODE === 'production';

// URLs base para assets dependendo do ambiente
export const baseAssetsURL = isProduction 
  ? (isGitHubPages ? `${basePath}/assets` : '/assets') 
  : '';

// Função para criar URLs completas para assets
export function assetPath(path: string): string {
  // Remove a barra inicial se existir para evitar paths duplicados
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  
  // Em produção no GitHub Pages, os assets estão em diferentes locais
  if (isProduction && isGitHubPages) {
    // Para imagens e outros assets no diretório de assets
    if (cleanPath.startsWith('assets/')) {
      return `${basePath}/${cleanPath}`;
    }
    
    // Para assets anexados
    if (cleanPath.startsWith('attached_assets/')) {
      return `${basePath}/${cleanPath}`;
    }
    
    // Para outros assets
    return `${basePath}/${cleanPath}`;
  }
  
  return `/${cleanPath}`;
}

// Função para criar URLs completas para rotas de navegação
export function routePath(path: string): string {
  // Adiciona barra inicial se não existir
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return isGitHubPages ? `${basePath}${cleanPath}` : cleanPath;
}

// Função para mostrar o URL completo para assets anexados
export function attachedAssetPath(filename: string): string {
  const cleanName = filename.startsWith('/') ? filename.substring(1) : filename;
  return isGitHubPages 
    ? `${basePath}/attached_assets/${cleanName}`
    : `/attached_assets/${cleanName}`;
}