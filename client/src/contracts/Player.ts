import playerImg from '../assets/char.jpg';

export class Player {

    constructor(private ctx: CanvasRenderingContext2D) {}
    public numberOfBombs: number = 1;


    public render(x: number, y: number) {
        //Render the sprite from the ../assets/char.jpg to the canvas...
        const img = new Image();
        img.onload = () => {
            //this.ctx.save();
            //this.ctx.drawImage(img, x, y, this.ctx.canvas.width, this.ctx.canvas.height);
            //this.ctx.fill();
        }
        img.src = playerImg;
    }
}