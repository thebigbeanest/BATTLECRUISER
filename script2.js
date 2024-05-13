// /////////CONST////////
// const scourgeDamage = 110;
// const scourgeRespawnY = -100; // Y position to respawn Scourge
// const respawnDelay = 3000; // Delay in milliseconds before respawning Scourge

// const battleCruiserHp = 550;

// /////////LET//////////
// let gameOver = false;
// let battleCruiserHitbox = document.getElementById('battleCruiserHitBox');
// let battleCruiserHealth = battleCruiserHp;
// let scourge = document.getElementById('scourge1');
// let scourgeHealth = 25

// /////////GAME FUNCTIONS///////////

// // Function to move Scourge enemies towards the battlecruiser
// let speedMin = 1;
// let speedMax = 5;

// function start(){
//   //make move trigger this instead, and start a timer
// }

// function destroy() {
//   //add projectile from blue to red to destroy it
//   const div = document.getElementById('div');
//   console.log("clicked");
//   div.style.display= 'none';
// }

// function moveScourge() {
//     let scourge = document.getElementById('scourge1');
//     let battlecruiser = document.getElementById('battleCruiserHitBox');
    
//     // Calculate the distance between scourge and battlecruiser
//     let dx = battlecruiser.offsetLeft - scourge.offsetLeft;
//     let dy = battlecruiser.offsetTop - scourge.offsetTop;
//     let distance = Math.sqrt(dx * dx + dy * dy);
    
//     // Calculate the speed based on distance
//     let speed = Math.random() * 5 + 1; // Adjust speed range as needed
    
//     // Calculate the movement increments
//     let vx = (dx / distance) * speed;
//     let vy = (dy / distance) * speed;
    
//     // Update the scourge position at regular intervals
//     let interval = setInterval(() => {
//       // Update scourge position
//       scourge.style.left = (scourge.offsetLeft + vx) + 'px';
//       scourge.style.top = (scourge.offsetTop + vy) + 'px';
      
//       // Recalculate distance
//       dx = battlecruiser.offsetLeft - scourge.offsetLeft;
//       dy = battlecruiser.offsetTop - scourge.offsetTop;
//       distance = Math.sqrt(dx * dx + dy * dy);
      
//       // Check if scourge reached battlecruiser
//       if (distance <= speed) {
//         clearInterval(interval); // Stop the interval
//         // Optionally, remove or hide the scourge element
//         scourge.style.display = 'none';
//       }
//     }, 1000 / 60); // Update every 60 frames per second
//   }

// function reset() {
//   let scourge = document.querySelector('scourge1');
//   let battlecruiser = document.getElementById('battleCruiserHitBox');
//   scourge.style.display= 'block';
//   let hitboxDimensions = battlecruiser.getBoundingClientRect();
//   console.log(hitboxDimensions);
//   console.log(scourge.style.top);  
//   let transitionString = `all .1s ease-in-out`
//   scourge.style.transition = transitionString;
//   scourge.style.top = "50px";
//   scourge.style.left = "50px";
//   console.log(scourge.style.top);
// } // Check for collision with the Battlecruiser hitbox
//     // if (checkCollision(scourge, battleCruiserHitbox)) {
//     // // Reduce Battlecruiser health
//     // battleCruiserHealth -= scourgeDamage;
//     // // Check if Battlecruiser is destroyed
//     // if (battleCruiserHealth <= 0) {
//     // gameOver = true;
//     // endGame();
//     // }
//     // // Remove Scourge from screen
//     // scourge.style.display = 'none';
//     // // Respawn Scourge after delay
//     // setTimeout(() => {
//     // scourge.style.left = Math.random() * (600 - 20) + 'px';
//     // scourge.style.top = scourgeRespawnY + 'px';
//     // scourge.style.display = 'block';
//     // }, respawnDelay);
//     // }
// ///////////////////////COLLISION//////////////////////////////////////////////////
// // Function to check collision between two elements
// // function checkCollision(scourge, battleCruiserHitBox) {
// //     const rect1 = scourge.getBoundingClientRect();
// //     const rect2 = battleCruiserHitBox.getBoundingClientRect();
// //     return !(
// //         rect1.top > rect2.bottom ||
// //         rect1.bottom < rect2.top ||
// //         rect1.left > rect2.right ||
// //         rect1.right < rect2.left
// //     );
// // }

// // Function to initialize game elements and start the game
// function beginGame() {
//     battleCruiserHitbox = document.getElementById('battleCruiserHitBox');
//     scourge = document.querySelector("scourge1");
//     moveScourge(); 
// }

// // Function to end the game
// function endGame() {
//     // Game over logic
// }
document.addEventListener('mouseenter', function() {
    document.body.style.cursor = 'url("assets/cursor.png"), auto';
});

// Reset the cursor style when the mouse leaves the screen
document.addEventListener('mouseleave', function() {
    document.body.style.cursor = 'auto';
});
// // Call beginGame when the DOM content is loaded
// document.addEventListener('DOMContentLoaded', beginGame);
