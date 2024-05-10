/////////LET//////////
let gameOver = false

/////////CONST////////
const battleCruiserHp = 550
const battleCruiserLaserDamage = 25
const battleCruiserYamatoCannonDamage = 300

const scourgeDamage = 110
const scourgeHealth = 25

const battleCruiserLaserSound = null
const battleCruiserYamatoCannonSound = null
const battleCruiserAbandonShipSound = null



/////////EVENTLISTENERS//////
optionsMenuButton.addEventListener('click', () => {
    optionsMenu(run);
});

////////GAME FUNCTIONS///////////

checkGameOver = (gameOver) => {
    if (battleCruiserHp <= 0)
        gameOver = true
}

init = () => {




}
gameOver = () => {
    exit


}
///////SOUND FUNCTIONS//////

lostHpSound = () => {
    if (battleCruiserHp <= 550)
         Audio




}

////////CONSOLE LOGS////////
