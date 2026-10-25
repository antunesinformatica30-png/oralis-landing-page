
document.addEventListener("DOMContentLoaded", () => {
    // MENU HAMBÚRGUER
    const menuButton = document.querySelector(".menu-toggle");
    const navigation = document.querySelector("#main-navigation");

    if (menuButton && navigation) {
        menuButton.addEventListener("click", () => {
            const aberto =
                menuButton.getAttribute("aria-expanded") === "true";

            menuButton.setAttribute("aria-expanded", String(!aberto));
            menuButton.setAttribute(
                "aria-label",
                aberto ? "Abrir menu" : "Fechar menu"
            );

            menuButton.classList.toggle("is-active", !aberto);
            navigation.classList.toggle("is-open", !aberto);
        });

        navigation.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navigation.classList.remove("is-open");
                menuButton.classList.remove("is-active");
                menuButton.setAttribute("aria-expanded", "false");
                menuButton.setAttribute("aria-label", "Abrir menu");
            });
        });

        document.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                navigation.classList.remove("is-open");
                menuButton.classList.remove("is-active");
                menuButton.setAttribute("aria-expanded", "false");
                menuButton.setAttribute("aria-label", "Abrir menu");
            }
        });
    } else {
        console.error("Oralis: botão ou navegação não encontrados.");
    }

    // ANIMAÇÕES AO ROLAR
    const elementos = document.querySelectorAll(
        ".section-header, .treatment-card, .about-image, " +
        ".about-content, .structure-content, .structure-gallery, " +
        ".testimonial-card, .contact-cta, .contact-details, .contact-map"
    );

    const movimentoReduzido = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!movimentoReduzido && "IntersectionObserver" in window) {
        const observador = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12
        });

        elementos.forEach(elemento => {
            elemento.classList.add("reveal");
            observador.observe(elemento);
        });
    } else {
        elementos.forEach(elemento => {
            elemento.classList.add("is-visible");
        });
    }
});
