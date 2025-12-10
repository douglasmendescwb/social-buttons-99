(function() {
    'use strict';

    // --- LIMPEZA INICIAL ---
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
    const TIME_TO_SHOW_AFTER_STOP = 3000;
    
    let lastScrollTop = 0;
    let isScrollingTimer = null;
    let isHidden = false;

    // --- ELEMENTOS SOCIAIS ---

    function createSocialButtonsContainer() {
        const container = document.createElement('div');
        container.id = 'social-buttons-container';

        container.style.cssText = `
            position: fixed;
            left: 0;
            top: 50%;
            transform: translateY(-50%) translateX(0);
            z-index: 9999;
            display: flex;
            flex-direction: column;
            gap: 0;
            transition: transform 0.4s ease;
            background: transparent;
            width: fit-content;
        `;
        return container;
    }

    function createSocialButton(buttonConfig, index, total) {
        const button = document.createElement('a');
        button.href = buttonConfig.url;
        button.target = '_blank';
        button.rel = 'noopener noreferrer';
        button.title = buttonConfig.name;

        let borderRadius = '0';
        if (index === 0) borderRadius = '0 8px 0 0';
        if (index === total - 1) borderRadius = '0 0 8px 0';

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
            box-shadow: 2px 2px 5px rgba(0,0,0,0.2); 
            position: relative;
        `;
        button.innerHTML = buttonConfig.icon;

        button.addEventListener('mouseenter', function() {
            if (window.innerWidth > MOBILE_BREAKPOINT) {
                this.style.backgroundColor = buttonConfig.hoverColor;
                this.style.width = '65px';
                this.style.paddingLeft = '15px';
                this.style.zIndex = '10';
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

    // --- FUNÇÕES AUXILIARES PARA VLIBRAS ---
    // O VLibras geralmente usa a classe .vw-plugin-wrapper ou o atributo [vw]
    function getVlibrasContainer() {
        // Tenta achar o wrapper principal do VLibras
        return document.querySelector('.vw-plugin-wrapper') || document.querySelector('[vw]');
    }

    // --- LÓGICA DE VISIBILIDADE (ESCONDER/MOSTRAR) ---

    function hide() {
        const socialContainer = document.getElementById('social-buttons-container');
        const vlibrasContainer = getVlibrasContainer();

        if (isHidden) return;
        isHidden = true;

        // 1. Esconde Social (Vai pra Esquerda)
        if (socialContainer) {
            socialContainer.style.transform = 'translateY(-50%) translateX(-120%)';
        }

        // 2. Esconde VLibras (Vai pra Direita)
        if (vlibrasContainer) {
            // Garante a transição suave caso o VLibras não tenha por padrão
            vlibrasContainer.style.transition = 'transform 0.4s ease'; 
            // Move para fora da tela pela direita
            vlibrasContainer.style.transform = 'translateX(150%)'; 
        }
    }

    function show() {
        const socialContainer = document.getElementById('social-buttons-container');
        const vlibrasContainer = getVlibrasContainer();

        if (!isHidden) return;
        isHidden = false;

        // 1. Mostra Social
        if (socialContainer) {
            socialContainer.style.transform = 'translateY(-50%) translateX(0)';
        }

        // 2. Mostra VLibras
        if (vlibrasContainer) {
            vlibrasContainer.style.transition = 'transform 0.4s ease';
            vlibrasContainer.style.transform = 'translateX(0)';
        }
    }

    // --- CONTROLE DE SCROLL ---

    function handleScroll() {
        // Aplica a lógica apenas em Mobile (ou se quiser em tudo, remova o IF)
        if (window.innerWidth > MOBILE_BREAKPOINT) return;

        const st = window.pageYOffset || document.documentElement.scrollTop;
        
        if (st < 0) return; // Evita bug no iOS

        if (st > lastScrollTop) {
            // Rolando para BAIXO -> ESCONDE TUDO
            hide();
        } else {
            // Rolando para CIMA -> MOSTRA TUDO
            show();
        }
        
        lastScrollTop = st;

        // Timer para mostrar quando para de rolar
        if (isScrollingTimer) clearTimeout(isScrollingTimer);
        
        isScrollingTimer = setTimeout(() => {
            show();
        }, TIME_TO_SHOW_AFTER_STOP);
    }

    function handleResize() {
        // Se a tela for grande (Desktop), garante que tudo esteja visível
        if (window.innerWidth > MOBILE_BREAKPOINT) {
            const socialContainer = document.getElementById('social-buttons-container');
            const vlibrasContainer = getVlibrasContainer();
            
            if (socialContainer) socialContainer.style.transform = 'translateY(-50%) translateX(0)';
            if (vlibrasContainer) vlibrasContainer.style.transform = 'translateX(0)';
            
            isHidden = false;
        }
    }

    // --- INICIALIZAÇÃO ---

    function initSocialButtons() {
        const container = createSocialButtonsContainer();
        
        socialButtons.forEach((buttonConfig, index) => {
            const button = createSocialButton(buttonConfig, index, socialButtons.length);
            container.appendChild(button);
        });

        document.body.appendChild(container);

        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        handleResize();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSocialButtons);
    } else {
        initSocialButtons();
    }

})();
