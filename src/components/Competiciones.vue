<script setup>
import Torneo from './Torneo.vue'
</script>

<template>
  <select name="filtro">
    <option value="id_descendente">Todos</option>
    <option value="id_ascendente">Padel</option>
    <option value="nombre_descendente">Baloncesto</option>
    <option value="nombre_ascendente">Tenis</option>
  </select>
  <Torneo></Torneo>
  <Torneo></Torneo>
  <Torneo></Torneo>
  <Torneo></Torneo>
  <Torneo></Torneo>
  <Torneo></Torneo>
  <Torneo></Torneo>
  <Torneo></Torneo>

</template>
