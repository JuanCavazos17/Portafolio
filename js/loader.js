/*
  loader.js
  Encargado de cargar asíncronamente los componentes
  HTML (parciales) e inyectarlos en el index.html.
 */

document.addEventListener("DOMContentLoaded", () => {
    // Definimos un array de objetos con la ruta del archivo y el ID del contenedor destino
    const components = [
        { file: 'partials/header.html', target: 'inject-header' },
        { file: 'partials/menu.html', target: 'inject-menu' },
        { file: 'partials/banner.html', target: 'inject-banner' },
        { file: 'partials/cinta.html', target: 'inject-cinta' },
        { file: 'partials/experiencia.html', target: 'inject-experiencia' },
        { file: 'partials/educacion.html', target: 'inject-educacion' },
        { file: 'partials/contacto.html', target: 'inject-contacto' },
        //{ file: 'partials/footer.html', target: 'inject-footer' }
    ];

    // Iteramos sobre cada componente para cargarlo
    components.forEach(component => {
        loadComponent(component.file, component.target);
    });
});

/**
 * Función asíncrona para obtener el HTML y pegarlo en el DOM
 * @param {string} filePath - La ruta al archivo .html
 * @param {string} targetId - El ID del div donde se pondrá el contenido
 */
async function loadComponent(filePath, targetId) {
    try {
        const response = await fetch(filePath);
        
        if (!response.ok) {
            throw new Error(`Error cargando ${filePath}: ${response.statusText}`);
        }

        const htmlContent = await response.text();
        const element = document.getElementById(targetId);
        
        if (element) {
            element.innerHTML = htmlContent;
            // Despachamos un evento personalizado para avisar que este componente cargó
            // (Útil si necesitamos inicializar animaciones en ese HTML específico)
            document.dispatchEvent(new CustomEvent('componentLoaded', { detail: targetId }));
        }
    } catch (error) {
        console.error('Error en el sistema de parciales:', error);
    }
}