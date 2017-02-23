const expect=require("chai").expect;
const ScriptureUtil=require("../ScriptureUtil");

describe("ScriptureUtil", function() {

    describe("Ignoring bad input", function() {
        var tests=[
            "What about blah 3:15? And pex 1:2.",
            "generation 3:15, 17, 20-22",
            "gen . 3:15",
            "gen hello 3:15",
            "Just some text.",
            "And Gen 31:52-58 is bad because there are only 55 verses in that chapter."
        ];
        tests.forEach(function(test) {
            it(`should not match "${test}"`, function() {
                var util=new ScriptureUtil();
                var result=util.parseScriptures(test);
                expect(result).to.be.empty;
            });
        });
    })

    describe("Accepting oddly-formed input", function() {
        var tests=[
            "Ex1:2 is ok.",
            "gen.3:15, 17, 20-24",
            "gen.   3:15",
            "gen 3:  15-18 is all",
            "gen 3:  15, 16 - 18 is ok"
        ];
        tests.forEach(function(test) {
            it(`should match "${test}"`, function() {
                var util=new ScriptureUtil();
                var result=util.parseScriptures(test);
                expect(result.length).to.equal(1);
            });
        });
    })

    describe("Multiple matching", function() {
        var tests=[
            {text:"Here is Gen 3:15 as the first prophecy.", cnt:1},
            {text:"Try Gen 3:18-20, 23; 8:4-6 for more info.", cnt:2},
            {text:"Ps 119:105; John 1:1; John 3:16; 5:12-15, 18", cnt:4}
        ];
        tests.forEach(function(test) {
            it(`should find ${test.cnt} match${test.cnt!=1?"es":""} in "${test.text}"`, function() {
                var util=new ScriptureUtil();
                var result=util.parseScriptures(test.text);
                expect(result.length).to.equal(test.cnt);
            });
        });
    })

    describe("No-chapter matching", function() {
        var tests=[
            {text:"Jude 2 is a nice salutation.", cnt:1},
            {text:"Philemon 3 is also a nice salutation.", cnt:1},
            {text:"Gen 3 is an entire chapter, not a single verse.", cnt:0}
        ];
        tests.forEach(function(test) {
            it(`should find ${test.cnt} match${test.cnt!=1?"es":""} in "${test.text}"`, function() {
                var util=new ScriptureUtil();
                var result=util.parseScriptures(test.text);
                expect(result.length).to.equal(test.cnt);
            });
        });
    })

});