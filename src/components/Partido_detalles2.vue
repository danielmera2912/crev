<script setup>
import axios from 'axios';
import Modificar_evento from './Modificar_evento.vue'
defineProps({
  id: {
    type: Number,
    required: true
  }
})
</script>
<script>
export default {
  data() {
    return {
      jugador1: null,
      jugador2: 'Pepe',
      jugador3: "Pepito",
      jugador4: "Alfredo",
      jugador5: "Samuel",
      jugador6: "Abdul",
      jugador7: "Jesús",
      jugador8: "Jeremías",
      jugador9: "Miguel",
      jugador10: "Rosso",
      deporte: "Baloncesto",
      equipo1: "Ciervo Verde",
      equipo2: "Ballenas azules",
      imagen_equipo1: "src/assets/imagenes/ciervoverde.png",
      imagen_equipo2: "src/assets/imagenes/ballenazul.png",
      fecha: "20/04/2023",
      hora: '20:20',
      ciudad: 'Pamplona',
      imagen1: 'https://cdn.resfu.com/img_data/players/medium/1004380.jpg?size=120x&lossy=1',
      imagen2: 'https://cdn.resfu.com/img_data/players/medium/427788.jpg?size=120x&lossy=1',
      imagen3: 'https://cdn.resfu.com/img_data/players/medium/427788.jpg?size=120x&lossy=1',
      imagen4: 'https://cdn.resfu.com/img_data/players/medium/427788.jpg?size=120x&lossy=1',
      imagen5: 'https://cdn.resfu.com/img_data/players/medium/427788.jpg?size=120x&lossy=1',
      imagen6: 'https://cdn.resfu.com/img_data/players/medium/427788.jpg?size=120x&lossy=1',
      imagen7: 'https://cdn.resfu.com/img_data/players/medium/427788.jpg?size=120x&lossy=1',
      imagen8: 'https://cdn.resfu.com/img_data/players/medium/427788.jpg?size=120x&lossy=1',
      imagen9: 'https://cdn.resfu.com/img_data/players/medium/427788.jpg?size=120x&lossy=1',
      imagen10: 'https://cdn.resfu.com/img_data/players/medium/427788.jpg?size=120x&lossy=1',
      creacion: false,
      API: "http://127.0.0.1:3001/api/v1/partidos",
      result: null,
      permisos: true
    }
  },
  async mounted(){
    await this.llamarApiPartido(),
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
    },
    toggleCheckForm() {
      this.checkForm = !this.checkForm
    },
    async eliminarPartido() {
    if (this.permisos) {
      try {
        await axios.delete(this.API_partido+"/"+this.id);
        this.$router.push('/');
      } catch (error) {
        console.error(error);
      }
    }
  },
    realizarEvento() {
      if (this.checkForm) {
        this.creacion = false;
        this.checkForm = false;
        alert("Se ha actualizado el evento satisfactoriamente")
      }

    },
    establecerValores(){
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
    }

  },
};
</script>
<template>
 
 <div v-if="jugador1!=null" to="/partido_detalles" class="partido-detalles">
    
    <div class="partido-detalles__deporte">Partido de {{ deporte }}</div>
    <div class="partido-detalles__enfrentamiento">
      <span class="material-symbols-outlined partido-detalles__enfrentamiento__borrar">delete</span>
      <div class="partido-detalles__enfrentamiento__equipo">
        <div class="partido-detalles__enfrentamiento__equipo__nombre">{{ equipo1 }}</div>
        <div class="partido-detalles__enfrentamiento__equipo__escudo"><img :src="imagen_equipo1"/></div>
        <div class="partido-detalles__enfrentamiento__equipo__jugadores">
          <div class="partido-detalles__enfrentamiento__equipo__jugadores__jugador">
            <div class="partido-detalles__enfrentamiento__jugador__nombre">{{ jugador1 }}</div>
            <img class="partido-detalles__enfrentamiento__jugador__avatar" :src="imagen1" alt="Avatar del jugador 1" />
          </div>
          <div class="partido-detalles__enfrentamiento__equipo__jugadores__jugador">
            <div class="partido-detalles__enfrentamiento__jugador__nombre">{{ jugador3 }}</div>
            <img class="partido-detalles__enfrentamiento__jugador__avatar" :src="imagen3" alt="Avatar del jugador 3" />
          </div>
          <div class="partido-detalles__enfrentamiento__equipo__jugadores__jugador">
            <div class="partido-detalles__enfrentamiento__jugador__nombre">{{ jugador5 }}</div>
            <img class="partido-detalles__enfrentamiento__jugador__avatar" :src="imagen5" alt="Avatar del jugador 5" />
          </div>
          <div class="partido-detalles__enfrentamiento__equipo__jugadores__jugador">
            <div class="partido-detalles__enfrentamiento__jugador__nombre">{{ jugador7 }}</div>
            <img class="partido-detalles__enfrentamiento__jugador__avatar" :src="imagen7" alt="Avatar del jugador 7" />
          </div>
          <div class="partido-detalles__enfrentamiento__equipo__jugadores__jugador">
            <div class="partido-detalles__enfrentamiento__jugador__nombre">{{ jugador9 }}</div>
            <img class="partido-detalles__enfrentamiento__jugador__avatar" :src="imagen9" alt="Avatar del jugador 9" />
          </div>
        </div>

      </div>
      <div class="partido-detalles__enfrentamiento__duelo"><img src="../assets/imagenes/vs.png"/></div>
      <div class="partido-detalles__enfrentamiento__equipo">
        <div class="partido-detalles__enfrentamiento__equipo__nombre">{{ equipo2 }}</div>
        <div class="partido-detalles__enfrentamiento__equipo__escudo"><img :src="imagen_equipo2"/></div>
        <div class="partido-detalles__enfrentamiento__equipo__jugadores">
          <div class="partido-detalles__enfrentamiento__equipo__jugadores__jugador">
            <div class="partido-detalles__enfrentamiento__jugador__nombre">{{ jugador2 }}</div>
            <img class="partido-detalles__enfrentamiento__jugador__avatar" :src="imagen2" alt="Avatar del jugador 2" />
          </div>
          <div class="partido-detalles__enfrentamiento__equipo__jugadores__jugador">
            <div class="partido-detalles__enfrentamiento__jugador__nombre">{{ jugador4 }}</div>
            <img class="partido-detalles__enfrentamiento__jugador__avatar" :src="imagen4" alt="Avatar del jugador 4" />
          </div>
          <div class="partido-detalles__enfrentamiento__equipo__jugadores__jugador">
            <div class="partido-detalles__enfrentamiento__jugador__nombre">{{ jugador5 }}</div>
            <img class="partido-detalles__enfrentamiento__jugador__avatar" :src="imagen6" alt="Avatar del jugador 6" />
          </div>
          <div class="partido-detalles__enfrentamiento__equipo__jugadores__jugador">
            <div class="partido-detalles__enfrentamiento__jugador__nombre">{{ jugador7 }}</div>
            <img class="partido-detalles__enfrentamiento__jugador__avatar" :src="imagen8" alt="Avatar del jugador 8" />
          </div>
          <div class="partido-detalles__enfrentamiento__equipo__jugadores__jugador">
            <div class="partido-detalles__enfrentamiento__jugador__nombre">{{ jugador9 }}</div>
            <img class="partido-detalles__enfrentamiento__jugador__avatar" :src="imagen10" alt="Avatar del jugador 10" />
          </div>
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
    <button class="partido-detalles__boton boton">Participar</button> 
    <Modificar_evento v-if="creacion && permisos" @cerrarTodo="toggleCreacion" @realizarEvento="realizarEvento"
      @check="toggleCheckForm" :checkForm="checkForm" :id="id" :deporte="deporte" :fecha="fecha" :hora="hora" :ciudad="ciudad"></Modificar_evento>
  </div>
  <div v-else>
    <div class="error">Cargando página... Si tarda mucho, puede que se trate de un error, por lo que <RouterLink to="/">pulsa aquí</RouterLink>  para volver al inicio.</div>
  </div>
</template>
