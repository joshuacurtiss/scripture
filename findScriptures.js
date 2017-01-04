function findScriptures(input) {
    var re=/\b(\w+)\s*(\d[\d\s\-\.,;:]*)/igm;
    var cvre=/(\d+)\s*[:\.]([\d\s\-,]+)/g
    var scr=[], match, cvmatch, cvgrp, versesText, verses, v, start, end, i;
    while (match = re.exec(input)) {
        cvgrp=match[2];
        while (cvmatch = cvre.exec(cvgrp)) {
            versesText=cvmatch[2];
            verses=[];
            for( v of versesText.split(",") ) {
                v=v.replace(/\s/g,"");
                if( v.split("-").length==2 ) {
                    start=v.split("-")[0];
                    end=v.split("-")[1];
                    if( start<=end ) {
                        for( i=start ; i<=end ; i++ ) verses.push(i.toString());
                    }
                }
                else verses.push(v.toString());
            }
            if( verses.length ) scr.push({book:match[1],chapter:cvmatch[1],verses:verses});
        }
    }
    return scr;
}
