import styler from '../helpers/Styler';
import type {BoardMatrix} from '../models/CommonTypes';
import { Player } from './Player';

let last: number;
let dt: number;

export class GameBoard {
    public boardArea: BoardMatrix = [
        [0, 1, 1, 1, 0],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [0, 1, 1, 1, 0]
    ];
    private squareSize = 124 as const;
    public player: Player;

    constructor(public ctx: CanvasRenderingContext2D, public canvas: HTMLCanvasElement) {
        this.renderBoard();
        this.gameAnimationLoop = this.gameAnimationLoop.bind(this);
        this.player = new Player(ctx, canvas, this.boardArea);
        this.player.draw();
    }

    private renderBoard() {
        let x = 0;
        let y = 0;
        for (let boardIdx = 0; boardIdx < this.boardArea.length; boardIdx++) {
            const row = this.boardArea[boardIdx];
            if(boardIdx !== 0)
                x += this.squareSize;
            for (let colIdx = 0; colIdx < row.length; colIdx++) {
                const cell = row[colIdx];
                if (cell === 1) {
                    if(colIdx !== 0)
                        y += this.squareSize;
                    this.ctx.strokeStyle = styler.neonBlock(this.ctx, this.canvas.height);
                    styler.roundRect(this.ctx, x + 1, y + 1, this.squareSize - 8, this.squareSize - 8, 24);
                }
                const isLastRow = boardIdx === this.boardArea.length - 1;
                const isLastCol = colIdx === row.length - 1;
                if(isLastRow && isLastCol) 
                    break;
                if(isLastCol)
                    y = 0;
            }
        }
    }
    
    public gameAnimationLoop() {
        requestAnimationFrame(this.gameAnimationLoop);
        this.player.update();
        this.renderBoard();
    }
}