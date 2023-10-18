<script lang="ts">
  import { PeerManager } from "$lib/services/P2PManager";
  import { browser } from "$app/environment";
  import { onMountBrowser } from "$lib/helpers/onMountBrowser";

  const peerManager = new PeerManager();

  let joinId = "";
  let nickname = "";
  let roomMessage = "";

  onMountBrowser(async () => {
    await peerManager.initializePeer(false);
  });

  async function joinRoom() {
    if (!browser || !joinId || !nickname) {
      roomMessage = "Please enter a nickname and a room ID.";
      return;
    }

    const conn = peerManager.connectToPeer(joinId, nickname);
    if (!conn) {
      roomMessage = "Failed to connect to room.";
      return;
    }
  }
</script>

<div>
  <p>Enter the room ID</p>
  <input bind:value={joinId} />
  <p>Enter a nickname</p>
  <input bind:value={nickname} />
  <button disabled={!(joinId && nickname)} on:click={joinRoom}>Join</button>

  {#if roomMessage}
    <div class="roomMessage">{roomMessage}</div>
  {/if}
</div>
