if (document.getElementById('search-button')) {
    document.getElementById('search-button').addEventListener('click', function (event) {
        event.preventDefault();
        alert('Só tem esses produtos. Tá querendo demais já');
    });
}

if (document.getElementById('buy-now')) {
    document.getElementById('buy-now').addEventListener('click', function () {
        alert('Obviamente não tem como comprar...');
    });
}

if (document.getElementById('add-to-cart')) {
    document.getElementById('add-to-cart').addEventListener('click', function () {
        alert('Não tem DataBank, ele não foi realmente guardado');
    });
}

if (document.getElementById('like-button')) {
    document.getElementById('like-button').addEventListener('click', function () {
        alert('UwU');
    });
}

if (document.getElementById('follow-button')) {
    document.getElementById('follow-button').addEventListener('click', function () {
        alert('Para de me stalkear!');
    });
}

function changeImage(src, event) {
    document.getElementById('main-product-image').src = src.replace('60x60', '500x500');
    document.querySelectorAll('.thumbnail-list img').forEach(img => img.classList.remove('active'));
    if (event && event.target) {
        event.target.classList.add('active');
    }
}
