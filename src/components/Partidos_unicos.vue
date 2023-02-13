<script setup>
import Partido from './Partido.vue'
import Crear_evento from './Crear_evento.vue'
import axios from 'axios';
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
      formData: {
        deporte: "",
        jugador1: "ejemplo1",
        jugador2: 'ejemplo2',
        ciudad: "",
        fecha: "",
        hora: ""
      },
      id: 1,
      crearEvento: false,
      checkForm: false,
      equipoImagen1: "src/assets/imagenes/ciervoverde.png",
      equipoImagen2: "src/assets/imagenes/ballenazul.png"
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
    async realizarEvento() {
      if (this.checkForm) {
        this.crearEvento = false;
        this.checkForm = false;
        try {
          const response = await axios.post("http://127.0.0.1:3001/api/v1/partidos", this.formData);
          console.log(response.data);
          alert("Partido creado correctamente")
          this.$router.push('/');
        } catch (error) {
          console.error(error);
        }
      }

    },
    toggleCheckForm() {
      this.checkForm = !this.checkForm
    },
    updateDatosPartido(partido) {
      this.formData.deporte = partido.deporte
      this.formData.hora = partido.hora
      this.formData.ciudad = partido.ciudad
      this.formData.fecha = partido.fecha
    }
  },
};
</script>
<template>
  <Crear_evento v-if="crearEvento" @cerrarTodo="toggleCrearEvento" @realizarEvento="realizarEvento"
    @check="toggleCheckForm" :checkForm="checkForm" 
    @updatePartido="updateDatosPartido"></Crear_evento>
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
    <div>
    </div>
    <template v-for="result in results">
      <Partido v-if="!result.jugador3" @click="enviarValores(result.id)" :deporte='result.deporte' :fecha='result.fecha'
        :ciudad='result.ciudad' :hora='result.hora' :jugador1='result.jugador1' :jugador2='result.jugador2'
        :imagen1='result.imagen1' :imagen2='result.imagen2' :perfil="false" ></Partido>
      <Partido v-else @click="enviarValores(result.id)" :deporte='result.deporte' :fecha='result.fecha'
        :ciudad='result.ciudad' :hora='result.hora' :jugador1='result.equipo1' :jugador2='result.equipo2'
        :imagen1='equipoImagen1' :imagen2='equipoImagen2' :perfil="false"></Partido>
    </template>

  </div>


</template>
