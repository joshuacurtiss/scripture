const expect=require("chai").expect;
const BibleBook=require("../BibleBook");
const Scripture=require("../Scripture");

var book=Genesis=new BibleBook(1,"Genesis","ge","Genesis",/Ge(?:n|nesis)?\.?/i);
var Luke=new BibleBook(42,"Luke","lu","Luke",/Lu(?:ke|\.)?/i);
var Jude=new BibleBook(65,"Jude","jude","Jude",/Jude/i,true);

describe("Scripture", function() {

    describe("toString()", function() {
        it(`should return a normal scripture string`, function() {
            var scripture=new Scripture(book,3,[15,16,17,20]);
            expect(scripture.toString()).to.equal("Genesis 3:15-17, 20");
        })
        it(`should return a scripture string for no-chapter books`, function() {
            var scripture=new Scripture(Jude,1,2);
            expect(scripture.toString()).to.equal("Jude 2");
        })
    })

    describe("toAbbrevString()", function() {
        it(`should return a compact scripture string`, function() {
            var scripture=new Scripture(book,3,[15,16,17,20]);
            expect(scripture.toAbbrevString()).to.equal("ge3:15-17,20");
        })
        it(`should return a compact scripture string for no-chapter books`, function() {
            var scripture=new Scripture(Jude,1,2);
            expect(scripture.toAbbrevString()).to.equal("jude2");
        })
    })

    describe("versesToString()", function() {
        it(`should display a single number`, function() {
            var scripture=new Scripture(book,3,[15]);
            expect(scripture.versesToString()).to.equal("15");
        });
        it(`should display hyphenated range`, function() {
            var scripture=new Scripture(book,3,[15,16,17]);
            expect(scripture.versesToString()).to.equal("15-17");
        });
        it(`should display hyphenated range separated by commas`, function() {
            var scripture=new Scripture(book,3,[15,16,17,19,20]);
            expect(scripture.versesToString()).to.equal("15-17, 19-20");
        });
    });

    describe("valid()", function(){
        it(`should return true for valid scripture`, function(){
            var scripture=new Scripture(book,3,[15,16,17,19,20]);
            expect(scripture.valid()).to.be.true;
        })
        it(`should return false for scripture with missing book`, function(){
            var scripture=new Scripture();
            scripture.chapter=3;
            scripture.verses=[1,2,3];
            expect(scripture.valid()).to.be.false;
        })
        it(`should return false for scripture with missing chapter`, function(){
            var scripture=new Scripture(book);
            scripture.verses=[15,16,17,19,20];
            expect(scripture.valid()).to.be.false;
        })
        it(`should return false for scripture with missing or empty verses array`, function(){
            var scripture=new Scripture(book,3);
            expect(scripture.valid()).to.be.false;
        })
        it(`should return false for non-numeric chapter`, function(){
            var scripture=new Scripture(book,"x",[15,16,17,19,20]);
            expect(scripture.valid()).to.be.false;
        })
        it(`should return false for book not being a BibleBook object`, function(){
            var scripture=new Scripture("Genesis",3,[15,16,17,19,20]);
            expect(scripture.valid()).to.be.false;
        })
    });

    describe("valid() range detection", function() {
        var tests=[
            new Scripture(Genesis,3,25),
            new Scripture(Luke,30,1),
            new Scripture(Luke,0,1),
            new Scripture(Luke,1,0),
            new Scripture(Luke,5,[36,37,38,39,40,41,42]),
            new Scripture(Jude,2,1)
        ];
        tests.forEach(function(test) {
            it(`should mark "${test.toString()}" as invalid`, function() {
                expect(test.valid()).to.be.false;
            });
        });
    })

    describe("set verses", function() {
        it(`should accept an array`)
        it(`should accept a number`)
        it(`should accept a string of number range`)
        it(`should accept a string of number list`)
    });

});