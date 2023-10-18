<script lang="ts">
  import { PeerManager } from "$lib/services/P2PManager";
  import { browser } from "$app/environment";
  import { onMount } from "svelte";

  const peerManager = new PeerManager();

  let joinId = "";
  let nickname = "";
  let roomMessage = "";

  onMount(async () => {
    if (!browser) return;
    await peerManager.initializePeer(false);
  });

  async function joinRoom() {
    if (!browser || !joinId || !nickname) {
      roomMessage = "Por favor, insira um apelido e ID de sala válido.";
      return;
    }

    const conn = peerManager.connectToPeer(joinId, nickname);
    if (!conn) {
      roomMessage = "Não foi possível conectar ao peer.";
      return;
    }
  }
</script>

<!-- Restante do código HTML permanece inalterado -->

<div>
  <input bind:value={joinId} placeholder="Digite o ID da sala para entrar" />
  <input bind:value={nickname} placeholder="Digite seu apelido" />
  <button on:click={joinRoom}>Entrar na Sala</button>

  {#if roomMessage}
    <div class="roomMessage">{roomMessage}</div>
  {/if}
</div>
