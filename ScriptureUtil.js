let Scripture=require("./Scripture.js");

const SCRIPTURE_REGEX = /\b(\w+)\s*(\d[\d\s\-\.,;:]*)/igm;
const CHAPTERVERSE_REGEX = /(\d+)\s*[:\.]([\d\s\-,]+)/g;

/*  
 *  parseScripture:  Receives text and parses it into an array of Scripture objects.
 *  It outputs an array even if only one scripture is matched. 
 * 
 */
function parseScriptures(text) {
    var scriptures=[], s, scripmatch, cvmatch;
    while(scripmatch=SCRIPTURE_REGEX.exec(text)) {
        while( cvmatch=CHAPTERVERSE_REGEX.exec(scripmatch[2]) ) {
            s=new Scripture(scripmatch[1],cvmatch[1],cvmatch[2]);
            if(s.valid()) scriptures.push(s);
        }
    }
    return scriptures;
}

module.exports={
    SCRIPTURE_REGEX: SCRIPTURE_REGEX,
    CHAPTERVERSE_REGEX: CHAPTERVERSE_REGEX,
    parseScriptures: parseScriptures
}
