class Monsters{
    constructor(){
        this.monsters = [];
        this.index = 0;
        this.CallFinishFuncOnce = false;
        //becuase this is other ojbect, so using _this to void this
        //in this case, this is class Freq
        const _this = this;
        const doMonsterRls = function(){
            const isInBound = _this.index < _this.monsters.length;
            if(isInBound){
                const monster = _this.monsters[_this.index];
                monster.setRun();
                _this.drawMonstersPool.push(monster);//加入動畫的物件
                _this.index++;
            }else{
                const needCallFinish = _this.finishEvent && !_this.CallFinishFuncOnce;
                if(needCallFinish){
                    _this.CallFinishFuncOnce = true;
                    _this.finishEvent();
                }
            }
        }
        this.monsterRlsFreq = new Freq()
            .setFunc(doMonsterRls);

        this.drawMonstersPool = [];
    }
    setFreqC(freq){
        this.monsterRlsFreq.setFreqC(freq);
        return this;
    }
    setMonsterRlsEvent(monsterRlsEvent){
        this.monsterRlsEvent = monsterRlsEvent;
        return this;
    }

    setFinishEvent(finishEvent){
        this.finishEvent = finishEvent;
        return this;
    }
    setMonsterReachDest(monsterReachDestEvent){
        this.monsterReachDestEvent = monsterReachDestEvent;
        return this;
    }
    setDrawMonsterEvent(drawMonsterEvent){
        this.drawMonsterEvent = drawMonsterEvent;
        return this;
    }
    addMonster(monster){
        this.monsters.push(monster);
        return this;
    }    
    setMonsterDieEvent(monsterDieEvent){
        this.monsterDieEvent = monsterDieEvent;
        return this;
    }
    doAnimation(){
        this.monsterRlsFreq.go();
        this.#monsterDraw();
        this.#updateMonsters();
        this.#movingMonsters();
        return this;
    }
    #monsterDraw(){
        for (let index = 0; index < this.drawMonstersPool.length; index++) {
            const monster = this.drawMonstersPool[index];
            this.drawMonsterEvent(monster);
            //monster.draw();
        }
        return this;
    }
    #updateMonsters(){
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
            if(monsterDie) {
                const dieMonster = this.drawMonstersPool.splice(i, 1)[0];
                this.monsterDieEvent(dieMonster);
                continue;
            }
            const monsterRunning = monster.isRunning();
            if(!monsterRunning){
                throw "monster status error";
            }        
        }
    }
    #movingMonsters(){
        
        for (let i = 0; i < this.drawMonstersPool.length; i++) {
            const monster = this.drawMonstersPool[i];
            monster.moving();
        }    
    }
    getDrawMonstersPool(){
        return this.drawMonstersPool;
    }
}