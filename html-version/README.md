# CAIXA Tem - Versão HTML/CSS/JS

Este é um clone da interface do aplicativo CAIXA Tem, implementado com HTML, CSS e JavaScript puro, sem dependências de frameworks como React.

## Estrutura do Projeto

```
html-version/
├── css/
│   └── styles.css       # Estilos da aplicação
├── img/                 # Pasta com imagens
├── js/
│   └── main.js          # JavaScript da aplicação
└── index.html           # Arquivo HTML principal
```

## Funcionalidades Implementadas

- **Fluxo de Login**: Tela de splash, boas-vindas, login com CPF e senha
- **Validação de CPF**: Formatação automática e validação de CPF
- **Home**: Tela principal com informações do Bolsa Família
- **Consulta de Parcelas**: Listagem de parcelas recebidas e pendentes
- **Cálculo de Tarifas**: Simulação de taxas governamentais
- **Pagamento**: Tela de pagamento com integração a gateway externo
- **Preservação de UTMs**: Todos os parâmetros UTM são preservados nas navegações

## Como Usar

1. Abra o arquivo `index.html` em um navegador web
2. A aplicação iniciará com a tela de splash
3. Navegue pelo fluxo de login e funcionalidades

## Teste Rápido

Para teste rápido, você pode usar:
- CPF: 148.587.517-08
- Senha: qualquer senha com pelo menos 4 caracteres

## Notas Técnicas

- Esta versão é puramente front-end e não requer servidor
- Os dados são simulados e armazenados localmente no navegador
- As requisições de API são simuladas com JavaScript
- O design é responsivo e otimizado para dispositivos móveis