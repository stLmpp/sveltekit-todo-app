import type { Todo } from '$lib/models/todo';
import type { PageServerLoad } from './$types';
import { API } from '$env/static/private';
import { getSecretHeader } from '$lib/server/get-secret-header';
import type { Actions } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

export const load = (async ({ fetch, params }) => {
	const response = await fetch(`${API}/todos/${params.id}`, { headers: getSecretHeader() });
	const todo: Todo = await response.json();
	return { todo };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ fetch, request, params }) => {
		const formData = await request.formData();
		console.log(Object.fromEntries(formData.entries()));
		const todoUpdate = {
			description: formData.get('description'),
			title: formData.get('title'),
			completed: formData.get('completed') === 'true'
		};
		console.log({
			url: `${API}/todos/${params.id}`,
			body: JSON.stringify(todoUpdate)
		});
		const response = await fetch(`${API}/todos/${params.id}`, {
			headers: {
				...getSecretHeader(),
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(todoUpdate),
			method: 'PATCH'
		});
		if (!response.ok) {
			console.log(await response.text());
			throw error(response.status);
		}
		return response.json();
	}
} satisfies Actions;
