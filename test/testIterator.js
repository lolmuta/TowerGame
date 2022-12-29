class LevelInfo{
    constructor(){
        this.monsters=[];
        this.nextIndex = 0;
    }
	addMonster(monster){
        this.monsters.push(monster);
        return this;
    }
    getIterator(){
        const _this = this;
        
        return {
           next: function() {
               return _this.nextIndex < _this.monsters.length ?
                   {value: _this.monsters[_this.nextIndex++], done: false} :
                   {done: true};
           },
           hasNext:function(){
            return _this.nextIndex < _this.monsters.length
           }
        };
    }
}
const t1 = new LevelInfo()
    .addMonster('1')
    .addMonster('2')
    .addMonster('3')

    const t2 = new LevelInfo()
    .addMonster('7')
    .addMonster('8')
    .addMonster('9')

const tItor1 = t1.getIterator();
const tItor2 = t2.getIterator();

const t1Item1 = tItor1.next();
const t2Item1 = tItor2.next();


console.log(t1Item1)
console.log(t2Item1)

while(tItor1.hasNext()){
    let item = tItor1.next();
    console.log(item);
}

while(tItor2.hasNext()){
    let item = tItor2.next();
    console.log(item);
}