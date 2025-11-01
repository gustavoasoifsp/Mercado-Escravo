// =====================
//  "BANCO DE DADOS"        (Ent rapaziada, ñ sei se o professor vai deixar agente colocar esse bglh pq é avançado dms pra nois. Espero que sim.)   (Tem um vídeo explicando c vcs qzer entder: https://youtu.be/QOeDE7nPDq0)
// =====================
const productsDB = {
    'prod001': { name: 'Avocado Life-Pod™', price: 89.90, image: 'img/Avocado Life-Pod/protetor1.jpeg', url: 'avocado.html' },
    'prod002': { name: 'Fonte - Garrafa Inteligente', price: 499.90, image: 'img/Fonte/garrafa2.jpg', url: 'fonte.html' },
    'serv001': { name: 'Assinatura The Weekly Drop', price: 799.90, image: 'img/The Weekly Drop/drop1.png', url: 'drop.html' },
    'serv002': { name: 'Serviço Pronto!', price: 19.90, image: 'img/Pronto!/pronto1.png', url: 'pronto.html' },
    'prob001': { name: 'Legado Digital™ - Coleção E-lixo', price: 49.90, image: 'img/Eletrônico/eletronico3.png', url: 'eletronico.html' },
    'prob002': { name: 'Certificado de Desperdício Têxtil', price: 79.90, image: 'img/Textil/textil1.jpg', url: 'textil.html' }
};
const charitiesDB = [
    { 
        name: 'Team Trees', 
        costPerUnit: 2.00, 
        description: (units) => `Você poderia ter plantado <strong>${units} ${units > 1 ? 'árvores' : 'árvore'}</strong>.`, 
        logo: 'img/ONG/TeamTrees.png' 
    },
    { 
        name: 'The Ocean Cleanup', 
        costPerUnit: 5.00, 
        description: (units) => `Você poderia ter ajudado a remover <strong>${units} kg de plástico</strong> dos oceanos.`, 
        logo: 'img/ONG/TheOceanCleanup.png' 
    },
    { 
        name: 'Médicos Sem Fronteiras', 
        costPerUnit: 1.50, 
        description: (units) => `Você poderia ter fornecido <strong>${units} ${units > 1 ? 'vacinas' : 'vacina'} contra o sarampo</strong>.`, 
        logo: 'img/ONG/MedicosSemFronteiras.png' 
    },
    { 
        name: 'Water.org', 
        costPerUnit: 3.00, 
        description: (units) => `Você poderia ter garantido <strong>água potável por ${units} ${units > 1 ? 'dias' : 'dia'}</strong> a famílias em comunidades sem acesso.`, 
        logo: 'img/ONG/WaterOrg.png' 
    },
    { 
        name: 'WWF - Proteja a Vida Selvagem', 
        costPerUnit: 7.00, 
        description: (units) => `Você poderia ter ajudado a proteger <strong>${units} ${units > 1 ? 'animais ameaçados' : 'animal ameaçado'}</strong> e seus habitats.`, 
        logo: 'img/ONG/WWF.png' 
    },
    { 
        name: 'Amnesty International', 
        costPerUnit: 4.00, 
        description: (units) => `Você poderia ter contribuído para <strong>${units} ${units > 1 ? 'investigações de direitos humanos' : 'investigação de direitos humanos'}</strong> em andamento.`, 
        logo: 'img/ONG/AmnestyInternational.png' 
    },
    { 
        name: 'Girls Who Code', 
        costPerUnit: 6.00, 
        description: (units) => `Você poderia ter ajudado a ensinar <strong>${units} ${units > 1 ? 'meninas' : 'menina'}</strong> a programar.`, 
        logo: 'img/ONG/GirlsWhoCode.jpg' 
    },
    { 
        name: 'Rainforest Trust', 
        costPerUnit: 2.50, 
        description: (units) => `Você poderia ter protegido <strong>${units} ${units > 1 ? 'm² de floresta tropical' : 'm² de floresta tropical'}</strong> da destruição.`, 
        logo: 'img/ONG/RainforestTrust.jpg' 
    },
    { 
        name: 'Charity: Water', 
        costPerUnit: 5.00, 
        description: (units) => `Você poderia ter fornecido <strong>${units} ${units > 1 ? 'litros de água limpa' : 'litro de água limpa'}</strong> para comunidades carentes.`, 
        logo: 'img/ONG/CharityWater.jpg' 
    },
    { 
        name: 'World Food Programme', 
        costPerUnit: 0.80, 
        description: (units) => `Você poderia ter oferecido <strong>${units} ${units > 1 ? 'refeições' : 'refeição'}</strong> a quem passa fome.`, 
        logo: 'img/ONG/WFP.png' 
    },
    { 
        name: 'UNICEF', 
        costPerUnit: 3.50, 
        description: (units) => `Você poderia ter garantido <strong>${units} ${units > 1 ? 'kits escolares' : 'kit escolar'}</strong> para crianças em zonas de conflito.`, 
        logo: 'img/ONG/UNICEF.jpg' 
    },
    { 
        name: 'GiveDirectly', 
        costPerUnit: 10.00, 
        description: (units) => `Você poderia ter transferido diretamente <strong>ajuda financeira a ${units} ${units > 1 ? 'famílias' : 'família'}</strong> em situação de pobreza extrema.`, 
        logo: 'img/ONG/GiveDirectly.png' 
    },
    { 
        name: 'Coalition for Rainforest Nations', 
        costPerUnit: 4.50, 
        description: (units) => `Você poderia ter ajudado a preservar <strong>${units} ${units > 1 ? 'hectares de floresta' : 'hectare de floresta'}</strong> e reduzir emissões globais.`, 
        logo: 'img/ONG/CoalitionForRainforestNations.png' 
    },
    { 
        name: 'Habitat for Humanity', 
        costPerUnit: 15.00, 
        description: (units) => `Você poderia ter contribuído para construir <strong>${units} ${units > 1 ? 'casas' : 'casa'}</strong> para famílias sem moradia.`, 
        logo: 'img/ONG/HabitatForHumanity.png' 
    },
];

// Tudo que tem # nois tem que trocar

document.addEventListener('DOMContentLoaded', () => {

    /* =======================================================
       1. LÓGICA DO CARRINHO (Pra todas as páginas)
       ======================================================= */
    const cartCountElement = document.getElementById('cart-count');

    function getCart() {
        try {
            const cartData = JSON.parse(localStorage.getItem('mercadoAlorCart'));
            if (Array.isArray(cartData)) {
                return cartData;
            }
        } catch (e) {
        }
        return [];
    }

    function saveCart(cart) {
        localStorage.setItem('mercadoAlorCart', JSON.stringify(cart));
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
            impactResults.innerHTML = `<h1>Compra Finalizada!</h1><h2> Obrigado por investir em você! Com os <strong>R$ ${total.toFixed(2)}</strong> que você gastou, você poderia ter comprado várias coisas chatas.</h2>`;

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
            
            localStorage.removeItem('mercadoAlorCart');
            updateCartDisplay();
        }

        finalizeButton.addEventListener('click', startFinalizeSequence, { once: true });
        renderCart();
    }
    updateCartDisplay();
});
