<script setup>
import axios from 'axios';
import Modificar_evento from './Modificar_evento.vue'
// defineProps({
//   id: {
//     type: String,
//     required: true
//   }
// })
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
      API_partido: "http://127.0.0.1:3001/api/v1/partidos",
      results2: null,
      permisos: true,
      id: ''
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
      // this.$emit('enviarValores', this.id)
      const response = await fetch(this.API_partido + "/" + this.id)
      const data = await response.json()
      this.results2 = data

    },
    async eliminarPartido() {
      if (this.permisos) {
        try {
          await axios.delete(this.API_partido + "/" + this.id);
          this.$router.push('/');
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
        alert("Se ha actualizado el evento satisfactoriamente")
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
      <a class="partido-detalles__enfrentamiento__jugador">
        <div class="partido-detalles__enfrentamiento__jugador__texto">Jugador 1</div>
        <div class="partido-detalles__enfrentamiento__jugador__nombre">{{ jugador1 }}</div>
        <img class="partido-detalles__enfrentamiento__jugador__avatar" :src="imagen1" alt="Avatar del jugador 1" />
      </a>
      <div class="partido-detalles__enfrentamiento__duelo"><img src="../assets/imagenes/vs.png" /></div>
      <div class="partido-detalles__enfrentamiento__jugador">
        <div class="partido-detalles__enfrentamiento__jugador__texto">Jugador 2</div>
        <div class="partido-detalles__enfrentamiento__jugador__nombre">{{ jugador2 }}</div>
        <img class="partido-detalles__enfrentamiento__jugador__avatar" :src="imagen2" alt="Avatar del jugador 2" />
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
    <button class="partido-detalles__boton boton">Participar</button>
    <Modificar_evento v-if="permisos && creacion" @cerrarTodo="toggleCreacion" @realizarEvento="realizarEvento"
      @check="toggleCheckForm" :checkForm="checkForm" :id="id" :ciudad="ciudad" :deporte="deporte" :fecha="fecha"
      :hora="hora" :jugador1="jugador1" :jugador2="jugador2" :imagen1="imagen1" :imagen2="imagen2"></Modificar_evento>
  </div>
  <div v-else>
    <div class="error">Cargando página... Si tarda mucho, puede que se trate de un error, por lo que <RouterLink to="/">
        pulsa aquí</RouterLink> para volver al inicio.</div>
  </div>
</template>
