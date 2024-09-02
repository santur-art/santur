document.querySelectorAll('.lightbox').forEach(item => {
    item.addEventListener('click', event => {
        event.preventDefault();

        const imgSrc = item.getAttribute('href');
        const lightboxOverlay = document.createElement('div');
        lightboxOverlay.classList.add('lightbox-overlay');
        lightboxOverlay.innerHTML = `
            <div class="lightbox-content">
                <img src="${imgSrc}" alt="">
                <span class="close-btn">&times;</span>
            </div>
        `;
        document.body.appendChild(lightboxOverlay);

        // Show the lightbox with a slight delay for transition
        setTimeout(() => {
            lightboxOverlay.classList.add('active');
        }, 10);

        // Close the lightbox on "X" button click
        lightboxOverlay.querySelector('.close-btn').addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default anchor action
            e.stopPropagation(); // Stop event bubbling
            closeLightbox(lightboxOverlay);
        });

        // Close the lightbox on "Esc" key press or when clicking outside the image
        const closeOnEscapeOrOutsideClick = (event) => {
            if (event.key === 'Escape' || event.keyCode === 27) {
                event.preventDefault(); // Prevent the default back navigation behavior
                closeLightbox(lightboxOverlay);
            } else if (event.target === lightboxOverlay) {
                closeLightbox(lightboxOverlay);
            }
        };

        // Attach keydown and click listeners
        document.addEventListener('keydown', closeOnEscapeOrOutsideClick);
        lightboxOverlay.addEventListener('click', closeOnEscapeOrOutsideClick);

        function closeLightbox(lightboxOverlay) {
            lightboxOverlay.classList.remove('active');
            setTimeout(() => {
                lightboxOverlay.remove();
            }, 300);

            // Remove event listeners to prevent memory leaks
            document.removeEventListener('keydown', closeOnEscapeOrOutsideClick);
            lightboxOverlay.removeEventListener('click', closeOnEscapeOrOutsideClick);
        }
    });
});