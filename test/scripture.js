const expect=require("chai").expect;
const BibleBook=require("../BibleBook");
const Scripture=require("../Scripture");

var book=Genesis=new BibleBook(1,"Genesis","ge","Genesis",/Ge(?:n|nesis)?\.?/i, [31,25,24,26,24,22,24,22,29,31,31,20,18,24,21,16,27,33,38,18,34,24,20,67,34,35,46,15,35,43,55,28,20,31,29,43,36,30,23,23,57,38,34,34,28,34,31,22,33,25]);
var Luke=new BibleBook(42,"Luke","lu","Luke",/Lu(?:ke|\.)?/i, [80,52,38,44,39,49,43,56,62,42,54,59,35,35,32,31,32,43,48,47,38,71,56,53]);
var Jude=new BibleBook(65,"Jude","jude","Jude",/Jude/i, [25]);
var bookWithNoVerseMax=new BibleBook(40,"Matthew","mt","Matthew",/(?:Mt|Mat|Matt|Matthew){1}\.?/i);

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
            {scripture:new Scripture(Genesis,3,24), valid:true},
            {scripture:new Scripture(Genesis,3,25), valid:false},
            {scripture:new Scripture(Genesis,50,1), valid:true},
            {scripture:new Scripture(Luke,30,1), valid:false},
            {scripture:new Scripture(Luke,0,1), valid:false},
            {scripture:new Scripture(Luke,1,0), valid:false},
            {scripture:new Scripture(Luke,5,[36,37,38,39]), valid:true},
            {scripture:new Scripture(Luke,5,[36,37,38,39,40]), valid:false},
            {scripture:new Scripture(Jude,2,1), valid:false}
        ];
        tests.forEach(function(test) {
            it(`should mark "${test.scripture.toString()}" as ${test.valid?"valid":"invalid"}`, function() {
                expect(test.scripture.valid()).to.equal(test.valid);
            });
        });
        it(`should validate a book with no verseMax set`, function() {
            var scripture=new Scripture(bookWithNoVerseMax,5,20);
            expect(scripture.valid()).to.be.true;
        })
        it(`should mark as invalid a chapter over 150 even if book verseMax is not set`, function() {
            var scripture=new Scripture(bookWithNoVerseMax,151,20);
            expect(scripture.valid()).to.be.false;
        })
        it(`should mark as invalid a verse over 199 even if book verseMax is not set`, function() {
            var scripture=new Scripture(bookWithNoVerseMax,5,200);
            expect(scripture.valid()).to.be.false;
        })
    })

    describe("set verses", function() {
        it(`should accept an array`)
        it(`should accept a number`)
        it(`should accept a string of number range`)
        it(`should accept a string of number list`)
    });

});