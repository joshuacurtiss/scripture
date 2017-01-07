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
    match(text) {
        return this.regex.test(text);
    }
}

module.exports=BibleBook;