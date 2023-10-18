<script lang="ts">
  import { PeerManager } from "$lib/services/P2PManager";
  import { browser } from "$app/environment";
  import { p2pStore } from "$lib/stores/P2PConnection";

  const peerManager = new PeerManager();

  let nickname = "";

  async function createRoom() {
    if (!browser || !nickname) {
      alert("Por favor, insira um apelido antes de criar uma sala.");
      return;
    }

    await peerManager.initializePeer(true);
  }
</script>

<div>
  <input bind:value={nickname} placeholder="Digite seu apelido" />
  <button on:click={createRoom}>Criar Sala</button>

  {#if $p2pStore.roomId}
    <div>Seu ID de sala é: {$p2pStore.roomId}</div>
  {/if}
</div>
