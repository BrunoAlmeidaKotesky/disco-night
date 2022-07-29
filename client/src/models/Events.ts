
export interface TickEvent extends Event {
    bubbles: boolean;
    cancelable: boolean;
    composed: boolean;
    detail: {
        frameCount: number,
        frameSkip: number
    }
}