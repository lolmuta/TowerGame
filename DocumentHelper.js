class DocumentHelper {
    constructor() {

    }
    updateLife(life) {
        document.getElementById('life').textContent = life;
        return this;
    }
    updateScore(score) {
        document.getElementById('score').innerHTML = score;
        return this;
    }
    updateGameInfo(gameInfo) {
        document.getElementById('gameInfo').innerHTML = gameInfo;
        return this;
    }
    updateTowerKind(towerKindDict){
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
        }
        return this;
    }
    setTowerKindSelectEvent(clickEvent){
        const towerKind = document.getElementById('towerKind');
        const childNodes = towerKind.childNodes;
        childNodes.forEach(childNode => {
            childNode.addEventListener('click', function() {
                const towerId = this.dataset.towerId;
                console.log('selected tower kind is ' + towerId);
                clickEvent(towerId);
            });
        });
        return this;
    }
    setStartButtonClickEvent(clickEvent){
        const btnStart = document.getElementById('btnStart');
        btnStart.addEventListener('click', clickEvent);
        return this;
    }
    setStartButtonInit(initFunc){
        const btnStart = document.getElementById('btnStart');
        initFunc(btnStart);
    }
}