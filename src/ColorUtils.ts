import {ColorCode} from "./ColorCode";

/**
 * Utilities to deal with colors in various formats.
 * Supports Hexadecimal color codes and rgb codes.
 */
export class ColorUtils {

    /**
     * Converts a color from rgb to hexadecimal
     * rgb(0, 0, 0) => #000000
     */
    public static rgbToHex(color: string): string {
        if (ColorUtils.getColorCodeType(color) === ColorCode.Rgb) {
            let returnValue = "#";
            const rgb = color.replace(/rgb\(|\)/g, "").split(",");
            for (let i = 0; i < 3; i++) {
                let hex = Number(rgb[i]).toString(16);
                if (hex.length < 2) {
                    hex = "0" + hex;
                }
                returnValue += hex;
            }
            return returnValue;
        }
        throw new TypeError("Color '" + color + "' is not of type ColorCode.Rgb");
    }

    /**
     * Converts a color from rgba with 100% opacity to hexadecimal.
     * rgba(0, 0, 0, 1) => #000000
     * rgba(0, 0, 0, 0) => null
     * @param color
     */
    public static rgbaToHex(color: string): string | null {
        if (ColorUtils.getColorCodeType(color) === ColorCode.Rgba) {
            const rgba = color.replace(/rgba\(|\)|\s/g, "").split(",");
            if (rgba[3] !== "1") {
                return null;
            } else {
                let returnValue = "#";
                for (let i = 0; i < 3; i++) {
                    let hex = Number(rgba[i]).toString(16);
                    if (hex.length < 2) {
                        hex = "0" + hex;
                    }
                    returnValue += hex;
                }
                return returnValue;
            }
        }
        return null;
    }

    /**
     * Returns the color code type of the input string.
     * @param color Input String
     */
    public static getColorCodeType(color: string): ColorCode {
        if (color.match(/^#[a-fA-F0-9]{3}$/)) {
            return ColorCode.Hex3;
        }
        if (color.match(/^#[a-fA-F0-9]{6}$/)) {
            return ColorCode.Hex6;
        }
        if (color.match(/^rgb\((\s?\d{1,3}\s?,){2}\s?\d{1,3}\s?\)$/)) {
            return ColorCode.Rgb;
        }
        if (color.match(/^rgba\((\s?\d{1,3}\s?,){3}\s?\d\s?\)$/)) {
            return ColorCode.Rgba;
        }
        throw new TypeError("Not a valid color string");
    }

    /**
     * Input any color string (except rgba) and receive a six digit hexadecmial color string.
     * Returns null on invalid input.
     * @param color
     */
    public static clean(color: string): string {
        const type = ColorUtils.getColorCodeType(color);
        switch (type) {
            case ColorCode.Hex3: {
                const orig = color;
                color = "#";
                for (let i = 0; i < 3; i++) {
                    const char = orig.charAt(i + 1);
                    color += char.repeat(2);
                }
                return color;
            }
            case ColorCode.Hex6: {
                return color;
            }
            case ColorCode.Rgb: {
                return ColorUtils.rgbToHex(color);
            }
            case ColorCode.Rgba: {
                // Depends on background color.
                throw new Error("not implemented");
            }
        }
        // For good measure
        throw new Error("Unable to clean: Unknown Color Code Type");
    }

    /**
     * Compares two color strings of any color code type (except rgba) against each other.
     * Returns true if colors match.
     * @param left
     * @param right
     */
    public static compare(left: string, right: string): boolean {
        const nLeft = ColorUtils.clean(left);
        const nRight = ColorUtils.clean(right);
        if (nLeft != null && nRight != null) {
            return nLeft === nRight;
        }
        return false;
    }
}
