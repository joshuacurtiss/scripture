const expect=require("chai").expect;
const ScriptureUtil=require("../ScriptureUtil");

describe("ScriptureUtil", function() {

    describe("constructor", function() {
        it(`should receive no parameters without crashing`, function(){
            var test=new ScriptureUtil();
            expect(test).to.be.ok;
        })
        it(`should receive a bad path without crashing`, function(){
            var test=new ScriptureUtil("/dev/null/nogood/verybad/path");
            expect(test).to.be.ok;
        })
    })

    describe("parseScriptures()", function() {
        it(`should find scripture`, function() {
            var test=new ScriptureUtil();
            expect(test.parseScriptures("Gen 3:15, 16, 17")[0].toString()).to.equal("Genesis 3:15-17");
        })
    })

});