<script setup>
import axios from 'axios';
import Modificar_evento from './Modificar_evento.vue'
/**
 * @file Partido_detalles.vue - Componente de los detalles de un partido de 1vs1 individual en concreto
 * @author Daniel Mera Sachse
 */
/**
 * @vue-prop {String} idUsuario - Rescata la id del usuario
 * @vue-data {String} idJugador1 - Establece la id del usuario
 * @vue-data {String} idJugador2 - Establece la id del usuario
 * @vue-data {String} deporte - Texto del deporte
 * @vue-data {String} hora - Texto de la hora
 * @vue-data {String} ciudad - Texto de la ciudad
 * @vue-data {String} fecha - Texto de la fecha
 * @vue-data {String} imagen1 - imagen1
 * @vue-data {String} jugador1 - Nombre del jugador1
 * @vue-data {String} idJugador1 - id del Jugador 1
 * @vue-data {Boolean} permisos - Permisos de edición y borrado
 * @vue-data {Boolean} permisoParticipar - Permisos de participaje
 * @vue-data {String} API_partido - Texto de la API
 */
defineProps({
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
      jugador1: null,
      jugador2: 'ejemplo',
      deporte: "",
      fecha: "",
      hora: '',
      ciudad: '',
      imagen1: 'https://cdn.resfu.com/img_data/players/medium/1004380.jpg?size=120x&lossy=1',
      imagen2: 'https://cdn.resfu.com/img_data/players/medium/427788.jpg?size=120x&lossy=1',
      creacion: false,
      API_partido: "https://crev-server.onrender.com/api/v1/partidos",
      results2: null,
      permisos: false,
      permisoParticipar: false,
      formData: {
        deporte: "",
        jugador1: "",
        jugador2: '',
        ciudad: "",
        fecha: "",
        hora: "",
        imagen1: "",
        imagen2: "",
        id: '',
        idJugador1: "",
        idJugador2: ""
      },
    }
  },
  async mounted() {
    this.id = this.$route.params.id;
    await this.llamarApiPartido()
    this.establecerValores()

  },
  methods: {
    recibirValores() {
      this.$emit('recibirValores')
    },
    toggleCreacion() {
      this.creacion = !this.creacion
    },
    async llamarApiPartido() {
      const response = await fetch(this.API_partido + "/" + this.id)
      const data = await response.json()
      this.results2 = data

    },
    async eliminarPartido() {
      if (this.permisos) {
        try {
          await axios.delete("https://crev-server.onrender.com/api/v1/autorizacion/partidos/" + this.id, {
            withCredentials: true
          });
          await this.$router.push('/');
          window.location.reload()
        } catch (error) {
          console.error(error);
        }
      }
    },
    toggleCheckForm() {
      this.checkForm = !this.checkForm
    },
    realizarEvento() {
      if (this.checkForm) {
        this.creacion = false;
        this.checkForm = false;
      }

    },
    establecerValores() {
      this.deporte = this.results2.deporte
      this.jugador1 = this.results2.jugador1
      this.jugador2 = this.results2.jugador2
      this.ciudad = this.results2.ciudad
      this.fecha = this.results2.fecha
      this.hora = this.results2.hora
      this.imagen1 = this.results2.imagen1
      this.imagen2 = this.results2.imagen2
      this.idJugador1 = this.results2.idJugador1
      this.idJugador2 = this.results2.idJugador2
      this.establecerPermiso()
    },
    async establecerPermiso() {
      if (this.idUsuario!=0) {
        const responseUsuarioPermiso = await fetch("https://crev-server.onrender.com/api/v1/users/" + this.idUsuario)
        const dataUsuarioPermiso = await responseUsuarioPermiso.json()
        if (dataUsuarioPermiso.name == this.jugador1) {
          this.permisos = true
        } else {
          this.permisoParticipar = true
        }
      }

    },
    async anadirJugador() {
      const responseUsuario = await fetch("https://crev-server.onrender.com/api/v1/users/" + this.idUsuario)
      const dataUsuario = await responseUsuario.json()
      this.resultsUsuario = dataUsuario
      if (this.resultsUsuario.name == this.jugador1) {
        alert("Ya estás participando")
      }
      else if (this.jugador2 != "Plaza vacante") {
        alert("Plazas llenas")
      }
      else {
        this.formData.deporte = this.deporte
        this.formData.hora = this.hora
        this.formData.ciudad = this.ciudad
        this.formData.fecha = this.fecha
        this.formData.jugador1 = this.jugador1
        this.formData.id = this.id
        this.formData.jugador2 = this.resultsUsuario.name
        this.formData.idJugador1 = this.idJugador1
        this.formData.idJugador2 = this.idUsuario
        // esto se cambiará para el futuro cuando el usuario pueda elegir avatar para su perfil
        this.formData.imagen1 = "https://images.pexels.com/photos/5609026/pexels-photo-5609026.jpeg?auto=compress&cs=tinysrgb&w=600"
        this.formData.imagen2 = "https://images.pexels.com/photos/5609026/pexels-photo-5609026.jpeg?auto=compress&cs=tinysrgb&w=600"
        try {
          const response = await axios.put("https://crev-server.onrender.com/api/v1/autorizacion/partidos/" + this.id, this.formData, {
            withCredentials: true
          });
          window.location.reload()
        } catch (error) {
          console.error(error);
        }
      }


    }

  },
};
</script>
<template>
  <div v-if="jugador1 != null" to="/partido_detalles" class="partido-detalles">

    <div class="partido-detalles__deporte">Partido de {{ deporte }}</div>
    <div class="partido-detalles__enfrentamiento">

      <span v-if="permisos" @click="eliminarPartido"
        class="material-symbols-outlined partido-detalles__enfrentamiento__borrar">delete</span>
      <RouterLink :to="`/perfil/${idJugador1}`" class="partido-detalles__enfrentamiento__jugador">
        <div class="partido-detalles__enfrentamiento__jugador__texto">Jugador 1</div>
        <div class="partido-detalles__enfrentamiento__jugador__nombre">{{ jugador1 }}</div>
        <img class="partido-detalles__enfrentamiento__jugador__avatar" :src="imagen1" alt="Avatar del jugador 1" />
      </RouterLink>
      <div class="partido-detalles__enfrentamiento__duelo"><img src="../assets/imagenes/vs.png" /></div>
      <RouterLink :to="`/perfil/${idJugador2}`" class="partido-detalles__enfrentamiento__jugador">
        <div class="partido-detalles__enfrentamiento__jugador__texto">Jugador 2</div>
        <div class="partido-detalles__enfrentamiento__jugador__nombre">{{ jugador2 }}</div>
        <img class="partido-detalles__enfrentamiento__jugador__avatar" :src="imagen2" alt="Avatar del jugador 2" />
      </RouterLink>
    </div>

    <div class="partido-detalles__datos">
      <span @click="toggleCreacion" v-if="permisos && !perfil"
        className="material-symbols-outlined partido-detalles__datos__modificar">edit</span>
      <div class="partido-detalles__datos__enunciado">Datos de la disputa</div>
      <div class="partido-detalles__datos__ciudad">
        <div class="partido-detalles__datos__ciudad__enunciado">Ciudad</div>
        <div class="partido-detalles__datos__ciudad__dato">{{ ciudad }}</div>
      </div>
      <div class="partido-detalles__datos__fecha">
        <div class="partido-detalles__datos__fecha__enunciado">Fecha</div>
        <div class="partido-detalles__datos__fecha__dato">{{ fecha }}</div>
      </div>
      <div class="partido-detalles__datos__hora">
        <div class="partido-detalles__datos__hora__enunciado">Hora</div>
        <div class="partido-detalles__datos__hora__dato">{{ hora }}</div>
      </div>
    </div>
    <button v-if="permisoParticipar" class="partido-detalles__boton boton" @click="anadirJugador">Participar</button>
    <Modificar_evento v-if="permisos && creacion" @cerrarTodo="toggleCreacion" @realizarEvento="realizarEvento"
      @check="toggleCheckForm" :checkForm="checkForm" :id="id" :ciudad="ciudad" :deporte="deporte" :fecha="fecha"
      :hora="hora" :jugador1="jugador1" :jugador2="jugador2" :imagen1="imagen1" :imagen2="imagen2" 
      :idJugador1="idJugador1" :idJugador2="idJugador2"></Modificar_evento>
  </div>
  <div v-else>
    <div class="error">Cargando página... Si tarda mucho, puede que se trate de un error, por lo que <RouterLink to="/">
        pulsa aquí</RouterLink> para volver al inicio.</div>
  </div>
</template>
