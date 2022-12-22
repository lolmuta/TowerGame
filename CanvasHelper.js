class CanvasHelper {
    constructor(height, width) {
        this.canvas = document.getElementById('canvasMain');
        this.canvas.height = height;
        this.canvas.width = width;
        this.ctx = this.canvas.getContext('2d');
    }
    draw(f) {
        f(this.ctx);
        return this;
    }

    drawMonsterEllipse(x, y, w, h, color) {
        const _ctx = this.ctx;
        const halfW = w * 0.5;
        const halfH = h * 0.5;
        _ctx.beginPath();
        _ctx.ellipse(x, y, halfW, halfH, 0, 0, 2 * Math.PI);
        _ctx.fillStyle = color;
        _ctx.fill();
        return this;
    }
    clearRect() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        return this;
    }
    drawTowerEllipse(x, y, w, h, color) {
        const _ctx = this.ctx;
        const halfW = w * 0.5;
        const halfH = h * 0.5;
        _ctx.beginPath();
        _ctx.ellipse(x, y, halfW, halfH, 0, 0, 2 * Math.PI);
        _ctx.fillStyle = color;
        _ctx.fill();
        return this;
    }
    drawMissle(x, y, w, h) {
        const _ctx = this.ctx;
        _ctx.fillStyle = 'black';
        _ctx.fillRect(x, y, w, h);
        return this;
    }
    drawTowerBuildLocation(locationList) {
        const _ctx = this.ctx;
        locationList.forEach(loc => {
            const x = loc.x;
            const y = loc.y;
            const radius = 10;
            _ctx.beginPath();
            _ctx.arc(x, y, radius, 0, 2 * Math.PI);
            _ctx.strokeStyle = 'blue';
            _ctx.stroke();

        });
        return this;
    }
    setClickEvent(pClickEvent) {
        const _canvas = this.canvas;
        if (this.clickEven) {
            _canvas.removeEventListener('click', this.clickEvent);
        }
        this.clickEvent = function (event) {
            // Get the bounding rect of the canvas
            const rect = _canvas.getBoundingClientRect();

            // Convert the click location from client coordinates to canvas coordinates
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            console.log(`x:${x} y: ${y}`);
            pClickEvent(x, y);
        }

        this.canvas.addEventListener('click', this.clickEvent);
        return this;
    }
    drawPaths(paths) {
        const _this = this;
        paths.forEach(path => {
            _this.#drawCross45(path.x,path.y, 5);
        });
        return this;
    }
    // #drawCross(x, y, r) {
    //     const _ctx = this.ctx;

    //     _ctx.beginPath();
    //     _ctx.moveTo(x, y - r); // Start at (100, 90)
    //     _ctx.lineTo(x, y + r); // End at (100, 110)
    //     _ctx.stroke();

    //     _ctx.beginPath();
    //     _ctx.moveTo(x - r, y); // Start at (90, 100)
    //     _ctx.lineTo(x + r, y); // End at (110, 100)
    //     _ctx.stroke();
    // }
    #drawCross45(x, y, size){
        const _ctx = this.ctx;
        _ctx.beginPath();
        _ctx.moveTo(x - size / 2, y - size / 2); 
        _ctx.lineTo(x + size / 2, y + size / 2); 
        _ctx.strokeStyle = 'red';
        _ctx.stroke();

        _ctx.beginPath();
        _ctx.moveTo(x + size / 2, y - size / 2); 
        _ctx.lineTo(x - size / 2, y + size / 2);
        _ctx.strokeStyle = 'red';
        _ctx.stroke();
    }
    drawMonsterLife(x, y, w, h, lifePercent){
        const lifeStartX = x - w/2;
        const lifeStartY = y - h/2 - 10 ;
        const LifeW = w * lifePercent;
        const lifeHhalf = 2;
        const _ctx = this.ctx;
        //_ctx.fillStyle = "green";
        _ctx.rect(lifeStartX, lifeStartY - lifeHhalf, 
            LifeW, lifeHhalf * 2); 
        //_ctx.fillStyle = "green";
        _ctx.fill();
        return this;
    }
}
