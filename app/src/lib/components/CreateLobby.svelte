<script lang="ts">
  import { PeerManager } from "$lib/services/P2PManager";
  import { browser } from "$app/environment";
  import { roomIdStore } from "../stores/P2PConnection";

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

  {#if $roomIdStore}
    <div>Seu ID de sala é: {$roomIdStore}</div>
  {/if}
</div>
