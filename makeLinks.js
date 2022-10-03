const fs = require('fs');
const path = require('path');
const filePath = path.resolve('test.html');

const ScriptureUtil = require('./ScriptureUtil');
const scriptureUtil = new ScriptureUtil();

const searchLink = 'https://wol.jw.org/en/wol/l/r1/lp-e'
const cr = '\n';
const sep = cr + cr;
const data = fs.readFileSync(filePath, {encoding:'utf8', flag:'r'});

const withLinks = data.split(sep).map(line=>{
    line = line.replace(/\r/g, '').replace(/(\n|\s)+/g, ' ').trim();
    const matches = scriptureUtil.parseScripturesWithIndex(line);
    while( matches.length ) {
        const match = matches.pop();
        const params = new URLSearchParams({q: match.obj.toAbbrevString()});
        line = line.substr(0, match.index) + 
            `<a href='${searchLink}?${params}' target='_blank'>${match.match}</a>` + 
            line.substr(match.index + match.match.length);
    }
    return line;
}).join(sep);

console.log(withLinks);
