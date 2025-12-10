(function() {
    'use strict';

    // --- CONFIGURAÇÕES ---

    // Configuração dos botões sociais
    const socialButtons = [
        {
            name: 'Instagram',
            url: 'https://www.instagram.com/prefeiturasjp/',
            // MODIFICAÇÃO 1: Cor alterada conforme solicitado
            color: '#F5335D',
            // Ajustei ligeiramente o hover para combinar com o novo tom,
            // se preferir o antigo use: '#C13584'
            hoverColor: '#d92c50',
            icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>`
        },
        {
            name: 'Facebook',
            url: 'https://www.facebook.com/Prefeitura.SJP/?locale=pt_BR',
            color: '#1877F2',
            hoverColor: '#166FE5',
            icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>`
        },
        {
            name: 'YouTube',
            url: 'https://www.youtube.com/user/tvprefeiturasjp',
            color: '#FF0000',
            hoverColor: '#CC0000',
            icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>`
        }
    ];

    // Configuração do comportamento Mobile
    const MOBILE_BREAKPOINT = 768; // Largura máxima para considerar mobile
    const TIME_VISIBLE = 5000;     // Tempo visível (5 segundos)
    const TIME_HIDDEN = 25000;     // Tempo escondido (25 segundos)
    let mobileAnimationTimer = null;
    let isMobileLoopRunning = false;


    // --- CRIAÇÃO DOS ELEMENTOS ---

    function createSocialButtonsContainer() {
        const container = document.createElement('div');
        container.id = 'social-buttons-container';

        // MODIFICAÇÃO 2: Adicionado 'transition' para suavizar a animação no mobile
        // O transform padrão agora inclui translateX(0) para garantir a posição inicial
        container.style.cssText = `
            position: fixed;
            left: 0;
            top: 50%;
            transform: translateY(-50%) translateX(0);
            z-index: 9999; /* Aumentei o z-index para garantir que fique sobre tudo */
            display: flex;
            flex-direction: column;
            gap: 0;
            transition: transform 0.6s ease-in-out;
            box-shadow: 2px 0 5px rgba(0,0,0,0.2); /* Sombra suave para destacar */
        `;

        return container;
    }

    function createSocialButton(buttonConfig) {
        const button = document.createElement('a');
        button.href = buttonConfig.url;
        button.target = '_blank';
        button.rel = 'noopener noreferrer';
        button.title = buttonConfig.name;

        button.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: center;
            width: 50px;
            height: 50px;
            background-color: ${buttonConfig.color};
            color: white;
            text-decoration: none;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            box-sizing: border-box;
        `;

        button.innerHTML = buttonConfig.icon;

        // Efeitos hover (mantidos, funcionam melhor em Desktop)
        button.addEventListener('mouseenter', function() {
            this.style.backgroundColor = buttonConfig.hoverColor;
            this.style.paddingLeft = '10px';
            this.style.width = '60px'; // Aumenta um pouco a largura no hover
        });

        button.addEventListener('mouseleave', function() {
            this.style.backgroundColor = buttonConfig.color;
            this.style.paddingLeft = '0';
            this.style.width = '50px';
        });

        return button;
    }

    // --- LÓGICA DE COMPORTAMENTO MOBILE ---

    // Função para iniciar o ciclo de aparecer/esconder
    function startMobileLoop() {
        if (isMobileLoopRunning) return; // Evita múltiplos loops
        isMobileLoopRunning = true;
        const container = document.getElementById('social-buttons-container');

        // A função que executa o ciclo
        function cycleVisibility() {
            // Se a tela aumentou durante o ciclo, para tudo.
            if (window.innerWidth > MOBILE_BREAKPOINT) {
                 stopMobileLoop();
                 return;
            }

            // 1. Aparecer (move de volta para a posição original)
            if(container) container.style.transform = 'translateY(-50%) translateX(0)';

            // 2. Agendar o desaparecimento
            mobileAnimationTimer = setTimeout(() => {
                 if (window.innerWidth <= MOBILE_BREAKPOINT && container) {
                     // Esconder (move 100% para a esquerda, saindo da tela)
                     container.style.transform = 'translateY(-50%) translateX(-100%)';
                 }
                 // 3. Agendar o próximo ciclo (reaparecimento)
                 mobileAnimationTimer = setTimeout(cycleVisibility, TIME_HIDDEN);

            }, TIME_VISIBLE);
        }

        // Inicia o primeiro ciclo imediatamente
        cycleVisibility();
    }

    // Função para parar o ciclo e resetar para o estado Desktop
    function stopMobileLoop() {
        isMobileLoopRunning = false;
        // Limpa qualquer timer pendente
        if (mobileAnimationTimer) clearTimeout(mobileAnimationTimer);

        const container = document.getElementById('social-buttons-container');
        if(container) {
             // Garante que está visível na posição padrão de desktop
            container.style.transform = 'translateY(-50%) translateX(0)';
        }
    }

    // Função que verifica o tamanho da tela e decide qual modo usar
    function handleResize() {
        if (window.innerWidth <= MOBILE_BREAKPOINT) {
            startMobileLoop();
        } else {
            stopMobileLoop();
        }
    }


    // --- INICIALIZAÇÃO ---

    function initSocialButtons() {
        if (document.getElementById('social-buttons-container')) return;

        const container = createSocialButtonsContainer();

        socialButtons.forEach(buttonConfig => {
            const button = createSocialButton(buttonConfig);
            container.appendChild(button);
        });

        document.body.appendChild(container);

        // Adiciona o ouvinte de redimensionamento
        window.addEventListener('resize', handleResize);
        // Executa a verificação inicial
        handleResize();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSocialButtons);
    } else {
        initSocialButtons();
    }

    // API Pública (Mantida igual)
    window.SocialButtons = {
        updateUrls: function(newUrls) {
            const container = document.getElementById('social-buttons-container');
            if (container) {
                const buttons = container.querySelectorAll('a');
                if (newUrls.instagram) buttons[0].href = newUrls.instagram;
                if (newUrls.facebook) buttons[1].href = newUrls.facebook;
                if (newUrls.youtube) buttons[2].href = newUrls.youtube;
            }
        },
        toggle: function(show = null) {
            const container = document.getElementById('social-buttons-container');
            if (container) {
                if (show === null) {
                    container.style.display = container.style.display === 'none' ? 'flex' : 'none';
                } else {
                    container.style.display = show ? 'flex' : 'none';
                }
            }
        },
        remove: function() {
            const container = document.getElementById('social-buttons-container');
            if (container) {
                window.removeEventListener('resize', handleResize); // Limpa o listener
                stopMobileLoop(); // Limpa os timers
                container.remove();
            }
        }
    };

})();
