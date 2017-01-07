let Scripture=require("./Scripture.js");
let BibleBook=require("./BibleBook.js");

const SCRIPTURE_REGEX = /\b(\w+)\s*(\d[\d\s\-\.,;:]*)/igm;
const CHAPTERVERSE_REGEX = /(\d+)\s*[:\.]([\d\s\-,]+)/g;
const BIBLEBOOKS = [
    new BibleBook(  1,  "Genesis",      "ge",   "Genesis",              /Ge(?:n|nesis)?\.?/i   ),
    new BibleBook(  2,  "Exodus",       "ex",   "Exodus",               /Ex(?:odus)?\.?/i ),
    new BibleBook(  3,  "Leviticus",    "le",   "Leviticus",            /Le(?:v|viticus)?\.?/i ),
    new BibleBook(  4,  "Numbers",      "nu",   "Numbers",              /Nu(?:m|mber|mbers)?\.?/i ),
    new BibleBook(  5,  "Deuteronomy",  "de",   "Deuteronomy",          /De(?:ut|uter|uteronomy)?\.?/i ),
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
    new BibleBook( 31,  "Obadiah",      "ob",   "Obadiah",              /Ob(?:ad|adiah)?\.?/i, true ),
    new BibleBook( 32,  "Jonah",        "jon",  "Joan uh",              /Jon(?:ah|\.)?/i ),
    new BibleBook( 33,  "Micah",        "mic",  "Micah",                /Mic(?:ah|\.)?/i ),
    new BibleBook( 34,  "Nahum",        "na",   "Nay um",               /Na(?:hum|\.)?/i ),
    new BibleBook( 35,  "Habakkuk",     "hab",  "Hab uh kuk",           /Hab(?:ak|akkuk)?\.?/i ),
    new BibleBook( 36,  "Zephaniah",    "zep",  "Zephaniah",            /Ze(?:p|ph|phaniah)?\.?/i ),
    new BibleBook( 37,  "Haggai",       "hag",  "Hag eye",              /Hag(?:gai|\.)?/i ),
    new BibleBook( 38,  "Zechariah",    "zec",  "Zechariah",            /Zec(?:h|hariah)?\.?/i ),
    new BibleBook( 39,  "Malachi",      "mal",  "Malachi",              /Mal(?:achi|\.)?/i ),
    new BibleBook( 40,  "Matthew",      "mt",   "Matthew",              /(?:Mt|Mat|Matt|Matthew){1}\.?/i ),
    new BibleBook( 41,  "Mark",         "mr",   "Mark",                 /(?:Mr|Mar|Mark){1}\.?/i ),
    new BibleBook( 42,  "Luke",         "lu",   "Luke",                 /Lu(?:ke|\.)?/i ),
    new BibleBook( 43,  "John",         "joh",  "John",                 /Jo(?:h|hn)?\.?/i ),
    new BibleBook( 44,  "Acts",         "ac",   "Acts",                 /Ac(?:t|ts)?\.?/i ),
    new BibleBook( 45,  "Romans",       "ro",   "Romans",               /Ro(?:m|man|mans)?\.?/i ),
    new BibleBook( 46,  "1 Corinthians","1co",  "First Corinthians",    /1\s?Co(?:r|rinth|rinthians)?\.?/i ),
    new BibleBook( 47,  "2 Corinthians","2co",  "Second Corinthians",   /2\s?Co(?:r|rinth|rinthians)?\.?/i ),
    new BibleBook( 48,  "Galatians",    "ga",   "Galatians",            /Ga(?:l|lation|lations)?\.?/i ),
    new BibleBook( 49,  "Ephesians",    "eph",  "Ephesians",            /Ep(?:h|hesian|hesians)?\.?/i ),
    new BibleBook( 50,  "Phillipians",  "php",  "Phillipians",          /(?:Php|Phil|Phill|Phillipians){1}\.?/i ),
    new BibleBook( 51,  "Colossians",   "col",  "Colossians",           /Col(?:os|oss|ossian|ossians)?\.?/i ),
    new BibleBook( 52,  "1 Thessalonians", "1th", "First Thessalonians", /1\s?Th(?:es|ess|essalonians)?\.?/i ),
    new BibleBook( 53,  "2 Thessalonians", "2th", "Second Thessalonians", /2\s?Th(?:es|ess|essalonians)?\.?/i ),
    new BibleBook( 54,  "1 Timothy",    "1ti",  "First Timothy",        /1\s?Ti(?:m|mothy)?\.?/i ),
    new BibleBook( 55,  "2 Timothy",    "2ti",  "Second Timothy",       /2\s?Ti(?:m|mothy)?\.?/i ),
    new BibleBook( 56,  "Titus",        "tit",  "Titus",                /Tit(?:us|\.)?/i ),
    new BibleBook( 57,  "Philemon",     "phm",  "Phylee mun",           /(?:Phm|Philemon){1}\.?/i, true ),
    new BibleBook( 58,  "Hebrews",      "heb",  "Hebrews",              /He(?:b|brew|brews)?\.?/i ),
    new BibleBook( 59,  "James",        "jas",  "James",                /(?:Ja|Jas|Jam|Jame|James){1}\.?/i ),
    new BibleBook( 60,  "1 Peter",      "1pe",  "First Peter",          /1\s?Pe(?:t|te|ter)?\.?/i ),
    new BibleBook( 61,  "2 Peter",      "2pe",  "Second Peter",         /2\s?Pe(?:t|te|ter)?\.?/i ),
    new BibleBook( 62,  "1 John",       "1jo",  "First John",           /1\s?Jo(?:h|hn)?\.?/i ),
    new BibleBook( 63,  "2 John",       "2jo",  "Second John",          /2\s?Jo(?:h|hn)?\.?/i, true ),
    new BibleBook( 64,  "3 John",       "3jo",  "Third John",           /3\s?Jo(?:h|hn)?\.?/i, true ),
    new BibleBook( 65,  "Jude",         "jude", "Jude",                 /Jude/i, true ),
    new BibleBook( 66,  "Revelation",   "re",   "Revelation",           /Re(?:v|velation)?\.?/i )
];

/*  
 *  parseScripture:  Receives text and parses it into an array of Scripture objects.
 *  It outputs an array even if only one scripture is matched. 
 * 
 */
function parseScriptures(text) {
    var scriptures=[], scripRE=getScriptureRegEx(), scripmatch, s, cvmatch, b;
    while(scripmatch=scripRE.exec(text)) {
        b=findBibleBook(scripmatch[1]);
        while( cvmatch=CHAPTERVERSE_REGEX.exec(scripmatch[2]) ) {
            s=new Scripture(b,cvmatch[1],cvmatch[2]);
            if(s.valid()) scriptures.push(s);
        }
    }
    return scriptures;
}

/*
 *  getScriptureRegEx: Takes the simpler SCRIPTURE_REGEX constant and subs out the \w+ (word) 
 *  placeholder with all of the exact scripture regexes. This way it only matches real Bible books.
 * 
 */
function getScriptureRegEx() {
    var booksrearray=[];
    for( var b of BIBLEBOOKS ) booksrearray.push(b.regex.source);
    return RegExp(SCRIPTURE_REGEX.source.replace("\\w+",booksrearray.join("|")),SCRIPTURE_REGEX.flags);
}

/*
 *  findBibleBook: Receives text and determines what BibleBook object it matches.
 * 
 */
function findBibleBook(txt) {
    var b=null;
    for( var i=0 ; i<BIBLEBOOKS.length && !b ; i++ ) {
        if( BIBLEBOOKS[i].match(txt) ) b=BIBLEBOOKS[i];
    }
    return b;
}

module.exports={
    SCRIPTURE_REGEX: SCRIPTURE_REGEX,
    CHAPTERVERSE_REGEX: CHAPTERVERSE_REGEX,
    BIBLEBOOKS: BIBLEBOOKS,
    parseScriptures: parseScriptures,
    getScriptureRegEx: getScriptureRegEx,
    findBibleBook: findBibleBook
}
