<script setup>
import axios from 'axios';
import Modificar_evento from './Modificar_evento.vue'
import AnadirResultado from './Anadir_resultado.vue'
/**
 * @file Partido_detalles2.vue - Componente de los detalles de un partido de equipos en concreto
 * @author Daniel Mera Sachse
 */
/**
 * @vue-prop {String} idUsuario - Rescata la id del usuario
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
      jugador2: '',
      jugador3: "",
      jugador4: "",
      jugador5: "",
      jugador6: "",
      jugador7: "",
      jugador8: "",
      jugador9: "",
      jugador10: "",
      deporte: "",
      equipo1: "Ciervo Verde",
      equipo2: "Ballenas azules",
      imagen_equipo1: "https://i.ibb.co/fYRFPbh/ciervoverde.png",
      imagen_equipo2: "https://i.ibb.co/k9LNHCX/ballenazul.png",
      fecha: "",
      hora: '',
      ciudad: '',
      imagen1: '',
      imagen2: '',
      imagen3: '',
      imagen4: '',
      imagen5: '',
      imagen6: '',
      imagen7: '',
      imagen8: '',
      imagen9: '',
      imagen10: '',
      estado: '',
      creacion: false,
      participacion: false,
      resultadoLocal: '',
      resultadoVisitante: '',
      registrarResultado: false,
      idCiudad: 0,
      API: "http://127.0.0.1:8080/evento",
      API2: "http://127.0.0.1:8080/equipo",
      contadorJugador: 1,
      result: false,
      permisoParticipar: false,
      permisos: false,
      results2: false,
      resultsEquipos: false,
      resultsUsuariosEquipo1: false,
      resultsUsuariosEquipo2: false,
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
      formDataUsuario: {
        usuario: {
          id: 0
        },
        equipo: {
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

      const response = await fetch(this.API + "/" + this.id)
      const data = await response.json()
      this.results2 = data
      const response2 = await fetch(this.API + "/" + this.id + "/equipos")
      const data2 = await response2.json()
      this.resultsEquipos = data2

      const response3 = await fetch(this.API2 + "/" + this.resultsEquipos[0].id + "/usuarios")
      const data3 = await response3.json()
      this.resultsUsuariosEquipo1 = data3
      const response4 = await fetch(this.API2 + "/" + this.resultsEquipos[1].id + "/usuarios")
      const data4 = await response4.json()
      this.resultsUsuariosEquipo2 = data4
      if (this.resultsUsuariosEquipo2[0].username == "Plaza vacante") {
        this.contadorJugador = 2
      }
      else if (this.resultsUsuariosEquipo1[1].username == "Plaza vacante") {
        this.contadorJugador = 3
      }
      else if (this.resultsUsuariosEquipo2[1].username == "Plaza vacante") {
        this.contadorJugador = 4
      }
      else if (this.resultsUsuariosEquipo1[2].username == "Plaza vacante") {
        this.contadorJugador = 5
      }
      else if (this.resultsUsuariosEquipo2[2].username == "Plaza vacante") {
        this.contadorJugador = 6
      }
      else if (this.resultsUsuariosEquipo1[3].username == "Plaza vacante") {
        this.contadorJugador = 7
      }
      else if (this.resultsUsuariosEquipo2[3].username == "Plaza vacante") {
        this.contadorJugador = 8
      }
      else if (this.resultsUsuariosEquipo1[4].username == "Plaza vacante") {
        this.contadorJugador = 9
      }
      else if (this.resultsUsuariosEquipo2[4].username == "Plaza vacante") {
        this.contadorJugador = 10
      }
      else {
        this.contadorJugador = 11
      }
    },
    toggleCheckForm() {
      this.checkForm = !this.checkForm
    },
    async eliminarPartido() {
      if (this.permisos) {
        try {
          await axios.delete("http://127.0.0.1:8080/evento/" + this.id);
          await this.$router.push('/');
          window.location.reload()
        } catch (error) {
          console.error(error);
        }
      }
    },
    realizarEvento() {
      if (this.checkForm) {
        this.creacion = false;
        this.checkForm = false;
      }

    },
    establecerValores() {
      this.deporte = this.results2.deporte.nombre
      this.idCiudad = this.results2.ciudad.id
      this.estado = this.results2.estado
      this.resultadoLocal = this.results2.puntosLocal
      this.resultadoVisitante = this.results2.puntosVisitante
      this.jugador1 = this.resultsUsuariosEquipo1[0].username
      this.jugador2 = this.resultsUsuariosEquipo2[0].username
      this.jugador3 = this.resultsUsuariosEquipo1[1].username
      this.jugador4 = this.resultsUsuariosEquipo2[1].username
      this.jugador5 = this.resultsUsuariosEquipo1[2].username
      this.jugador6 = this.resultsUsuariosEquipo2[2].username
      this.jugador7 = this.resultsUsuariosEquipo1[3].username
      this.jugador8 = this.resultsUsuariosEquipo2[3].username
      this.jugador9 = this.resultsUsuariosEquipo1[4].username
      this.jugador10 = this.resultsUsuariosEquipo2[4].username
      this.ciudad = this.results2.ciudad.nombre
      this.fecha = this.results2.fecha
      this.hora = this.results2.hora
      this.idJugador1 = this.resultsUsuariosEquipo1[0].id
      this.idJugador2 = this.resultsUsuariosEquipo2[0].id
      this.idJugador3 = this.resultsUsuariosEquipo1[1].id
      this.idJugador4 = this.resultsUsuariosEquipo2[1].id
      this.idJugador5 = this.resultsUsuariosEquipo1[2].id
      this.idJugador6 = this.resultsUsuariosEquipo2[2].id
      this.idJugador7 = this.resultsUsuariosEquipo1[3].id
      this.idJugador8 = this.resultsUsuariosEquipo2[3].id
      this.idJugador9 = this.resultsUsuariosEquipo1[4].id
      this.idJugador10 = this.resultsUsuariosEquipo2[4].id
      this.imagen1 = this.resultsUsuariosEquipo1[0].avatar
      this.imagen2 = this.resultsUsuariosEquipo2[0].avatar
      this.imagen3 = this.resultsUsuariosEquipo1[1].avatar
      this.imagen4 = this.resultsUsuariosEquipo2[1].avatar
      this.imagen5 = this.resultsUsuariosEquipo1[2].avatar
      this.imagen6 = this.resultsUsuariosEquipo2[2].avatar
      this.imagen7 = this.resultsUsuariosEquipo1[3].avatar
      this.imagen8 = this.resultsUsuariosEquipo2[3].avatar
      this.imagen9 = this.resultsUsuariosEquipo1[4].avatar
      this.imagen10 = this.resultsUsuariosEquipo2[4].avatar
      this.equipo1 = this.resultsEquipos[0].nombre
      this.equipo2 = this.resultsEquipos[1].nombre
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
      const responseUsuario = await fetch("http://127.0.0.1:8080/usuario/" + this.idUsuario)
      const dataUsuario = await responseUsuario.json()
      this.resultsUsuario = dataUsuario
      if (this.resultsUsuario.username == this.jugador1 || this.resultsUsuario.username == this.jugador2 || this.resultsUsuario.username == this.jugador3 || this.resultsUsuario.username == this.jugador4
        || this.resultsUsuario.username == this.jugador5 || this.resultsUsuario.username == this.jugador6 || this.resultsUsuario.username == this.jugador7 || this.resultsUsuario.username == this.jugador8
        || this.resultsUsuario.username == this.jugador9 || this.resultsUsuario.username == this.jugador10) {
        alert("Ya estás participando")
      }
      else if (this.jugador2 != "Plaza vacante" && this.jugador3 != "Plaza vacante" && this.jugador4 != "Plaza vacante" && this.jugador5 != "Plaza vacante" &&
        this.jugador6 != "Plaza vacante" && this.jugador7 != "Plaza vacante" && this.jugador8 != "Plaza vacante" && this.jugador9 != "Plaza vacante" &&
        this.jugador10 != "Plaza vacante") {
        alert("Plazas llenas")
      }
      else {
        const equipos = await fetch("http://127.0.0.1:8080/evento/" + this.id + "/equipos")
        const listaEquipos = await equipos.json()
        const componentesEquipo1 = await fetch("http://127.0.0.1:8080/equipo/" + listaEquipos[0].id + "/usuarios")
        const listaComponentesEquipo1 = await componentesEquipo1.json()
        const componentesEquipo2 = await fetch("http://127.0.0.1:8080/equipo/" + listaEquipos[1].id + "/usuarios")
        const listaComponentesEquipo2 = await componentesEquipo2.json()

        const componentesEquipo1Id = await fetch("http://127.0.0.1:8080/equipo/" + listaEquipos[0].id + "/usuario-equipo-ids")
        const listaComponentesEquipo1Id = await componentesEquipo1Id.json()
        const componentesEquipo2Id = await fetch("http://127.0.0.1:8080/equipo/" + listaEquipos[1].id + "/usuario-equipo-ids")
        const listaComponentesEquipo2Id = await componentesEquipo2Id.json()

        if (this.contadorJugador == 2) {
          try {
            this.formDataUsuario.usuario.id = this.idUsuario
            this.formDataUsuario.equipo.id = listaEquipos[1].id
            const response = await axios.put("http://127.0.0.1:8080/usuario_equipo/" + listaComponentesEquipo2Id[0], this.formDataUsuario);
            // window.location.reload()
          } catch (error) {
            console.error(error);
          }
        }

        if (this.contadorJugador == 3) {
          try {
            this.formDataUsuario.usuario.id = this.idUsuario
            this.formDataUsuario.equipo.id = listaEquipos[0].id
            const response = await axios.put("http://127.0.0.1:8080/usuario_equipo/" + listaComponentesEquipo1Id[1], this.formDataUsuario);
            //window.location.reload()
          } catch (error) {
            console.error(error);
          }
        }

        if (this.contadorJugador == 4) {
          try {
            this.formDataUsuario.usuario.id = this.idUsuario
            this.formDataUsuario.equipo.id = listaEquipos[1].id
            const response = await axios.put("http://127.0.0.1:8080/usuario_equipo/" + listaComponentesEquipo2Id[1], this.formDataUsuario);
            // window.location.reload()
          } catch (error) {
            console.error(error);
          }
        }

        if (this.contadorJugador == 5) {
          try {
            this.formDataUsuario.usuario.id = this.idUsuario
            this.formDataUsuario.equipo.id = listaEquipos[0].id
            const response = await axios.put("http://127.0.0.1:8080/usuario_equipo/" + listaComponentesEquipo1Id[2], this.formDataUsuario);
            //window.location.reload()
          } catch (error) {
            console.error(error);
          }
        }

        if (this.contadorJugador == 6) {
          try {
            this.formDataUsuario.usuario.id = this.idUsuario
            this.formDataUsuario.equipo.id = listaEquipos[1].id
            const response = await axios.put("http://127.0.0.1:8080/usuario_equipo/" + listaComponentesEquipo2Id[2], this.formDataUsuario);
            //window.location.reload()
          } catch (error) {
            console.error(error);
          }
        }

        if (this.contadorJugador == 7) {
          try {
            this.formDataUsuario.usuario.id = this.idUsuario
            this.formDataUsuario.equipo.id = listaEquipos[0].id
            const response = await axios.put("http://127.0.0.1:8080/usuario_equipo/" + listaComponentesEquipo1Id[3], this.formDataUsuario);
            //window.location.reload()
          } catch (error) {
            console.error(error);
          }
        }

        if (this.contadorJugador == 8) {
          try {
            this.formDataUsuario.usuario.id = this.idUsuario
            this.formDataUsuario.equipo.id = listaEquipos[1].id
            const response = await axios.put("http://127.0.0.1:8080/usuario_equipo/" + listaComponentesEquipo2Id[3], this.formDataUsuario);
            //window.location.reload()
          } catch (error) {
            console.error(error);
          }
        }

        if (this.contadorJugador == 9) {
          try {
            this.formDataUsuario.usuario.id = this.idUsuario
            this.formDataUsuario.equipo.id = listaEquipos[0].id
            const response = await axios.put("http://127.0.0.1:8080/usuario_equipo/" + listaComponentesEquipo1Id[4], this.formDataUsuario);
            //window.location.reload()
          } catch (error) {
            console.error(error);
          }
        }

        if (this.contadorJugador == 10) {
          try {
            this.formDataUsuario.usuario.id = this.idUsuario
            this.formDataUsuario.equipo.id = listaEquipos[1].id
            const response = await axios.put("http://127.0.0.1:8080/usuario_equipo/" + listaComponentesEquipo2Id[4], this.formDataUsuario);

          } catch (error) {
            console.error(error);
          }
        }

        window.location.reload()

      }
    }
  }
};
</script>
<template>
  <div v-if="jugador1 != null" to="/partido_detalles" class="partido-detalles">

    <div class="partido-detalles__deporte">Partido de {{ deporte }}</div>
    <div class="partido-detalles__enfrentamiento">
      <span v-if="permisos" @click="eliminarPartido"
        class="material-symbols-outlined partido-detalles__enfrentamiento__borrar">delete</span>
      <div class="partido-detalles__enfrentamiento__equipo">
        <div class="partido-detalles__enfrentamiento__equipo__nombre">{{ equipo1 }}</div>
        <div class="partido-detalles__enfrentamiento__equipo__escudo"><img :src="imagen_equipo1" /></div>
        <div class="partido-detalles__enfrentamiento__equipo__jugadores">
          <RouterLink :to="`/perfil/${idJugador1}`" class="partido-detalles__enfrentamiento__equipo__jugadores__jugador">
            <div class="partido-detalles__enfrentamiento__jugador__nombre partido-detalles__enfrentamiento__jugador__nombre--creador ">{{ jugador1 }}</div>
            <img class="partido-detalles__enfrentamiento__jugador__avatar" :src="imagen1" alt="Avatar del jugador 1" />
          </RouterLink>
          <RouterLink :to="`/perfil/${idJugador3}`" class="partido-detalles__enfrentamiento__equipo__jugadores__jugador">
            <div class="partido-detalles__enfrentamiento__jugador__nombre">{{ jugador3 }}</div>
            <img class="partido-detalles__enfrentamiento__jugador__avatar" :src="imagen3" alt="Avatar del jugador 3" />
          </RouterLink>
          <RouterLink :to="`/perfil/${idJugador5}`" class="partido-detalles__enfrentamiento__equipo__jugadores__jugador">
            <div class="partido-detalles__enfrentamiento__jugador__nombre">{{ jugador5 }}</div>
            <img class="partido-detalles__enfrentamiento__jugador__avatar" :src="imagen5" alt="Avatar del jugador 5" />
          </RouterLink>
          <RouterLink :to="`/perfil/${idJugador7}`" class="partido-detalles__enfrentamiento__equipo__jugadores__jugador">
            <div class="partido-detalles__enfrentamiento__jugador__nombre">{{ jugador7 }}</div>
            <img class="partido-detalles__enfrentamiento__jugador__avatar" :src="imagen7" alt="Avatar del jugador 7" />
          </RouterLink>
          <RouterLink :to="`/perfil/${idJugador9}`" class="partido-detalles__enfrentamiento__equipo__jugadores__jugador">
            <div class="partido-detalles__enfrentamiento__jugador__nombre">{{ jugador9 }}</div>
            <img class="partido-detalles__enfrentamiento__jugador__avatar" :src="imagen9" alt="Avatar del jugador 9" />
          </RouterLink>
          <div class="partido__estado partido__estado__imagenDeporteDetalles2" v-if="deporte == 'Fútbol Sala'">
            <img :src="balonFutbol" />
          </div>
          <div class="partido__estado partido__estado__imagenDeporteDetalles2" v-if="deporte == 'Baloncesto'">
            <img :src="balonBaloncesto" />
          </div>
        </div>

        <div v-if="estado == 'FINALIZADO'" class="partido-detalles__enfrentamiento__jugador__puntuacion">{{ resultadoLocal
        }}</div>
      </div>
      <div class="partido-detalles__enfrentamiento__duelo"><img src="../assets/imagenes/vs.png" /></div>
      <div class="partido-detalles__enfrentamiento__equipo">
        <div class="partido-detalles__enfrentamiento__equipo__nombre">{{ equipo2 }}</div>
        <div class="partido-detalles__enfrentamiento__equipo__escudo"><img :src="imagen_equipo2" /></div>
        <div class="partido-detalles__enfrentamiento__equipo__jugadores">
          <RouterLink :to="`/perfil/${idJugador2}`" class="partido-detalles__enfrentamiento__equipo__jugadores__jugador">
            <div class="partido-detalles__enfrentamiento__jugador__nombre">{{ jugador2 }}</div>
            <img class="partido-detalles__enfrentamiento__jugador__avatar" :src="imagen2" alt="Avatar del jugador 2" />
          </RouterLink>
          <RouterLink :to="`/perfil/${idJugador4}`" class="partido-detalles__enfrentamiento__equipo__jugadores__jugador">
            <div class="partido-detalles__enfrentamiento__jugador__nombre">{{ jugador4 }}</div>
            <img class="partido-detalles__enfrentamiento__jugador__avatar" :src="imagen4" alt="Avatar del jugador 4" />
          </RouterLink>
          <RouterLink :to="`/perfil/${idJugador6}`" class="partido-detalles__enfrentamiento__equipo__jugadores__jugador">
            <div class="partido-detalles__enfrentamiento__jugador__nombre">{{ jugador6 }}</div>
            <img class="partido-detalles__enfrentamiento__jugador__avatar" :src="imagen6" alt="Avatar del jugador 6" />
          </RouterLink>
          <RouterLink :to="`/perfil/${idJugador8}`" class="partido-detalles__enfrentamiento__equipo__jugadores__jugador">
            <div class="partido-detalles__enfrentamiento__jugador__nombre">{{ jugador8 }}</div>
            <img class="partido-detalles__enfrentamiento__jugador__avatar" :src="imagen8" alt="Avatar del jugador 8" />
          </RouterLink>
          <RouterLink :to="`/perfil/${idJugador10}`" class="partido-detalles__enfrentamiento__equipo__jugadores__jugador">
            <div class="partido-detalles__enfrentamiento__jugador__nombre">{{ jugador10 }}</div>
            <img class="partido-detalles__enfrentamiento__jugador__avatar" :src="imagen10" alt="Avatar del jugador 10" />
          </RouterLink>

        </div>
        <div v-if="estado == 'FINALIZADO'" class="partido-detalles__enfrentamiento__jugador__puntuacion">{{
          resultadoVisitante }}</div>
      </div>
    </div>

    <div class="partido-detalles__datos">
      <span @click="toggleCreacion" v-if="permisos"
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
    <button v-if="permisoParticipar && estado != 'FINALIZADO'
      && (jugador2 == 'Plaza vacante' || jugador3 == 'Plaza vacante' || jugador4 == 'Plaza vacante' || jugador5 == 'Plaza vacante' ||
        jugador6 == 'Plaza vacante' || jugador7 == 'Plaza vacante' || jugador8 == 'Plaza vacante' || jugador9 == 'Plaza vacante' ||
        jugador10 == 'Plaza vacante')
      " class="partido-detalles__boton boton" @click="anadirJugador">Participar</button>
    <button v-if="!permisoParticipar && estado != 'FINALIZADO' && jugador2 != 'Plaza vacante' && jugador3 != 'Plaza vacante' && jugador4 != 'Plaza vacante' && jugador5 != 'Plaza vacante' &&
      jugador6 != 'Plaza vacante' && jugador7 != 'Plaza vacante' && jugador8 != 'Plaza vacante' && jugador9 != 'Plaza vacante' &&
      jugador10 != 'Plaza vacante'" class="partido-detalles__boton boton"
      @click="toggleParticipacion">Finalizar</button>
    <div v-if="estado == 'FINALIZADO'" class="partido-detalles__finalizado">EVENTO FINALIZADO</div>
    <Modificar_evento v-if="creacion && permisos" @cerrarTodo="toggleCreacion" @realizarEvento="realizarEvento"
      @check="toggleCheckForm" :checkForm="checkForm" :id="id" :deporte="deporte" :fecha="fecha" :hora="hora"
      :jugador1="jugador1" :jugador2="jugador2" :jugador3="jugador3" :jugador4="jugador4" :jugador5="jugador5"
      :jugador6="jugador6" :jugador7="jugador7" :jugador8="jugador8" :jugador9="jugador9" :jugador10="jugador10"
      :imagen1="imagen1" :imagen2="imagen2" :imagen3="imagen3" :imagen4="imagen4" :imagen5="imagen5" :imagen6="imagen6"
      :imagen7="imagen7" :imagen8="imagen8" :imagen9="imagen9" :imagen10="imagen10" :equipo1="equipo1" :equipo2="equipo2"
      :ciudad="ciudad" :idJugador1="idJugador1" :idJugador2="idJugador2" :idJugador3="idJugador3" :idJugador4="idJugador4"
      :idJugador5="idJugador5" :idJugador6="idJugador6" :idJugador7="idJugador7" :idJugador8="idJugador8"
      :idJugador9="idJugador9" :idJugador10="idJugador10" :idCiudad="idCiudad">
    </Modificar_evento>
    <AnadirResultado v-if="permisos && participacion" @cerrarTodo="toggleParticipacion" @finalizarEvento="finalizarEvento"
      @check="toggleCheckForm" :checkForm="checkForm" @updatePartido="updateDatosPartido" :id="id"></AnadirResultado>
  </div>
  <div v-else>
    <div class="error">Cargando página... Si tarda mucho, puede que se trate de un error, por lo que <RouterLink to="/">
        pulsa aquí</RouterLink> para volver al inicio.</div>
  </div></template>
