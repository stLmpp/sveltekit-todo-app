<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>Todos</h1>

<ul>
	{#each data.todos as todo (todo.id)}
		<li>
			<a href={`/todos/${todo.id}`}>{todo.description}</a>
		</li>
	{/each}
</ul>
