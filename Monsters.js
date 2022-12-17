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
                _this.monsterRlsEvent(monster);
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
    addMonster(monster){
        this.monsters.push(monster);
        return this;
    }    
    
    monsterRls(){
        this.monsterRlsFreq.go();
    }
}