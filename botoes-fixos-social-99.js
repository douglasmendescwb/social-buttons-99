(function() {
    'use strict';

    // --- LIMPEZA DE VERSÕES ANTERIORES ---
    const existingContainer = document.getElementById('social-buttons-container');
    if (existingContainer) {
        existingContainer.remove();
    }

    // --- CONFIGURAÇÕES ---
    const socialButtons = [
        {
            name: 'Instagram',
            url: 'https://www.instagram.com/prefeiturasjp/',
            color: '#F5335D',
            hoverColor: '#d92c50',
            icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`
        },
        {
            name: 'Facebook',
            url: 'https://www.facebook.com/Prefeitura.SJP/?locale=pt_BR',
            color: '#1877F2',
            hoverColor: '#166FE5',
            icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`
        },
        {
            name: 'YouTube',
            url: 'https://www.youtube.com/user/tvprefeiturasjp',
            color: '#FF0000',
            hoverColor: '#CC0000',
            icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`
        }
    ];

    const MOBILE_BREAKPOINT = 768;
    const TIME_VISIBLE = 4000;
    const TIME_HIDDEN = 20000;
    const HANDLE_SIZE = 15; // Aumentei um pouco a área de toque
    
    let mobileAnimationTimer = null;
    let isHiddenMode = false; // Variável de controle de estado

    // --- ELEMENTOS ---

    function createSocialButtonsContainer() {
        const container = document.createElement('div');
        container.id = 'social-buttons-container';

        // VISUAL FIX: Fundo transparente e sem sombra no container.
        // A sombra agora irá para os botões individuais.
        container.style.cssText = `
            position: fixed;
            left: 0;
            top: 50%;
            transform: translateY(-50%) translateX(0);
            z-index: 9999;
            display: flex;
            flex-direction: column;
            gap: 0;
            transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s ease;
            background: transparent; /* Importante para não ter borda branca */
            width: fit-content;
        `;
        
        // Clique no container vazio (caso exista área morta) também abre
        container.addEventListener('click', function(e) {
            if (window.innerWidth <= MOBILE_BREAKPOINT && isHiddenMode) {
                if(mobileAnimationTimer) clearTimeout(mobileAnimationTimer);
                show();
            }
        });

        return container;
    }

    function createSocialButton(buttonConfig, index, total) {
        const button = document.createElement('a');
        button.href = buttonConfig.url;
        button.target = '_blank';
        button.rel = 'noopener noreferrer';
        button.title = buttonConfig.name;

        // Borda arredondada só no primeiro e no último
        let borderRadius = '0';
        if (index === 0) borderRadius = '0 8px 0 0'; // Topo direito
        if (index === total - 1) borderRadius = '0 0 8px 0'; // Fundo direito

        button.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: center;
            width: 50px;
            height: 50px;
            background-color: ${buttonConfig.color};
            color: white;
            text-decoration: none;
            transition: width 0.2s ease, background-color 0.2s ease;
            border: none;
            cursor: pointer;
            box-sizing: border-box;
            border-radius: ${borderRadius};
            /* VISUAL FIX: Sombra no botão, garantindo que apareça sobre o conteúdo do site */
            box-shadow: 2px 2px 5px rgba(0,0,0,0.2); 
            position: relative; /* Para o z-index funcionar no hover */
        `;

        button.innerHTML = buttonConfig.icon;

        // --- CORREÇÃO DO CLIQUE MOBILE ---
        button.addEventListener('click', function(e) {
            // Se for mobile E estiver escondido (apenas a bordinha aparecendo)
            if (window.innerWidth <= MOBILE_BREAKPOINT && isHiddenMode) {
                e.preventDefault(); // CANCELA o link
                e.stopPropagation(); // Impede borbulhar
                
                // Apenas abre o menu
                if(mobileAnimationTimer) clearTimeout(mobileAnimationTimer);
                show();
                return false;
            }
            // Se estiver aberto, deixa o link funcionar normalmente
        });

        // Hover Desktop
        button.addEventListener('mouseenter', function() {
            if (window.innerWidth > MOBILE_BREAKPOINT) {
                this.style.backgroundColor = buttonConfig.hoverColor;
                this.style.width = '65px'; // Cresce só o botão
                this.style.paddingLeft = '15px';
                this.style.zIndex = '10'; // Garante que a sombra fique sobre o botão de baixo
            }
        });

        button.addEventListener('mouseleave', function() {
            this.style.backgroundColor = buttonConfig.color;
            this.style.width = '50px';
            this.style.paddingLeft = '0';
            this.style.zIndex = '1';
        });

        return button;
    }

    // --- LÓGICA MOBILE ---

    function hide() {
        const container = document.getElementById('social-buttons-container');
        if (!container || window.innerWidth > MOBILE_BREAKPOINT) return;
        
        // Marca que está escondido
        isHiddenMode = true;

        // Esconde deixando apenas a beirada
        container.style.transform = `translateY(-50%) translateX(calc(-100% + ${HANDLE_SIZE}px))`;
        container.style.opacity = '0.9'; // Leve transparência
        
        // Reaparece sozinho depois de um tempo
        mobileAnimationTimer = setTimeout(show, TIME_HIDDEN);
    }

    function show() {
        const container = document.getElementById('social-buttons-container');
        if (!container) return;

        // Marca que está visível
        isHiddenMode = false;

        container.style.transform = 'translateY(-50%) translateX(0)';
        container.style.opacity = '1';

        // Agenda para esconder
        mobileAnimationTimer = setTimeout(hide, TIME_VISIBLE);
    }

    function handleResize() {
        const container = document.getElementById('social-buttons-container');
        
        if (window.innerWidth <= MOBILE_BREAKPOINT) {
            // Entrou no modo mobile
            if (!isHiddenMode) { // Se ainda não iniciou o ciclo
                show(); // Começa mostrando
            }
        } else {
            // Modo Desktop
            if (mobileAnimationTimer) clearTimeout(mobileAnimationTimer);
            isHiddenMode = false;
            if (container) {
                container.style.transform = 'translateY(-50%) translateX(0)';
                container.style.opacity = '1';
            }
        }
    }

    // --- INICIALIZAÇÃO ---

    function initSocialButtons() {
        const container = createSocialButtonsContainer();
        
        socialButtons.forEach((buttonConfig, index) => {
            // Passamos index e total para calcular bordas arredondadas
            const button = createSocialButton(buttonConfig, index, socialButtons.length);
            container.appendChild(button);
        });

        document.body.appendChild(container);

        window.addEventListener('resize', handleResize);
        handleResize();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSocialButtons);
    } else {
        initSocialButtons();
    }

})();
