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
  },
  search: {
    type: String,
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
      equipoImagen2: "src/assets/imagenes/ballenazul.png",
      resultsCiudad: "",
      resultsDeporte: "",
      filtroSeleccionado: "todos"
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
    },
    async llamarApiCiudad() {
      const response = await fetch("http://127.0.0.1:3001/api/v1/partidos/ciudad/" + this.search)
      const dataCiudad = await response.json()
      this.resultsCiudad = dataCiudad
    },
    async llamarApiDeporte() {
      const response = await fetch("http://127.0.0.1:3001/api/v1/partidos/deporte/" + this.filtroSeleccionado)
      const dataDeporte = await response.json()
      this.resultsDeporte = dataDeporte
      console.log(this.resultsDeporte)
    }
  },
  watch: {
    search() {
      this.llamarApiCiudad()
    },
    filtroSeleccionado() {
      this.llamarApiDeporte()
    }
  }
};
</script>
<template>
  <Crear_evento v-if="crearEvento" @cerrarTodo="toggleCrearEvento" @realizarEvento="realizarEvento"
    @check="toggleCheckForm" :checkForm="checkForm" @updatePartido="updateDatosPartido"></Crear_evento>
  <div class="partidos">
    <div class="interfaz">
      <select v-model="filtroSeleccionado" name="filtro">
        <option value="todos">Todos</option>
        <option value="padel">Padel</option>
        <option value="baloncesto">Baloncesto</option>
        <option value="tenis">Tenis</option>
      </select>
      <a className="boton" @click="toggleCrearEvento">Registrar</a>
    </div>
    <div>
    </div>
    <template v-if="search == '' && filtroSeleccionado == 'todos'" v-for="result in results">
      <Partido v-if="!result.jugador3" @click="enviarValores(result.id)" :deporte='result.deporte' :fecha='result.fecha'
        :ciudad='result.ciudad' :hora='result.hora' :jugador1='result.jugador1' :jugador2='result.jugador2'
        :imagen1='result.imagen1' :imagen2='result.imagen2' :perfil="false"></Partido>
      <Partido v-else @click="enviarValores(result.id)" :deporte='result.deporte' :fecha='result.fecha'
        :ciudad='result.ciudad' :hora='result.hora' :jugador1='result.equipo1' :jugador2='result.equipo2'
        :imagen1='equipoImagen1' :imagen2='equipoImagen2' :perfil="false"></Partido>
    </template>
    <template v-else-if="filtroSeleccionado == 'todos' && search != ''" v-for="result in resultsCiudad">
      <Partido v-if="!result.jugador3" @click="enviarValores(result.id)" :deporte='result.deporte' :fecha='result.fecha'
        :ciudad='result.ciudad' :hora='result.hora' :jugador1='result.jugador1' :jugador2='result.jugador2'
        :imagen1='result.imagen1' :imagen2='result.imagen2' :perfil="false"></Partido>
      <Partido v-else @click="enviarValores(result.id)" :deporte='result.deporte' :fecha='result.fecha'
        :ciudad='result.ciudad' :hora='result.hora' :jugador1='result.equipo1' :jugador2='result.equipo2'
        :imagen1='equipoImagen1' :imagen2='equipoImagen2' :perfil="false"></Partido>
    </template>
    <template v-else-if="filtroSeleccionado != 'todos' && search == ''" v-for="result in resultsDeporte">
      <Partido v-if="result && !result.jugador3 && result.deporte" @click="enviarValores(result.id)"
        :deporte='result.deporte' :fecha='result.fecha' :ciudad='result.ciudad' :hora='result.hora'
        :jugador1='result.jugador1' :jugador2='result.jugador2' :imagen1='result.imagen1' :imagen2='result.imagen2'
        :perfil="false"></Partido>
      <Partido v-else-if="result?.jugador3 === true" @click="enviarValores(result.id)" :deporte='result.deporte'
        :fecha='result.fecha' :ciudad='result.ciudad' :hora='result.hora' :jugador1='result.equipo1'
        :jugador2='result.equipo2' :imagen1='equipoImagen1' :imagen2='equipoImagen2' :perfil="false"></Partido>

      <div v-else>No se encontraron resultados</div>
    </template>
  </div>


</template>
