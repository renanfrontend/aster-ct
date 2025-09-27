        // Preloader
        window.onload = () => {
            const preloader = document.getElementById('preloader');
            const siteContent = document.getElementById('site-content');
            
            if (preloader) {
                preloader.classList.add('hidden');
                
                // Garante que o preloader desapareça antes de mostrar o conteúdo
                setTimeout(() => {
                    preloader.style.display = 'none';
                    if(siteContent) {
                        siteContent.classList.remove('opacity-0');
                    }
                }, 500); // Tempo igual à transição do CSS
            }
        };

        document.addEventListener('DOMContentLoaded', () => {
            // Theme Toggle
            const themeToggleBtn = document.getElementById('theme-toggle');
            const themeToggleMobileBtn = document.getElementById('theme-toggle-mobile');
            const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
            const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
            const themeToggleDarkIconMobile = document.getElementById('theme-toggle-dark-icon-mobile');
            const themeToggleLightIconMobile = document.getElementById('theme-toggle-light-icon-mobile');

            const applyTheme = (theme) => {
                if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                    themeToggleLightIcon.classList.remove('hidden');
                    themeToggleDarkIcon.classList.add('hidden');
                    themeToggleLightIconMobile.classList.remove('hidden');
                    themeToggleDarkIconMobile.classList.add('hidden');
                } else {
                    document.documentElement.classList.remove('dark');
                    themeToggleDarkIcon.classList.remove('hidden');
                    themeToggleLightIcon.classList.add('hidden');
                    themeToggleDarkIconMobile.classList.remove('hidden');
                    themeToggleLightIconMobile.classList.add('hidden');
                }
            };

            // On page load or when changing themes, best to add inline in `head` to avoid FOUC
            if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                applyTheme('dark');
            } else {
                applyTheme('light');
            }

            const toggleTheme = () => {
                const currentTheme = localStorage.getItem('color-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                const newTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
                
                localStorage.setItem('color-theme', newTheme);
                applyTheme(newTheme);
            };

            themeToggleBtn.addEventListener('click', toggleTheme);
            themeToggleMobileBtn.addEventListener('click', toggleTheme);

            const menuBtn = document.getElementById('menu-btn');
            const mobileMenu = document.getElementById('mobile-menu');
            const menuOpenIcon = document.getElementById('menu-open-icon');
            const menuCloseIcon = document.getElementById('menu-close-icon');

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
            
             // FAQ Accordion
            const accordionItems = document.querySelectorAll('.accordion-item');
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

            // Back to Top Button
            const backToTopBtn = document.getElementById('back-to-top-btn');

            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) { // Mostra o botão após rolar 300px
                    backToTopBtn.classList.add('is-visible');
                } else {
                    backToTopBtn.classList.remove('is-visible');
                }
            });

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
        });