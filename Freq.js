class Freq{
    constructor(){
        this.count= 0;
    }
    setFreqC(freqC){
        this.freqC = freqC;
        return this;
    }
    setFunc(f){
        this.f = f;
        return this;
    }
    go(){
        const isRun = this.count+1>= this.freqC;
        if(isRun){
            this.count = 0;
            this.f();
            return;
        }
        this.count++;
    }
}