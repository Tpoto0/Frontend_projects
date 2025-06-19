<script>
  import TodoItem from './TodoItem.svelte';
  export let todos = [];
  export let onDelete;
  export let onUpdate;
</script>

<ul>
  {#each todos as todo (todo._id)}
    <li>
      <TodoItem {todo} {onDelete} {onUpdate} />
    </li>
  {/each}
</ul>

<style>
  li{
    list-style: none;
    padding-left: 0;
    margin: 0;
  }
  ul{
    padding: 0;
  }
</style>