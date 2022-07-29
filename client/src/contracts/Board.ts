import styler from '../helpers/Styler';

type BoardMatrix = number[][];
let last: number;
let dt: number;

export class Board {
    private boardArea: BoardMatrix = [
        [0, 1, 1, 1, 0],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [0, 1, 1, 1, 0]
    ];
    private squareSize = 124 as const;

    constructor(public ctx: CanvasRenderingContext2D, public canvas: HTMLCanvasElement) {
        this.gameLoop = this.gameLoop.bind(this);
        this.initBoard();
    }

    private initBoard() {
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
                    //A padding of 1px is added to each side of the square to make it look better.
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
        requestAnimationFrame(this.gameLoop);
    }
    
    private gameLoop(timestamp: number) {
        requestAnimationFrame(this.gameLoop);
        
        if (!last) {
            last = timestamp;
        }
        dt = timestamp - last;
        last = timestamp;
    }
}

