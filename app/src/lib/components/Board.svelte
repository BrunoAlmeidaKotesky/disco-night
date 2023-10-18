<script lang="ts">
  import { onMount } from "svelte";
  import { GameBoard } from "../logic/GameBoard";
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let canvasWidth: number = 620;
  let canvasHeight: number = 620;

  onMount(() => {
    ctx = canvas.getContext("2d");
    const gameBoard = new GameBoard(ctx, canvas);
    gameBoard.gameAnimationLoop();
  });
</script>

<div id="canvasWrapper">
  <canvas bind:this={canvas} width={canvasWidth} height={canvasHeight}/>
</div>
<style>
  #canvasWrapper {
    display: flex;
    flex-direction: column;
  }
</style>
