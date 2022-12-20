<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { enhance } from '$app/forms';

	export let data: PageData;
	export let form: ActionData | undefined;
</script>

{#if form?.success}
	TODO salvo com sucesso. <a href="/todos">Voltar</a>
{:else}
	<a href="/todos">Voltar</a>

	<form method="POST" use:enhance>
		<label>
			<input type="checkbox" name="completed" bind:checked={data.todo.completed} />
			Completed {data.todo.completed}
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
{/if}
