class CanvasHelper {
    constructor(height, width) {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'someId';
        this.canvas.height = height;
        this.canvas.width = width;
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
    }
    draw(f){
        f(this.ctx);
    }
    drawMonster(x, y, w, h, color){
        const _ctx = this.ctx;
        _ctx.fillStyle = color;
        _ctx.fillRect(x, y, w, h);
    }
    clearRect() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
class DocumentHelper{
    constructor(){

    }
    updateLife(life){
        document.getElementById('life').textContent = life;
    }
    updateGameInfo(gameInfo){
        document.getElementById('gameInfo').innerHTML = gameInfo;
    }
}