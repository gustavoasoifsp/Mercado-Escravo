// Aguarda o DOM carregar antes de executar
document.addEventListener('DOMContentLoaded', function() {

    // --- Variáveis Globais e Configurações ---
    let estoque = Math.floor(Math.random() * 49) + 2; // Estoque inicial aleatório
    const nomes = ["João", "Maria", "Carlos", "Fernanda", "Rafael", "Luciana", "Marcos", "Beatriz", "Gabriel", "Sofia", "Eduardo"]; // Nomes para simulação

    // --- Funções Principais ---

    // Altera a imagem principal na galeria
    window.changeImage = function(src) {
        const mainImage = document.getElementById('main-product-image');
        if (mainImage) {
            mainImage.src = src;
        }
    };

    // Gera o número de espectadores
    function generateViewerCount() {
        const viewerCountEl = document.getElementById('viewer-count');
        if (viewerCountEl) {
            const count = Math.floor(Math.random() * 50000) + 1000000;
            viewerCountEl.textContent = `${count.toLocaleString()} pessoas vendo agora`;
        }
    }
    
    // Atualiza a exibição de estoque na tela
    function atualizarEstoque() {
        const display = document.getElementById('stock-display');
        if (display) {
            if (estoque > 1) {
                display.textContent = `Estoque disponível - ${estoque} unidades`;
            } else if (estoque === 1) {
                display.textContent = `Última unidade!`;
            } else {
                display.textContent = `Produto esgotado`;
            }
        }
    }

    // Simula uma compra, diminui o estoque e exibe a notificação
    function criarNotificacaoCompra() {
        if (estoque > 1) {
            estoque--;
            atualizarEstoque();

            const container = document.getElementById("purchase-notifications");
            if (container) {
                const nome = nomes[Math.floor(Math.random() * nomes.length)];
                const card = document.createElement("div");
                card.classList.add("purchase-card");
                card.textContent = `${nome} acabou de comprar este produto!`;
                container.appendChild(card);

                setTimeout(() => {
                    if (card.parentNode) {
                        card.parentNode.removeChild(card);
                    }
                }, 6000);
            }
        }
    }

    // Inicia o ciclo de compras simuladas
    function iniciarNotificacoes() {
        const notificationsEl = document.getElementById('purchase-notifications');
        if (notificationsEl) {
             setInterval(criarNotificacaoCompra, Math.floor(Math.random() * 12000) + 8000);
        }
    }

    // --- Event Listeners (Ações do Usuário) ---
    // Verifica se cada elemento existe antes de adicionar o evento

    const searchButton = document.getElementById('search-button');
    if (searchButton) {
        searchButton.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Só tem esses produtos. Tá querendo demais já');
        });
    }

    const buyNowButton = document.getElementById('buy-now');
    if (buyNowButton) {
        buyNowButton.addEventListener('click', () => {
             alert('Obviamente não tem como comprar...');
        });
    }

    const addToCartButton = document.getElementById('add-to-cart');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', () => {
            alert('Não tem DataBank, não foi guardado');
        });
    }

    const likeButton = document.getElementById('like-button');
    if (likeButton) {
        likeButton.addEventListener('click', () => alert('UwU'));
    }

    const followButton = document.getElementById('follow-button');
    if (followButton) {
        followButton.addEventListener('click', () => alert('Para de me stalkear!'));
    }
    
    // --- Inicialização ---
    // Chama as funções que precisam rodar quando carregar a página
    generateViewerCount();
    atualizarEstoque();
    iniciarNotificacoes();
});