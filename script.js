let started = false;

// Click to start
document.getElementById('startOverlay').addEventListener('click', () => {
    const overlay = document.getElementById('startOverlay');
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 800);
    started = true;

    // Start the animation sequence
    startAnimation();
});

function startAnimation() {
    // Play birthday song immediately
    const audio = document.getElementById('birthdaySong');
    audio.play().catch(e => {
        console.log('Audio playback failed:', e);
        // Show alert if audio fails
        alert('Please unmute your browser or check audio permissions');
    });

    // Wait 5 seconds, then light the candles and darken background
    setTimeout(() => {
        // Add lit class to all flames
        for (let i = 1; i <= 6; i++) {
            document.getElementById(`flame${i}`).classList.add('lit');
        }

        // Darken the background
        document.body.classList.add('dark');

        // Activate ambient glow
        document.getElementById('ambientGlow').classList.add('active');
    }, 5000);

    // Blow out the candles after 5 more seconds (10 seconds total)
    setTimeout(() => {
        // Add blow-out animation class to all flames
        for (let i = 1; i <= 6; i++) {
            const flame = document.getElementById(`flame${i}`);
            flame.classList.add('blowing-out');
            flame.classList.remove('lit');
        }

        // Lighten the background with smooth transition
        document.body.classList.remove('dark');

        // Remove ambient glow
        document.getElementById('ambientGlow').classList.remove('active');

        // Change text to "HAPPY 21st BIRTHDAY"
        document.getElementById('birthdayText').textContent = 'HAPPY 21st BIRTHDAY';

        // Wait 3 seconds, then hide cake and text, show letter
        setTimeout(() => {
            document.getElementById('birthdayText').classList.add('hide');
            document.querySelector('.cake-container').classList.add('hide');
            document.getElementById('letterContainer').classList.add('show');
        }, 3000);

        // Keep the music playing
    }, 10000);
}

// Letter Opening functionality
document.getElementById('letterRibbon').addEventListener('click', () => {
    const ribbon = document.getElementById('letterRibbon');
    const scroll = document.getElementById('letterScroll');

    // Remove ribbon with animation
    ribbon.classList.add('removed');

    // Open the scroll
    setTimeout(() => {
        scroll.classList.add('opened');

        // After letter is read (1 minute), show gift box
        setTimeout(() => {
            document.getElementById('letterContainer').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('letterContainer').style.display = 'none';
                document.getElementById('giftBox').classList.add('show');
                document.getElementById('coupleGifContainer').classList.add('show');
            }, 800);
        }, 60000);
    }, 500);
});

// Gift Box Opening with Confetti
document.getElementById('giftBox').addEventListener('click', function () {
    const giftBox = document.getElementById('giftBox');

    // Only open if not already opened
    if (!giftBox.classList.contains('opened')) {
        giftBox.classList.add('opened');

        // Create confetti explosion
        createConfetti();

        // Fade out gift box and couple emojis slowly
        setTimeout(() => {
            giftBox.style.transition = 'opacity 2s ease-out';
            giftBox.style.opacity = '0';
            document.getElementById('coupleGifContainer').style.transition = 'opacity 2s ease-out';
            document.getElementById('coupleGifContainer').style.opacity = '0';

            // Show final couple GIF after gift box disappears
            setTimeout(() => {
                document.getElementById('finalCoupleGif').classList.add('show');
            }, 2000);
        }, 500);
    }
});

function createConfetti() {
    const confettiContainer = document.getElementById('confettiContainer');
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff69b4', '#ffd700', '#ff4500', '#7fff00', '#ff1493', '#00ff7f', '#9370db', '#ff6347', '#87ceeb', '#ffa500', '#32cd32', '#ba55d3'];
    const confettiCount = 600;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';

        // Random properties for blast effect
        const angle = (Math.random() * 360) * (Math.PI / 180);
        const velocity = Math.random() * 400 + 200;
        const tx = Math.cos(angle) * velocity;
        const tyUp = -Math.abs(Math.sin(angle) * velocity * 0.8); // Blast upward
        const ty = Math.random() * 600 + 200; // Fall down
        const txStart = tx * 0.3; // Initial horizontal spread
        const rotate = Math.random() * 1080 + 360;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const delay = Math.random() * 0.05;
        const size = Math.random() * 10 + 5;

        // Set custom properties
        confetti.style.setProperty('--tx', tx + 'px');
        confetti.style.setProperty('--tx-start', txStart + 'px');
        confetti.style.setProperty('--ty-up', tyUp + 'px');
        confetti.style.setProperty('--ty', ty + 'px');
        confetti.style.setProperty('--rotate', rotate + 'deg');
        confetti.style.background = color;
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';
        confetti.style.animationDelay = delay + 's';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';

        confettiContainer.appendChild(confetti);

        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 2500 + delay * 1000);
    }
}

