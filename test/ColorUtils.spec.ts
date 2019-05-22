import {expect} from "chai";
import {ColorCode} from "../src/ColorCode";
import {ColorUtils} from "../src/ColorUtils";

describe("ColorUtils", () => {
    describe("getColorCodeType", () => {
        it("should correctly detect Hex3", () => {
            expect(ColorUtils.getColorCodeType("#000")).to.equal(ColorCode.Hex3);
            expect(ColorUtils.getColorCodeType("#fff")).to.equal(ColorCode.Hex3);
            expect(ColorUtils.getColorCodeType("#FFF")).to.equal(ColorCode.Hex3);
            expect(() => {
                ColorUtils.getColorCodeType("#00");
            }).to.throw;
            expect(() => {
                ColorUtils.getColorCodeType("#0000");
            }).to.throw;
            expect(() => {
                ColorUtils.getColorCodeType("000");
            }).to.throw;
        });
        it("should correctly detect Hex6", () => {
            expect(ColorUtils.getColorCodeType("#000000")).to.equal(ColorCode.Hex6);
            expect(ColorUtils.getColorCodeType("#ffffff")).to.equal(ColorCode.Hex6);
            expect(ColorUtils.getColorCodeType("#FFFFFF")).to.equal(ColorCode.Hex6);
            expect(() => {
                ColorUtils.getColorCodeType("#0000000");
            }).to.throw;
            expect(() => {
                ColorUtils.getColorCodeType("#000000");
            }).to.throw;
            expect(() => {
                ColorUtils.getColorCodeType("000000");
            }).to.throw;
        });
        it("should correctly detect Rgb", () => {
            expect(ColorUtils.getColorCodeType("rgb(0,0,0)")).to.equal(ColorCode.Rgb);
            expect(ColorUtils.getColorCodeType("rgb(255,255,255)")).to.equal(ColorCode.Rgb);
            expect(ColorUtils.getColorCodeType("rgb(0 , 0 , 0)")).to.equal(ColorCode.Rgb);
            expect(ColorUtils.getColorCodeType("rgb(255, 255, 255)")).to.equal(ColorCode.Rgb);
            expect(() => {
                ColorUtils.getColorCodeType("0,0,0");
            }).to.throw;
            expect(() => {
                ColorUtils.getColorCodeType("(0,0,0)");
            }).to.throw;
            expect(() => {
                ColorUtils.getColorCodeType("rgb(255,255,F)");
            }).to.throw;
        });
        /*
        it("should correctly detect Rgba", () => {
            expect(ColorUtils.getColorCodeType("rgba(0,0,0,0)")).to.equal(ColorCode.Rgba);
            expect(ColorUtils.getColorCodeType("rgba(255,255,255,1)")).to.equal(ColorCode.Rgba);
            expect(ColorUtils.getColorCodeType("rgba(0, 0 , 0, 0)")).to.equal(ColorCode.Rgba);
            expect(ColorUtils.getColorCodeType("rgba(255, 255, 255, 1)")).to.equal(ColorCode.Rgba);
            expect(ColorUtils.getColorCodeType("rgba(255, 255, 255, 0.5)")).to.equal(ColorCode.Rgba);
        });
        */
    });
});
