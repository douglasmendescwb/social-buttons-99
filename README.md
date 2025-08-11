# Social Buttons Widget

Um widget JavaScript simples e elegante que adiciona botões de redes sociais fixos na lateral esquerda de qualquer página web.

## 🚀 Características

- **Plug & Play**: Funciona em qualquer site sem dependências
- **Responsivo**: Adaptável a diferentes tamanhos de tela
- **Animações suaves**: Efeitos de hover elegantes
- **Zero conflitos**: CSS inline para não interferir com estilos existentes
- **API pública**: Controle programático dos botões
- **Leve e rápido**: Código otimizado e minimalista

## 📱 Redes Sociais Incluídas

- **Instagram** - @prefeiturasjp
- **Facebook** - Prefeitura SJP
- **YouTube** - TV Prefeitura SJP

## 🛠️ Instalação

### Método 1: Inclusão Direta
```html
<script src="social-buttons.js"></script>
```

### Método 2: CDN (se hospedado)
```html
<script src="https://seu-cdn.com/social-buttons.js"></script>
```

### Método 3: Inserção Manual
Copie todo o código JavaScript e cole antes do fechamento da tag `</body>`.

## 💡 Como Usar

O widget é **100% automático**! Apenas inclua o script na sua página e os botões aparecerão automaticamente na lateral esquerda.

### Personalização via API

```javascript
// Atualizar URLs das redes sociais
window.SocialButtons.updateUrls({
    instagram: 'https://instagram.com/seu-perfil',
    facebook: 'https://facebook.com/sua-pagina',
    youtube: 'https://youtube.com/seu-canal'
});

// Mostrar/Esconder botões
window.SocialButtons.toggle(true);  // Mostrar
window.SocialButtons.toggle(false); // Esconder
window.SocialButtons.toggle();      // Alternar

// Remover completamente
window.SocialButtons.remove();
```

## 🎨 Aparência

- **Posição**: Lateral esquerda, centralizada verticalmente
- **Dimensões**: 50x50px por botão
- **Cores**: Instagram (#E4405F), Facebook (#1877F2), YouTube (#FF0000)
- **Animação**: Expansão suave ao passar o mouse

## 🔧 Configuração Avançada

Para modificar as redes sociais ou cores, edite o array `socialButtons` no início do código:

```javascript
const socialButtons = [
    {
        name: 'Instagram',
        url: 'https://www.instagram.com/seu-perfil/',
        color: '#E4405F',
        hoverColor: '#C13584',
        icon: `<!-- SVG do ícone -->`
    },
    // Adicione mais redes aqui...
];
```

## 📱 Responsividade

O widget permanece visível em todos os dispositivos e tamanhos de tela, garantindo acessibilidade máxima aos links sociais.

## ✅ Compatibilidade

- **Navegadores**: Chrome, Firefox, Safari, Edge (versões modernas)
- **Dispositivos**: Desktop, tablet e mobile
- **CMS**: WordPress, Joomla, Drupal, sites estáticos
- **Frameworks**: Compatível com React, Vue, Angular quando usado via script tag

## 🚫 Sem Dependências

- Não requer jQuery
- Não requer bibliotecas CSS
- JavaScript puro (Vanilla JS)
- Sem arquivos externos necessários

## 📋 Recursos Técnicos

- **Z-index**: 9999 (sempre visível)
- **Position**: Fixed (não afeta scroll)
- **Eventos**: Hover com transições CSS
- **Performance**: Inicialização otimizada
- **Memória**: Baixo consumo

## 🎯 Casos de Uso Ideais

- Sites institucionais
- Portais de prefeituras
- Blogs corporativos
- Landing pages
- Sites de eventos
- Qualquer site que precise de links sociais sempre visíveis

## ⚙️ Personalização de Estilo

Para modificar a aparência, você pode:

1. **Editar as cores** no array de configuração
2. **Ajustar posicionamento** modificando as propriedades CSS do container
3. **Alterar dimensões** dos botões editando width/height
4. **Modificar animações** ajustando as propriedades de transition

## 📞 Suporte

Para dúvidas ou problemas:
- Verifique o console do navegador para erros
- Certifique-se de que o script carregou completamente
- Teste em diferentes navegadores

## 📄 Licença

Este código está disponível para uso livre em projetos pessoais e comerciais.

---

**Desenvolvido para a Prefeitura de São José dos Pinhais** 🏛️
