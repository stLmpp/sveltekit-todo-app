import { SECRET } from '$env/static/private';

export function getSecretHeader(): HeadersInit {
	return {
		'x-svelte-kit-todo-app-secret': SECRET
	};
}
