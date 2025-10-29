// =====================
//  "BANCO DE DADOS"        (Ent rapaziada, ñ sei se o professor vai deixar agente colocar esse bglh pq é avançado dms pra nois. Espero que sim.)   (Tem um vídeo explicando c vcs qzer entder: https://youtu.be/QOeDE7nPDq0)
// =====================
const productsDB = {
    'prod001': { name: 'Avocado Life-Pod™', price: 89.90, image: 'img/Avocado Life-Pod/protetor1.jpeg', url: 'avocado.html' },
    'prod002': { name: 'Fonte - Garrafa Inteligente', price: 499.90, image: 'img/Fonte/garrafa2.jpg', url: 'fonte.html' },
    'serv001': { name: 'Assinatura The Weekly Drop', price: 299.90, image: '#', url: '#' },
    'serv002': { name: 'Serviço Pronto!', price: 19.90, image: '#', url: '#' },
    'prob001': { name: 'Legado Digital™ - Coleção E-lixo', price: 49.90, image: '#', url: '#' },
    'prob002': { name: 'Certificado de Desperdício Têxtil', price: 79.90, image: '#', url: '#' }
};
const charitiesDB = [
    { name: 'Team Trees', costPerUnit: 2.00, description: (units) => `Você poderia ter plantado <strong>${units} ${units > 1 ? 'árvores' : 'árvore'}</strong>.`, logo: '#' },
    { name: 'The Ocean Cleanup', costPerUnit: 5.00, description: (units) => `Você poderia ter ajudado a remover <strong>${units} kg de plástico</strong> dos oceanos.`, logo: '#' },
    { name: 'Médicos Sem Fronteiras', costPerUnit: 1.50, description: (units) => `Você poderia ter fornecido <strong>${units} ${units > 1 ? 'vacinas' : 'vacina'} contra o sarampo</strong>.`, logo: '#' }
];

// Tudo que tem # nois tem que trocar

document.addEventListener('DOMContentLoaded', () => {

    /* =======================================================
       1. LÓGICA DO CARRINHO (Pra todas as páginas)
       ======================================================= */
    const cartCountElement = document.getElementById('cart-count');

    function getCart() {
        try {
            const cartData = JSON.parse(localStorage.getItem('mercadoEscravoCart'));
            if (Array.isArray(cartData)) {
                return cartData;
            }
        } catch (e) {
        }
        return [];
    }

    function saveCart(cart) {
        localStorage.setItem('mercadoEscravoCart', JSON.stringify(cart));
        updateCartDisplay();
    }

    function updateCartDisplay() {
        if (cartCountElement) {
            const cart = getCart();
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCountElement.textContent = totalItems;
        }
    }

    function addToCart(productId, quantity = 1) {
        const cart = getCart();
        const product = productsDB[productId];
        if (!product) {
            console.error(`Produto com ID ${productId} não encontrado no banco de dados.`);
            return;
        }

        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ id: productId, quantity: quantity });
        }
        saveCart(cart);
        console.log('Carrinho atualizado:', getCart()); // Log para depuração
    }

    /* =======================================================
       2. EVENTOS GERAIS
       ======================================================= */

    // Adiciona a funcionalidade pra QUALQUER botão com 'data-product-id' em qualquer página
    document.querySelectorAll('button[data-product-id]').forEach(button => {
        button.addEventListener('click', () => {
            console.log('Botão clicado!'); // Log para depuração
            const productId = button.getAttribute('data-product-id');
            
            const quantityInput = document.getElementById('quantity');
            let quantity = 1;
            // Pega a quantidade apenas se estiver na página do produto
            if (quantityInput && button.id === 'add-to-cart-btn') {
                quantity = parseInt(quantityInput.value) || 1;
            }
            
            addToCart(productId, quantity);
        });
    });

    // --- Lógica Pra Home (se tiver) ---
    if (document.getElementById('produtos')) {
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
    }

    // --- Lógica Pra Página de Produto (se tiver) ---
    if (document.querySelector('.product-page-container')) {
        const mainImage = document.getElementById('main-product-image');
        const thumbnails = document.querySelectorAll('.thumbnail');
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                thumbnails.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
                mainImage.src = thumb.src;
            });
        });
    }

    /* =======================================================
       3. LÓGICA PRA DA PÁGINA DO CARRINHO
       ======================================================= */
    if (document.body.id === 'cart-page') {
        // (O código da página do carrinho que já estava funcionando continua aqui...)
        const cartItemsContainer = document.getElementById('cart-items-container');
        const cartTotalElement = document.getElementById('cart-total-value');
        const finalizeButton = document.getElementById('finalize-purchase-btn');
        const countdownOverlay = document.getElementById('countdown-overlay');
        const impactView = document.getElementById('impact-view');

        function renderCart() {
            const cart = getCart();
            cartItemsContainer.innerHTML = '';
            let total = 0;

            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<h2>Seu carrinho está tragicamente vazio. <a href="index.html">Compre algo</a> para preencher este vazio.</h2>';
                finalizeButton.disabled = true;
                finalizeButton.style.cursor = 'not-allowed';
                finalizeButton.style.opacity = '0.5';
                cartTotalElement.textContent = 'R$ 0.00';
                return;
            }

            cart.forEach(item => {
                const product = productsDB[item.id];
                if(product){
                    total += product.price * item.quantity;
                    cartItemsContainer.innerHTML += `
                        <div class="cart-item">
                            <img src="${product.image}" alt="${product.name}" class="cart-item-image">
                            <div class="cart-item-details">
                                <h3>${product.name}</h3>
                                <p>Preço: R$ ${product.price.toFixed(2)}</p>
                                <div class="cart-item-actions">
                                    <label>Qtd: <input type="number" value="${item.quantity}" min="1" class="item-quantity" data-id="${item.id}"></label>
                                    <button class="remove-item-btn" data-id="${item.id}">Remover</button>
                                </div>
                            </div>
                        </div>
                    `;
                }
            });

            cartTotalElement.textContent = `R$ ${total.toFixed(2)}`;
            addCartEventListeners();
        }
        
        function addCartEventListeners() {
            document.querySelectorAll('.item-quantity').forEach(input => {
                input.addEventListener('change', (e) => {
                    const id = e.target.getAttribute('data-id');
                    const newQuantity = parseInt(e.target.value);
                    updateItemQuantity(id, newQuantity);
                });
            });
            document.querySelectorAll('.remove-item-btn').forEach(button => {
                button.addEventListener('click', (e) => {
                    const id = e.target.getAttribute('data-id');
                    removeItem(id);
                });
            });
        }
        
        function updateItemQuantity(id, quantity) {
            let cart = getCart();
            const item = cart.find(i => i.id === id);
            if (item && quantity > 0) {
                item.quantity = quantity;
            } else if (item && quantity <= 0) {
                cart = cart.filter(i => i.id !== id);
            }
            saveCart(cart);
            renderCart();
        }

        function removeItem(id) {
            let cart = getCart();
            cart = cart.filter(i => i.id !== id);
            saveCart(cart);
            renderCart();
        }

        function startFinalizeSequence() {
            showImpactScreen(); 
        }

        function showImpactScreen() {
            const cart = getCart();
            const total = cart.reduce((sum, item) => sum + (productsDB[item.id].price * item.quantity), 0);
            
            document.getElementById('cart-view').classList.add('hidden');
            countdownOverlay.classList.add('hidden');
            impactView.classList.remove('hidden');

            const impactResults = document.getElementById('impact-results');
            impactResults.innerHTML = `<h1>Compra Finalizada!</h1><h2>Com os <strong>R$ ${total.toFixed(2)}</strong> que você gastou, você poderia ter feito a diferença.</h2>`;

            charitiesDB.forEach(charity => {
                const units = Math.floor(total / charity.costPerUnit);
                if (units > 0) {
                    impactResults.innerHTML += `
                        <div class="impact-card">
                            <img src="${charity.logo}" alt="${charity.name}">
                            <p>${charity.description(units)}</p>
                        </div>
                    `;
                }
            });
            
            localStorage.removeItem('mercadoEscravoCart');
            updateCartDisplay();
        }

        finalizeButton.addEventListener('click', startFinalizeSequence, { once: true });
        renderCart();
    }
    updateCartDisplay();
});
