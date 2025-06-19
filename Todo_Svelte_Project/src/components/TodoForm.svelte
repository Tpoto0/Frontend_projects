<script>
  import { createEventDispatcher } from 'svelte';
  let inputValue = '';
  const dispatch = createEventDispatcher();

  function handleSubmit(e) {
    e.preventDefault();
    if (inputValue.trim()) {
      dispatch('add', inputValue);
      inputValue = '';
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <input
    type="text"
    bind:value={inputValue}
    placeholder="Add a new todo"
  />
  <button type="submit">Add Todo</button>
</form>

<style>
    form{
        margin-bottom: 5%;
    }
</style>