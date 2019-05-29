import {expect} from "chai";
import {ColorCode} from "../src/ColorCode";
import {ColorUtils} from "../src/ColorUtils";

describe("ColorUtils", () => {
    describe("getColorCodeType", () => {
        it("should detect Hex3", () => {
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
        it("should detect Hex6", () => {
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
        it("should detect Rgb", () => {
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
    describe("rgbToHex", () => {
        it("should throw on invalid input", () => {
            expect(() => {
                ColorUtils.rgbToHex("");
            }).to.throw;
            expect(() => {
                ColorUtils.rgbToHex("#000");
            }).to.throw;
            expect(() => {
                ColorUtils.rgbToHex("#000000");
            }).to.throw;
            expect(() => {
                ColorUtils.rgbToHex("rgb(0,0,0");
            }).to.throw;
        });
        it("should convert rgb", () => {
            expect(ColorUtils.rgbToHex("rgb(0,0,0)")).to.equal("#000000");
            expect(ColorUtils.rgbToHex("rgb(0 , 0 , 0)")).to.equal("#000000");
            expect(ColorUtils.rgbToHex("rgb(255,255,255)")).to.equal("#ffffff");
            expect(ColorUtils.rgbToHex("rgb(42 , 148 , 240)")).to.equal("#2a94f0");
        });
    });

    describe("rgbaToHex", () => {
        
    })
});
