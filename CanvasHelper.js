class CanvasHelper {
    constructor(height, width) {
        this.canvas = document.getElementById('canvasMain');
        this.canvas.height = height;
        this.canvas.width = width;
        this.ctx = this.canvas.getContext('2d');
    }
    draw(f) {
        f(this.ctx);
    }

    drawMonsterEllipse(x, y, w, h, color){
        const _ctx = this.ctx;
        const halfW = w * 0.5;
        const halfH = h * 0.5;
        _ctx.beginPath();
        _ctx.ellipse(x, y, halfW, halfH, 0, 0, 2 * Math.PI);
        _ctx.fillStyle = color;
        _ctx.fill();
    }
    clearRect() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    drawTowerEllipse(x, y, w, h, color) {
        const _ctx = this.ctx;
        const halfW = w * 0.5;
        const halfH = h * 0.5;
        _ctx.beginPath();
        _ctx.ellipse(x, y, halfW, halfH, 0, 0, 2 * Math.PI);
        _ctx.fillStyle = color;
        _ctx.fill();
    }
    drawMissle(x, y, w, h) {
        const _ctx = this.ctx;
        _ctx.fillStyle = 'black';
        _ctx.fillRect(x, y, w, h);
    }
    drawTowerBuildLocation(locationList){
        const _ctx = this.ctx;
        locationList.forEach(loc =>{
            const x = loc.x;
            const y = loc.y;
            const radius = 10;
            _ctx.beginPath();
            _ctx.arc(x, y, radius, 0, 2 * Math.PI);
            _ctx.strokeStyle = 'blue';
            _ctx.stroke();

        });
    }
    setClickEvent(pClickEvent){
        const _canvas = this.canvas;
        if(this.clickEven){
            _canvas.removeEventListener('click', this.clickEvent);
        }
        this.clickEvent = function(event){
            // Get the bounding rect of the canvas
            const rect = _canvas.getBoundingClientRect();

            // Convert the click location from client coordinates to canvas coordinates
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            console.log(`x:${x} y: ${y}`);
            pClickEvent(x, y);
        }

        this.canvas.addEventListener('click', this.clickEvent);
    }
}
class DocumentHelper {
    constructor() {

    }
    updateLife(life) {
        document.getElementById('life').textContent = life;
    }
    updateScore(score) {
        document.getElementById('score').innerHTML = score;
    }
    updateGameInfo(gameInfo) {
        document.getElementById('gameInfo').innerHTML = gameInfo;
    }
    updateTowerKind(towerKindDict, clickEvent){
        const towerKind = document.getElementById('towerKind');
        towerKind.innerHTML = '';
      
        for (const towerId in towerKindDict) {
            const kind = towerKindDict[towerId];
            const eleKind = document.createElement('div');
            eleKind.dataset.towerId = towerId; 
            eleKind.classList.add('gallery');
            const img = document.createElement('img');
            img.alt = kind.towerName;
            //img.src = kind.towerImage;
            img.width = '100';
            img.height = '100';
            eleKind.appendChild(img);

            const dest = document.createElement('div');
            dest.classList.add('desc');
            dest.innerHTML = kind.towerDesp;
            eleKind.appendChild(dest);

            towerKind.appendChild(eleKind);

            eleKind.addEventListener('click', function() {
                const towerId = this.dataset.towerId;
                console.log('selected tower kind is ' + towerId);
                clickEvent(towerId);
            });


        }

    }
}