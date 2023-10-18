<script lang="ts">
  import JoinLobby from "./JoinLobby.svelte";
  import CreateLobby from "./CreateLobby.svelte";
  import UserList from "./UserList.svelte";

  let viewMode: "create" | "join" | undefined;
</script>

<div>
  {#if viewMode === "join"}
    <JoinLobby />
  {:else if viewMode === "create"}
    <CreateLobby />
  {:else}
    <button on:click={() => (viewMode = "join")}>Entrar em uma sala</button>
    <button on:click={() => (viewMode = "create")}>Criar uma sala</button>
  {/if}
  <UserList />
</div>
