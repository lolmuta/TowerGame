class MonsterInfo {
    constructor(w, h, color, speed, paths) {
        this.paths = [];
        this.paths = paths;
        this.pathIndex = 0;
        this.x = paths[0].x;
        this.y = paths[0].y;
        this.w = w;
        this.h = h;
        this.vx = null;
        this.vy = null;
        this.speed = speed;
        this.color = color;
        this.status = 0;
        this.life = 2;
    }
    setRun(){
        this.status = 1;
        this.#updateV();
        return this;
    }
    setBeAttackedDamage(damage){
        this.life -= damage;
        const die = this.life<=0;
        if(die){
            this.status = 3;
        }
    }
    isFinishPath(){
        const isFinish = this.status === 2;
        return isFinish;
    }
    isRunning(){
        const isRunning = this.status === 1;
        return isRunning;
    }
    isDie(){
        const die =  this.status === 3;
        return die;
    }
    
    moving(){
        if(this.isFinishPath()){
            return;
        }
        const i2 = this.pathIndex + 1;
        const point2 = this.paths[i2];
        const x2 = point2.x;
        const y2 = point2.y;
        const nextX = this.x + this.vx;
        const nextY = this.y + this.vy;
        const isAtPoint2 = this.#isAtPoint(nextX, nextY, x2, y2, this.speed);
        if(isAtPoint2){
            //debugger;
            const outBound = (++this.pathIndex) > (this.paths.length -2);
            if(outBound){
                this.status = 2;
                return;
            }
            this.#updateV();
        }
        this.x += this.vx;
        this.y += this.vy;
        return this;
    }
    #isAtPoint(x1, y1, x2, y2, unitD){
        const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        const atPoint = distance < unitD;
        return atPoint;
    }
    #updateV(){
        const i2 = this.pathIndex + 1;
        const point2 = this.paths[i2];
        const x1 = this.x * 1.0;
        const y1 = this.y * 1.0;
        const x2 = point2.x * 1.0;
        const y2 = point2.y * 1.0;
        const v = this.speed;
        const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        const sin = (x2 - x1) / (distance * 1.0);
        const cos = (y2 - y1) / (distance * 1.0);
        const vx =  v * sin;
        const vy = v * cos;
        this.vx = vx;
        this.vy = vy;
    }
}