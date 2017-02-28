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
        var scriptures=[], scripRE=this.getScriptureRegEx(), scripmatch, s, cvmatch, b;
        while(scripmatch=scripRE.exec(text)) {
            b=this.getBibleBook(scripmatch[1]);
            if( b.hasChapters ) {
                while( cvmatch=ScriptureUtil.CHAPTERVERSE_REGEX.exec(scripmatch[2]) ) {
                    s=new Scripture(b,cvmatch[1],cvmatch[2]);
                    if(s.valid()) scriptures.push(s);
                }
            } else {
                while( cvmatch=ScriptureUtil.VERSENOCHAPTER_REGEX.exec(scripmatch[2]) ) {
                    s=new Scripture(b,1,cvmatch[0]);
                    if(s.valid()) scriptures.push(s);
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

ScriptureUtil.SCRIPTURE_REGEX = /\b(\w+)\s*(\d[\d\s\-\.,;:]*)/igm;
ScriptureUtil.CHAPTERVERSE_REGEX = /(\d+)\s*[:\.]([\d\s\-,]+)/g;
ScriptureUtil.VERSENOCHAPTER_REGEX = /\d+\s*[\d\s\-,]*/g;
ScriptureUtil.BIBLEBOOKS = [
    new BibleBook(  1,  "Genesis",      "ge",   "Genesis",              /Ge(?:n|nesis)?\.?/i, [31,25,24,26,24,22,24,22,29,31,31,20,18,24,21,16,27,33,38,18,34,24,20,67,34,35,46,15,35,43,55,28,20,31,29,43,36,30,23,23,57,38,34,34,28,34,31,22,33,25] ),
    new BibleBook(  2,  "Exodus",       "ex",   "Exodus",               /Ex(?:odus)?\.?/i, [22,25,22,31,23,30,25,23,16,29,2,51,22,31,27,36,16,27,15,26,36,31,33,18,40,37,21,43,46,38,18,29,23,35,35,38,29,31,43,38] ),
    new BibleBook(  3,  "Leviticus",    "le",   "Leviticus",            /Le(?:v|viticus)?\.?/i, [17,16,17,35,19,30,38,36,24,20,47,8,59,57,33,34,16,30,34,27,24,33,43,23,55,46,34] ),
    new BibleBook(  4,  "Numbers",      "nu",   "Numbers",              /Nu(?:m|mber|mbers)?\.?/i, [54,34,51,49,31,27,89,26,23,36,35,16,33,45,41,50,13,32,22,29,35,41,30,25,18,65,23,31,38,16,54,42,56,29,34,13] ),
    new BibleBook(  5,  "Deuteronomy",  "de",   "Deuteronomy",          /De(?:ut|uter|uteronomy)?\.?/i, [46,37,29,49,33,25,26,20,22,12,32,32,18,29,23,22,18,22,15,9,23,30,25,22,19,19,26,68,29,20,30,52,27,12] ),
    new BibleBook(  6,  "Joshua",       "jos",  "Joshua",               /Jos(?:h|hua)?\.?/i ),
    new BibleBook(  7,  "Judges",       "jg",   "Judges",               /(?:Jg|Judg|Judge|Judges){1}\.?/i ),
    new BibleBook(  8,  "Ruth",         "ru",   "Ruth",                 /Ru(?:th)?\.?/i ),
    new BibleBook(  9,  "1 Samuel",     "1sa",  "First Samuel",         /1\s?Sa(?:m|muel)?\.?/i ),
    new BibleBook( 10,  "2 Samuel",     "2sa",  "Second Samuel",        /2\s?Sa(?:m|muel)?\.?/i ),
    new BibleBook( 11,  "1 Kings",      "1ki",  "First Kings",          /1\s?Ki(?:ng|ngs)?\.?/i ),
    new BibleBook( 12,  "2 Kings",      "2ki",  "Second Kings",         /2\s?Ki(?:ng|ngs)?\.?/i ),
    new BibleBook( 13,  "1 Chronicles", "1ch",  "First Chronicles",     /1\s?Ch(?:r|ron|ronicles)?\.?/i ),
    new BibleBook( 14,  "2 Chronicles", "2ch",  "Second Chronicles",    /2\s?Ch(?:r|ron|ronicles)?\.?/i ),
    new BibleBook( 15,  "Ezra",         "ezr",  "Ezra",                 /Ezr(?:a|\.)?/i ),
    new BibleBook( 16,  "Nehemiah",     "ne",   "Neea my uh",           /Ne(?:h|hemiah)?\.?/i ),
    new BibleBook( 17,  "Esther",       "es",   "Esther",               /Es(?:t|th|ther)?\.?/i ),
    new BibleBook( 18,  "Job",          "job",  "Joab",                 /Job/i ),
    new BibleBook( 19,  "Psalms",       "ps",   "Psalms",               /Ps(?:alm|alms)?\.?/i ),
    new BibleBook( 20,  "Proverbs",     "pr",   "Proverbs",             /Pr(?:o|ov|overb|overbs)?\.?/i ),
    new BibleBook( 21,  "Ecclesiastes", "ec",   "Ecclesiastes",         /Ec(?:c|cl|cles|clesiastes)?\.?/i ),
    new BibleBook( 22,  "Song of Solomon", "ca", "Song of Solomon",     /(?:ca|can|canticles|song|song of sol|song of solomon)\.?/i ),
    new BibleBook( 23,  "Isaiah",       "isa",  "Isaiah",               /Isa(?:iah|\.)?/i ),
    new BibleBook( 24,  "Jeremiah",     "jer",  "Jeremiah",             /Jer(?:emiah|\.)?/i ),
    new BibleBook( 25,  "Lamentations", "la",   "Lamentations",         /La(?:m|ment|mentation|mentations)?\.?/i ),
    new BibleBook( 26,  "Ezekiel",      "eze",  "Ezekiel",              /Eze(?:k|kiel)?\.?/i ),
    new BibleBook( 27,  "Daniel",       "da",   "Daniel",               /Da(?:n|niel)?\.?/i ),
    new BibleBook( 28,  "Hosea",        "ho",   "Ho see uh",            /Ho(?:s|sea)?\.?/i ),
    new BibleBook( 29,  "Joel",         "joe",  "Joel",                 /Joe(?:l|\.)?/i ),
    new BibleBook( 30,  "Amos",         "am",   "Amos",                 /Am(?:os|\.)?/i ),
    new BibleBook( 31,  "Obadiah",      "ob",   "Obadiah",              /Ob(?:ad|adiah)?\.?/i, [21] ),
    new BibleBook( 32,  "Jonah",        "jon",  "Joan uh",              /Jon(?:ah|\.)?/i ),
    new BibleBook( 33,  "Micah",        "mic",  "Micah",                /Mic(?:ah|\.)?/i ),
    new BibleBook( 34,  "Nahum",        "na",   "Nay um",               /Na(?:hum|\.)?/i ),
    new BibleBook( 35,  "Habakkuk",     "hab",  "Hab uh kuk",           /Hab(?:ak|akkuk)?\.?/i ),
    new BibleBook( 36,  "Zephaniah",    "zep",  "Zephaniah",            /Ze(?:p|ph|phaniah)?\.?/i ),
    new BibleBook( 37,  "Haggai",       "hag",  "Hag eye",              /Hag(?:gai|\.)?/i ),
    new BibleBook( 38,  "Zechariah",    "zec",  "Zechariah",            /Zec(?:h|hariah)?\.?/i ),
    new BibleBook( 39,  "Malachi",      "mal",  "Malachi",              /Mal(?:achi|\.)?/i ),
    new BibleBook( 40,  "Matthew",      "mt",   "Matthew",              /(?:Mt|Mat|Matt|Matthew){1}\.?/i, [25,23,17,25,48,33,29,34,38,42,30,50,58,36,39,28,27,35,30,34,42,46,39,51,46,75,66,20] ),
    new BibleBook( 41,  "Mark",         "mr",   "Mark",                 /(?:Mr|Mar|Mark){1}\.?/i, [45,28,35,41,43,56,37,38,50,52,33,44,37,72,47,8] ),
    new BibleBook( 42,  "Luke",         "lu",   "Luke",                 /Lu(?:ke|\.)?/i, [80,52,38,44,39,49,43,56,62,42,54,59,35,35,32,31,32,43,48,47,38,71,56,53] ),
    new BibleBook( 43,  "John",         "joh",  "John",                 /Jo(?:h|hn)?\.?/i, [51,25,36,54,47,71,52,59,41,42,57,50,38,28,27,33,26,36,42,31,25] ),
    new BibleBook( 44,  "Acts",         "ac",   "Acts",                 /Ac(?:t|ts)?\.?/i ),
    new BibleBook( 45,  "Romans",       "ro",   "Romans",               /Ro(?:m|man|mans)?\.?/i ),
    new BibleBook( 46,  "1 Corinthians","1co",  "First Corinthians",    /1\s?Co(?:r|rinth|rinthians)?\.?/i ),
    new BibleBook( 47,  "2 Corinthians","2co",  "Second Corinthians",   /2\s?Co(?:r|rinth|rinthians)?\.?/i ),
    new BibleBook( 48,  "Galatians",    "ga",   "Galatians",            /Ga(?:l|latian|latians)?\.?/i ),
    new BibleBook( 49,  "Ephesians",    "eph",  "Ephesians",            /Ep(?:h|hesian|hesians)?\.?/i ),
    new BibleBook( 50,  "Phillipians",  "php",  "Phillipians",          /(?:Php|Phil|Phill|Phillipians){1}\.?/i ),
    new BibleBook( 51,  "Colossians",   "col",  "Colossians",           /Col(?:os|oss|ossian|ossians)?\.?/i ),
    new BibleBook( 52,  "1 Thessalonians", "1th", "First Thessalonians", /1\s?Th(?:es|ess|essalonians)?\.?/i ),
    new BibleBook( 53,  "2 Thessalonians", "2th", "Second Thessalonians", /2\s?Th(?:es|ess|essalonians)?\.?/i ),
    new BibleBook( 54,  "1 Timothy",    "1ti",  "First Timothy",        /1\s?Ti(?:m|mothy)?\.?/i ),
    new BibleBook( 55,  "2 Timothy",    "2ti",  "Second Timothy",       /2\s?Ti(?:m|mothy)?\.?/i ),
    new BibleBook( 56,  "Titus",        "tit",  "Titus",                /Tit(?:us|\.)?/i ),
    new BibleBook( 57,  "Philemon",     "phm",  "Phylee mun",           /(?:Phm|Philemon){1}\.?/i, [25] ),
    new BibleBook( 58,  "Hebrews",      "heb",  "Hebrews",              /He(?:b|brew|brews)?\.?/i ),
    new BibleBook( 59,  "James",        "jas",  "James",                /(?:Ja|Jas|Jam|Jame|James){1}\.?/i ),
    new BibleBook( 60,  "1 Peter",      "1pe",  "First Peter",          /1\s?Pe(?:t|te|ter)?\.?/i ),
    new BibleBook( 61,  "2 Peter",      "2pe",  "Second Peter",         /2\s?Pe(?:t|te|ter)?\.?/i ),
    new BibleBook( 62,  "1 John",       "1jo",  "First John",           /1\s?Jo(?:h|hn)?\.?/i ),
    new BibleBook( 63,  "2 John",       "2jo",  "Second John",          /2\s?Jo(?:h|hn)?\.?/i, [13] ),
    new BibleBook( 64,  "3 John",       "3jo",  "Third John",           /3\s?Jo(?:h|hn)?\.?/i, [14] ),
    new BibleBook( 65,  "Jude",         "jude", "Jude",                 /Jude/i, [25] ),
    new BibleBook( 66,  "Revelation",   "re",   "Revelation",           /Re(?:v|velation)?\.?/i )
];

module.exports=ScriptureUtil;