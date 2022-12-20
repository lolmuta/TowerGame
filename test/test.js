const arr = [];
arr.push({
    flag : 0
});
arr.push({
    flag : 1
});

function printArr(_arr){
    _arr.forEach((x,i) => {
        console.log(i + ":" + x.flag);
    });
}

class ClzA{
    constructor(_arr){
        this.arr= _arr;
    }
    getArr(){
        return this.arr;
    }
}
const a = new ClzA(arr);

function printAll(){
    console.log("print arr");
    printArr(arr);

    console.log("print class arr");
    printArr(a.getArr());
}

console.log("init");
printAll();



console.log("change element property")
arr[0].flag = 9;
printAll();


console.log("remove element")
arr.splice(0,1);
printAll();




