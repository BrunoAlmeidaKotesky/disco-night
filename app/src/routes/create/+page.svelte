<script lang="ts">
  import { PeerManager } from "$lib/services/P2PManager";
  import { browser } from "$app/environment";
  import { p2pStore } from "$lib/stores/P2PConnection";
  import {
    onDestroyBrowser,
    onMountBrowser,
  } from "$lib/helpers/onMountBrowser";

  const peerManager = new PeerManager();

  let nickname = "";

  function handleBeforeUnload() {
    peerManager.destroyPeer();
  }

  async function createRoom() {
    if (!browser || !nickname)
      return alert("Por favor, insira um apelido antes de criar uma sala.");

    await peerManager.initializePeer(true);
  }

  onMountBrowser(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
  });

  onDestroyBrowser(() => {
    handleBeforeUnload();
    window.removeEventListener("beforeunload", handleBeforeUnload);
  });
</script>

<div>
  <input bind:value={nickname} placeholder="Digite seu apelido" />
  <button on:click={createRoom}>Criar Sala</button>

  {#if $p2pStore.roomId}
    <div>Seu ID de sala é: {$p2pStore.roomId}</div>
  {/if}
</div>
