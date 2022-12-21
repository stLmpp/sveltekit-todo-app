<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	export let data: PageData;
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
				<button type="submit">&times;</button>
			</form>
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
