<script>
  import { onMount } from 'svelte';
  import TodoForm from './components/TodoForm.svelte';
  import TodoList from './components/TodoList.svelte';
  import { fetchTodos, createTodo, updateTodo, deleteTodo } from './api.js';

  let todos = [];
  let loading = true;

  onMount(async () => {
    await loadTodos();
  });

  async function loadTodos() {
    loading = true;
    try {
      todos = await fetchTodos();
    } catch (e) {
      alert('Erreur lors du chargement des todos');
    }
    loading = false;
  }

  async function addTodo(e) {
    try {
      const newTodo = await createTodo({ text: e.detail, done: false });
      todos = [...todos, newTodo];
    } catch {
      alert("Erreur lors de l'ajout");
    }
  }

  async function handleUpdate(updatedTodo) {
    try {
      const todo = await updateTodo(updatedTodo._id, updatedTodo);
      todos = todos.map(t => t._id === todo._id ? todo : t);
    } catch {
      alert('Erreur lors de la modification');
    }
  }

  async function handleDelete(_id) {
    try {
      todos = await deleteTodo(_id);
    } catch {
      alert('Erreur lors de la suppression');
    }
  }

  $: todosDone = todos.filter(todo => todo.done);
  $: todosTodo = todos.filter(todo => !todo.done);
</script>

<h1>My Todo App</h1>
<TodoForm on:add={addTodo} />

{#if loading}
  <p>Loading...</p>
{:else}
  <div class="columns-container">
    <div class="column">
      <h2>All</h2>
      <TodoList {todos} onDelete={handleDelete} onUpdate={handleUpdate} />
    </div>
    <div class="column">
      <h2>Todo</h2>
      <TodoList todos={todosTodo} onDelete={handleDelete} onUpdate={handleUpdate} />
    </div>
    <div class="column">
      <h2>Done</h2>
      <TodoList todos={todosDone} onDelete={handleDelete} onUpdate={handleUpdate} />
    </div>
  </div>
{/if}

<style>
  .columns-container {
    display: flex;
    gap: 2rem;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
  }
  .column {
    flex: 1 1 250px;
    min-width: 250px;
    max-width: 550px;
    background: #2f2f2f;
    border-radius: 8px;
    padding: 1rem;
    box-sizing: border-box;
    margin-bottom: 1rem;
    word-break: break-word;
    overflow-wrap: break-word;
  }
  @media (max-width: 900px) {
    .columns-container {
      flex-direction: column;
      align-items: stretch;
    }
    .column {
      max-width: 100%;
      margin: 0 auto 1rem auto;
    }
  }
</style>