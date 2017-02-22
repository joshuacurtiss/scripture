const expect=require("chai").expect;
const BibleBook=require("../BibleBook");

var book=new BibleBook(1,"Genesis","ge","Genesis",/Ge(?:n|nesis)?\.?/i);

describe("BibleBook", function() {

    describe("match()", function() {
        it(`should match full book name`, function() {
            expect(book.match("Genesis")).to.be.true;
        })
        it(`should be case-insensitive`, function() {
            expect(book.match("genesis")).to.be.true;
        })
        it(`should match abbreviated book name`, function() {
            expect(book.match("gen")).to.be.true;
        })
    })

});