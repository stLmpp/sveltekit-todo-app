import { API } from '$env/static/private';
import { getSecretHeader } from '$lib/server/get-secret-header';
import type { RequestHandler } from './$types';

export const DELETE = (async ({ params, fetch }) => {
  await fetch(`${API}/todos/${params.id}`, {
    method: 'DELETE',
    headers: getSecretHeader(),
  });
  return new Response();
}) satisfies RequestHandler;
