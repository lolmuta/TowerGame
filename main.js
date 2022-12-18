const canvasHelper = new CanvasHelper(500, 500);
const documentHelper = new DocumentHelper();

const player = {
    life: 12,
}

const paths = [
    { x: 10, y: 10 },
    { x: 200, y: 10 },
    { x: 200, y: 200 },
    { x: 10, y: 200 },
    { x: 10, y: 10 }
];

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

let drawMisslePool = [];
const tower = new Tower();
tower.setSize(20, 20)
    .setLocation(100, 100)
    .setDamge(10)
    .setRange(4000)
    .setFreq(10)
    .setShootTargetEvent(function (missle) {
        missle.setRun();
        drawMisslePool.push(missle);
    })
    .setMonsters(drawMonstersPool);


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
function isGameOver() {
    const gameOver = player.life === 0;
    return gameOver;
}
function drawTower() {
    canvasHelper.drawTower(tower.x, tower.y, tower.w, tower.h);
}
function towerAttackMonster() {
    tower.setMonsters(drawMonstersPool)
        .shoot();
}
function drawMissle() {
    for (let index = 0; index < drawMisslePool.length; index++) {
        const missle = drawMisslePool[index];
        canvasHelper.drawMissle(missle.x, missle.y, missle.w, missle.h);
    }
}
function movingMissle() {
    const finishMissles = drawMisslePool.filter(x => x.isFinishPath());
    finishMissles.forEach(missle => {
        const monster = missle.getTarget();
        //若怪物已經走完，則不用再計算傷害
        if (monster.isFinishPath()) {
            return;//continue
        }
        const damage = missle.getTowerDamage();
        monster.setBeAttackedDamage(damage);
        const isDie = monster.isDie();
        if (isDie) {
            console.log("todo monster is die");
        }
    });
    drawMisslePool = drawMisslePool.filter(x => !x.isFinishPath());
    drawMisslePool.forEach(missle => {
        missle.moving();
    });
}
function animate() {
    drawEmpty();
    drawTower();
    releaseMonsters();
    drawMonsters();
    movingMonsters();
    towerAttackMonster();
    drawMissle();
    movingMissle();
    if (isGameOver()) {
        documentHelper.updateGameInfo("game over");
        return;
    }
    requestAnimationFrame(animate);
}

function startGame() {
    documentHelper.updateGameInfo("game start");
    documentHelper.updateLife(player.life);

    animate();
}

startGame();
