let BibleBook=require("./BibleBook.js");

class Scripture {
    constructor(book,chapter,verses) {
        this.book=book;
        this.chapter=chapter;
        this.verses=verses;
        return this;
    }
    get book() {return this._book}
    set book(newBook) {if(newBook) this._book=newBook}
    get chapter() {return this._chapter}
    set chapter(newChapter) {if(newChapter) this._chapter=parseInt(newChapter)}
    get firstverse() {return this.verses[0]}
    get lastverse() {return this.verses[this.verses.length-1]}
    get verses() {return this._verses}
    set verses(newVerses) {
        this._verses=[];
        if( newVerses && Array.isArray(newVerses) ) this._verses=newVerses;
        else if( newVerses && typeof newVerses=="number" ) this._verses.push(newVerses);
        else if( newVerses && typeof newVerses=="string" ) {
            for( var v of newVerses.split(",") ) {
                v=v.replace(/\s/g,"");
                if( v.split("-").length==2 ) {
                    var start=v.split("-")[0];
                    var end=v.split("-")[1];
                    if( start<=end ) {
                        for( var i=start ; i<=end ; i++ ) this._verses.push(parseInt(i));
                    }
                }
                else this._verses.push(parseInt(v));
            }
        }
    }
    versesToString() {
        var i=0;
        var vlen=this.verses.length;
        var csv=[];
        var thisv, nextv, seqstart, insequence=false;
        do {
            thisv=this.verses[i];
            nextv=this.verses[i+1] || 0;
            if( ! insequence && thisv+1==nextv ) {
                seqstart=thisv;
                insequence=true;
            } else if( ! insequence ) {
                csv.push(thisv);
            } else if( thisv+1 != nextv ) {
                csv.push(`${seqstart}-${thisv}`);
                insequence=false;
            }
        }
        while( ++i<vlen );
        return csv.join(", ");
    }
    valid() {
        return this.book!=undefined && 
               this.book instanceof BibleBook && 
               this.chapter!=undefined && 
               this.chapter<=this.book.maxChapters &&
               !isNaN(this.chapter) && 
               this.verses.length>0 &&
               this.lastverse<=this.book.maxVersesForChapter(this.chapter);
    }
    toString() {
        return `${this.book.name} ${this.chapter}:${this.versesToString()}`;
    }
    toAbbrevString() {
        return `${this.book.symbol}${this.chapter}:${this.versesToString()}`.replace(/\s/g,"");
    }
}

module.exports=Scripture;