<script lang="ts">
  import { onMount } from "svelte";
  import { Renderer } from "../contracts/Renderer";
  import { Board } from "../contracts/Board";
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let canvasWidth: number = 620;
  let canvasHeight: number = 620;

  onMount(() => {
    ctx = canvas.getContext("2d");
    //new Renderer(ctx);
    new Board(ctx, canvas);
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
