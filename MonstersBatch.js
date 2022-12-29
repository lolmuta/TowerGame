class Monsters {
    constructor() {
        this.levelInfos = [];
        this.levelInfoIndex = 0;
        this.levelInfosPool = [];
        this.drawMonstersPool = [];
        this.isFinish = false;
        this.isFirstRun = true;//是否為第一次執行 release monster
        const _this = this;
        this.levelRlsFreq = new Freq()
            .setFunc(function () {
                const result = _this.#nextLevel(_this);
            })
    }
    setLevelFreq(levelFreq) {
        this.levelRlsFreq.setFreqC(levelFreq);
        return this;
    }
    setLevelStartEvent(levelStartEvent) {
        this.levelStartEvent = levelStartEvent;
        return this;
    }
    setMonsterReachDest(monsterReachDestEvent) {
        this.monsterReachDestEvent = monsterReachDestEvent;
        return this;
    }
    setDrawMonsterEvent(drawMonsterEvent) {
        this.drawMonsterEvent = drawMonsterEvent;
        return this;
    }
    doNextLevel(){
        this.levelRlsFreq.resetCount();
        return this.#nextLevel(this);
    }
    #nextLevel(_this) {
        if (_this.levelInfoIndex >= _this.levelInfos.length) {
            return false;
        }
        const leveInfo = _this.levelInfos[_this.levelInfoIndex];
        leveInfo.setGo();
        _this.levelStartEvent(leveInfo);
        _this.levelInfosPool.push(leveInfo);
        _this.levelInfoIndex++;
        return true;
    }
    addLevelInfo(levelInfo) {
        const _this = this;
        levelInfo.setReleaseMonsterEvent(function (monster) {
            monster.setRun();
            _this.drawMonstersPool.push(monster);//加入動畫的物件    
        });
        this.levelInfos.push(levelInfo);
        return this;
    }
    setMonsterDieEvent(monsterDieEvent) {
        this.monsterDieEvent = monsterDieEvent;
        return this;
    }
    setUpdateNextLevelBarEvent(updateNextLevelBarEvent) {
        this.updateNextLevelBarEvent = updateNextLevelBarEvent;
        return this;
    }

    doAnimation() {
        this.#monsterRelease()
        this.#monsterDraw();
        this.#updateMonsters();
        this.#movingMonsters();
        return this;
    }
    #monsterRelease() {
        if (this.isFirstRun) {
            this.isFirstRun = false;
            this.#nextLevel(this);
        }
        const levelInfosPool = this.levelInfosPool;

        for (let index = 0; index < levelInfosPool.length; index++) {
            const levelInfo = levelInfosPool[index];
            if (levelInfo.isGo()) {
                const goFinish = levelInfo.go();
                if (goFinish) {
                    const finishLevel = this.levelInfosPool.splice(index, 1)[0];
                }
                continue;
            } else {
                const finishLevel = this.levelInfosPool.splice(index, 1)[0];
            }
        }
        this.levelRlsFreq.go();
        const per = this.levelRlsFreq.getPercent();
        this.updateNextLevelBarEvent(per);
    }
    #monsterDraw() {
        for (let index = 0; index < this.drawMonstersPool.length; index++) {
            const monster = this.drawMonstersPool[index];
            this.drawMonsterEvent(monster);
        }
        return this;
    }
    #updateMonsters() {
        //update monster  
        for (let i = 0; i < this.drawMonstersPool.length; i++) {
            const monster = this.drawMonstersPool[i];
            const monsterReachDest = monster.isFinishPath();
            if (monsterReachDest) {
                const destMonster = this.drawMonstersPool.splice(i, 1)[0];
                this.monsterReachDestEvent(destMonster);
                continue;
            }
            const monsterDie = monster.isDie();
            if (monsterDie) {
                const dieMonster = this.drawMonstersPool.splice(i, 1)[0];
                this.monsterDieEvent(dieMonster);
                continue;
            }
            const monsterRunning = monster.isRunning();
            if (!monsterRunning) {
                throw "monster status error";
            }
        }
    }
    #movingMonsters() {
        for (let i = 0; i < this.drawMonstersPool.length; i++) {
            const monster = this.drawMonstersPool[i];
            //monster.moving();
            monster.movingEnhance();
        }
    }
    getDrawMonstersPool() {
        return this.drawMonstersPool;
    }
    isMonstersAllFinish() {
        const isAllFinish = this.levelInfos.filter(x => !x.isMonstersAllFinish()).length === 0;
        return isAllFinish;
    }
}

class LevelInfo {
    constructor() {
        this.monsters = [];
        this.index = 0;
        this.status = 0;//0 wait 
        //1 start
        //2 finish

        const _this = this;
        const doMonsterRls = function () {
            const isInBound = _this.index < _this.monsters.length;
            if (isInBound) {
                const monster = _this.monsters[_this.index];
                _this.releaseMonsterEvent(monster);
                _this.index++;
            } else {
                _this.status = 2;
            }
        }
        this.monsterRlsFreq = new Freq()
            .setFunc(doMonsterRls);

    }
    setFreqC(freq) {
        this.monsterRlsFreq.setFreqC(freq);
        return this;
    }
    setDesc(desc) {
        this.desc = desc;
        return this;
    }
    addMonster(monster) {
        this.monsters.push(monster);
        return this;
    }
    setReleaseMonsterEvent(releaseMonsterEvent) {
        this.releaseMonsterEvent = releaseMonsterEvent;
        return this;
    }

    go() {
        this.monsterRlsFreq.go();
        if (this.isFinish()) {
            return true;
        } else {
            return false;
        }
    }
    setGo() {
        this.status = 1;
        return this;
    }
    isWait() {
        return this.status === 0;
    }
    isGo() {
        return this.status === 1;
    }
    isFinish() {
        return this.status === 2;
    }
    isMonstersAllFinish() {
        const monsters = this.monsters;
        const oriCount = monsters.length;
        const newCount = monsters.filter(
            x => x.isDie() || x.isFinishPath()).length;

        const isFinish = oriCount === newCount;
        return isFinish;
    }
}