class BibleBook {
    constructor(num,name,symbol,speak,regex,maxVerses) {
        this.num=num;
        this.name=name;
        this.symbol=symbol;
        this.speak=speak;
        this.regex=regex;
        this.maxVerses=maxVerses;
        return this;
    }
    get maxVerses() {return this._maxVerses}
    set maxVerses(versesarray) {
        // If not provided or not an array, fill a default array of 150 values of 199,
        // which covers all book/chapter maximums.
        if( versesarray==undefined || !Array.isArray(versesarray) ) {
            versesarray=[];
            for( var i=0 ; i<150 ; i++ ) versesarray.push(199);
        }
        this._maxVerses=versesarray;
    }
    get maxChapters() {
        return this.maxVerses.length;
    }
    get noch() {
        return (this.maxChapters==1);
    }
    maxVersesForChapter(ch) {return this.maxVerses[ch-1]}
    match(text) {
        return this.regex.test(text);
    }
}

module.exports=BibleBook;