/**
 * Utilities to deal with colors in various formats.
 * Supports Hexadecimal color codes and rgb codes.
 */
export class ColorUtils {

    /**
     * Converts a color from rgb to hexadecimal
     * rgb(0, 0, 0) => #000000
     */
    public static rgbToHex(color: string): string | null {
        if (ColorUtils.getColorCodeType(color) === ColorCodeType.Rgb) {
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
        return null;
    }

    /**
     * Returns the color code type of the input string.
     * @param color Input String
     */
    public static getColorCodeType(color: string): ColorCodeType {
        if (color.match(/^#[a-fA-F0-9]{3}$/)) {
            return ColorCodeType.Hex3;
        }
        if (color.match(/^#[a-fA-F0-9]{6}$/)) {
            return ColorCodeType.Hex6;
        }
        if (color.match(/^rgb\((\s?\d{1,3}\s?,){2}\s?\d{1,3}\s?\)$/)) {
            return ColorCodeType.Rgb;
        }
        if (color.match(/^rgba\((\s?\d{1,3}\s?,){3}\s?\d\s?\)$/)) {
            return ColorCodeType.Rgba;
        }
        return ColorCodeType.NONE;
    }

    /**
     * Input any color string (except rgba) and receive a six digit hexadecmial color string.
     * Returns null on invalid input.
     * @param color
     */
    public static clean(color: string): string | null {
        const type = ColorUtils.getColorCodeType(color);
        switch (type) {
            case ColorCodeType.NONE: {
                return null;
            }
            case ColorCodeType.Hex3: {
                const orig = color;
                color = "#";
                for (let i = 0; i < 3; i++) {
                    const char = orig.charAt(i + 1);
                    color += char.repeat(2);
                }
                return color;
            }
            case ColorCodeType.Hex6: {
                return color;
            }
            case ColorCodeType.Rgb: {
                return ColorUtils.rgbToHex(color);
            }
            case ColorCodeType.Rgba: {
                // Depends on background color.
                return null;
            }
        }
        // For good measure
        return null;
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

enum ColorCodeType {
    NONE,
    Hex3,
    Hex6,
    Rgb,
    Rgba,
}