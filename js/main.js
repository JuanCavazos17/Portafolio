/* main.js
   Lógica principal de UI, efectos y navegación.
*/

document.addEventListener('DOMContentLoaded', () => {
    
    // Escuchar la carga de componentes para inicializar sus scripts específicos
    document.addEventListener('componentLoaded', (e) => {
        // Caso Header: Iniciar BB-8 y Menú
        if (e.detail === 'inject-header') {
            initThemeToggle();     // Lógica del BB-8
            initMobileMenu();      // Lógica de la Hamburguesa
        }

        // Caso Footer: Poner el año actual
        if (e.detail === 'inject-footer') {
            const yearSpan = document.getElementById('year-placeholder');
            if (yearSpan) {
                yearSpan.textContent = new Date().getFullYear();
            }
        }
    });

});

/**
 * Inicializa el cambio de tema (Dark/Light) con BB-8
 */
function initThemeToggle() {
    const toggleInput = document.getElementById('theme-toggle');
    const body = document.body;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        if(toggleInput) toggleInput.checked = true;
    }

    if (toggleInput) {
        toggleInput.addEventListener('change', () => {
            if (toggleInput.checked) {
                body.classList.add('light-mode');
                localStorage.setItem('theme', 'light');
            } else {
                body.classList.remove('light-mode');
                localStorage.setItem('theme', 'dark');
            }
        });
    }
}

/**
 * Lógica del Menú Hamburguesa
 */
function initMobileMenu() {
    const menuCheckbox = document.getElementById('menu-toggle-checkbox');
    const menuContainer = document.getElementById('inject-menu');

    if (menuCheckbox && menuContainer) {
        menuCheckbox.addEventListener('change', () => {
            if (menuCheckbox.checked) {
                // Abrir menú
                menuContainer.classList.add('menu-active');
                // Bloquear scroll del body
                document.body.style.overflow = 'hidden'; 
            } else {
                // Cerrar menú
                menuContainer.classList.remove('menu-active');
                // Reactivar scroll
                document.body.style.overflow = 'auto';
            }
        });
    }
}

/**
 * Función global para cerrar el menú al hacer clic en un enlace
 * (Llamada desde el HTML en onclick="closeMenu()")
 */
function closeMenu() {
    const menuCheckbox = document.getElementById('menu-toggle-checkbox');
    const menuContainer = document.getElementById('inject-menu');
    
    // Solo actuamos si estamos en móvil (si el checkbox existe y está marcado)
    if (menuCheckbox && menuCheckbox.checked) {
        menuCheckbox.checked = false; // Desmarcar el checkbox (revierte la animación SVG)
        menuContainer.classList.remove('menu-active');
        document.body.style.overflow = 'auto';
    }
}