const canvasHelper = new CanvasHelper(500, 500);
const documentHelper = new DocumentHelper();

const player = {
    life: 5,
    score: 0
}

//定義 monsters
const paths = [
    { x: 10, y: 10 + 20 },
    { x: 210, y: 10 + 20 },
    { x: 210, y: 210 + 20  },
    { x: 10, y: 210 + 20 },
    { x: 10, y: 10 + 20 }
];
//定義建塔的位置
const towerPlaceArea = [
    { x: 110 - 40, y: 110 - 40 + 20 },
    { x: 110 - 40, y: 110 + 20 },
    { x: 110 - 40, y: 110 + 40+ 20  },
    { x: 110 - 0, y: 110 - 40+ 20  },
    { x: 110 - 0, y: 110 + 20 },
    { x: 110 - 0, y: 110 + 40+ 20  },
    { x: 110 + 40, y: 110 - 40 + 20 },
    { x: 110 + 40, y: 110 + 20 },
    { x: 110 + 40, y: 110 + 40 + 20 },
]


const monsters = new Monsters()
    .setLevelFreq(1000)
    .addLevelInfo(
        new LevelInfo()
            .setDesc("level 1 basic monster")
            .addMonster(new Monster(20, 20, 'red', 2, 2,  paths))
            .addMonster(new Monster(20, 20, 'green', 2, 2, paths))
            .addMonster(new Monster(20, 20, 'red', 2, 2, paths))
            .addMonster(new Monster(20, 20, 'green', 2, 2, paths))
            .addMonster(new Monster(20, 20, 'red', 2, 2, paths))
            .addMonster(new Monster(20, 20, 'green', 2, 4, paths))
            .setFreqC(16)
    )
    .addLevelInfo(
        new LevelInfo()
            .setDesc("level 2 basic monster")
            .addMonster(new Monster(20, 20, 'red', 2, 4,  paths))
            .addMonster(new Monster(20, 20, 'green', 2, 4, paths))
            .addMonster(new Monster(20, 20, 'red', 2, 4, paths))
            .addMonster(new Monster(20, 20, 'green', 2, 4, paths))
            .addMonster(new Monster(20, 20, 'red', 2, 4, paths))
            .addMonster(new Monster(20, 20, 'green', 2, 4, paths))
            .setFreqC(16)
    )
    .setUpdateNextLevelBarEvent(function(per){
        documentHelper.updateNextLevelBar(per);
    })
    .setMonsterReachDest(function (destMonster) {
        player.life--;
        console.log("monster leave!");
        documentHelper.updateLife(player.life);
    })
    .setMonsterDieEvent(function (dieMonster) {
        const score = dieMonster.score;
        player.score += score;
        documentHelper.updateScore(player.score);
    })
    .setDrawMonsterEvent(function (monster) {
        const x = monster.x;
        const y = monster.y;
        const h = monster.h;
        const w = monster.w;
        const color = monster.color;
        canvasHelper.drawMonsterEllipse(x, y, w, h, color);
        const lifePercent = monster.currLife / monster.life;
        canvasHelper.drawMonsterLife(x, y, w, h, lifePercent);
    })
    //每當關卡開始的觸發事件
    .setLevelStartEvent(function(levelInfo){
        documentHelper.updateLevelInfo(levelInfo.desc);
    })
    
    ;


//定義飛彈
const missles = new Missles()
    .setDrawMissleEvent(function (missle) {
        canvasHelper.drawMissle(missle.x, missle.y, missle.w, missle.h);
    })
    .setMissleHitEvent(function (missle) {
        console.log("missle hit monster");
    })
    .setMonsterKilledEvent(function (monster) {
        console.log("monster is killed!");
    })
    ;


const towers = new Towers()
    .setDrawEvent(function (tower) {
        canvasHelper.drawTowerEllipse(tower.x, tower.y, tower.w, tower.h, tower.color);
    });

function buildTower(tower) {
    towers.addTower(tower);
    drawBuildLocation();
    towerAnimation();
}

const towerFactory = new TowerFactory();
let gameStatus = 0;//0:stop // 1: start // 2:game over
documentHelper
    .updateTowerKind(towerFactory.getTowerKindDict())
    .setTowerKindSelectEvent( function (towerId) {
        selectedTowerId = towerId;
        const towerName = towerFactory.getTowerKindDict()[towerId].towerName;
        documentHelper.updateGameInfo("now you select tower " + towerName);
    })
    .setStartButtonClickEvent(function(e){
        const btn = e.target;
        if(gameStatus === 1){
            btn.textContent = 'start';
            gameStatus = 0;
        }else if(gameStatus === 0){
            btn.textContent = 'stop';
            gameStatus = 1;
        }else {
            throw "unknown game status click event"
        }
    })
    .setStartButtonInit(function(btn){
        if(gameStatus === 1){
            btn.textContent = 'stop';
        }else if(gameStatus === 0){
            btn.textContent = 'start';
        }else{
            throw "unknown btn text"
        }
    })
    .setNextButtonClickEvent(function(e){
        const btn = e.target;
        monsters.doNextLevel();
    })
    ;

canvasHelper.setClickEvent(function (x1, y1) {
    for (let index = 0; index < towerPlaceArea.length; index++) {
        const element = towerPlaceArea[index];
        const x2 = element.x;
        const y2 = element.y;
        const distance = CommonHelper.getDistance(x1, y1, x2, y2);
        //console.log(`(${index})x2:${x2}, y2:${y2} distance is ${distance}`);
        if (distance < 10) {
            if (isBuild && selectedTowerId) {
                const msg = `Are you sure you want to build this tower?`;
                if (window.confirm(msg)) {
                    const towerXy = towerPlaceArea.splice(index, 1)[0];
                    const newTower = towerFactory.getNewTowerByTowerId(selectedTowerId)
                        .setLocation(towerXy.x, towerXy.y);

                    buildTower(newTower);
                    break;

                } else {
                    console.log("cancel");
                }
            }
        }
    }
})

//user build tower
let isBuild = true;
let selectedTowerId = 'basicTower';

buildTower(
    towerFactory.getNewTowerByTowerId('basicTower')
        .setLocation(towerPlaceArea[0].x, towerPlaceArea[0].y)
);


function drawEmpty() {
    canvasHelper.clearRect();
}
function drawPaths(){
    canvasHelper.drawPaths(paths);
}
function drawBuildLocation() {
    canvasHelper.drawTowerBuildLocation(towerPlaceArea);
}

function monsterAnimation() {
    monsters.doAnimation();
}
function isGameOver() {
    const isPlayerDie = player.life === 0;
    const monsterNomore = monsters.isMonstersAllFinish();
    return isPlayerDie || monsterNomore;
}


function towerAnimation() {
    towers.doAnimation();
}
function missleAnimation() {
    missles.doAnimation();
}
function isPause(){
    return gameStatus === 0;
}
let animationFrameId;
function animate() {
    if(!isPause()){
        drawEmpty();
        drawPaths();
        drawBuildLocation();
        monsterAnimation();
        towerAnimation();
        missleAnimation();
        if (isGameOver()) {
            documentHelper.updateGameInfo("game over");
            cancelAnimationFrame(animationFrameId);
            return;
        }        
    }
    animationFrameId = requestAnimationFrame(animate);
}


function startGame() {
    documentHelper.updateGameInfo("game start");
    documentHelper.updateLife(player.life);
    documentHelper.updateScore(player.score);
    animate();
}

startGame();
