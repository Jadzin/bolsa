import { Link as WouterLink } from 'wouter';
import { prepareUrlWithParams } from '../lib/utmHandler';
import { ReactNode } from 'react';

interface UtmLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * Componente Link customizado que preserva os parâmetros UTM e XCOD
 * Substitui o componente Link padrão do Wouter por um que preserva UTMs
 */
export function UtmLink({ href, children, className = '', onClick }: UtmLinkProps) {
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
    <WouterLink href={href}>
      <a className={className} onClick={handleClick}>
        {children}
      </a>
    </WouterLink>
  );
}