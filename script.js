document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach((link, index) => {
        // Function to reset all signal classes
        const resetSignals = () => {
            navLinks.forEach(l => {
                l.classList.remove('current', 'next', 'previous');
            });
        };

        // On Mouse Enter (Hover)
        link.addEventListener('mouseenter', () => {
            resetSignals(); // Start with a clean slate
            
            // 1. Current/Hovered Tab (Soft Yellow)
            link.classList.add('current');

            // 2. Next Tab (Green)
            const nextIndex = index + 1;
            if (nextIndex < navLinks.length) {
                navLinks[nextIndex].classList.add('next');
            }

            // 3. Previous Tab (Soft Red)
            const prevIndex = index - 1;
            if (prevIndex >= 0) {
                navLinks[prevIndex].classList.add('previous');
            }
        });

        // On Mouse Leave
        link.addEventListener('mouseleave', () => {
            // Reset everything when mouse leaves the navigation
            // A more advanced version might keep the signal lit for the currently active section
            resetSignals();
        });
    });
});
