const canvasHelper = new CanvasHelper(500, 500);
const documentHelper = new DocumentHelper();

const player = {
    life : 12,    
}

const paths = [
    { x: 10, y: 10 },
    { x: 200, y: 10 },
    { x: 200, y: 200 },
    { x: 10, y: 200 },
    { x: 10, y: 10 }
];

const mStatus = {
    wait: 0,
    running: 1,
    finish: 2
}
let drawMonstersPool = [];//所有要加入動畫的物件

const monsters = new Monsters();
monsters
//加入怪物
.addMonster(new MonsterInfo(20, 20, 'red', 2, paths))
.addMonster(new MonsterInfo(20, 20, 'green', 2, paths))
.addMonster(new MonsterInfo(20, 20, 'red', 2, paths))
.addMonster(new MonsterInfo(20, 20, 'green', 2, paths))
.addMonster(new MonsterInfo(20, 20, 'red', 2, paths))
.addMonster(new MonsterInfo(20, 20, 'green', 2, paths))
//設定出怪頻率
.setFreqC(16)
//設定出怪事件
.setMonsterRlsEvent(function (monster) {
    monster.setRun();
    drawMonstersPool.push(monster);//加入動畫的物件
})
//出完怪後的事件
.setFinishEvent(function () {
    documentHelper.updateGameInfo("monsters all release");
});

function drawEmpty() {
    canvasHelper.clearRect();
}
function drawMonsters() {
    for (let index = 0; index < drawMonstersPool.length; index++) {
        const monster = drawMonstersPool[index];
        const x = monster.x;
        const y = monster.y;
        const h = monster.h;
        const w = monster.w;
        const color = monster.color;
        canvasHelper.drawMonster(x, y, w, h, color);
    }
}

function movingMonsters() {
    //detect if any monster finish paths
    const finishMonster = drawMonstersPool.filter(x => x.isFinishPath());
    for (let index = 0; index < finishMonster.length; index++) {
        const element = finishMonster[index];
        player.life--;
        console.log("monster leave!");
        documentHelper.updateLife(player.life);
    }

    drawMonstersPool = drawMonstersPool.filter(x => x.isRunning());
    for (let index = 0; index < drawMonstersPool.length; index++) {
        const monster = drawMonstersPool[index];
        monster.moving();
    }
}
function releaseMonsters() {
    monsters.monsterRls();
}
function isGameOver(){
    const gameOver = player.life === 0;
    return gameOver;
}
function animate() {
    drawEmpty();
    releaseMonsters();
    drawMonsters();
    movingMonsters();
    if(isGameOver()){
        documentHelper.updateGameInfo("game over");
        return;
    }
    requestAnimationFrame(animate);
}

function startGame(){
    documentHelper.updateGameInfo("game start");
    documentHelper.updateLife(player.life);
    animate();
}

startGame();
