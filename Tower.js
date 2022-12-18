class Tower{
    constructor(){
        this.shootFreq = new Freq();
        this.setFreqFunc();
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
    setShootTargetEvent(shootTargetEvent){
        this.shootTargetEvent = shootTargetEvent;
        return this;
    }
    setFreqFunc(){
        const _this = this;
        const _findNearestMonster = this.#findNearestMonster;
        this.shootFreq.setFunc(function(){
            const target = _findNearestMonster(_this);
            if(target){
                const missle = new Missle(_this.x, _this.y, _this);
                missle.setTarget(target);
                _this.shootTargetEvent(missle);

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
    #findNearestMonster(_this){
        const monsters = _this.monsters;
        let minDistance = Number.MAX_SAFE_INTEGER;
        let targetMonster;
        for (let index = 0; index < monsters.length; index++) {
            const monster = monsters[index];
            if(monster.isRunning()){
                const distance = Math.sqrt((_this.x - monster.x) ** 2 + (_this.y - monster.y) ** 2);
                const inRange = distance < _this.range;
                if(inRange){
                    if(minDistance > distance){
                        targetMonster = monster;
                        minDistance = distance;
                    }
                }
            }                
        }
        return targetMonster;
    }
    
    
}
