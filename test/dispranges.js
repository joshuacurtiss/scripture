const ScriptureUtil=require("../ScriptureUtil");
for( book of ScriptureUtil.BIBLEBOOKS ) {
    if( book.maxChapters==150 && book.maxVersesForChapter(150)==199 ) {
        console.log(`${book.name} is not defined.`);
    } else {
        for( var ch=1 ; ch<=book.maxChapters ; ch++ )
            console.log(`${book.name} ${book.hasChapters?(ch+":"):""}1-${book.maxVersesForChapter(ch)}`);
    }
}