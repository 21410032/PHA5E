
// Selecting each thumbnail individually
const thumbnail1 = document.querySelector('#thumbnail1');
const thumbnail2 = document.querySelector('#thumbnail2');
const thumbnail3 = document.querySelector('#thumbnail3');
const thumbnail4 = document.querySelector('#thumbnail4');

const textOverlay = document.getElementById("textOverlay");
const movementLimit = 100; // Limit in pixels

// Store original positions globally for each thumbnail
const originalPositions = {
    thumbnail1: { x: 0, y: 0 },
    thumbnail2: { x: 0, y: 0 },
    thumbnail3: { x: 0, y: 0 },
    thumbnail4: { x: 0, y: 0 },
};

// Initialize original positions once at load
function setOriginalPositions() {
    originalPositions.thumbnail1.x = thumbnail1.querySelector('.moveable-content').offsetLeft;
    originalPositions.thumbnail1.y = thumbnail1.querySelector('.moveable-content').offsetTop;
    originalPositions.thumbnail2.x = thumbnail2.querySelector('.moveable-content').offsetLeft;
    originalPositions.thumbnail2.y = thumbnail2.querySelector('.moveable-content').offsetTop;
    originalPositions.thumbnail3.x = thumbnail3.querySelector('.moveable-content').offsetLeft;
    originalPositions.thumbnail3.y = thumbnail3.querySelector('.moveable-content').offsetTop;
    originalPositions.thumbnail4.x = thumbnail4.querySelector('.moveable-content').offsetLeft;
    originalPositions.thumbnail4.y = thumbnail4.querySelector('.moveable-content').offsetTop;
}

setOriginalPositions(); // Set positions at start

// Function to update movement of the wrapper within range, with transition smoothing
const updateWrapperPosition = (wrapper, originalPosition, targetX, targetY) => {
    // Calculate distance from original position
    const distanceX = targetX - originalPosition.x;
    const distanceY = targetY - originalPosition.y;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance > movementLimit) {
        const scale = movementLimit / distance;
        targetX = originalPosition.x + (distanceX * scale);
        targetY = originalPosition.y + (distanceY * scale);
    }

    // Smoothly move wrapper towards target
    wrapper.style.transition = 'transform 0.3s ease';
    wrapper.style.transform = `translate(${targetX}px, ${targetY}px)`;
};

// Reset function for when mouse leaves thumbnail area
const resetWrapperPosition = (wrapper, originalPosition) => {
    wrapper.style.transition = 'transform 0.4s ease';
    wrapper.style.transform = `translate(${originalPosition.x}px, ${originalPosition.y}px)`;
};

// Function to handle hover and movement for each thumbnail
const addThumbnailEvents = (thumbnail, originalPositionKey) => {
    const wrapper = thumbnail.querySelector('.moveable-content');
    const originalPosition = originalPositions[originalPositionKey];

    thumbnail.addEventListener('mouseover', () => {
        textOverlay.classList.add('outline-text');
        document.querySelectorAll('.thumbnails').forEach(thumb => thumb.classList.remove('faded', 'hovered'));

        document.querySelectorAll('.thumbnails').forEach(thumb => {
            if (thumb !== thumbnail) {
                thumb.classList.add('faded');
            } else {
                thumb.classList.add('hovered');
            }
        });
    });

    thumbnail.addEventListener('mousemove', (e) => {
        const rect = thumbnail.getBoundingClientRect();
        const targetX = e.clientX - rect.left - (wrapper.offsetWidth / 2);
        const targetY = e.clientY - rect.top - (wrapper.offsetHeight / 2);

        // Update wrapper position with movement limit within range
        updateWrapperPosition(wrapper, originalPosition, targetX, targetY);
    });

    thumbnail.addEventListener('mouseleave', () => {
        // Reset wrapper to original position smoothly
        resetWrapperPosition(wrapper, originalPosition);

        document.querySelectorAll('.thumbnails').forEach(thumb => thumb.classList.remove('faded', 'hovered'));
        textOverlay.classList.remove('outline-text');
    });
};

// Add events to each specific thumbnail
addThumbnailEvents(thumbnail1, 'thumbnail1');
addThumbnailEvents(thumbnail2, 'thumbnail2');
addThumbnailEvents(thumbnail3, 'thumbnail3');
addThumbnailEvents(thumbnail4, 'thumbnail4');
