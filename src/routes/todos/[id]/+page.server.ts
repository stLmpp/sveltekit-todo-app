import type { Todo } from '$lib/models/todo';
import type { PageServerLoad } from './$types';
import { API } from '$env/static/private';
import { getSecretHeader } from '$lib/server/get-secret-header';
import { redirect, type Actions } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';

export const load = (async ({ fetch, params }) => {
	const response = await fetch(`${API}/todos/${params.id}`, { headers: getSecretHeader() });
	const todo: Todo = await response.json();
	return { todo };
}) satisfies PageServerLoad;

export const actions = {
	add: async ({ fetch, request, params }) => {
		const formData = await request.formData();
		const todoUpdate = {
			description: formData.get('description'),
			title: formData.get('title'),
			completed: formData.get('completed') === 'on',
		};
		const response = await fetch(`${API}/todos/${params.id}`, {
			headers: {
				...getSecretHeader(),
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(todoUpdate),
			method: 'PATCH',
		});
		if (!response.ok) {
			return fail(response.status);
		}
		return { success: true };
	},
	delete: async ({ fetch, params }) => {
		const response = await fetch(`${API}/todos/${params.id}`, {
			method: 'DELETE',
			headers: { ...getSecretHeader() },
		});
		if (!response.ok) {
			return fail(response.status);
		}
		throw redirect(303, '/todos');
	},
} satisfies Actions;
