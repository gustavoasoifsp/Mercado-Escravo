document.addEventListener('DOMContentLoaded', () => {

/* 1. LÓGICA COMPARTILHADA (CARRINHO DE COMPRAS)*/
    
    const cartCountElement = document.getElementById('cart-count');

    // Lê o valor do carrinho do armazenamento local do navegador
    function getCartCount() {
        return parseInt(localStorage.getItem('mercadoEscravoCart') || '0');
    }

    // Atualiza o número no ícone do carrinho
    function updateCartDisplay() {
        if (cartCountElement) {
            cartCountElement.textContent = getCartCount();
        }
    }

    // Adiciona um item ao carrinho
    function addToCart(quantity = 1) {
        let currentCount = getCartCount();
        currentCount += quantity;
        localStorage.setItem('mercadoEscravoCart', currentCount);
        updateCartDisplay();
    }


/* 2. LÓGICA CONDICIONAL: SÓ RODA NA PÁGINA INICIAL*/
    
    // Verifica a existência de um elemento único da home page
    if (document.getElementById('produtos')) {
        
        // --- Manipulação de Contadores e Estoque Falsos ---
        const fakeCounters = document.querySelectorAll('.fake-counter');
        fakeCounters.forEach(counter => {
            let count = parseInt(counter.textContent) || Math.floor(Math.random() * 300) + 100;
            counter.textContent = count;
            setInterval(() => {
                count += Math.floor(Math.random() * 7) - 3;
                if (count < 100) count = 100;
                counter.textContent = count;
            }, Math.random() * 3000 + 2000);
        });

        // --- Notificações Falsas de Compra ---
        const fakeNotification = document.getElementById('fake-notification');
        const names = ['Júlia', 'Lucas', 'Beatriz', 'Guilherme', 'Mariana', 'Rafael'];
        const cities = ['de Campinas', 'de Brasília', 'de BH', 'de Salvador', 'de Fortaleza'];
        function showFakePurchase() {
            const randomName = names[Math.floor(Math.random() * names.length)];
            const randomCity = cities[Math.floor(Math.random() * cities.length)];
            fakeNotification.textContent = `⚡️ ${randomName} ${randomCity} acabou de fazer uma compra!`;
            fakeNotification.classList.add('show');
            setTimeout(() => fakeNotification.classList.remove('show'), 4000);
        }
        setTimeout(showFakePurchase, 6000);
        setInterval(showFakePurchase, Math.random() * 10000 + 7000);

        // --- Botões de Compra da Home Page ---
        const buyButtons = document.querySelectorAll('.buy-button');
        buyButtons.forEach(button => {
            button.addEventListener('click', () => {
                addToCart(1); // Adiciona 1 item ao carrinho

                // Mostra o alerta sarcástico
                setTimeout(() => {
                    const productName = button.getAttribute('data-product-name');
                }, 100);
            });
        });
    }


/* 3. LÓGICA CONDICIONAL: SÓ RODA NA PÁGINA DE PRODUTO*/
    
    // Verifica a existência de um elemento único da página de produto
    if (document.querySelector('.product-page-container')) {

        // --- Galeria de Imagens ---
        const mainImage = document.getElementById('main-product-image');
        const thumbnails = document.querySelectorAll('.thumbnail');
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                thumbnails.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
                mainImage.src = thumb.src;
            });
        });

        // --- Botão de Adicionar ao Carrinho da Página de Produto ---
        const addToCartButton = document.getElementById('add-to-cart-btn');
        const quantityInput = document.getElementById('quantity');
        
        addToCartButton.addEventListener('click', () => {
            const quantity = parseInt(quantityInput.value) || 1;
            addToCart(quantity);
        });
    }

/* 4. INICIALIZAÇÃO GLOBAL*/

    // Garante que o carrinho seja exibido corretamente em qualquer página
    updateCartDisplay();
});