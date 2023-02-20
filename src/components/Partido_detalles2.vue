<script setup>
import axios from 'axios';
import Modificar_evento from './Modificar_evento.vue'
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
      imagen_equipo1: "../src/assets/imagenes/ciervoverde.png",
      imagen_equipo2: "../src/assets/imagenes/ballenazul.png",
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
      creacion: false,
      API: "https://crev-server.onrender.com/api/v1/partidos",
      contadorJugador: 1,
      result: false,
      permisoParticipar: false,
      permisos: true,
      formData: {
        deporte: "",
        equipo1: "Ciervo Verde",
        equipo2: "Ballenas azules",
        jugador1: "",
        jugador2: '',
        jugador3: '',
        jugador4: '',
        jugador5: '',
        jugador6: '',
        jugador7: '',
        jugador8: '',
        jugador9: '',
        jugador10: '',
        ciudad: "",
        fecha: "",
        hora: "",
        id: '',
        imagen_equipo1: "../src/assets/imagenes/ciervoverde.png",
        imagen_equipo2: "../src/assets/imagenes/ballenazul.png",
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
        idJugador1: "",
        idJugador2: "",
        idJugador3: "",
        idJugador4: "",
        idJugador5: "",
        idJugador6: "",
        idJugador7: "",
        idJugador8: "",
        idJugador9: "",
        idJugador10: ""
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

      const response = await fetch(this.API + "/" + this.id)
      const data = await response.json()
      this.results2 = data
      if (this.results2.jugador2 == "Plaza vacante") {
        this.contadorJugador = 2
      }
      else if (this.results2.jugador3 == "Plaza vacante") {
        this.contadorJugador = 3
      }
      else if (this.results2.jugador4 == "Plaza vacante") {
        this.contadorJugador = 4
      }
      else if (this.results2.jugador5 == "Plaza vacante") {
        this.contadorJugador = 5
      }
      else if (this.results2.jugador6 == "Plaza vacante") {
        this.contadorJugador = 6
      }
      else if (this.results2.jugador7 == "Plaza vacante") {
        this.contadorJugador = 7
      }
      else if (this.results2.jugador8 == "Plaza vacante") {
        this.contadorJugador = 8
      }
      else if (this.results2.jugador9 == "Plaza vacante") {
        this.contadorJugador = 9
      }
      else if (this.results2.jugador10 == "Plaza vacante") {
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
          await axios.delete(this.API_partido + "/" + this.id);
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
      this.deporte = this.results2.deporte
      this.jugador1 = this.results2.jugador1
      this.jugador2 = this.results2.jugador2
      this.jugador3 = this.results2.jugador3
      this.jugador4 = this.results2.jugador4
      this.jugador5 = this.results2.jugador5
      this.jugador6 = this.results2.jugador6
      this.jugador7 = this.results2.jugador7
      this.jugador8 = this.results2.jugador8
      this.jugador9 = this.results2.jugador9
      this.jugador10 = this.results2.jugador10
      this.ciudad = this.results2.ciudad
      this.fecha = this.results2.fecha
      this.hora = this.results2.hora
      this.idJugador1 = this.results2.idJugador1
      this.idJugador2 = this.results2.idJugador2
      this.idJugador3 = this.results2.idJugador3
      this.idJugador4 = this.results2.idJugador4
      this.idJugador5 = this.results2.idJugador5
      this.idJugador6 = this.results2.idJugador6
      this.idJugador7 = this.results2.idJugador7
      this.idJugador8 = this.results2.idJugador8
      this.idJugador9 = this.results2.idJugador9
      this.idJugador10 = this.results2.idJugador10
      this.imagen1 = this.results2.imagen1
      this.imagen2 = this.results2.imagen2
      this.imagen3 = this.results2.imagen3
      this.imagen4 = this.results2.imagen4
      this.imagen5 = this.results2.imagen5
      this.imagen6 = this.results2.imagen6
      this.imagen7 = this.results2.imagen7
      this.imagen8 = this.results2.imagen8
      this.imagen9 = this.results2.imagen9
      this.imagen10 = this.results2.imagen10
      this.equipo1 = this.results2.equipo1
      this.equipo2 = this.results2.equipo2
      this.establecerPermiso()
    },
    async establecerPermiso() {
      if (this.idUsuario) {
        
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
      if (this.resultsUsuario.name == this.jugador1 || this.resultsUsuario.name == this.jugador2 || this.resultsUsuario.name == this.jugador3 || this.resultsUsuario.name == this.jugador4
        || this.resultsUsuario.name == this.jugador5 || this.resultsUsuario.name == this.jugador6 || this.resultsUsuario.name == this.jugador7 || this.resultsUsuario.name == this.jugador8
        || this.resultsUsuario.name == this.jugador9 || this.resultsUsuario.name == this.jugador10) {
        alert("Ya estás participando")
      }
      else if (this.jugador2 != "Plaza vacante" && this.jugador3 != "Plaza vacante" && this.jugador4 != "Plaza vacante" && this.jugador5 != "Plaza vacante" &&
        this.jugador6 != "Plaza vacante" && this.jugador7 != "Plaza vacante" && this.jugador8 != "Plaza vacante" && this.jugador9 != "Plaza vacante" &&
        this.jugador10 != "Plaza vacante") {
        alert("Plazas llenas")
      }
      else {
        this.formData.id = this.id
        this.formData.deporte = this.deporte
        this.formData.hora = this.hora
        this.formData.ciudad = this.ciudad
        this.formData.fecha = this.fecha
        this.formData.jugador1 = this.jugador1
        this.formData.idJugador1 = this.idJugador1
        this.formData.imagen1 = this.imagen1
        if (this.contadorJugador == 2) {
          this.formData.jugador2 = this.resultsUsuario.name
          this.formData.idJugador2 = this.idUsuario
          this.formData.imagen2 = "https://images.pexels.com/photos/5609026/pexels-photo-5609026.jpeg?auto=compress&cs=tinysrgb&w=600"
        }
        else {
          this.formData.jugador2 = this.jugador2
          this.formData.idJugador2 = this.idJugador2
          this.formData.imagen2 = this.imagen2
        }
        if (this.contadorJugador == 3) {
          this.formData.jugador3 = this.resultsUsuario.name
          this.formData.idJugador3 = this.idUsuario
          this.formData.imagen3 = "https://images.pexels.com/photos/5609026/pexels-photo-5609026.jpeg?auto=compress&cs=tinysrgb&w=600"
        }
        else {
          this.formData.jugador3 = this.jugador3
          this.formData.idJugador3 = this.idJugador3
          this.formData.imagen3 = this.imagen3
        }

        if (this.contadorJugador == 4) {
          this.formData.jugador4 = this.resultsUsuario.name
          this.formData.idJugador4 = this.idUsuario
          this.formData.imagen4 = "https://images.pexels.com/photos/5609026/pexels-photo-5609026.jpeg?auto=compress&cs=tinysrgb&w=600"
        }
        else {
          this.formData.jugador4 = this.jugador4
          this.formData.idJugador4 = this.idJugador4
          this.formData.imagen4 = this.imagen4
        }

        if (this.contadorJugador == 5) {
          this.formData.jugador5 = this.resultsUsuario.name
          this.formData.idJugador5 = this.idUsuario
          this.formData.imagen5 = "https://images.pexels.com/photos/5609026/pexels-photo-5609026.jpeg?auto=compress&cs=tinysrgb&w=600"
        }
        else {
          this.formData.jugador5 = this.jugador5
          this.formData.idJugador5 = this.idJugador5
          this.formData.imagen5 = this.imagen5
        }

        if (this.contadorJugador == 6) {
          this.formData.jugador6 = this.resultsUsuario.name
          this.formData.idJugador6 = this.idUsuario
          this.formData.imagen6 = "https://images.pexels.com/photos/5609026/pexels-photo-5609026.jpeg?auto=compress&cs=tinysrgb&w=600"
        }
        else {
          this.formData.jugador6 = this.jugador6
          this.formData.idJugador6 = this.idJugador6
          this.formData.imagen6 = this.imagen6
        }

        if (this.contadorJugador == 7) {
          this.formData.jugador7 = this.resultsUsuario.name
          this.formData.idJugador7 = this.idUsuario
          this.formData.imagen7 = "https://images.pexels.com/photos/5609026/pexels-photo-5609026.jpeg?auto=compress&cs=tinysrgb&w=600"
        }
        else {
          this.formData.jugador7 = this.jugador7
          this.formData.idJugador7 = this.idJugador7
          this.formData.imagen7 = this.imagen7
        }

        if (this.contadorJugador == 8) {
          this.formData.jugador8 = this.resultsUsuario.name
          this.formData.idJugador8 = this.idUsuario
          this.formData.imagen8 = "https://images.pexels.com/photos/5609026/pexels-photo-5609026.jpeg?auto=compress&cs=tinysrgb&w=600"
        }
        else {
          this.formData.jugador8 = this.jugador8
          this.formData.idJugador8 = this.idJugador8
          this.formData.imagen8 = this.imagen8
        }

        if (this.contadorJugador == 9) {
          this.formData.jugador9 = this.resultsUsuario.name
          this.formData.idJugador9 = this.idUsuario
          this.formData.imagen9 = "https://images.pexels.com/photos/5609026/pexels-photo-5609026.jpeg?auto=compress&cs=tinysrgb&w=600"
        }
        else {
          this.formData.jugador9 = this.jugador9
          this.formData.idJugador9 = this.idJugador9
          this.formData.imagen9 = this.imagen9
        }

        if (this.contadorJugador == 10) {
          this.formData.jugador10 = this.resultsUsuario.name
          this.formData.idJugador10 = this.idUsuario
          this.formData.imagen10 = "https://images.pexels.com/photos/5609026/pexels-photo-5609026.jpeg?auto=compress&cs=tinysrgb&w=600"
        }
        else {
          this.formData.jugador10 = this.jugador10
          this.formData.idJugador10 = this.idJugador10
          this.formData.imagen10 = this.imagen10
        }
      

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
  }
};
</script>
<template>
  <div v-if="jugador1 != null" to="/partido_detalles" class="partido-detalles">

    <div class="partido-detalles__deporte">Partido de {{ deporte }}</div>
    <div class="partido-detalles__enfrentamiento">
      <span class="material-symbols-outlined partido-detalles__enfrentamiento__borrar">delete</span>
      <div class="partido-detalles__enfrentamiento__equipo">
        <div class="partido-detalles__enfrentamiento__equipo__nombre">{{ equipo1 }}</div>
        <div class="partido-detalles__enfrentamiento__equipo__escudo"><img :src="imagen_equipo1" /></div>
        <div class="partido-detalles__enfrentamiento__equipo__jugadores">
          <RouterLink :to="`/perfil/${idJugador1}`" class="partido-detalles__enfrentamiento__equipo__jugadores__jugador">
            <div class="partido-detalles__enfrentamiento__jugador__nombre">{{ jugador1 }}</div>
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
        </div>

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

      </div>
    </div>

    <div class="partido-detalles__datos">
      <span @click="toggleCreacion" v-if="!perfil"
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
    <Modificar_evento v-if="creacion && permisos" @cerrarTodo="toggleCreacion" @realizarEvento="realizarEvento"
      @check="toggleCheckForm" :checkForm="checkForm" :id="id" :deporte="deporte" :fecha="fecha" :hora="hora"
      :jugador1="jugador1" :jugador2="jugador2" :jugador3="jugador3" :jugador4="jugador4" :jugador5="jugador5"
      :jugador6="jugador6" :jugador7="jugador7" :jugador8="jugador8" :jugador9="jugador9" :jugador10="jugador10"
      :imagen1="imagen1" :imagen2="imagen2" :imagen3="imagen3" :imagen4="imagen4" :imagen5="imagen5" :imagen6="imagen6"
      :imagen7="imagen7" :imagen8="imagen8" :imagen9="imagen9" :imagen10="imagen10" :equipo1="equipo1" :equipo2="equipo2"
      :ciudad="ciudad" :idJugador1="idJugador1" :idJugador2="idJugador2" :idJugador3="idJugador3" :idJugador4="idJugador4"
      :idJugador5="idJugador5" :idJugador6="idJugador6" :idJugador7="idJugador7" :idJugador8="idJugador8"
      :idJugador9="idJugador9" :idJugador10="idJugador10">
    </Modificar_evento>
  </div>
  <div v-else>
    <div class="error">Cargando página... Si tarda mucho, puede que se trate de un error, por lo que <RouterLink to="/">
        pulsa aquí</RouterLink> para volver al inicio.</div>
  </div>
</template>
