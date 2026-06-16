document.addEventListener('DOMContentLoaded', () => {
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

    const heroImg = document.querySelector('.img');
    const pedidoButtons = document.querySelectorAll('.btn-pedido');
    const comprarSecaoBtn = document.querySelector('.btn-comprar-secao');
    const saberMaisButton = document.querySelector('.btn-saber-mais');
    const infoSecoes = document.querySelectorAll('.info-secao');
    const menuToggle = document.querySelector('.menu-toggle');
    const siteNav = document.querySelector('.site-nav');
    const navLinks = document.querySelectorAll('.site-nav a');
    const carousel = document.querySelector('.carousel');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const carouselPrev = document.querySelector('.carousel-prev');
    const carouselNext = document.querySelector('.carousel-next');
    const faqToggles = document.querySelectorAll('.faq-toggle');
    const revealElements = document.querySelectorAll('[data-reveal]');

    function definirImagens() {
        imagem = window.innerWidth <= 480
            ? imagensMobile
            : imagensDesktop;

        index = 0;
        if (heroImg) {
            heroImg.src = imagem[index];
        }
    }

    if (heroImg) {
        heroImg.style.transition = 'opacity 0.5s ease';
    }

    definirImagens();
    window.addEventListener('resize', definirImagens);

    setInterval(() => {
        if (!heroImg || imagem.length === 0) return;

        heroImg.style.opacity = '0.35';
        setTimeout(() => {
            index = (index + 1) % imagem.length;
            heroImg.src = imagem[index];
            heroImg.style.opacity = '1';
        }, 500);
    }, 3200);

    pedidoButtons.forEach(button => {
        button.addEventListener('click', event => {
            event.preventDefault();
            window.location.href = 'formulario.html';
        });
    });

    if (comprarSecaoBtn) {
        comprarSecaoBtn.addEventListener('click', event => {
            event.preventDefault();
            window.location.href = 'formulario.html';
        });
    }

    if (saberMaisButton) {
        saberMaisButton.addEventListener('click', event => {
            event.preventDefault();
            document.querySelector('#caracteristicas')?.scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (menuToggle && siteNav) {
        menuToggle.addEventListener('click', () => {
            siteNav.classList.toggle('open');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => siteNav.classList.remove('open'));
        });
    }

    let carouselIndex = 0;

    function atualizarCarousel() {
        if (!carousel) return;
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

    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const faqItem = toggle.parentElement;
            const faqContent = faqItem.querySelector('.faq-content');
            const isActive = faqContent.classList.contains('active');

            document.querySelectorAll('.faq-content.active').forEach(item => {
                if (item !== faqContent) {
                    item.classList.remove('active');
                    item.parentElement.querySelector('.faq-toggle').classList.remove('active');
                }
            });

            if (isActive) {
                faqContent.classList.remove('active');
                toggle.classList.remove('active');
            } else {
                faqContent.classList.add('active');
                toggle.classList.add('active');
            }
        });
    });

    function revealOnScroll(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }

    const observer = new IntersectionObserver(revealOnScroll, {
        threshold: 0.2
    });

    revealElements.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });

    const heroScreen = document.querySelector('.hero-screen');

    if (window.gsap) {
        gsap.from('.hero-copy .eyebrow', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out' });
        gsap.from('.hero-copy h1', { opacity: 0, y: 40, duration: 1, ease: 'power3.out', delay: 0.2 });
        gsap.from('.hero-copy p', { opacity: 0, y: 40, duration: 1, ease: 'power3.out', delay: 0.4 });
        gsap.from('.hero-actions button', { opacity: 0, y: 30, duration: 0.9, ease: 'power3.out', delay: 0.6, stagger: 0.12 });
        gsap.from('.hero-info div', { opacity: 0, y: 30, duration: 0.9, ease: 'power3.out', delay: 0.8, stagger: 0.12 });
        gsap.from('.hero-visual', { opacity: 0, scale: 0.96, duration: 1.1, ease: 'power3.out', delay: 0.4 });

        gsap.to('.hero-model', {
            y: -12,
            repeat: -1,
            yoyo: true,
            duration: 3.8,
            ease: 'sine.inOut'
        });

        gsap.to('.visual-frame', {
            x: 10,
            y: -10,
            duration: 5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });

        if (heroScreen) {
            gsap.to(heroScreen, {
                scale: 1.02,
                duration: 4.2,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: 0.5
            });
        }
    }

    const canvas = document.querySelector('#heroCanvas');
    if (canvas && window.THREE) {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(32, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
        camera.position.set(0, 0, 4.6);

        const renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance'
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0x80a7ff, 1.2, 12);
        pointLight.position.set(2, 2, 2);
        scene.add(pointLight);

        const pointLight2 = new THREE.PointLight(0x40ffca, 0.9, 10);
        pointLight2.position.set(-2, -1.3, 2);
        scene.add(pointLight2);

        const geometry = new THREE.TorusKnotGeometry(1.14, 0.28, 140, 26);
        const material = new THREE.MeshPhysicalMaterial({
            color: 0x4c7dff,
            metalness: 0.45,
            roughness: 0.18,
            transmission: 0.28,
            thickness: 1.8,
            clearcoat: 0.7,
            clearcoatRoughness: 0.1,
            emissive: 0x1134ff,
            emissiveIntensity: 0.22,
            opacity: 0.88,
            transparent: true
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.set(0.4, 0.2, 0);
        scene.add(mesh);

        const ringGeometry = new THREE.RingGeometry(1.85, 1.95, 64);
        const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x4c7dff, transparent: true, opacity: 0.16, side: THREE.DoubleSide });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI / 2;
        ring.position.y = -0.28;
        scene.add(ring);

        const clock = new THREE.Clock();

        function resizeCanvas() {
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;
            if (canvas.width !== width || canvas.height !== height) {
                renderer.setSize(width, height, false);
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
            }
        }

        function animateThree() {
            const elapsed = clock.getElapsedTime();
            mesh.rotation.x = 0.6 + Math.sin(elapsed * 0.7) * 0.08;
            mesh.rotation.y += 0.006;
            mesh.rotation.z += 0.005;
            ring.rotation.z -= 0.004;
            renderer.render(scene, camera);
            requestAnimationFrame(animateThree);
        }

        resizeCanvas();
        animateThree();
        window.addEventListener('resize', resizeCanvas);
    }
});

