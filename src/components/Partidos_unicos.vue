<script setup>
import Partido from './Partido.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
</script>

<template>
  
  <div class="partidos">
    <div class="interfaz">
      <select name="filtro">
    <option value="id_descendente">Todos</option>
    <option value="id_ascendente">Padel</option>
    <option value="nombre_descendente">Baloncesto</option>
    <option value="nombre_ascendente">Tenis</option>
  </select>
  <a className="boton">Registrar</a>
    </div>
    
    <Partido v-for="i in 5" :deporte='"Tenis"' :fecha='"20/04/2011"' :ciudad='"Pamplona"' :hora='"20:20"' :jugador1='"Pepe"' 
    :jugador2='"Juan"' :imagen1='"https://cdn.resfu.com/img_data/players/medium/1004380.jpg?size=120x&lossy=1"' 
    :imagen2='"https://cdn.resfu.com/img_data/players/medium/427788.jpg?size=120x&lossy=1"'></Partido>
  </div>
  

</template>
