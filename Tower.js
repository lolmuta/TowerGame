class Tower{
    constructor(){
        this.shootFreq = new Freq();
        this.#setFreqFunc();
    }
    setColor(color){
        this.color = color;
        return this;
    }
    setSize(w, h){
        this.w = w;
        this.h = h;
        return this;
    }
    setLocation(x, y){
        this.x = x;
        this.y = y;
        return this;
    }
    setRange(range){
        this.range = range;
        return this;
    }
    setFreq(freq){
        this.shootFreq.setFreqC(freq);
        return this;
    }
    setDamge(damge){
        this.damge = damge;
        return this;
    }
    getDamage(){
        return this.damge;
    }
    setMisslePool(misslePool){
        this.misslePool = misslePool;
        return this;
    }
    setFindMonsterFunc(findMonsterFunc){
        this.findMonsterFunc = findMonsterFunc;
        return this;
    }
    #setFreqFunc(){
        const _this = this;
        this.shootFreq.setFunc(function(){
            const monsters = _this.monsters;
            const towerX = _this.x;
            const towerY = _this.y;
            const towerRange = _this.range;
            const targets = _this.findMonsterFunc(monsters, towerX, towerY, towerRange);
            if(targets){
                targets.forEach(target => {
                    const missle = new Missle(_this.x, _this.y, _this);
                    missle.setTarget(target);
                    missle.setRun();
                    _this.misslePool.push(missle);
                });
                // const missle = new Missle(_this.x, _this.y, _this);
                // missle.setTarget(target);
                // //_this.shootTargetEvent(missle);
                // missle.setRun();
                // _this.misslePool.push(missle);

            }
        });
        return this;
    }
    setMonsters(monsters){
        this.monsters = monsters;
        return this;
    }
    shoot(){
        this.shootFreq.go();
    }
    setTowerImage(towerImage){
        this.towerImage = towerImage;
        return this;
    }
    setTowerName(towerName){
        this.towerName = towerName;
        return this;
    }
    setTowerDesp(towerDesp){
        this.towerDesp = towerDesp;
        return this;
    }
}

const findWay = {
    findNearestMonster : function(monsters, towerX, towerY, towerRAnge){
        let minDistance = Number.MAX_SAFE_INTEGER;
        let targetMonster;
        for (let index = 0; index < monsters.length; index++) {
            const monster = monsters[index];
            if(monster.isRunning()){
                const distance = Math.sqrt((towerX - monster.x) ** 2 + (towerY - monster.y) ** 2);
                const inRange = distance < towerRAnge;
                if(inRange){
                    if(minDistance > distance){
                        targetMonster = monster;
                        minDistance = distance;
                    }
                }
            }                
        }
        const result = [];
        result.push(targetMonster);
        return result;
    }
}
class TowerFactory{
    constructor(){
        this.createTowerFactory = {
            basicTower: function(){
                return new Tower()
                    .setTowerImage("basicTower.jpg")
                    .setTowerName("basic tower")
                    .setTowerDesp("basic tower, cheap but damge low")
                    .setColor('black')
                    .setSize(20, 20)
                    //.setLocation(100, 100)
                    .setDamge(1)
                    .setRange(400)
                    .setFreq(40)
                    .setMonsters(monsters.getDrawMonstersPool())
                    .setMisslePool(missles.getMisslePool())
                    .setFindMonsterFunc(findWay.findNearestMonster);
            },
            advTower: function(){
                return new Tower()
                    .setTowerImage("AdvTower.jpg")
                    .setTowerName("adv tower")
                    .setTowerDesp("adv tower, damge high but slow")
                    .setColor('yellow')
                    .setSize(20, 20)
                    //.setLocation(100, 100)
                    .setDamge(1)
                    .setRange(400)
                    .setFreq(40)
                    .setMonsters(monsters.getDrawMonstersPool())
                    .setMisslePool(missles.getMisslePool())
                    .setFindMonsterFunc(findWay.findNearestMonster);
            }
        };
        this.towerKindDict = {};
        for (const towerId in this.createTowerFactory) {
            this.towerKindDict[towerId] = this.createTowerFactory[towerId]();
        }
    }
    getTowerKindDict(){        
        return this.towerKindDict;
    }
    getNewTowerByTowerId(towerId){
        return this.createTowerFactory[towerId]();
    }


}