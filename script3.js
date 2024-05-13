let speedMin = 1;
let speedMax = 5;

function start(){
  //make move trigger this instead, and start a timer
}

function destroy() {
  //add projectile from blue to red to destroy it
  const div = document.getElementById('scourge1');
  console.log("clicked");
  div.style.display= 'none';
}

function moveScourge() {
  const div = document.getElementById('scourge1');
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
  const div = document.getElementById('scourge1');
  const target = document.getElementById('battleCruiserHitBox');
  div.style.display= 'block';
  let rect = target.getBoundingClientRect();
  console.log(rect);
  console.log(div.style.top);  
  let transitionString = `all .1s ease-in-out`
  div.style.transition = transitionString;
  div.style.top = "50px";
  div.style.left = "50px";
  console.log(div.style.top);
}

document.addEventListener('mouseenter', function() {
    document.body.style.cursor = 'url("assets/cursor.png"), auto';
});

// Reset the cursor style when the mouse leaves the screen
document.addEventListener('mouseleave', function() {
    document.body.style.cursor = 'auto';
});