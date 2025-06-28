document.addEventListener('DOMContentLoaded', function() {
    
    // =============================================
    // NAVBAR INTELIGENTE (AUTO-HIDE ON SCROLL)
    // =============================================
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar.offsetHeight;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop < navbarHeight) {
            navbar.classList.remove('navbar-hidden');
        } else {
            if (scrollTop > lastScrollTop) {
                navbar.classList.add('navbar-hidden');
            } else {
                navbar.classList.remove('navbar-hidden');
            }
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // =============================================
    // EFECTO CREATIVO EN TARJETAS DE SERVICIO
    // =============================================
    const serviceCards = document.querySelectorAll('.service-card');
    
    if (serviceCards.length > 0) {
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.classList.add('is-selected');
                serviceCards.forEach(otherCard => {
                    if (otherCard !== card) {
                        otherCard.classList.add('is-faded');
                    }
                });
            });
            card.addEventListener('mouseleave', () => {
                serviceCards.forEach(c => {
                    c.classList.remove('is-selected');
                    c.classList.remove('is-faded');
                });
            });
        });
    }

    // =============================================
    // GESTIÓN DEL TEMA (CLARO/OSCURO)
    // =============================================
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            body.classList.remove('dark-mode');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    };
    let currentTheme = localStorage.getItem('theme');
    if (!currentTheme) {
        currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    applyTheme(currentTheme);
    themeToggle.addEventListener('click', () => {
        let newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });

    // =============================================
    // VALIDACIÓN DEL FORMULARIO DE CONTACTO
    // =============================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); event.stopPropagation();
            clearErrors();
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            let isValid = true;
            
            if (name === '') { showError('name', 'Por favor, introduce tu nombre.'); isValid = false; }
            if (phone === '') { showError('phone', 'Por favor, introduce tu teléfono.'); isValid = false; }
            if (email === '') { showError('email', 'El correo electrónico es obligatorio.'); isValid = false; } else if (!isValidEmail(email)) { showError('email', 'Por favor, introduce un correo electrónico válido.'); isValid = false; }
            if (message === '') { showError('message', 'No olvides escribir tu mensaje.'); isValid = false; }
            
            if (isValid) {
                const subject = `Consulta desde la web de Huellitas de Amor - ${name}`;
                const body = `Nombre: ${name}\nTeléfono: ${phone}\nEmail: ${email}\n\nMensaje:\n${message}`;
                const mailtoLink = `mailto:contacto@huellitasdeamor.com.do?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                window.location.href = mailtoLink;
                setTimeout(() => {
                    const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
                    confirmationModal.show();
                    contactForm.reset();
                    clearErrors();
                }, 500);
            }
        });
    }
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        field.classList.add('is-invalid');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback d-block';
        errorDiv.innerText = message;
        field.parentNode.appendChild(errorDiv);
    }
    function clearErrors() {
        const errorMessages = contactForm.querySelectorAll('.invalid-feedback');
        errorMessages.forEach(msg => msg.remove());
        const invalidFields = contactForm.querySelectorAll('.is-invalid');
        invalidFields.forEach(field => field.classList.remove('is-invalid'));
    }
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
});