function moveMutalisk() {
    const divs = document.querySelectorAll('.mutalisk');
    const target = document.getElementById('battleCruiserHitBox');
    const targetRect = target.getBoundingClientRect();
    const targetCenterX = targetRect.left + targetRect.width / 2; // Calculate the x-coordinate of the center of the target
    const targetCenterY = targetRect.top + targetRect.height / 2; // Calculate the y-coordinate of the center of the target

    divs.forEach(div => {
        // Calculate the distance between the mutalisk and the center of the target
        const mutaliskRect = div.getBoundingClientRect();
        const mutaliskCenterX = mutaliskRect.left + mutaliskRect.width / 2;
        const mutaliskCenterY = mutaliskRect.top + mutaliskRect.height / 2;
        const dx = targetCenterX - mutaliskCenterX; // Calculate the horizontal distance between the mutalisk and the target center
        const dy = targetCenterY - mutaliskCenterY; // Calculate the vertical distance between the mutalisk and the target center
        const distanceToTarget = Math.sqrt(dx * dx + dy * dy); // Calculate the distance to the target center

        console.log("MutaliskRect:", mutaliskRect);
        console.log("Mutalisk Center X:", mutaliskCenterX);
        console.log("Mutalisk Center Y:", mutaliskCenterY);
        console.log("Distance to target:", distanceToTarget);

        if (distanceToTarget > 50) { // Check if the mutalisk is more than 50 pixels away from the target center
            // Move the mutalisk towards the target
            let speed = Math.floor(Math.random() * (speedMax - speedMin + 1) + speedMin);
            let transitionString = `all ${speed}s ease-in-out`;
            div.style.transition = transitionString;
            div.style.top = targetCenterY + "px";
            div.style.left = targetCenterX + "px";
        } else { // Mutalisk is within 50 pixels of the target center
            // Stop the mutalisk
            console.log("Mutalisk stopped");
            div.style.transition = 'none'; // Remove transition effects
        }
    });
}

function fireGlave(mutalisk, targetX, targetY) {
    // Create the glave projectile
    const glave = document.createElement('img');
    glave.className = 'glave';
    glave.src = 'assets/glave.png'; // Image for the glave
    glave.style.position = 'absolute';
    glave.style.width = '30px'; // Adjust size as needed
    glave.style.height = '30px'; // Adjust size as needed

    // Calculate the initial position of the glave (same as mutalisk's position)
    const mutaliskRect = mutalisk.getBoundingClientRect();
    glave.style.left = mutaliskRect.left + 'px';
    glave.style.top = mutaliskRect.top + 'px';

    // Append the glave to the game area
    document.getElementById('gameArea').appendChild(glave);

    // Calculate the angle between the mutalisk and the target
    const dx = targetX - mutaliskRect.left; // Calculate the horizontal distance to the target
    const dy = targetY - mutaliskRect.top; // Calculate the vertical distance to the target
    const angle = Math.atan2(dy, dx); // Calculate the angle in radians

    // Set the speed and direction of the glave
    const speed = 5; // Adjust speed as needed
    const vx = Math.cos(angle) * speed; // Calculate the horizontal velocity
    const vy = Math.sin(angle) * speed; // Calculate the vertical velocity

    // Function to move the glave
    function moveGlave() {
        // Update the position of the glave
        let x = parseFloat(glave.style.left);
        let y = parseFloat(glave.style.top);
        x += vx; // Update horizontal position
        y += vy; // Update vertical position
        glave.style.left = x + 'px';
        glave.style.top = y + 'px';

        // Check if the glave hits the target (battlecruiser hit box)
        const targetRect = document.getElementById('battleCruiserHitBox').getBoundingClientRect();
        if (
            x >= targetRect.left &&
            x <= targetRect.right &&
            y >= targetRect.top &&
            y <= targetRect.bottom
        ) {
            // Glave hits the target, remove the glave and deal damage to the battlecruiser
            glave.remove();
            dealDamageToBattleCruiser(20); // Adjust damage as needed
        } else {
            // Glave missed the target, continue moving
            requestAnimationFrame(moveGlave);
        }
    }

    // Start moving the glave
    moveGlave();
}

function createMutalisk() {
    const mutalisk = document.createElement('img');
    mutalisk.className = 'mutalisk';
    mutalisk.src = 'assets/mutalisk.png';
    mutalisk.alt = 'Mutalisk Image';

    // Randomly position the mutalisk at the top of the screen
    const gameAreaWidth = 2500; // Width of the game area
    const randomX = Math.random() * (gameAreaWidth - 20);
    mutalisk.style.position = 'absolute';
    mutalisk.style.top = '30px'; // -100 + Spawns them outside the player's viewing range, keep it in the positives to make sure they're still spawning.
    mutalisk.style.left = `${randomX}px`;
    document.getElementById('gameArea').appendChild(mutalisk);

    // Move the newly spawned mutalisk
    moveMutalisk();
}

// Function to create new mutalisk after delay
function spawnNewMutalisk() {
    if (isActive) {
        createMutalisk();
    }
}

// Check for mutalisk destruction and spawn new ones
document.addEventListener('mutationObserver', function (event) {
    if (event.target && event.target.classList.contains('mutalisk')) {
        spawnNewMutalisk();
    }
});