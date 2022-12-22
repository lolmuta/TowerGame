const CommonHelper ={
    getDistance : function(x1, y1, x2, y2){
        const distance = Math.sqrt((x1 - x2) ** 2 + (y1- y2) ** 2);
        return distance;
    }
}