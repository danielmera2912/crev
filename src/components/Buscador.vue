<script setup>
/**
 * @file Buscador.vue - Componente buscador del encabezado
 * @module Buscador
 * @vue-prop {String} search - Establece el texto del buscador
 */
 defineProps({
  /**
   * Establece el texto del buscador.
   *
   * @type {String}
   * @required
   */
  search: {
    type: String,
    required: true,
  },
});

</script>
<template>
  <form :v-model="search" class="buscador-encabezado" @submit.prevent>
    <input type="text" class="buscador-encabezado__caja" placeholder="Buscar por provincia..."
      @input="(event) => $emit('inputChange', event)" />
    <button class="buscador__boton">
      <span class="material-symbols-outlined buscador__boton__icono">search</span>
    </button>
  </form>
</template>

