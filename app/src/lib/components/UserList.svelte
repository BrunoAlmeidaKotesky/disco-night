<!-- src/components/UserList.svelte -->
<script lang="ts">
  import { p2pStore } from "../stores/P2PConnection";
</script>

{#if $p2pStore.usersInRoom.length > 0}
  <ul>
    {#each $p2pStore.usersInRoom as user}
      <li>{user}</li>
    {/each}
  </ul>
{:else}
  <p>Nenhum usuário conectado</p>
{/if}
