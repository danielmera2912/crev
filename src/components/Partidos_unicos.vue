<script setup>
import Partido from './Partido.vue'
import Crear_evento from './Crear_evento.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
defineProps({
  results: {
    type: Object,
    required: true
  }
})
</script>
<script>
export default {
  data() {
    return {
      id: 1,
      crearEvento: false,
      checkForm: false,
    };
  },
  methods: {
    recibirValores() {
      this.$emit('recibirValores')
    },
    enviarValores(id) {
      this.$emit('enviarValores', id)
    },
    toggleCrearEvento() {
      this.crearEvento = !this.crearEvento
    },
    realizarEvento() {
      if(this.checkForm){
        this.crearEvento = false;
        this.checkForm = false;
        alert("Se ha creado el evento satisfactoriamente")
      }
      
    },
    toggleCheckForm(){
      this.checkForm = !this.checkForm
    }
  },
};
</script>
<template>
  <Crear_evento v-if="crearEvento" @cerrarTodo="toggleCrearEvento" @realizarEvento="realizarEvento" @check="toggleCheckForm" :checkForm="checkForm"></Crear_evento>
  <div class="partidos">
    <div class="interfaz">
      <select name="filtro">
        <option value="id_descendente">Todos</option>
        <option value="id_ascendente">Padel</option>
        <option value="nombre_descendente">Baloncesto</option>
        <option value="nombre_ascendente">Tenis</option>
      </select>
      <a className="boton" @click="toggleCrearEvento">Registrar</a>
    </div>
    <div >
    </div>
    <Partido @click="enviarValores(result.id)" v-for="result in results" :deporte='result.deporte' :fecha='result.fecha' :ciudad='result.ciudad' 
    :hora='result.hora'
      :jugador1='result.jugador1' :jugador2='result.jugador2'
      :imagen1='result.imagen1'
      :imagen2='result.imagen2' :perfil="false"></Partido>
  </div>


</template>
