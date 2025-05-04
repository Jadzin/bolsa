/**
 * Função para preparar URLs com UTMs e XCOD
 * Esta função pega os parâmetros da URL atual e os adiciona em um novo link
 * @param url A URL base para onde deseja redirecionar
 * @returns URL com os parâmetros UTM e XCOD
 */
export function prepareUrlWithParams(url: string): string {
  // Verifica se a URL já contém parâmetros
  const hasParams = url.includes('?');
  const separator = hasParams ? '&' : '?';
  
  try {
    // Cria um novo objeto de URL com a URL atual
    const currentUrl = new URL(window.location.href);
    const params = currentUrl.searchParams;
    
    // Parâmetros que queremos propagar
    const utmParams = [
      'utm_source', 
      'utm_medium', 
      'utm_campaign', 
      'utm_term', 
      'utm_content',
      'xcod'
    ];
    
    // Constrói uma string com os parâmetros encontrados
    let paramString = '';
    
    utmParams.forEach(param => {
      if (params.has(param)) {
        // Adiciona o separador entre parâmetros
        if (paramString !== '') {
          paramString += '&';
        }
        paramString += `${param}=${encodeURIComponent(params.get(param) || '')}`;
      }
    });
    
    // Se temos parâmetros, os adiciona à URL
    if (paramString !== '') {
      return `${url}${separator}${paramString}`;
    }
  } catch (error) {
    console.error('Erro ao processar UTMs:', error);
  }
  
  // Retorna a URL original se não houver parâmetros ou ocorrer erro
  return url;
}

/**
 * Função para redirecionar preservando UTMs e XCOD
 * @param url A URL para onde deseja redirecionar
 */
export function redirectWithUtms(url: string): void {
  const urlWithParams = prepareUrlWithParams(url);
  window.location.href = urlWithParams;
}