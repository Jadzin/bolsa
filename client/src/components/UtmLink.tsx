import { Link as WouterLink } from 'wouter';
import { prepareUrlWithParams } from '../lib/utmHandler';
import { ReactNode } from 'react';
import { routePath } from '../lib/env';

interface UtmLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * Componente Link customizado que preserva os parâmetros UTM e XCOD
 * Substitui o componente Link padrão do Wouter por um que preserva UTMs
 * e lida com o basePath no GitHub Pages
 */
export function UtmLink({ href, children, className = '', onClick }: UtmLinkProps) {
  // Adiciona o basePath para links internos no GitHub Pages
  const fullHref = href.startsWith('http') || href.startsWith('//') 
    ? href 
    : routePath(href);
  
  // Função para processar UTMs, mas mantendo a navegação interna com wouter
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick();
    }
    
    // Se for um link externo, propaga os UTMs e XCOD
    if (href.startsWith('http') || href.startsWith('//')) {
      e.preventDefault();
      const urlWithParams = prepareUrlWithParams(href);
      window.location.href = urlWithParams;
    }
    
    // Links internos são tratados normalmente pelo wouter
  };

  return (
    <WouterLink href={fullHref}>
      <a className={className} onClick={handleClick}>
        {children}
      </a>
    </WouterLink>
  );
}