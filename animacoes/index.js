const imagem = [
    'imagens/mouse_deitado_edit.webp',
    'imagens/mouse_parado.webp'
];

let index = 0;

const img = document.querySelector('.img');

setInterval(() => {

    img.classList.add("fade");

    setTimeout(() => {

        index = (index + 1) % imagem.length;

        img.src = imagem[index];

        img.classList.remove("fade");

    }, 500);

}, 5000);

const pedidoButtons = document.querySelectorAll('.btn-pedido');

pedidoButtons.forEach(button => {
    button.addEventListener('click', event => {
        event.preventDefault();
        window.location.href = 'formulario.html';
    });
});

