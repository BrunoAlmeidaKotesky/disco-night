
export class Utils {
    static clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

    static createImage(src: string): HTMLImageElement {
        const img = new Image();
        img.src = src;
        return img;
    }
}