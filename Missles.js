class Missles {
    constructor() {
        this.misslePool = [];
    }
    getMisslePool() {
        return this.misslePool;
    }
    setDrawMissleEvent(drawMissleEvent) {
        this.drawMissleEvent = drawMissleEvent;
        return this;
    }
    setMissleHitEvent(missleHitEvent) {
        this.missleHitEvent = missleHitEvent;
        return this;
    }
    setMonsterKilledEvent(monsterKilledEvent){
        this.monsterKilledEvent = monsterKilledEvent;
        return this;
    }
    
    doAnimation() {
        this.#drawMissle();
        this.#updateMissle();
    }
    #drawMissle() {
        for (let index = 0; index < this.misslePool.length; index++) {
            const missle = this.misslePool[index];
            this.drawMissleEvent(missle);
        }
    }
    #updateMissle() {
        for (let i = 0; i < this.misslePool.length; i++) {
            const missle = this.misslePool[i];
            if(missle.isRun()){
                missle.moving();
                continue;
            }
        
            const monster = missle.getTarget();
            if (monster.isDie()) {
                const destMissle = this.misslePool.splice(i, 1)[0];
                continue;
            }
            
            if(missle.isHit()){
                const destMissle = this.misslePool.splice(i, 1)[0];
                const damage = destMissle.getTowerDamage();
                monster.setBeAttackedDamage(damage);
                const isDie = monster.isDie();
                if(this.missleHitEvent) this.missleHitEvent();

                if (isDie) {
                    if(this.setMonsterKilledEvent) this.setMonsterKilledEvent();
                    console.log("todo monster hit and die");
                }
                continue;
            }
            if(missle.isCancel()){
                const destMissle = this.misslePool.splice(i, 1)[0];
                continue;
            }
            
        }

    }
}