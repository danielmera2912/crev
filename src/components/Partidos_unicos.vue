<script setup>
import Partido from './Partido.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
</script>

<template>
  <select name="filtro">
    <option value="id_descendente">Todos</option>
    <option value="id_ascendente">Padel</option>
    <option value="nombre_descendente">Baloncesto</option>
    <option value="nombre_ascendente">Tenis</option>
  </select>
  <div class="partidos">
    <Partido></Partido>
    <Partido></Partido>
    <Partido></Partido>
    <Partido></Partido>
    <Partido></Partido>
    <Partido></Partido>
    <Partido></Partido>
    <Partido></Partido>
    <Partido></Partido>
  </div>
  

</template>
