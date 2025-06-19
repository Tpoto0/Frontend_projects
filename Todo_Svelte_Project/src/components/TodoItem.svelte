<script>
  export let todo;
  export let onDelete;
  export let onUpdate;

  function handleCheckbox() {
    onUpdate({ ...todo, done: !todo.done });
  }
</script>

<div class="todo-item">
  <input
    type="checkbox"
    checked={todo.done}
    on:change={handleCheckbox}
  />
  <span class="todo-text" style="text-decoration: {todo.done ? 'line-through' : 'none'}; margin-left: 0.5rem;">
    {todo.text}
  </span>
  <button on:click={() => onDelete(todo._id)} style="margin-left: 1rem;">Delete</button>
</div>