class Towers{
    constructor(){
        this.towers = [];
    }
    addTower(tower){
        this.towers.push(tower);
        return this;
    }
    setDrawEvent(drawEvent){
        this.drawEvent = drawEvent;
        return this;
    }
    doAnimation(){
        this.towers.forEach(tower => {
           // debugger;
            this.drawEvent(tower);
            tower.shoot();
        });
    }
}