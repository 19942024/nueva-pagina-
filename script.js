document.addEventListener("DOMContentLoaded", function() {

    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 800, // Duración de la animación
        once: true,    // La animación ocurre solo una vez
    });

    // --- LÓGICA DE FILTRADO REUTILIZABLE ---
    function setupFilter(filterButtonsId, gridSelector, cardSelector) {
        const filterButtons = document.querySelectorAll(`#${filterButtonsId} .filter-btn`);
        const items = document.querySelectorAll(`${gridSelector} > ${cardSelector}`);

        filterButtons.forEach(button => {
            button.addEventListener("click", () => {
                // Gestionar clase activa en botones
                filterButtons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");

                const filter = button.getAttribute("data-filter");

                // Mostrar u ocultar tarjetas según el filtro
                items.forEach(item => {
                    item.style.display = 'none'; // Oculta para una mejor animación de entrada
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        // Usamos un pequeño delay para que la animación se vea mejor
                        setTimeout(() => {
                           item.style.display = 'block';
                        }, 1);
                    }
                });
            });
        });
    }

    // Aplicar la lógica de filtrado a las secciones
    setupFilter('cert-filters', '.cert-grid', '.cert-card');
    setupFilter('project-filters', '.project-gallery', '.project-card');


    // --- LÓGICA DEL ACORDEÓN PARA PROYECTOS ACADÉMICOS ---
    const accordionHeaders = document.querySelectorAll(".accordion-header");

    accordionHeaders.forEach(header => {
        header.addEventListener("click", () => {
            // Cierra todos los demás acordeones para mantener uno abierto a la vez
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== header && otherHeader.classList.contains('active')) {
                    otherHeader.classList.remove("active");
                    otherHeader.nextElementSibling.style.maxHeight = null;
                }
            });
            
            // Alterna el acordeón clickeado
            header.classList.toggle("active");
            const accordionContent = header.nextElementSibling;

            if (header.classList.contains("active")) {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
            } else {
                accordionContent.style.maxHeight = null;
            }
        });
    });

});
