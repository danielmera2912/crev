<script setup>
/**
 * @file Buscador.vue - Componente buscador del encabezado
 * @author Daniel Mera Sachse
 */
/**
 * @vue-prop {String} search - Establece el texto del buscador
 */
defineProps({
  search: {
    type: String,
    required: true
  }
})
</script>
<template>
    <form :v-model="search" class="buscador-encabezado">
        <input type="text" class="buscador-encabezado__caja" placeholder="Buscar por ciudad..."
            @input="(event) => $emit('inputChange', event)" />
        <button class="buscador__boton"><span class="material-symbols-outlined buscador__boton__icono">search</span></button>
    </form>
</template>
