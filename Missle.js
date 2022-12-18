class Missle {
    constructor(x, y, tower) {
        this.x = x;
        this.y = y;
        this.w = 4;
        this.h = 4;
        this.speed = 4;
        this.tower = tower;
        this.status = 0;//0: wait 1: moving 2: finish
    }
    setTarget(targetMonster) {
        this.targetMonster = targetMonster;
        return this;
    }
    getTarget() {
        return this.targetMonster;
    }
    setRun() {
        this.status = 1;
        return this;
    }
    setFinish() {
        this.status = 2;
        return this;
    }
    isFinishPath() {
        const isFinish = this.status === 2;
        return isFinish;
    }
    getTower() {
        return this.tower;
    }
    getTowerDamage() {
        return this.tower.getDamage();
    }
    moving() {
        //若怪已到達終點，則也要取消子彈
        if (this.targetMonster.status === 2) {
            this.status = 2;
            return;
        }
        this.#updateV();
        const x1 = this.x * 1.0;
        const y1 = this.y * 1.0;
        const x2 = this.targetMonster.x * 1.0;
        const y2 = this.targetMonster.y * 1.0;

        const isAtPoint2 = this.#isAtPoint(x1, y1, x2, y2, this.speed);
        if (isAtPoint2) {
            this.status = 2;
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