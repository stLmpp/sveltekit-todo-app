<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData } from './$types';

  export let data: PageData;

  async function deleteTodo(id: string): Promise<void> {
    await fetch(`/api/todos/${id}`, {
      method: 'DELETE',
    });
    data = { ...data, todos: data.todos.filter((todo) => todo.id !== id) };
  }
</script>

<h1>Todos</h1>

<form method="POST" use:enhance>
  <input name="title" placeholder="Novo TODO" required minlength="3" />
  <button type="submit">Add</button>
</form>

<ul>
  {#each data.todos as todo (todo.id)}
    <li class:completed={todo.completed}>
      <a href={`/todos/${todo.id}`}>{todo.title}</a>
      <form method="POST" action={`/todos/${todo.id}?/delete`} use:enhance>
        <button type="submit">DELETE com Form Action</button>
      </form>
      <button type="button" on:click={() => deleteTodo(todo.id)}>Delete com API</button>
    </li>
  {/each}
</ul>

<style>
  .completed {
    text-decoration: line-through;
  }

  li {
    display: flex;
  }
</style>
