/////////CONST////////
const scourgeDamage = 110;
const scourgeRespawnY = -100; // Y position to respawn Scourge
const respawnDelay = 3000; // Delay in milliseconds before respawning Scourge

const battleCruiserHp = 550;
const battleCruiserLaserDamage = 25;
const battleCruiserYamatoCannonDamage = 300;

/////////LET//////////
let gameOver = false;
let battleCruiserHitbox = document.querySelector("#battleCruiserHitBox")
let battleCruiserHealth = battleCruiserHp;
let scourge = document.querySelectorAll(".scourge")

/////////GAME FUNCTIONS///////////

// Function to move Scourge enemies towards the battlecruiser
function moveScourge() {
    scourge.forEach(scourge => {
        let scourgeX = Math.random() * (600 - 20); // Random X position within game area width
        let scourgeY = Math.random() * -500; // Random Y position above the game area

        setInterval(() => {
            // Calculate direction towards the battlecruiser
            const dx = scourgeX - battleCruiserHitbox.offsetLeft; // X distance between Scourge and Battlecruiser
            const dy = scourgeY - battleCruiserHitbox.offsetTop; // Y distance between Scourge and Battlecruiser
            const distance = Math.sqrt(dx * dx + dy * dy); // Distance between Scourge and Battlecruiser

            // Move Scourge towards the battlecruiser
            scourgeX -= dx / distance; // Adjust Scourge X position based on distance
            scourgeY -= dy / distance; // Adjust Scourge Y position based on distance

            // Update the position of Scourge
            scourge.style.left = scourgeX + 'px';
            scourge.style.top = scourgeY + 'px';

            // Check for collision with the Battlecruiser hitbox
            if (checkCollision(scourge, battleCruiserHitbox)) {
                // Reduce Battlecruiser health
                battleCruiserHealth -= scourgeDamage;
                // Check if Battlecruiser is destroyed
                if (battleCruiserHealth <= 0) {
                    gameOver = true;
                    endGame();
                }
                // Remove Scourge from screen
                scourge.style.display = 'none';
                // Respawn Scourge after delay
                setTimeout(() => {
                    scourge.style.left = Math.random() * (600 - 20) + 'px';
                    scourge.style.top = scourgeRespawnY + 'px';
                    scourge.style.display = 'block';
                }, respawnDelay);
            }
        }, 1000 / 60); // Update every 60 frames per second
    });
}

// Function to check collision between two elements
function checkCollision(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();
    return !(
        rect1.top > rect2.bottom ||
        rect1.bottom < rect2.top ||
        rect1.left > rect2.right ||
        rect1.right < rect2.left
    );
}

// Function to initialize game elements and start the game
function beginGame() {
    battleCruiserHitbox = document.getElementById('battleCruiserHitBox');
    scourge = document.querySelectorAll(".scourge");
    moveScourge(); 
}

// Function to end the game
function endGame() {
    // Game over logic
}
document.addEventListener('mouseenter', function() {
    document.body.style.cursor = 'url("assets/cursor.png"), auto';
});

// Reset the cursor style when the mouse leaves the screen
document.addEventListener('mouseleave', function() {
    document.body.style.cursor = 'auto';
});
// Call beginGame when the DOM content is loaded
document.addEventListener('DOMContentLoaded', beginGame);

beginGame();