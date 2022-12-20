class Missle {
    constructor(x, y, tower) {
        this.x = x;
        this.y = y;
        this.w = 4;
        this.h = 4;
        this.speed = 4;
        this.tower = tower;
        this.status = 0;//0: wait 1: run 2: hit 3:cancel
        this.mStatus={
            wait :0,
            run : 1,
            hit:2,
            cancel:3
        }
    }
    setTarget(targetMonster) {
        this.targetMonster = targetMonster;
        return this;
    }
    getTarget() {
        return this.targetMonster;
    }
    setRun() {
        this.status = this.mStatus.run;
        return this;
    }

    setHit(){
        this.status = this.mStatus.hit;
        return this;
    }
    setCancel(){
        this.status = this.mStatus.cancel;
        return this;
    }
    isRun(){
        return this.status === this.mStatus.run;
    }
    isHit(){
        return this.status ===  this.mStatus.hit;
    }
    isCancel(){
        return this.status === this.mStatus.cancel;
    }
   
    getTower() {
        return this.tower;
    }
    getTowerDamage() {
        return this.tower.getDamage();
    }
    moving() {
        //若怪已到達終點，則也要取消子彈擊中
        const targetMonster = this.targetMonster;
        if (targetMonster.status === 2) {
            this.status = this.mStatus.cancel;//取消
            return;
        }
        this.#updateV();
        const x1 = this.x * 1.0;
        const y1 = this.y * 1.0;
        const x2 = targetMonster.x * 1.0;
        const y2 = targetMonster.y * 1.0;

        const isHit = this.#isAtPoint(x1, y1, x2, y2, this.speed);
        
        if (isHit) {
            this.status = this.mStatus.hit;//hit
            return;
        }
        this.x += this.vx;
        this.y += this.vy;

    }
    #updateV() {
        const x1 = this.x * 1.0;
        const y1 = this.y * 1.0;
        const x2 = this.targetMonster.x * 1.0;
        const y2 = this.targetMonster.y * 1.0;
        const v = this.speed;
        const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        const sin = (x2 - x1) / (distance * 1.0);
        const cos = (y2 - y1) / (distance * 1.0);
        const vx = v * sin;
        const vy = v * cos;
        this.vx = vx;
        this.vy = vy;
    }
    #isAtPoint(x1, y1, x2, y2, unitD) {
        const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        const atPoint = distance < unitD;
        return atPoint;
    }
}