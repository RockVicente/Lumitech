const imagensDesktop = [
    'imagens/mouse_deitado_edit.webp',
    'imagens/mouse_parado.webp'
];

const imagensMobile = [
    'imagens/mouse_sem_fundo.webp',
    'imagens/mouse5_no_bg.webp',
    'imagens/mouse6_no_bg.webp'
];

let imagem = [];
let index = 0;

const img = document.querySelector('.img');

function definirImagens() {
    imagem = window.innerWidth <= 480
        ? imagensMobile
        : imagensDesktop;

    index = 0;
    img.src = imagem[index];
}

definirImagens();

window.addEventListener('resize', definirImagens);

// Animação de imagens - ciclo contínuo
setInterval(() => {
    img.style.opacity = '0.7';
    
    setTimeout(() => {
        index = (index + 1) % imagem.length;
        img.src = imagem[index];
        img.style.opacity = '1';
    }, 500);
}, 3000);

// Aplicar fade animation inicial
img.style.transition = 'opacity 0.5s ease';

// Botão Comprar Agora
const pedidoButtons = document.querySelectorAll('.btn-pedido');
pedidoButtons.forEach(button => {
    button.addEventListener('click', event => {
        event.preventDefault();
        window.location.href = 'formulario.html';
    });
});

// Botão Comprar da seção
const comprarSecaoBtn = document.querySelector('.btn-comprar-secao');
if (comprarSecaoBtn) {
    comprarSecaoBtn.addEventListener('click', event => {
        event.preventDefault();
        window.location.href = 'formulario.html';
    });
}

// Botão Saber Mais
const saberMaisButton = document.querySelector('.btn-saber-mais');
const infoSecoes = document.querySelectorAll('.info-secao');

if (saberMaisButton) {
    saberMaisButton.addEventListener('click', event => {
        event.preventDefault();
        infoSecoes.forEach(secao => secao.classList.remove('hidden'));
        document.querySelector('#beneficios')?.scrollIntoView({ behavior: 'smooth' });
    });
}

// Carousel de fotos
let carouselIndex = 0;
const carousel = document.querySelector('.carousel');
const carouselItems = document.querySelectorAll('.carousel-item');
const carouselPrev = document.querySelector('.carousel-prev');
const carouselNext = document.querySelector('.carousel-next');

function atualizarCarousel() {
    const offset = -carouselIndex * 100;
    carousel.style.transform = `translateX(${offset}%)`;
}

if (carouselNext) {
    carouselNext.addEventListener('click', () => {
        carouselIndex = (carouselIndex + 1) % carouselItems.length;
        atualizarCarousel();
    });
}

if (carouselPrev) {
    carouselPrev.addEventListener('click', () => {
        carouselIndex = (carouselIndex - 1 + carouselItems.length) % carouselItems.length;
        atualizarCarousel();
    });
}

// FAQ Interativo
const faqToggles = document.querySelectorAll('.faq-toggle');

faqToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const faqItem = toggle.parentElement;
        const faqContent = faqItem.querySelector('.faq-content');
        const isActive = faqContent.classList.contains('active');

        // Fechar todos os outros
        document.querySelectorAll('.faq-content.active').forEach(item => {
            if (item !== faqContent) {
                item.classList.remove('active');
                item.parentElement.querySelector('.faq-toggle').style.borderRadius = '12px 12px 0 0';
            }
        });

        // Toggle atual
        if (isActive) {
            faqContent.classList.remove('active');
            toggle.style.borderRadius = '12px';
        } else {
            faqContent.classList.add('active');
            toggle.style.borderRadius = '12px 12px 0 0';
        }
    });
});

