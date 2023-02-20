<script setup>
import Partido from './Partido.vue'
import Crear_evento from './Crear_evento.vue'
import axios from 'axios';
/**
 * @file Partidos_unicos.vue - Componente de los partidos únicos
 * @author Daniel Mera Sachse
 */
/**
 * @vue-prop {String} idUsuario - Rescata la id del usuario
 * @vue-prop {String} search - Rescata el buscador del usuario
 * @vue-prop {String} results - Rescata los resultados de la API
 * @vue-data {String} idJugador1 - Establece la id del usuario
 * @vue-data {String} idJugador2 - Establece la id del usuario
 * @vue-data {String} idJugador3 - Establece la id del usuario
 * @vue-data {String} idJugador4 - Establece la id del usuario
 * @vue-data {String} idJugador5 - Establece la id del usuario
 * @vue-data {String} idJugador6 - Establece la id del usuario
 * @vue-data {String} idJugador7 - Establece la id del usuario
 * @vue-data {String} idJugador8 - Establece la id del usuario
 * @vue-data {String} idJugador9 - Establece la id del usuario
 * @vue-data {String} idJugador10 - Establece la id del usuario
 * @vue-data {String} deporte - Texto del deporte
 * @vue-data {String} hora - Texto de la hora
 * @vue-data {String} ciudad - Texto de la ciudad
 * @vue-data {String} fecha - Texto de la fecha
 * @vue-data {String} imagen1 - imagen1
 * @vue-data {String} jugador1 - Nombre del jugador
 * @vue-data {String} jugador2 - Nombre del jugador
 * @vue-data {String} jugador3 - Nombre del jugador
 * @vue-data {String} jugador4 - Nombre del jugador
 * @vue-data {String} jugador5 - Nombre del jugador
 * @vue-data {String} jugador6- Nombre del jugador
 * @vue-data {String} jugador7 - Nombre del jugador
 * @vue-data {String} jugador8 - Nombre del jugador
 * @vue-data {String} jugador9 - Nombre del jugador
 * @vue-data {String} jugador10 - Nombre del jugador
 * @vue-data {String} imagen1 - Imagen del jugador
 * @vue-data {String} imagen2 - Imagen del jugador
 * @vue-data {String} imagen3 - Imagen del jugador
 * @vue-data {String} imagen4 - Imagen del jugador
 * @vue-data {String} imagen5 - Imagen del jugador
 * @vue-data {String} imagen6 - Imagen del jugador
 * @vue-data {String} imagen7 - Imagen del jugador
 * @vue-data {String} imagen8 - Imagen del jugador
 * @vue-data {String} imagen9 - Imagen del jugador
 * @vue-data {String} imagen10 - Imagen del jugador
 * @vue-data {Boolean} permisos - Permisos de edición y borrado
 * @vue-data {Boolean} permisoParticipar - Permisos de participaje
 * @vue-data {String} API_partido - Texto de la API
 */
defineProps({
  results: {
    type: Object,
    required: true
  },
  search: {
    type: String,
    required: true
  },
  idUsuario: {
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
        jugador1: "",
        jugador2: 'ejemplo2',
        jugador3: null,
        jugador4: null,
        jugador5: null,
        jugador6: null,
        jugador7: null,
        jugador8: null,
        jugador9: null,
        jugador10: null,
        ciudad: "",
        fecha: "",
        hora: "",
        imagen1: "",
        imagen2: "",
        imagen3: null,
        imagen4: null,
        imagen5: null,
        imagen6: null,
        imagen7: null,
        imagen8: null,
        imagen9: null,
        imagen10: null,
        idJugador1: "",
        equipo1: null,
        equipo2: null,
        imagen_equipo1: null,
        imagen_equipo2: null
      },
      id: 1,
      crearEvento: false,
      checkForm: false,
      equipoImagen1: "https://i.ibb.co/fYRFPbh/ciervoverde.png",
      equipoImagen2: "https://i.ibb.co/k9LNHCX/ballenazul.png",
      resultsCiudad: "",
      resultsDeporte: "",
      resultsFiltro: "",
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
          const response = await axios.post("https://crev-server.onrender.com/api/v1/autorizacion/partidos", this.formData, {
            withCredentials: true
          });
          await this.$router.push('/partido_detalles/' + response.data.id);
          window.location.reload()
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
      this.formData.jugador1 = partido.jugador1N
      this.formData.idJugador1 = partido.idJugador1
      this.formData.jugador2 = "Plaza vacante"
      if (partido.equipo1) {
        this.formData.equipo1 = partido.equipo1
        this.formData.equipo2 = partido.equipo2
        this.formData.imagen_equipo1 = partido.imagen_equipo1
        this.formData.imagen_equipo2 = partido.imagen_equipo2
        this.formData.jugador2 = "Plaza vacante"
        this.formData.jugador3 = "Plaza vacante"
        this.formData.jugador4 = "Plaza vacante"
        this.formData.jugador5 = "Plaza vacante"
        this.formData.jugador6 = "Plaza vacante"
        this.formData.jugador7 = "Plaza vacante"
        this.formData.jugador8 = "Plaza vacante"
        this.formData.jugador9 = "Plaza vacante"
        this.formData.jugador10 = "Plaza vacante"
        this.formData.imagen3 = "https://i.ibb.co/VJy4cXk/defaultimage.png"
        this.formData.imagen4 = "https://i.ibb.co/VJy4cXk/defaultimage.png"
        this.formData.imagen5 = "https://i.ibb.co/VJy4cXk/defaultimage.png"
        this.formData.imagen6 = "https://i.ibb.co/VJy4cXk/defaultimage.png"
        this.formData.imagen7 = "https://i.ibb.co/VJy4cXk/defaultimage.png"
        this.formData.imagen8 = "https://i.ibb.co/VJy4cXk/defaultimage.png"
        this.formData.imagen9 = "https://i.ibb.co/VJy4cXk/defaultimage.png"
        this.formData.imagen10 = "https://i.ibb.co/VJy4cXk/defaultimage.png"
      }
      // esto se cambiará para el futuro cuando el usuario pueda elegir avatar para su perfil
      this.formData.imagen1 = "https://images.pexels.com/photos/5609026/pexels-photo-5609026.jpeg?auto=compress&cs=tinysrgb&w=600"
      this.formData.imagen2 = "https://i.ibb.co/VJy4cXk/defaultimage.png"
    },
    async llamarApiCiudad() {
      const response = await fetch("https://crev-server.onrender.com/api/v1/partidos/ciudad/" + this.search)
      const dataCiudad = await response.json()
      this.resultsCiudad = dataCiudad
    },
    async llamarApiDeporte() {
      const response = await fetch("https://crev-server.onrender.com/api/v1/partidos/deporte/" + this.filtroSeleccionado)
      const dataDeporte = await response.json()
      this.resultsDeporte = dataDeporte
    },
    async llamarApiFiltros() {
      const response = await fetch("https://crev-server.onrender.com/api/v1/partidos/filtros/ciudad=" + this.search + "/deporte=" + this.filtroSeleccionado)
      const dataFiltros = await response.json()
      this.resultsFiltro = dataFiltros
    }
  },
  watch: {
    search() {
      if (this.filtroSeleccionado == "todos") {
        this.llamarApiCiudad()
      } else {
        this.llamarApiFiltros()
      }

    },
    filtroSeleccionado() {
      if (this.search == "") {
        this.llamarApiDeporte()
      } else {
        this.llamarApiFiltros()
      }

    }
  }
};
</script>
<template>
  <Crear_evento v-if="crearEvento" @cerrarTodo="toggleCrearEvento" @realizarEvento="realizarEvento"
    @check="toggleCheckForm" :checkForm="checkForm" @updatePartido="updateDatosPartido" :idUsuario="idUsuario">
  </Crear_evento>
  <div class="partidos">
    <div class="interfaz">
      <select class="interfaz__filtro" v-model="filtroSeleccionado" name="filtro">
        <option value="todos">Todos</option>
        <option value="Fútbol Sala">Fútbol Sala</option>
        <option value="Baloncesto">Baloncesto</option>
        <option value="Tenis">Tenis</option>
        <option value="Esgrima">Esgrima</option>
        <option value="Padel">Padel</option>
      </select>
      <a v-if="idUsuario!=0" class="boton interfaz__registrar" @click="toggleCrearEvento">Registrar</a>
    </div>
    <div>
    </div>
    <template v-if="search == '' && filtroSeleccionado == 'todos'" v-for="result in results">
      <Partido v-if="!result.equipo1" @click="enviarValores(result.id)" :deporte='result.deporte' :fecha='result.fecha'
        :ciudad='result.ciudad' :hora='result.hora' :jugador1='result.jugador1' :jugador2='result.jugador2'
        :imagen1='result.imagen1' :imagen2='result.imagen2' :perfil="false" :id="result.id"></Partido>
      <Partido v-else-if="result.equipo1" @click="enviarValores(result.id)" :deporte='result.deporte'
        :fecha='result.fecha' :ciudad='result.ciudad' :hora='result.hora' :jugador1='result.equipo1'
        :jugador2='result.equipo2' :imagen1='equipoImagen1' :imagen2='equipoImagen2' :perfil="false" :id="result.id">
      </Partido>
      <div v-else>
        No hay contenido
      </div>
    </template>
    <template v-else-if="filtroSeleccionado == 'todos' && search != ''" v-for="result in resultsCiudad">
      <Partido v-if="!result.equipo1" @click="enviarValores(result.id)" :deporte='result.deporte' :fecha='result.fecha'
        :ciudad='result.ciudad' :hora='result.hora' :jugador1='result.jugador1' :jugador2='result.jugador2'
        :imagen1='result.imagen1' :imagen2='result.imagen2' :perfil="false" :id="result.id"></Partido>
      <Partido v-else-if="result.equipo1" @click="enviarValores(result.id)" :deporte='result.deporte'
        :fecha='result.fecha' :ciudad='result.ciudad' :hora='result.hora' :jugador1='result.equipo1'
        :jugador2='result.equipo2' :imagen1='equipoImagen1' :imagen2='equipoImagen2' :perfil="false" :id="result.id">
      </Partido>
      <div v-else>
        No hay contenido
      </div>
    </template>
    <template v-else-if="filtroSeleccionado != 'todos' && search == ''" v-for="result in resultsDeporte">
      <Partido v-if="!result.equipo1" @click="enviarValores(result.id)" :deporte='result.deporte' :fecha='result.fecha'
        :ciudad='result.ciudad' :hora='result.hora' :jugador1='result.jugador1' :jugador2='result.jugador2'
        :imagen1='result.imagen1' :imagen2='result.imagen2' :perfil="false" :id="result.id"></Partido>
      <Partido v-else-if="result.equipo1" @click="enviarValores(result.id)" :deporte='result.deporte'
        :fecha='result.fecha' :ciudad='result.ciudad' :hora='result.hora' :jugador1='result.equipo1'
        :jugador2='result.equipo2' :imagen1='equipoImagen1' :imagen2='equipoImagen2' :perfil="false" :id="result.id">
      </Partido>
      <div v-else>
        No hay contenido
      </div>
    </template>
    <template v-else-if="filtroSeleccionado != 'todos' && search != ''" v-for="result in resultsFiltro">
      <Partido v-if="!result.equipo1" @click="enviarValores(result.id)" :deporte='result.deporte' :fecha='result.fecha'
        :ciudad='result.ciudad' :hora='result.hora' :jugador1='result.jugador1' :jugador2='result.jugador2'
        :imagen1='result.imagen1' :imagen2='result.imagen2' :perfil="false" :id="result.id"></Partido>
      <Partido v-else-if="result.equipo1" @click="enviarValores(result.id)" :deporte='result.deporte'
        :fecha='result.fecha' :ciudad='result.ciudad' :hora='result.hora' :jugador1='result.equipo1'
        :jugador2='result.equipo2' :imagen1='equipoImagen1' :imagen2='equipoImagen2' :perfil="false" :id="result.id">
      </Partido>
      <div v-else>
        No hay contenido
      </div>

    </template>
    <template v-else>
      Aún no hay contenido
    </template>

  </div>
</template>
