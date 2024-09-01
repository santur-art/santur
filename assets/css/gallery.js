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

        // Show the lightbox
        setTimeout(() => {
            lightboxOverlay.classList.add('active');
        }, 10);

        // Close the lightbox on "X" button click
        lightboxOverlay.querySelector('.close-btn').addEventListener('click', () => {
            closeLightbox(lightboxOverlay);
        });

        // Close the lightbox on "Esc" key press
        document.addEventListener('keydown', function escHandler(event) {
            if (event.key === 'Escape') {
                closeLightbox(lightboxOverlay);
                document.removeEventListener('keydown', escHandler);
            }
        });

        // Close the lightbox when clicking outside the image
        lightboxOverlay.addEventListener('click', function(event) {
            if (event.target === lightboxOverlay) {
                closeLightbox(lightboxOverlay);
            }
        });
    });
});

function closeLightbox(lightboxOverlay) {
    lightboxOverlay.classList.remove('active');
    setTimeout(() => {
        lightboxOverlay.remove();
    }, 300);
}