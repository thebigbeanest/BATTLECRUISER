let speedMin = 8;
let speedMax = 12;
let isActive = false;
let winScore = 1000;
let scoreDisplay = document.getElementById('scoreDisplay');




function playVideoOnGameOver() {
    // Create a video element
    const video = document.createElement('video');
    video.src = 'assets/loseCutscene.mp4'; // Set the source of your video
    video.autoplay = true; // Autoplay the video
    video.loop = true; // Loop the video
    video.style.position = 'fixed';
    video.style.top = '0';
    video.style.left = '0';
    video.style.width = '100%';
    video.style.height = '100%';
    video.style.objectFit = 'cover'; // Cover the entire screen
    document.body.appendChild(video);

    // Create a div to darken the background
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Semi-transparent black overlay
    document.body.appendChild(overlay);
}








const winScreen = document.createElement('div');
            winScreen.textContent = 'You Win!';
            winScreen.style.position = 'fixed';
            winScreen.style.top = '50%';
            winScreen.style.left = '50%';
            winScreen.style.transform = 'translate(-50%, -50%)';
            winScreen.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            winScreen.style.color = 'white';
            winScreen.style.padding = '20px';
            winScreen.style.fontSize = '24px';
            winScreen.style.zIndex = '9999';

            const handler = event => event.preventDefault();

            document.onmousedown = () => document.addEventListener("mousemove", handler);
            document.onmouseup = () => document.removeEventListener("mousemove", handler);
            document.onselectstart = () => document.removeEventListener("mousemove", handler);

function clearScourge(){
    scoreDisplay.innerText=0;    
    const scourgeList = document.querySelectorAll('.scourge');
    scourgeList.forEach(scourge => {
        scourge.remove();
        
    });
}
function checkForScourgeHit() {
    const battleCruiserHitBox = document.getElementById('battleCruiserHitBox');
    const battleCruiserHitBoxRect = battleCruiserHitBox.getBoundingClientRect();
    const scourgeList = document.querySelectorAll('.scourge');

    scourgeList.forEach(scourge => {
        const scourgeRect = scourge.getBoundingClientRect();
        if (
            scourgeRect.left < battleCruiserHitBoxRect.right &&
            scourgeRect.right > battleCruiserHitBoxRect.left &&
            scourgeRect.top < battleCruiserHitBoxRect.bottom &&
            scourgeRect.bottom > battleCruiserHitBoxRect.top
        ) {
            // Collision detected
            playCollisionSound();
            dealDamageToBattleCruiser(10);
            scourge.remove();
            spawnNewScourge();
        }
    });
}

function dealDamageToBattleCruiser(damage) {
    const battleCruiser = document.getElementById('battleCruiser');
    const healthDisplay = document.getElementById('healthDisplay');
    let currentHealth = parseInt(healthDisplay.innerText);
    currentHealth -= damage;
    healthDisplay.innerText = currentHealth;

    // Check if the battlecruiser's health drops to or below 0
    if (currentHealth <= 0) {
        // openLoseModal();
        playVideoOnGameOver();
        isActive=false;
        clearScourge();
    }
}

// Function to play the collision sound
function playScourgeHitSound() {
    const collisionSound = new Audio('assets/damageNoise.wav');
    collisionSound.play();
}

// Check for scourge destruction and spawn new ones
document.addEventListener('DOMNodeRemoved', function (event) {
    if (event.target && event.target.classList.contains('scourge')) {
        spawnNewScourge();
    }
});
														  
const gameArea = document.getElementById('gameArea');
const gameAreaRect = gameArea.getBoundingClientRect();
														  

const asteroidWidth = 100; // Width of the asteroid images
const asteroidHeight = 100; // Height of the asteroid images
const spawnInterval = 1000; // Interval between spawning asteroids (in milliseconds)
const moveSpeed = 2; // Speed of the asteroid movement

// Array of asteroid image paths
const asteroidImages = [
    'assets/asteroid1.png',
    'assets/asteroid2.png',
    'assets/asteroid3.png'
];    

    function createAsteroid() {
        if(isActive){
             const asteroid = document.createElement('img');
        const randomIndex = Math.floor(Math.random() * asteroidImages.length); // Generate a random index
        asteroid.className = 'asteroid';
        asteroid.src = asteroidImages[randomIndex]; // Assign a random image from the array
        asteroid.style.width = asteroidWidth + 'px';
        asteroid.style.height = asteroidHeight + 'px';

        // Randomly position the asteroid horizontally within the entire game area
        asteroid.style.left = Math.random() * (gameAreaRect.width - asteroidWidth) + 'px';
        asteroid.style.top = '-' + asteroidHeight + 'px'; // Set initial top position above the game area


        gameArea.appendChild(asteroid);

        // Move the asteroid downwards
        const moveInterval = setInterval(() => {
            const asteroidRect = asteroid.getBoundingClientRect();
            const asteroidBottom = asteroidRect.top + asteroidRect.height; // Calculate bottom position based on the bounding rectangle


            if (asteroidBottom < gameAreaRect.bottom) {
                asteroid.style.top = (parseFloat(asteroid.style.top) + moveSpeed) + 'px';
            } else {
                clearInterval(moveInterval);
                asteroid.remove();
            }
        }, 16); // Approximate 60 FPS        
        }

       
    }
document.addEventListener('DOMContentLoaded', function () {
    let gameArea = document.getElementById('gameArea');

    // Function to shoot laser towards mouse position
    function shootLaser(event) {
																				   
        const startX = battleCruiserHitBox.offsetLeft + battleCruiserHitBox.offsetWidth / 2;
        const startY = battleCruiserHitBox.offsetTop + battleCruiserHitBox.offsetHeight / 2;
        const endX = event.clientX - gameArea.getBoundingClientRect().left;
        const endY = event.clientY - gameArea.getBoundingClientRect().top;

        const dx = endX - startX;
        const dy = endY - startY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const stepX = dx / distance;
        const stepY = dy / distance;
        const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;

        let x = startX;
        let y = startY;

        const laser = document.createElement('div');
        laser.className = 'laser';
        laser.style.left = x + 'px';
        laser.style.top = y + 'px';
        laser.style.transform = `rotate(${angle}deg)`;
        gameArea.appendChild(laser);

        // Move the laser towards the mouse position with an interval
        const laserMoveInterval = setInterval(() => {
            x += stepX * 5; // Adjust speed as needed
            y += stepY * 5; // Adjust speed as needed
            laser.style.left = x + 'px';
            laser.style.top = y + 'px';

            // Check for collision with scourge
            if (checkForCollision(laser)) {
                clearInterval(laserMoveInterval);
                laser.remove();
            }

            // Remove the laser if it leaves the screen
            if (x < 0 || x > gameArea.offsetWidth || y < 0 || y > gameArea.offsetHeight) {
                clearInterval(laserMoveInterval);
                laser.remove();
            }
        }, 10); // Interval time in milliseconds
    }
						
    // Array of sound effect file paths
    const deathSounds = [
        'assets/zavdth00.wav',
        'assets/zavpss01.wav',
        'assets/scourgeDeath.wav',
        // Add more sound effect paths as needed
    ];
    // Function to play a random sound effect when a scourge is destroyed
    function playRandomScourgeDestroyedSound() {
        // Randomly select a sound effect from the array
        const randomIndex = Math.floor(Math.random() * deathSounds.length);
        const randomSound = deathSounds[randomIndex];

        // Create an audio element for the selected sound effect
        const audio = new Audio(randomSound);

        // Play the selected sound effect
        audio.play();
								 
					   
    }

    let yamatoCannonReady = true;

    // Event listener for Spacebar key press
    document.addEventListener('keydown', function (event) {
        if (event.code === 'Space') {
            yamatoCannon();
        }
    });

    function yamatoCannon() {
        if (yamatoCannonReady) {
            // Play charging sound effect
            playChargingSound();
            const yamatoCharge = 
                // Set yamatoCannonReady to false to prevent firing again immediately
                yamatoCannonReady = false;

            // Wait for 12 seconds (recharge time)
            setTimeout(() => {
                // Play firing sound effect
                playFiringSound();
                    // new audio(src='assets/yamatofire.wav')
                // Display visual effect (giant beam laser)
                displayBeamLaser();

                // Clear all scourge elements from the screen
                clearEnemies();
                function clearEnemies() {
                    const scourgeList = document.querySelectorAll('.scourge');
                    const mutaliskList = document.querySelectorAll('.mutalisk');
                    scourgeList.forEach(scourge => {
                        scourge.remove();

                        mutaliskList.forEach(mutalisk => {
                            mutalisk.remove();
                    });
                })
                // Set yamatoCannonReady to true after recharge time
                yamatoCannonReady = true;

                // Play sound effect for cannon recharged
                playRechargedSound();
            }}, 12000); // 12 seconds in milliseconds
        }
    }
    

    // Function to check for collision with scourge
    function checkForCollision(laser) {
        const scourgeList = document.querySelectorAll('.scourge');
        const laserRect = laser.getBoundingClientRect();

        for (let i = 0; i < scourgeList.length; i++) {
            const scourge = scourgeList[i];
            const scourgeRect = scourge.getBoundingClientRect();
            if (
                laserRect.left < scourgeRect.right &&
                laserRect.right > scourgeRect.left &&
                laserRect.top < scourgeRect.bottom &&
                laserRect.bottom > scourgeRect.top
            ) {
                // Collision detected, remove the scourge
                scourge.remove();

                // Play a random sound effect
                playRandomScourgeDestroyedSound();

                // Add 10 points to the score
                addToScore(10);

                return true;
            }
        }
        return false;
    }
    // Function to add points to the score
    function addToScore(points) {
        const scoreDisplay = document.getElementById('scoreDisplay');
        let currentScore = parseInt(scoreDisplay.innerText);
        currentScore += points;
        scoreDisplay.innerText = currentScore;

        if (currentScore >= winScore) {
            // Display "You Win" screen
            
            document.body.appendChild(winScreen);
            isActive=false;
            clearScourge();    
    }
}



    // Event listener for mouse click to shoot laser
    gameArea.addEventListener('click', shootLaser);
});
// Function to check for collision with scourge
function checkForScourgeImpact() {
    const scourgeList = document.querySelectorAll('.scourge');
    const bcRect = battleCruiserHitBox.getBoundingClientRect();

    for (let i = 0; i < scourgeList.length; i++) {
        const scourge = scourgeList[i];
        const scourgeRect = scourge.getBoundingClientRect();
        if (
            bcRect.left < scourgeRect.right &&
            bcRect.right > scourgeRect.left &&
            bcRect.top < scourgeRect.bottom &&
            bcRect.bottom > scourgeRect.top
        ) {
            // Collision detected, remove the scourge
            scourge.remove();

            // Play a random sound effect
            playScourgeHitSound();

            // Add 10 points to the score
            dealDamageToBattleCruiser(10);
        }
    }
    return false;
}

document.addEventListener('DOMContentLoaded', function() {
    const gameArea = document.getElementById('gameArea');

    // Add event listeners to change the cursor when entering and leaving the game area
    gameArea.addEventListener('mouseenter', function() {
        gameArea.style.cursor = 'url("assets/cursor.png"), auto'; // Change to custom cursor
        // Alternatively, use a predefined cursor
        // gameArea.style.cursor = 'crosshair';
    });

    gameArea.addEventListener('mouseleave', function() {
        gameArea.style.cursor = 'auto'; // Revert to default cursor
    });
});



function moveScourge() {
    const divs = document.querySelectorAll('.scourge');
    const target = document.getElementById('battleCruiserHitBox');
    const targetRect = target.getBoundingClientRect();
    const targetCenterX = targetRect.left + targetRect.width / 2; // Calculate the x-coordinate of the center of the target
    const targetCenterY = targetRect.top + targetRect.height / 2; // Calculate the y-coordinate of the center of the target

    divs.forEach(div => {
        // Calculate the angle between the scourge and the target
        const dx = targetCenterX - (div.offsetLeft + div.offsetWidth / 2); // Calculate the horizontal distance between the centers
        const dy = targetCenterY - (div.offsetTop + div.offsetHeight / 2); // Calculate the vertical distance between the centers
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);

        // Set the rotation angle of the scourge image
        div.style.transform = `rotate(${angle}deg)`;

        // Move the scourge towards the target
        let speed = Math.floor(Math.random() * (speedMax - speedMin + 1) + speedMin);
        let transitionString = `all ${speed}s ease-in-out`;
        div.style.transition = transitionString;
        div.style.top = targetCenterY + "px";
        div.style.left = targetCenterX + "px";

        setInterval(checkForScourgeImpact, 500);
    });
}

function createScourge() {
    const scourge = document.createElement('img');
    scourge.className = 'scourge';
    scourge.src = 'assets/SCOURGE.png';
    scourge.alt = 'Scourge Image';

    // Randomly position the scourge at the top of the screen
    const gameAreaWidth = 2500; // Width of the game area
    const randomX = Math.random() * (gameAreaWidth - 20);
    scourge.style.position = 'absolute';
    scourge.style.top = '30px'; // -100 + Spawns them outside the player's viewing range, keep it in the positives to make sure they're still spawning.
    scourge.style.left = `${randomX}px`;
    document.getElementById('gameArea').appendChild(scourge);

    // Move the newly spawned scourge
    moveScourge();
}

// Function to create new scourge after delay
function spawnNewScourge() {
    if(isActive){
        createScourge();
    }
    
}
document.addEventListener('mutationObserver', function (event) {
    if (event.target && event.target.classList.contains('scourge')) {
        checkForScourgeImpact();
    }
});

// Check for scourge destruction and spawn new ones
document.addEventListener('mutationObserver', function (event) {
    if (event.target && event.target.classList.contains('scourge')) {
        spawnNewScourge();
    }
});


const laserSound = document.getElementById('laserHit1');
gameArea.addEventListener('click', function () {
    const music = new Audio('assets/laserHit1.wav');
    music.loop = false; // loop the music
    music.play();
})















function moveMutalisk() {
    const divs = document.querySelectorAll('.mutalisk');
    const target = document.getElementById('battleCruiserHitBox');
    const targetRect = target.getBoundingClientRect();
    const targetCenterX = targetRect.left + targetRect.width / 2; // Calculate the x-coordinate of the center of the target
    const targetCenterY = targetRect.top + targetRect.height / 2; // Calculate the y-coordinate of the center of the target

    divs.forEach(div => {
        // Initialize the lastFireTime property if it doesn't exist
        if (!div.lastFireTime) {
            div.lastFireTime = 0;
        }

        // Calculate the distance between the mutalisk and the center of the target
        const mutaliskRect = div.getBoundingClientRect();
        const mutaliskCenterX = mutaliskRect.left + mutaliskRect.width / 2;
        const mutaliskCenterY = mutaliskRect.top + mutaliskRect.height / 2;
        const dx = targetCenterX - mutaliskCenterX; // Calculate the horizontal distance between the mutalisk and the target center
        const dy = targetCenterY - mutaliskCenterY; // Calculate the vertical distance between the mutalisk and the target center
        const distanceToTarget = Math.sqrt(dx * dx + dy * dy); // Calculate the distance to the target center

        if (distanceToTarget > 500) { // Check if the mutalisk is more than 500 pixels away from the target center
            // Move the mutalisk towards the target
            const speed = 1; // Adjust the speed as needed

            // Normalize the direction vector and move the mutalisk towards the target
            const normFactor = speed / distanceToTarget;
            const moveX = dx * normFactor;
            const moveY = dy * normFactor;

            // Update the mutalisk's position
            div.style.left = `${mutaliskRect.left + moveX}px`;
            div.style.top = `${mutaliskRect.top + moveY}px`;
        } else {
            const currentTime = Date.now();
            const cooldown = 2000; // 2 seconds cooldown

            if (currentTime - div.lastFireTime >= cooldown) {
                fireGlave(div, targetCenterX, targetCenterY); // Fire glave at the target
                div.lastFireTime = currentTime; // Update the last fire time
            }
        }
    });

    // Continue moving the mutalisks
    requestAnimationFrame(moveMutalisk);
}

// Initial call to start moving mutalisks
moveMutalisk();


    function fireGlave(div, targetX, targetY) {
        if (!div) {
            console.error("Mutalisk element not found");
            return;
        }
    
        const glave = document.createElement('img');
        glave.className = 'glave';
        glave.src = 'assets/glave.png';
        glave.style.position = 'absolute';
        glave.style.width = '30px';
        glave.style.height = '30px';
    
        const mutaliskRect = div.getBoundingClientRect();
        const mutaliskCenterX = mutaliskRect.left + mutaliskRect.width / 2;
        const mutaliskCenterY = mutaliskRect.top + mutaliskRect.height / 2;
    
        glave.style.left = mutaliskCenterX + 'px'; // Spawn glave at mutalisk's center X position
        glave.style.top = mutaliskCenterY + 'px'; // Spawn glave at mutalisk's center Y position
    
        document.getElementById('gameArea').appendChild(glave);
    
        const dx = targetX - mutaliskCenterX;
        const dy = targetY - mutaliskCenterY;
        const angle = Math.atan2(dy, dx);
    
        const speed = 5;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
    
        function moveGlave() {
            let x = parseFloat(glave.style.left);
            let y = parseFloat(glave.style.top);
            x += vx;
            y += vy;
            glave.style.left = x + 'px';
            glave.style.top = y + 'px';
    
            const target = document.getElementById('battleCruiserHitBox');
            if (!target) {
                console.error("Target element 'battleCruiserHitBox' not found");
                return;
            }
    
            const targetRect = target.getBoundingClientRect();
            if (
                x >= targetRect.left &&
                x <= targetRect.right &&
                y >= targetRect.top &&
                y <= targetRect.bottom
            ) {
                glave.remove();
                dealDamageToBattleCruiser(20);
            } else {
                requestAnimationFrame(moveGlave);
            }
        }
    
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





















// Get the modal
let loseModal = document.getElementById("loseModal");

// Get the <span> element that closes the modal
let closeButton = document.getElementById("loseClose");

// When the user clicks on the button, open the modal
let openLoseModal = function () {
    loseModal.style.display = "block";
}

closeButton.onclick = function () {
    loseModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == loseModal) {
        loseModal.style.display = "none";
    }
}


const startButton = document.getElementById('start');
startButton.onclick=function(event){
    startGame();
}
const playButton = document.getElementById('musicButton');
playButton.addEventListener('click', function () {
    // Play music1
    const music = new Audio('assets/Music1.mp3');
    music.loop = true; // loop the music
    music.play();
})
function startGame() {
    if (document.body.contains(winScreen)) {
        document.body.removeChild(winScreen);
    }
    clearScourge();
    isActive = true;
    //Initial spawning of scourge
    const numberOfScourge = 10; // Number of initial scourge to spawn
    const numberOfMutalisk = 2;
    for (let i = 0; i < numberOfScourge; i++) {
        spawnNewScourge();
    }

    createScourge(); // Call the function to spawn scourge when the game begins
    setInterval(createAsteroid, spawnInterval); // Spawn asteroids at regular intervals
    moveScourge(); // Start moving the scourge towards the battlecruiser
    createMutalisk(); // Spawn mutalisks when the game begins
}
