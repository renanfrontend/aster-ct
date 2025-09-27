
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
        });