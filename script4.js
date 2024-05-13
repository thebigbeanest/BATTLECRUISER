let speedMin = 10;
let speedMax = 10;


function destroy() {
  const div = document.querySelectorAll('.scourge');
  console.log("clicked");
  div.style.display = 'none';
}

function moveScourge() {
    const divs = document.querySelectorAll('.scourge');
    const target = document.getElementById('battleCruiserHitBox');
    const rect = target.getBoundingClientRect();
  
    divs.forEach(div => {
      // Calculate the angle between the scourge and the target
      const dx = rect.left - div.offsetLeft;
      const dy = rect.top - div.offsetTop;
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
  
      // Set the rotation angle of the scourge image
      div.style.transform = `rotate(${angle}deg)`;
  
      // Move the scourge towards the target
      let speed = Math.floor(Math.random() * (speedMax - speedMin + 1) + speedMin);
      let transitionString = `all ${speed}s ease-in-out`;
      div.style.transition = transitionString;
      div.style.top = rect.top + "px";
      div.style.left = rect.left + "px";
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    const gameArea = document.getElementById('gameArea');

    // Function to shoot laser towards mouse position
    function shootLaser(event) {
        const startX = gameArea.offsetWidth / 2;
        const startY = gameArea.offsetHeight / 2;
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
                return true;
            }
        }
        return false;
    }

    // Event listener for mouse click to shoot laser
    gameArea.addEventListener('click', shootLaser);
});

function reset() {
  const div = document.querySelectorAll('.scourge');
  const target = document.getElementById('battleCruiserHitBox');
  div.style.display = 'block';
  let rect = target.getBoundingClientRect();
  console.log(rect);
  console.log(div.style.top);
  let transitionString = `all .1s ease-in-out`
  div.style.transition = transitionString;
  div.style.top = "50px";
  div.style.left = "50px";
  console.log(div.style.top);
}

function spawnScourge() {
    const gameAreaWidth = 1500; // Width of the game area
  
    function createScourge() {
      const scourge = document.createElement('img');
      scourge.className = 'scourge';
      scourge.src = 'assets/SCOURGE.png';
      scourge.alt = 'Scourge Image';
  
      // Randomly position the scourge at the top of the screen
      const randomX = Math.random() * (gameAreaWidth - 20);
      scourge.style.position = 'absolute';
      scourge.style.top = '30px'; // -100 + Spawns them outside the player's viewing range, keep it in the positives to make sure they're still spawning.
      scourge.style.left = `${randomX}px`;
      document.getElementById('gameArea').appendChild(scourge);
    }
  
    // Create initial scourge
    const numberOfScourge = 4; // Number of initial scourge to spawn
    for (let i = 1; i <= numberOfScourge; i++) {
      createScourge();
    }
  
    // Function to create new scourge after delay
    function spawnNewScourge() {
      setTimeout(createScourge, Math.random() * 1000 + 1000); // Spawn new scourge after 1-2 seconds
    }
  
    // Check for scourge destruction and spawn new ones
    document.addEventListener('DOMNodeRemoved', function(event) {
      if (event.target && event.target.classList.contains('scourge')) {
        spawnNewScourge();
      }
    });
  }

  spawnScourge();





    const laserSound = document.getElementById('laserHit1');
    gameArea.addEventListener('click', function() {
        const music = new Audio('assets/laserHit1.wav');
        music.loop = false; // loop the music
        music.play();
    })


  
  const playButton = document.getElementById('musicButton');
    playButton.addEventListener('click', function() {
        // Play music1
        const music = new Audio('assets/Music1.mp3');
        music.loop = true; // loop the music
        music.play();
    })
function startGame() {
    spawnScourge(); // Call the function to spawn scourge when the game begins
    moveScourge(); // Start moving the scourge towards the battlecruiser
    }
startGame()