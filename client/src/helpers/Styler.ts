
type RadiusStyle = number | Record<'tl'|'tr'|'bl'|'br', number>;
export class Styles {

    public neonBlock(ctx: CanvasRenderingContext2D, canvasHeight: number): CanvasFillStrokeStyles['fillStyle'] {
        //Return an bordered rectangle with some depth and a blue and pink neon gradient.
        const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
        gradient.addColorStop(0, '#00f');
        gradient.addColorStop(0.75, '#f0f');
        gradient.addColorStop(1, '#0ff');
        ctx.lineJoin = 'round';
        ctx.lineWidth = 6;
        return gradient;
    }

    public roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: RadiusStyle = 5, fill = false, stroke = true) {
        if (typeof radius === 'number') 
            radius = { tl: radius, tr: radius, br: radius, bl: radius };
         else 
            radius = { ...{ tl: 0, tr: 0, br: 0, bl: 0 }, ...radius };
        ctx.beginPath();
        ctx.moveTo(x + radius.tl, y);
        ctx.lineTo(x + width - radius.tr, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
        ctx.lineTo(x + width, y + height - radius.br);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
        ctx.lineTo(x + radius.bl, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
        ctx.lineTo(x, y + radius.tl);
        ctx.quadraticCurveTo(x, y, x + radius.tl, y);
        ctx.closePath();
        if (fill) 
            ctx.fill();
        if (stroke) 
            ctx.stroke();
    }
}

export default new Styles();