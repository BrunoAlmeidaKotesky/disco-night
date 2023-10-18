<script>
  import UserList from "$lib/components/UserList.svelte";
</script>

<nav>
  <a href="/">Home</a>
  <a href="/create">Create Lobby</a>
  <a href="/join">Join Lobby</a>
</nav>
<UserList />

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neu  e", sans-serif;
  }
</style>
