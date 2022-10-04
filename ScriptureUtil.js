let Scripture=require("./Scripture.js");
let BibleBook=require("./BibleBook.js");

class ScriptureUtil {

    constructor() {
        return this;
    }

    /*  
     *  parseScriptures:  Receives text and parses it into an array of Scripture objects.
     *  It outputs an array even if only one scripture is matched. 
     * 
     */

    parseScriptures(text) {
        var objs=this.parseScripturesWithIndex(text);
        return objs.map(scripture=>scripture.obj);
    }

    parseScripturesWithIndex(text) {
        var scriptures=[], scripRE=this.getScriptureRegEx(), scripmatch, s, cvmatch, cvRegex, b;
        while(scripmatch=scripRE.exec(text)) {
            b=this.getBibleBook(scripmatch[1]);
            cvRegex = b.hasChapters ? ScriptureUtil.CHAPTERVERSE_REGEX : ScriptureUtil.VERSENOCHAPTER_REGEX;
            while( cvmatch=cvRegex.exec(scripmatch[2]) ) {
                if (b.hasChapters) s=new Scripture(b,cvmatch[1],cvmatch[2]);
                else s=new Scripture(b,1,cvmatch[0]);
                var cvText=cvmatch[0].trim();
                var cvLen=cvText.length;
                if(s.valid()) {
                    var index=scripmatch.index;
                    var match=scripmatch[0].substr(0,scripmatch[0].indexOf(cvText)+cvLen);
                    if( cvmatch.index ) {
                        index=scripmatch[0].indexOf(scripmatch[2])+scripmatch[2].indexOf(cvText);
                        match=scripmatch[0].substr(index,cvLen);
                        index=index+scripmatch.index;
                    }
                    scriptures.push({obj:s,match:match,index:index});
                }
            }
        }
        return scriptures;
    }

    /*
     *  getScriptureRegEx: Takes the simpler SCRIPTURE_REGEX constant and subs out the \w+ (word) 
     *  placeholder with all of the exact scripture regexes. This way it only matches real Bible books.
     * 
     */
    getScriptureRegEx() {
        var booksrearray=[];
        for( var b of ScriptureUtil.BIBLEBOOKS ) booksrearray.push(b.regex.source);
        return RegExp(ScriptureUtil.SCRIPTURE_REGEX.source.replace("\\w+",booksrearray.join("|")),ScriptureUtil.SCRIPTURE_REGEX.flags);
    }

    /*
     *  getBibleBook: Receives text and determines what BibleBook object it matches.
     * 
     */
    getBibleBook(txt) {
        var b=null;
        for( var i=0 ; i<ScriptureUtil.BIBLEBOOKS.length && !b ; i++ ) {
            //console.log(`Does ${ScriptureUtil.BIBLEBOOKS[i].name} ${ScriptureUtil.BIBLEBOOKS[i].regex} match ${txt}? `)
            if( ScriptureUtil.BIBLEBOOKS[i].match(txt) ) b=ScriptureUtil.BIBLEBOOKS[i];
        }
        return b;
    }

}

ScriptureUtil.SCRIPTURE_REGEX = /\b(\w+)\s*(\d[\d\s\-\.,;:]*)\b/igm;
ScriptureUtil.CHAPTERVERSE_REGEX = /(\d+)\s*(?:[:\.]([\d\s\-,]+))?/g;
ScriptureUtil.VERSENOCHAPTER_REGEX = /\d+\s*[\d\s\-,]*/g;
ScriptureUtil.BIBLEBOOKS = [
    new BibleBook(  1,  "Genesis",      "ge",   "Genesis",              /Ge(?:n|nesis)?\.?/i, [31,25,24,26,32,22,24,22,29,32,32,20,18,24,21,16,27,33,38,18,34,24,20,67,34,35,46,22,35,43,55,32,20,31,29,43,36,30,23,23,57,38,34,34,28,34,31,22,33,26] ),
    new BibleBook(  2,  "Exodus",       "ex",   "Exodus",               /Ex(?:odus)?\.?/i, [22,25,22,31,23,30,25,32,35,29,10,51,22,31,27,36,16,27,25,26,36,31,33,18,40,37,21,43,46,38,18,35,23,35,35,38,29,31,43,38] ),
    new BibleBook(  3,  "Leviticus",    "le",   "Leviticus",            /Le(?:v|viticus)?\.?/i, [17,16,17,35,19,30,38,36,24,20,47,8,59,57,33,34,16,30,37,27,24,33,44,23,55,46,34] ),
    new BibleBook(  4,  "Numbers",      "nu",   "Numbers",              /Nu(?:m|mber|mbers)?\.?/i, [54,34,51,49,31,27,89,26,23,36,35,16,33,45,41,50,13,32,22,29,35,41,30,25,18,65,23,31,40,16,54,42,56,29,34,13] ),
    new BibleBook(  5,  "Deuteronomy",  "de",   "Deuteronomy",          /De(?:ut|uter|uteronomy)?\.?/i, [46,37,29,49,33,25,26,20,29,22,32,32,18,29,23,22,20,22,21,20,23,30,25,22,19,19,26,68,29,20,30,52,29,12] ),
    new BibleBook(  6,  "Joshua",       "jos",  "Joshua",               /Jos(?:h|hua)?\.?/i, [18,24,17,24,15,27,26,35,27,43,23,24,33,15,63,10,18,28,51,9,45,34,16,33] ),
    new BibleBook(  7,  "Judges",       "jg",   "Judges",               /(?:Jg|Judg|Judge|Judges){1}\.?/i, [36,23,31,24,31,40,25,35,57,18,40,15,25,20,20,31,13,31,30,48,25] ),
    new BibleBook(  8,  "Ruth",         "ru",   "Ruth",                 /Ru(?:th)?\.?/i, [22,23,18,22] ),
    new BibleBook(  9,  "1 Samuel",     "1sa",  "First Samuel",         /1\s?Sa(?:m|muel)?\.?/i, [28,36,21,22,12,21,17,22,27,27,15,25,23,52,35,23,58,30,24,42,15,23,29,22,44,25,12,25,11,31,13] ),
    new BibleBook( 10,  "2 Samuel",     "2sa",  "Second Samuel",        /2\s?Sa(?:m|muel)?\.?/i, [27,32,39,12,25,23,29,18,13,19,27,31,39,33,37,23,29,33,43,26,22,51,39,25] ),
    new BibleBook( 11,  "1 Kings",      "1ki",  "First Kings",          /1\s?Ki(?:ng|ngs)?\.?/i, [53,46,28,34,18,38,51,66,28,29,43,33,34,31,34,34,24,46,21,43,29,53] ),
    new BibleBook( 12,  "2 Kings",      "2ki",  "Second Kings",         /2\s?Ki(?:ng|ngs)?\.?/i, [18,25,27,44,27,33,20,29,37,36,21,21,25,29,38,20,41,37,37,21,26,20,37,20,30] ),
    new BibleBook( 13,  "1 Chronicles", "1ch",  "First Chronicles",     /1\s?Ch(?:r|ron|ronicles)?\.?/i, [54,55,24,43,26,81,40,40,44,14,47,40,14,17,29,43,27,17,19,8,30,19,32,31,31,32,34,21,30] ),
    new BibleBook( 14,  "2 Chronicles", "2ch",  "Second Chronicles",    /2\s?Ch(?:r|ron|ronicles)?\.?/i, [17,18,17,22,14,42,22,18,31,19,23,16,22,15,19,14,19,34,11,37,20,12,21,27,28,23,9,27,36,27,21,33,25,33,27,23] ),
    new BibleBook( 15,  "Ezra",         "ezr",  "Ezra",                 /Ezr(?:a|\.)?/i, [11,70,13,24,17,22,28,36,15,44] ),
    new BibleBook( 16,  "Nehemiah",     "ne",   "Neea my uh",           /Ne(?:h|hemiah)?\.?/i, [11,20,32,23,19,19,73,18,38,39,36,47,31] ),
    new BibleBook( 17,  "Esther",       "es",   "Esther",               /Es(?:t|th|ther)?\.?/i, [22,23,15,17,14,14,10,17,32,3] ),
    new BibleBook( 18,  "Job",          "job",  "Joab",                 /Job/i, [22,13,26,21,27,30,21,22,35,22,20,25,28,22,35,22,16,21,29,29,34,30,17,25,6,14,23,28,25,31,40,22,33,37,16,33,24,41,30,24,34,17] ),
    new BibleBook( 19,  "Psalms",       "ps",   "Psalms",               /Ps(?:alm|alms)?\.?/i, [6,12,8,8,12,10,17,9,20,18,7,8,6,7,5,11,15,50,14,9,13,31,6,10,22,12,14,9,11,12,24,11,22,22,28,12,40,22,13,17,13,11,5,26,17,11,9,14,20,23,19,9,6,7,23,13,11,11,17,12,8,12,11,10,13,20,7,35,36,5,24,20,28,23,10,12,20,72,13,19,16,8,18,12,13,17,7,18,52,17,16,15,5,23,11,13,12,9,9,5,8,28,22,35,45,48,43,13,31,7,10,10,9,8,18,19,2,29,176,7,8,9,4,8,5,6,5,6,8,8,3,18,3,3,21,26,9,8,24,13,10,7,12,15,21,10,20,14,9,6] ),
    new BibleBook( 20,  "Proverbs",     "pr",   "Proverbs",             /Pr(?:o|ov|overb|overbs)?\.?/i, [33,22,35,27,23,35,27,36,18,32,31,28,25,35,33,33,28,24,29,30,31,29,35,34,28,28,27,28,27,33,31] ),
    new BibleBook( 21,  "Ecclesiastes", "ec",   "Ecclesiastes",         /Ec(?:c|cl|cles|clesiastes)?\.?/i, [18,26,22,16,20,12,29,17,18,20,10,14] ),
    new BibleBook( 22,  "Song of Solomon", "ca", "Song of Solomon",     /(?:ca|can|canticles|song|song of sol|song of solomon)\.?/i, [17,17,11,16,16,13,13,14] ),
    new BibleBook( 23,  "Isaiah",       "isa",  "Isaiah",               /Isa(?:iah|\.)?/i, [31,22,26,6,30,13,25,22,21,34,16,6,22,32,9,14,14,7,25,6,17,25,18,23,12,21,13,29,24,33,9,20,24,17,10,22,38,22,8,31,29,25,28,28,25,13,15,22,26,11,23,15,12,17,13,12,21,14,21,22,11,12,19,12,25,24] ),
    new BibleBook( 24,  "Jeremiah",     "jer",  "Jeremiah",             /Jer(?:emiah|\.)?/i, [19,37,25,31,31,30,34,22,26,25,23,17,27,22,21,21,27,23,15,18,14,30,40,10,38,24,22,17,32,24,40,44,26,22,19,32,21,28,18,16,18,22,13,30,5,28,7,47,39,46,64,34] ),
    new BibleBook( 25,  "Lamentations", "la",   "Lamentations",         /La(?:m|ment|mentation|mentations)?\.?/i, [22,22,66,22,22] ),
    new BibleBook( 26,  "Ezekiel",      "eze",  "Ezekiel",              /Eze(?:k|kiel)?\.?/i, [28,10,27,17,17,14,27,18,11,22,25,28,23,23,8,63,24,32,14,49,32,31,49,27,17,21,36,26,21,26,18,32,33,31,15,38,28,23,29,49,26,20,27,31,25,24,23,35] ),
    new BibleBook( 27,  "Daniel",       "da",   "Daniel",               /Da(?:n|niel)?\.?/i, [21,49,30,37,31,28,28,27,27,21,45,13] ),
    new BibleBook( 28,  "Hosea",        "ho",   "Ho see uh",            /Ho(?:s|sea)?\.?/i, [11,23,5,19,15,11,16,14,17,15,12,14,16,9] ),
    new BibleBook( 29,  "Joel",         "joe",  "Joel",                 /Joe(?:l|\.)?/i, [20,32,21] ),
    new BibleBook( 30,  "Amos",         "am",   "Amos",                 /Am(?:os|\.)?/i, [15,16,15,13,27,14,17,14,15] ),
    new BibleBook( 31,  "Obadiah",      "ob",   "Obadiah",              /Ob(?:ad|adiah)?\.?/i, [21] ),
    new BibleBook( 32,  "Jonah",        "jon",  "Joan uh",              /Jon(?:ah|\.)?/i, [17,10,10,11] ),
    new BibleBook( 33,  "Micah",        "mic",  "Micah",                /Mic(?:ah|\.)?/i, [16,13,12,13,15,16,20] ),
    new BibleBook( 34,  "Nahum",        "na",   "Nay um",               /Na(?:hum|\.)?/i, [15,13,19] ),
    new BibleBook( 35,  "Habakkuk",     "hab",  "Hab uh kuk",           /Hab(?:ak|akkuk)?\.?/i, [17,20,19] ),
    new BibleBook( 36,  "Zephaniah",    "zep",  "Zephaniah",            /Ze(?:p|ph|phaniah)?\.?/i, [18,15,20] ),
    new BibleBook( 37,  "Haggai",       "hag",  "Hag eye",              /Hag(?:gai|\.)?/i, [15,23] ),
    new BibleBook( 38,  "Zechariah",    "zec",  "Zechariah",            /Zec(?:h|hariah)?\.?/i, [21,13,10,14,11,15,14,23,17,12,17,14,9,21] ),
    new BibleBook( 39,  "Malachi",      "mal",  "Malachi",              /Mal(?:achi|\.)?/i, [14,17,18,6] ),
    new BibleBook( 40,  "Matthew",      "mt",   "Matthew",              /(?:Mt|Mat|Matt|Matthew){1}\.?/i, [25,23,17,25,48,34,29,34,38,42,30,50,58,36,39,28,27,35,30,34,46,46,39,51,46,75,66,20] ),
    new BibleBook( 41,  "Mark",         "mr",   "Mark",                 /(?:Mr|Mar|Mark){1}\.?/i, [45,28,35,41,43,56,37,38,50,52,33,44,37,72,47,8] ),
    new BibleBook( 42,  "Luke",         "lu",   "Luke",                 /Lu(?:ke|\.)?/i, [80,52,38,44,39,49,50,56,62,42,54,59,35,35,32,31,37,43,48,47,38,71,56,53] ),
    new BibleBook( 43,  "John",         "joh",  "John",                 /Jo(?:h|hn)?\.?/i, [51,25,36,54,47,71,52,59,41,42,57,50,38,31,27,33,26,40,42,31,25] ),
    new BibleBook( 44,  "Acts",         "ac",   "Acts",                 /Ac(?:t|ts)?\.?/i, [26,47,26,37,42,15,60,40,43,48,30,25,52,28,41,40,34,28,41,38,40,30,35,27,27,32,44,31] ),
    new BibleBook( 45,  "Romans",       "ro",   "Romans",               /Ro(?:m|man|mans)?\.?/i, [32,29,31,25,21,23,25,39,33,21,36,21,14,23,33,27] ),
    new BibleBook( 46,  "1 Corinthians","1co",  "First Corinthians",    /1\s?Co(?:r|rinth|rinthians)?\.?/i, [31,16,23,21,13,20,40,13,27,33,34,31,13,40,58,24] ),
    new BibleBook( 47,  "2 Corinthians","2co",  "Second Corinthians",   /2\s?Co(?:r|rinth|rinthians)?\.?/i, [24,17,18,18,21,18,16,24,15,18,33,21,14] ),
    new BibleBook( 48,  "Galatians",    "ga",   "Galatians",            /Ga(?:l|latian|latians)?\.?/i, [24,21,29,31,26,18] ),
    new BibleBook( 49,  "Ephesians",    "eph",  "Ephesians",            /Ep(?:h|hesian|hesians)?\.?/i, [23,22,21,32,33,24] ),
    new BibleBook( 50,  "Phillipians",  "php",  "Phillipians",          /(?:Php|Phil|Phill|Phillipians){1}\.?/i, [30,30,21,23] ),
    new BibleBook( 51,  "Colossians",   "col",  "Colossians",           /Col(?:os|oss|ossian|ossians)?\.?/i, [29,23,25,18] ),
    new BibleBook( 52,  "1 Thessalonians", "1th", "First Thessalonians", /1\s?Th(?:es|ess|essalonians)?\.?/i, [10,20,13,18,28] ),
    new BibleBook( 53,  "2 Thessalonians", "2th", "Second Thessalonians", /2\s?Th(?:es|ess|essalonians)?\.?/i, [12,17,18] ),
    new BibleBook( 54,  "1 Timothy",    "1ti",  "First Timothy",        /1\s?Ti(?:m|mothy)?\.?/i, [20,15,16,16,25,21] ),
    new BibleBook( 55,  "2 Timothy",    "2ti",  "Second Timothy",       /2\s?Ti(?:m|mothy)?\.?/i, [18,26,17,22] ),
    new BibleBook( 56,  "Titus",        "tit",  "Titus",                /Tit(?:us|\.)?/i, [16,15,15] ),
    new BibleBook( 57,  "Philemon",     "phm",  "Phylee mun",           /(?:Phm|Philemon){1}\.?/i, [25] ),
    new BibleBook( 58,  "Hebrews",      "heb",  "Hebrews",              /He(?:b|brew|brews)?\.?/i, [14,18,19,16,14,20,28,13,28,39,40,29,25] ),
    new BibleBook( 59,  "James",        "jas",  "James",                /(?:Ja|Jas|Jam|Jame|James){1}\.?/i, [27,26,18,17,20] ),
    new BibleBook( 60,  "1 Peter",      "1pe",  "First Peter",          /1\s?Pe(?:t|te|ter)?\.?/i, [25,25,22,19,14] ),
    new BibleBook( 61,  "2 Peter",      "2pe",  "Second Peter",         /2\s?Pe(?:t|te|ter)?\.?/i, [21,22,18] ),
    new BibleBook( 62,  "1 John",       "1jo",  "First John",           /1\s?Jo(?:h|hn)?\.?/i, [10,29,24,21,21] ),
    new BibleBook( 63,  "2 John",       "2jo",  "Second John",          /2\s?Jo(?:h|hn)?\.?/i, [13] ),
    new BibleBook( 64,  "3 John",       "3jo",  "Third John",           /3\s?Jo(?:h|hn)?\.?/i, [14] ),
    new BibleBook( 65,  "Jude",         "jude", "Jude",                 /Jude/i, [25] ),
    new BibleBook( 66,  "Revelation",   "re",   "Revelation",           /Re(?:v|velation)?\.?/i, [20,29,22,11,14,17,17,13,21,11,19,17,18,20,8,21,18,24,21,15,27,21] )
];

module.exports=ScriptureUtil;