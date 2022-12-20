<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>Todos</h1>

<ul>
	{#each data.todos as todo (todo.id)}
		<li class:completed={todo.completed}>
			<a href={`/todos/${todo.id}`}>{todo.title}</a>
		</li>
	{/each}
</ul>

<style>
	.completed {
		text-decoration: line-through;
	}
</style>
