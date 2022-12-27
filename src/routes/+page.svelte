<script>
  import NossoComponent from '$lib/components/NossoComponent.svelte';
  import { countStore } from '../lib/stores/count';

  let imparOuPar = false;
</script>

<h1>Welcome to my TODO list</h1>

<a href="/todos">Go to TODOS</a>

<hr />

<h2>Nosso componente</h2>

<label>
  <input type="checkbox" bind:checked={imparOuPar} />
  {imparOuPar ? 'Impar' : 'Par'}
</label>

<button on:click={() => $countStore--}>Subtrair 1 da store, valor da store: {$countStore}</button>

<NossoComponent
  {imparOuPar}
  on:clicked={(event) => console.log('Output "clicked"', event.detail)}
/>
