class BibleBook {
    constructor(num,name,symbol,speak,regex,noch) {
        this.num=num;
        this.name=name;
        this.symbol=symbol;
        this.speak=speak;
        this.regex=regex;
        this.noch=noch||false;
        return this;
    }
}

module.exports=BibleBook;