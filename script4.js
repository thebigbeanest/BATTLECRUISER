let speedMin = 1;
let speedMax = 5;


function destroy() {
  const div = document.querySelectorAll('.scourge');
  console.log("clicked");
  div.style.display = 'none';
}

function moveScourge() {
  const div = document.querySelectorAll('.scourge');
  const target = document.getElementById('battleCruiserHitBox');
  const rect = target.getBoundingClientRect();

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
}

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
  const numberOfScourge = 4; // Number of scourge to spawn
  const gameAreaWidth = 2000; // Width of the game area
  
  // Loop to create and position each scourge element
  for (let i = 1; i <= numberOfScourge; i++) {
    const scourge = document.createElement('img');
    scourge.className = 'scourge';
    scourge.id = `scourge${i}`;
    scourge.src = 'assets/SCOURGE.png';
    scourge.alt = 'Scourge Image';
    
    // Randomly position the scourge at the top of the screen
    const randomX = Math.random() * (gameAreaWidth - 20);
    scourge.style.position = 'absolute';
    scourge.style.top = '-100px'; // Position above the game area
    scourge.style.left = `${randomX}px`;
    document.getElementById('scourge1').appendChild(scourge);
  }
}
function startGame() {
    spawnScourge(); // Call the function to spawn scourge when the game begins
    moveScourge(); // Start moving the scourge towards the battlecruiser
  }
startGame();