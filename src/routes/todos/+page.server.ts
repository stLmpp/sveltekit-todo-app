import type { Todo } from '$lib/models/todo';
import { API } from '$env/static/private';
import type { PageServerLoad } from './$types';
import { getSecretHeader } from '$lib/server/get-secret-header';
import { error, fail, type Actions } from '@sveltejs/kit';

export const load = (async ({ fetch }) => {
	const response = await fetch(`${API}/todos`, { headers: getSecretHeader() });
	if (!response.ok) {
		const json = await response.json();
		throw error(response.status, json.message);
	}
	const todos: Todo[] = await response.json();
	return { todos };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, fetch }) => {
		const formData = await request.formData();
		const title = formData.get('title');
		const response = await fetch(`${API}/todos`, {
			headers: {
				...getSecretHeader(),
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title,
			}),
			method: 'POST',
		});
		if (!response.ok) {
			return fail(response.status);
		}
		return { success: true };
	},
} satisfies Actions;
