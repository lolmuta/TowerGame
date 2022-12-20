const canvasHelper = new CanvasHelper(500, 500);
const documentHelper = new DocumentHelper();

const player = {
    life: 12,
    score: 0
}

//定義 monsters
const paths = [
    { x: 10, y: 10 },
    { x: 200, y: 10 },
    { x: 200, y: 200 },
    { x: 10, y: 200 },
    { x: 10, y: 10 }
];
const monsters = new Monsters()
    .addMonster(new Monster(20, 20, 'red', 2, paths))
    .addMonster(new Monster(20, 20, 'green', 2, paths))
    .addMonster(new Monster(20, 20, 'red', 2, paths))
    .addMonster(new Monster(20, 20, 'green', 2, paths))
    .addMonster(new Monster(20, 20, 'red', 2, paths))
    .addMonster(new Monster(20, 20, 'green', 2, paths))
    .setFreqC(16)
    .setFinishEvent(function () {
        documentHelper.updateGameInfo("monsters all release");
    })
    .setMonsterReachDest(function(destMonster){
        player.life--;
        console.log("monster leave!");
        documentHelper.updateLife(player.life);
    })
    .setMonsterDieEvent(function(dieMonster){
        const score = dieMonster.score;
        player.score += score;
        documentHelper.updateScore(player.score);
    })
    .setDrawMonsterEvent(function(monster){
        const x = monster.x;
        const y = monster.y;
        const h = monster.h;
        const w = monster.w;
        const color = monster.color;
        canvasHelper.drawMonster(x, y, w, h, color);
    });

//定義飛彈
const missles = new Missles()
    .setDrawMissleEvent(function(missle){
        canvasHelper.drawMissle(missle.x, missle.y, missle.w, missle.h);
    })
    .setMissleHitEvent(function(missle){
        console.log("missle hit monster");
    })
    .setMonsterKilledEvent(function(monster){
        console.log("monster is killed!");
    })
    ;

const tower = new Tower()
    .setSize(20, 20)
    .setLocation(100, 100)
    .setDamge(1)
    .setRange(400)
    .setFreq(40)
    .setMonsters(monsters.getDrawMonstersPool())
    .setMisslePool(missles.getMisslePool());

const towers = new Towers()
    .addTower(tower)
    .setDrawEvent(function(tower){
        canvasHelper.drawTower(tower.x, tower.y, tower.w, tower.h);
    });



function drawEmpty() {
    canvasHelper.clearRect();
}

function monsterAnimation() {
    monsters.doAnimation();
}
function isGameOver() {
    const gameOver = player.life === 0;
    return gameOver;
}


function towerAnimation(){
    towers.doAnimation();
}
function missleAnimation(){
    missles.doAnimation();
}
function animate() {
    drawEmpty();
    monsterAnimation();
    towerAnimation();
    missleAnimation();
    if (isGameOver()) {
        documentHelper.updateGameInfo("game over");
        return;
    }
    requestAnimationFrame(animate);
}

function startGame() {
    documentHelper.updateGameInfo("game start");
    documentHelper.updateLife(player.life);
    documentHelper.updateScore(player.score);
    animate();
}

startGame();
