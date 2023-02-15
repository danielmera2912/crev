<script setup>
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
            @input="(event) => this.$emit('inputChange', event)" />
        <button class="buscador__boton"><span class="material-symbols-outlined buscador__boton__icono">search</span></button>
    </form>
</template>
