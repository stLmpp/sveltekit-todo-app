<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';

	export let data: PageData;
</script>

<a href="/todos">Voltar</a>

<form method="POST" use:enhance>
	<label>
		<input type="checkbox" name="completed" bind:checked={data.todo.completed} /> Completed {data
			.todo.completed}
	</label>
	<div class="form-group">
		<label for="title">Title</label>
		<input id="title" name="title" bind:value={data.todo.title} />
	</div>
	<div class="form-group">
		<label for="description">Description</label>
		<textarea id="description" name="description" bind:value={data.todo.description} />
	</div>
	<button type="submit">Save</button>
</form>
