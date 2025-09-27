// Lógica do Preloader - Executa assim que a página e todos os seus recursos (imagens, etc.) são carregados.
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const siteContent = document.getElementById('site-content');
    
    if (preloader) {
        preloader.classList.add('hidden');
        setTimeout(() => {
            preloader.style.display = 'none';
            if (siteContent) {
                siteContent.classList.remove('opacity-0');
            }
        }, 500); // Duração da transição do CSS
    }
});

// Lógica para componentes interativos - Executa assim que o HTML da página está pronto.
document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggleButtons = document.querySelectorAll('#theme-toggle, #theme-toggle-mobile');
    
    const updateThemeIcons = (isDark) => {
        document.querySelectorAll('#theme-toggle-dark-icon, #theme-toggle-dark-icon-mobile').forEach(el => el.classList.toggle('hidden', !isDark));
        document.querySelectorAll('#theme-toggle-light-icon, #theme-toggle-light-icon-mobile').forEach(el => el.classList.toggle('hidden', isDark));
    };

    // Sincroniza os ícones com o tema atual no carregamento da página
    updateThemeIcons(document.documentElement.classList.contains('dark'));

    themeToggleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // alterna a classe no HTML
            const isDark = document.documentElement.classList.toggle('dark');
            
            // salva a preferência
            localStorage.setItem('color-theme', isDark ? 'dark' : 'light');
            
            // atualiza os ícones
            updateThemeIcons(isDark);
        });
    });

    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOpenIcon = document.getElementById('menu-open-icon');
    const menuCloseIcon = document.getElementById('menu-close-icon');

    if (menuBtn) {
        // Toggle menu
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            menuOpenIcon.classList.toggle('hidden');
            menuCloseIcon.classList.toggle('hidden');
        });

        // Fechar menu ao clicar em um link
        const navLinks = mobileMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuOpenIcon.classList.remove('hidden');
                menuCloseIcon.classList.add('hidden');
            });
        });
    }
    
     // FAQ Accordion
    const accordionItems = document.querySelectorAll('.accordion-item');
    if (accordionItems.length > 0) {
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');
            const icon = item.querySelector('svg');

            header.addEventListener('click', () => {
                // Fecha todos os outros
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.querySelector('.accordion-content').style.maxHeight = null;
                        otherItem.querySelector('svg').classList.remove('rotate-180');
                    }
                });

                // Abre ou fecha o item clicado
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                    icon.classList.remove('rotate-180');
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                    icon.classList.add('rotate-180');
                }
            });
        });
    }

    // Embla Carousel
    const emblaNode = document.getElementById('carousel-viewport');
    if (emblaNode) {
        const emblaApi = EmblaCarousel(emblaNode, { loop: true, align: 'start' }, [
            EmblaCarouselAutoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true })
        ]);

        const prevBtn = document.getElementById('carousel-prev');
        const nextBtn = document.getElementById('carousel-next');

        const onNavButtonClick = () => {
            const autoplay = emblaApi.plugins().autoplay;
            if (!autoplay) return;
            autoplay.reset(); // Reinicia o autoplay após interação manual
        };

        const updateNavButtons = () => {
            if (!emblaApi.canScrollPrev()) {
                prevBtn.disabled = true;
            } else {
                prevBtn.disabled = false;
            }
            if (!emblaApi.canScrollNext()) {
                nextBtn.disabled = true;
            } else {
                nextBtn.disabled = false;
            }
        };

        prevBtn.addEventListener('click', () => { emblaApi.scrollPrev(); onNavButtonClick(); }, false);
        nextBtn.addEventListener('click', () => { emblaApi.scrollNext(); onNavButtonClick(); }, false);

        emblaApi.on('select', updateNavButtons);
        emblaApi.on('init', updateNavButtons);
    }

    // Fade-in animation on scroll
    const fadeInSections = document.querySelectorAll('.fade-in-section');
    if (fadeInSections.length > 0) {
        const observerOptions = {
            root: null, // Observa a viewport
            rootMargin: '0px',
            threshold: 0.2 // Dispara quando 20% da seção está visível
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // Para de observar após a animação
                }
            });
        }, observerOptions);

        fadeInSections.forEach(section => observer.observe(section));
    }

    // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top-btn');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) { // Mostra o botão após rolar 300px
                backToTopBtn.classList.add('is-visible');
            } else {
                backToTopBtn.classList.remove('is-visible');
            }
        });
    }

    // Parallax Effect for Hero Image
    const heroImage = document.getElementById('hero-image');
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            heroImage.style.transform = `translateY(${scrollPosition * 0.4}px)`;
        });
    }

    // Cookie Consent Banner
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesBtn = document.getElementById('accept-cookies-btn');
    const cookieConsent = localStorage.getItem('cookie_consent');
    
    if (cookieBanner && acceptCookiesBtn) {
        if (!cookieConsent) {
            setTimeout(() => {
                cookieBanner.classList.add('is-visible');
            }, 1000); // Mostra o banner após 1 segundo
        }

        acceptCookiesBtn.addEventListener('click', () => {
            localStorage.setItem('cookie_consent', 'true');
            cookieBanner.classList.remove('is-visible');
        });
    }

    // Social Share Buttons
    const shareWhatsappBtn = document.getElementById('share-whatsapp');
    const shareFacebookBtn = document.getElementById('share-facebook');

    if (shareWhatsappBtn && shareFacebookBtn) {
        const pageUrl = encodeURIComponent(window.location.href);
        const pageTitle = encodeURIComponent(document.title);

        // WhatsApp Share Link
        shareWhatsappBtn.href = `https://api.whatsapp.com/send?text=${pageTitle}%20-%20${pageUrl}`;

        // Facebook Share Link
        shareFacebookBtn.href = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
    }

    // Stats Counter Animation
    const statsCounter = document.getElementById('stats-counter');
    if (statsCounter) {
        const counters = statsCounter.querySelectorAll('span[data-target]');
        
        const animateCounter = (counter) => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // 2 segundos
            const stepTime = Math.abs(Math.floor(duration / target));
            let current = 0;

            const timer = setInterval(() => {
                current += 1;
                counter.innerText = current;
                if (current === target) {
                    clearInterval(timer);
                }
            }, stepTime);
        };

        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    counters.forEach(animateCounter);
                    observer.unobserve(entry.target); // Anima apenas uma vez
                }
            });
        }, { threshold: 0.5 });

        if (statsCounter) {
            counterObserver.observe(statsCounter);
        }
    }
});