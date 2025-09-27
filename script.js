
        document.addEventListener('DOMContentLoaded', () => {
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
        });