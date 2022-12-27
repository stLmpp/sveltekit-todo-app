<script lang="ts">
  import { afterUpdate, beforeUpdate, createEventDispatcher, onDestroy, onMount } from 'svelte';
  import isOdd from 'is-odd';
  import { countStore } from '../stores/count';

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

  onMount(() => {
    console.log('onMount');
  });

  onDestroy(() => {
    console.log('onDestroy');
  });

  beforeUpdate(() => {
    console.log('beforeUpdate');
  });

  afterUpdate(() => {
    console.log('afterUpdate');
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

<h5>Store</h5>

Valor da store: {$countStore}
<button on:click={() => $countStore++}>Adicionar 1 na store</button>

<style>
  .is-odd {
    color: red;
  }
</style>
