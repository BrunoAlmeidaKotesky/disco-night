import { Utils } from '../helpers/Utils';
import playerImg from '../assets/char.png';
import type { BoardMatrix } from '../models/CommonTypes';

export class Player {

    private playerX: number = 275;
    private playerY: number = 275;
    private playerImg: HTMLImageElement = Utils.createImage(playerImg);
    private currentLocation: { row: number, column: number } = { row: 2, column: 2 };
    constructor(private ctx: CanvasRenderingContext2D, private canvas: HTMLCanvasElement, private boardMatrix: BoardMatrix) {
        addEventListener('keydown', this.moveHandler);
    }

    public draw() {
        this.ctx.drawImage(this.playerImg, this.playerX, this.playerY, 64, 64);
    }

    public update() {
        this.ctx.fillStyle = '#070606';
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.draw();
    }

    private moveHandler(e: KeyboardEvent) {
        const boardRow = this.currentLocation.row;
        const boardColumn = this.currentLocation.column;
        let newPosition: number;
        switch (e.key) {
            case 'ArrowUp': {
                newPosition = this.playerY - 124;
                if (newPosition <= 0) return;
                const topValue = this.boardMatrix[boardRow - 1]?.[boardColumn];
                if (topValue === 0) return;
                this.currentLocation.row--;
                this.playerY = newPosition;
                break;
            }
            case 'ArrowDown': {
                newPosition = this.playerY + 124;
                if (newPosition >= this.canvas.height) return;
                const bottomValue = this.boardMatrix[boardRow + 1]?.[boardColumn];
                if (bottomValue === 0) return;
                this.currentLocation.row++;
                this.playerY += 124;
                break;
            }
            case 'ArrowLeft': {
                newPosition = this.playerX - 124;
                if (newPosition <= 0) return;
                const leftValue = this.boardMatrix[boardRow]?.[boardColumn - 1];
                if (leftValue === 0) return;
                this.currentLocation.column--;
                this.playerX = newPosition;
                break;
            }
            case 'ArrowRight': {
                newPosition = this.playerX + 124;
                if (newPosition >= this.canvas.width) return;
                const rightValue = this.boardMatrix[boardRow]?.[boardColumn + 1];
                if (rightValue === 0) return;
                this.currentLocation.column++;
                this.playerX = newPosition;
                break;
            }
        }
    }

    public destroy() {
        removeEventListener('keydown', this.moveHandler);
    }
}