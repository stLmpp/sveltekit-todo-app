<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import isOdd from 'is-odd';

  export let imparOuPar = false;

  const dispatcher = createEventDispatcher<{ clicked: boolean }>();

  let array = [
    { id: 1, nome: 'Um' },
    { id: 2, nome: 'Dois' },
    { id: 3, nome: 'Três' },
  ];

  function deleteFromArray(id: number) {
    array = array.filter((item) => item.id !== id);
  }

  $: arrayFiltrado = array.filter((_, index) => {
    const nr = index + 1;
    return imparOuPar ? isOdd(nr) : !isOdd(nr);
  });
</script>

<h5>Inputs</h5>

<div>imparOuPar: {imparOuPar}</div>

<h5>Outputs</h5>

<button on:click={() => dispatcher('clicked', true)}>Nosso output "clicked"</button>

<h5>Each</h5>

<ul>
  {#each array as item, index (item.id)}
    <li class:is-odd={isOdd(index + 1)} style:background-color="black" style:color="white">
      {item.nome}
      <button on:click={() => deleteFromArray(item.id)}>Deletar</button>
    </li>
  {/each}
</ul>

<h5>Reatividade</h5>

{#each arrayFiltrado as item (item.id)}
  <li>
    {item.nome}
  </li>
{/each}

<style>
  .is-odd {
    color: red;
  }
</style>
