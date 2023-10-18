<!-- src/components/UserList.svelte -->
<script lang="ts">
  import { usersInRoomStore } from "../stores/P2PConnection";
</script>

{#if $usersInRoomStore.length > 0}
  <ul>
    {#each $usersInRoomStore as user}
      <li>{user}</li>
    {/each}
  </ul>
{:else}
  <p>Nenhum usuário conectado</p>
{/if}
