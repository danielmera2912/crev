<script setup>
import axios from 'axios';
import Modificar_evento from './Modificar_evento.vue'
import AnadirResultado from './Anadir_resultado.vue'
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
      estado: '',
      resultadoLocal: '',
      resultadoVisitante: '',
      registrarResultado: false,
      idCiudad: 0,
      imagen1: 'https://cdn.resfu.com/img_data/players/medium/1004380.jpg?size=120x&lossy=1',
      imagen2: 'https://cdn.resfu.com/img_data/players/medium/427788.jpg?size=120x&lossy=1',
      creacion: false,
      participacion: false,
      API_partido: "http://127.0.0.1:8080/evento",
      results2: null,
      permisos: false,
      permisoParticipar: false,
      balonFutbol: "https://images.vexels.com/media/users/3/158409/isolated/preview/b0af06a4c1a8e7a31ce379250130d26c-pelota-de-futbol-pentagono-silueta.png",
      balonBaloncesto: "https://images.vexels.com/media/users/3/139646/isolated/preview/c365f14205e2c1f9830d25c919f28561-silueta-de-icono-de-pelota-de-baloncesto.png",
      balonPadel: "https://images.vexels.com/media/users/3/206721/isolated/lists/194b08f6d1e2f8d6fc7dea50e01b1544-pelota-de-padel-pickleball-negra.png",
      balonTenis: "https://cdn-icons-png.flaticon.com/512/8/8331.png?w=360",
      formData: {
        fecha: "",
        hora: "",
        ciudad: {
          id: 1
        },
        deporte: {
          id: 1
        }
      },
      formDataEvento: {
        usuario: {
          id: 0
        },
        evento: {
          id: 0
        }
      }
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
    toggleParticipacion() {
      this.participacion = !this.participacion
    },
    async llamarApiPartido() {
      const response = await fetch(this.API_partido + "/" + this.id)
      const data = await response.json()
      this.results2 = data
    },
    async eliminarPartido() {
      const token = localStorage.getItem('tokenjwt');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      if (this.permisos) {
        try {
          await axios.delete("http://127.0.0.1:8080/evento/" + this.id, config);
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
      this.deporte = this.results2.deporte.nombre
      this.estado = this.results2.estado
      this.jugador1 = this.results2.usuarios[0]?.username
      this.jugador2 = this.results2.usuarios[1]?.username
      this.ciudad = this.results2.ciudad.nombre
      this.idCiudad = this.results2.ciudad.id
      this.fecha = this.results2.fecha
      this.hora = this.results2.hora
      this.imagen1 = this.results2.usuarios[0]?.avatar
      this.imagen2 = this.results2.usuarios[1]?.avatar
      this.idJugador1 = this.results2.usuarios[0]?.id
      this.idJugador2 = this.results2.usuarios[1]?.id
      this.resultadoLocal = this.results2.puntosLocal
      this.resultadoVisitante = this.results2.puntosVisitante
      this.establecerPermiso()
    },
    finalizarEvento() {
      this.registrarResultado = !this.registrarResultado
    },
    async establecerPermiso() {
      if (this.idUsuario != 0) {
        const responseUsuarioPermiso = await fetch("http://127.0.0.1:8080/usuario/" + this.idUsuario)
        const dataUsuarioPermiso = await responseUsuarioPermiso.json()
        if (dataUsuarioPermiso.username == this.jugador1) {
          this.permisos = true
        } else {
          this.permisoParticipar = true
        }
      }

    },
    async anadirJugador() {
      const token = localStorage.getItem('tokenjwt');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      const responseUsuario = await fetch("http://127.0.0.1:8080/usuario/" + this.idUsuario)
      const dataUsuario = await responseUsuario.json()
      this.resultsUsuario = dataUsuario
      if (this.resultsUsuario.name == this.jugador1) {
        alert("Ya estás participando")
      }
      else if (this.jugador2 != "Plaza vacante") {
        alert("Plazas llenas")
      }
      else {
        this.formData.hora = this.hora
        this.formData.fecha = this.fecha
        try {
          const usuarios = await fetch("http://127.0.0.1:8080/usuario_evento/evento/" + this.id)
          const datosUsuarios = await usuarios.json()
          this.formDataEvento.evento.id = this.id
          this.formDataEvento.usuario.id = this.idUsuario
          const response = await axios.put("http://127.0.0.1:8080/usuario_evento/" + datosUsuarios[1].id, this.formDataEvento, config);
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
        <div class="partido-detalles__enfrentamiento__jugador__nombre partido-detalles__enfrentamiento__jugador__nombre--creador">{{ jugador1 }}</div>
        <img class="partido-detalles__enfrentamiento__jugador__avatar" :src="imagen1" alt="Avatar del jugador 1" />
        <div v-if="estado == 'FINALIZADO'" class="partido-detalles__enfrentamiento__jugador__puntuacion">{{ resultadoLocal
        }}</div>
      </RouterLink>
      <div class="partido-detalles__enfrentamiento__duelo"><img src="../assets/imagenes/vs.png" /></div>
      <RouterLink :to="`/perfil/${idJugador2}`" class="partido-detalles__enfrentamiento__jugador">
        <div class="partido-detalles__enfrentamiento__jugador__texto">Jugador 2</div>
        <div class="partido-detalles__enfrentamiento__jugador__nombre">{{ jugador2 }}</div>
        <img class="partido-detalles__enfrentamiento__jugador__avatar" :src="imagen2" alt="Avatar del jugador 2" />
        <div v-if="estado == 'FINALIZADO'" class="partido-detalles__enfrentamiento__jugador__puntuacion">{{
          resultadoVisitante }}</div>
      </RouterLink>
      <div class="partido__estado partido__estado__imagenDeporteDetalles" v-if="deporte == 'Padel'">
        <img :src="balonPadel" />
      </div>
      <div class="partido__estado partido__estado__imagenDeporteDetalles" v-if="deporte == 'Tenis'">
        <img :src="balonTenis" />
      </div>
    </div>

    <div class="partido-detalles__datos">
      <span @click="toggleCreacion" v-if="permisos && !perfil && estado != 'FINALIZADO'"
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
    <button v-if="permisoParticipar && estado != 'FINALIZADO' && jugador2 == 'Plaza vacante'"
      class="partido-detalles__boton boton" @click="anadirJugador">Participar</button>
    <button v-if="!permisoParticipar && estado != 'FINALIZADO' && jugador2 != 'Plaza vacante'"
      class="partido-detalles__boton boton" @click="toggleParticipacion">Finalizar</button>
    <div v-if="estado == 'FINALIZADO'" class="partido-detalles__finalizado">EVENTO FINALIZADO</div>
    <Modificar_evento v-if="permisos && creacion" @cerrarTodo="toggleCreacion" @realizarEvento="realizarEvento"
      @check="toggleCheckForm" :checkForm="checkForm" :id="id" :ciudad="ciudad" :deporte="deporte" :fecha="fecha"
      :hora="hora" :jugador1="jugador1" :jugador2="jugador2" :imagen1="imagen1" :imagen2="imagen2"
      :idJugador1="idJugador1" :idJugador2="idJugador2" :idCiudad="idCiudad"></Modificar_evento>
    <AnadirResultado v-if="permisos && participacion" @cerrarTodo="toggleParticipacion" @finalizarEvento="finalizarEvento"
      @check="toggleCheckForm" :checkForm="checkForm" @updatePartido="updateDatosPartido" :id="id"></AnadirResultado>
  </div>
  <div v-else>
    <div class="error">Cargando página... Si tarda mucho, puede que se trate de un error, por lo que <RouterLink to="/">
        pulsa aquí</RouterLink> para volver al inicio.</div>
</div></template>
