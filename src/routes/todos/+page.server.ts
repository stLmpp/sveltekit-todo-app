import type { Todo } from '$lib/models/todo';
import { API } from '$env/static/private';
import type { PageServerLoad } from './$types';
import { getSecretHeader } from '$lib/server/get-secret-header';
import { error } from '@sveltejs/kit';

export const load = (async ({ fetch }) => {
	const response = await fetch(`${API}/todos`, { headers: getSecretHeader() });
	if (!response.ok) {
		const json = await response.json();
		throw error(response.status, json.message);
	}
	const todos: Todo[] = await response.json();
	return { todos };
}) satisfies PageServerLoad;
