    // Get element of the mainContainer class
    const container = document.getElementsByClassName('mainContainer')[0];
    const starCount = 150; // Number of stars

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        // Random size between 1px and 3px
        const size = Math.random() * 2 + 1 + 'px';
        star.style.width = size;
        star.style.height = size;

        // Random position within the container
        star.style.top = Math.random() * 100 + '%';
        star.style.left = Math.random() * 100 + '%';

        container.appendChild(star);
    }
