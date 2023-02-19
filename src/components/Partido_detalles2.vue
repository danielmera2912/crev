<script setup>
import axios from 'axios';
import Modificar_evento from './Modificar_evento.vue'
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
      imagen_equipo1: "../src/assets/imagenes/ciervoverde.png",
      imagen_equipo2: "../src/assets/imagenes/ballenazul.png",
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
      contadorJugador: 1,
      result: null,
      permisos: true,
      formData: {
        deporte: "",
        equipo1: "",
        equipo2: "",
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
        imagen1: "",
        imagen2: "",
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
      },
    }
  },
  async mounted() {
    this.id = this.$route.params.id;
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
      if(!this.results2.jugador2){
        this.contadorJugador=2
      }
      else if(this.results2.jugador3){
        this.contadorJugador=3
      }
      else if(this.results2.jugador4){
        this.contadorJugador=4
      }
      else if(this.results2.jugador5){
        this.contadorJugador=5
      }
      else if(this.results2.jugador6){
        this.contadorJugador=6
      }
      else if(this.results2.jugador7){
        this.contadorJugador=7
      }
      else if(this.results2.jugador8){
        this.contadorJugador=8
      }
      else if(this.results2.jugador9){
        this.contadorJugador=9
      }
      else if(this.results2.jugador10){
        this.contadorJugador=10
      }
    },
    toggleCheckForm() {
      this.checkForm = !this.checkForm
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
    },
    async añadirJugador() {
      this.cont = this.cont + 1
      this.formData.id = this.id
      this.formData.equipo1 = this.equipo1
      this.formData.equipo2 = this.equipo2
      this.formData.deporte = this.deporte
      this.formData.hora = this.hora
      this.formData.ciudad = this.ciudad
      this.formData.fecha = this.fecha
      this.formData.jugador1 = this.jugador1
      this.formData.imagen1 = this.imagen1
      if(this.contadorJugador==2){
        this.formData.jugador2 = "PepitoEjemplo"
        this.formData.imagen2 = "https://images.pexels.com/photos/5609026/pexels-photo-5609026.jpeg?auto=compress&cs=tinysrgb&w=600"
      }else{
        this.formData.jugador2 = this.jugador2
        this.formData.imagen2 = this.imagen2
      }

      if(this.contadorJugador==3){
        this.formData.jugador3 = "PepitoEjemplo"
        this.formData.imagen3 = "https://images.pexels.com/photos/5609026/pexels-photo-5609026.jpeg?auto=compress&cs=tinysrgb&w=600"
      }else{
        this.formData.jugador3 = this.jugador3
        this.formData.imagen3 = this.imagen3
      }

      if(this.contadorJugador==4){
        this.formData.jugador4 = "PepitoEjemplo"
        this.formData.imagen4 = "https://images.pexels.com/photos/5609026/pexels-photo-5609026.jpeg?auto=compress&cs=tinysrgb&w=600"
      }else{
        this.formData.jugador4 = this.jugador4
        this.formData.imagen4 = this.imagen4
      }

      if(this.contadorJugador==5){
        this.formData.jugador5 = "PepitoEjemplo"
        this.formData.imagen5 = "https://images.pexels.com/photos/5609026/pexels-photo-5609026.jpeg?auto=compress&cs=tinysrgb&w=600"
      }else{
        this.formData.jugador5 = this.jugador5
        this.formData.imagen5 = this.imagen5
      }

      if(this.contadorJugador==6){
        this.formData.jugador6 = "PepitoEjemplo"
        this.formData.imagen6 = "https://images.pexels.com/photos/5609026/pexels-photo-5609026.jpeg?auto=compress&cs=tinysrgb&w=600"
      }else{
        this.formData.jugador6 = this.jugador6
        this.formData.imagen6 = this.imagen6
      }

      if(this.contadorJugador==7){
        this.formData.jugador7 = "PepitoEjemplo"
        this.formData.imagen7 = "https://images.pexels.com/photos/5609026/pexels-photo-5609026.jpeg?auto=compress&cs=tinysrgb&w=600"
      }else{
        this.formData.jugador7 = this.jugador7
        this.formData.imagen7 = this.imagen7
      }

      if(this.contadorJugador==8){
        this.formData.jugador8 = "PepitoEjemplo"
        this.formData.imagen8 = "https://images.pexels.com/photos/5609026/pexels-photo-5609026.jpeg?auto=compress&cs=tinysrgb&w=600"
      }else{
        this.formData.jugador8 = this.jugador8
        this.formData.imagen8 = this.imagen8
      }

      if(this.contadorJugador==9){
        this.formData.jugador9 = "PepitoEjemplo"
        this.formData.imagen9 = "https://images.pexels.com/photos/5609026/pexels-photo-5609026.jpeg?auto=compress&cs=tinysrgb&w=600"
      }else{
        this.formData.jugador9 = this.jugador9
        this.formData.imagen9 = this.imagen9
      }

      if(this.contadorJugador==10){
        this.formData.jugador10 = "PepitoEjemplo"
        this.formData.imagen10 = "https://images.pexels.com/photos/5609026/pexels-photo-5609026.jpeg?auto=compress&cs=tinysrgb&w=600"
      }else{
        this.formData.jugador10 = this.jugador10
        this.formData.imagen10 = this.imagen10
      }
      
      try {
        const response = await axios.put("http://127.0.0.1:3001/api/v1/autorizacion/partidos/" + this.id, this.formData, {
          withCredentials: true
        });
        console.log(response.data);
        this.$router.push('/');
      } catch (error) {
        console.error(error);
      }

    }

  },
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
      <div class="partido-detalles__enfrentamiento__duelo"><img src="../assets/imagenes/vs.png" /></div>
      <div class="partido-detalles__enfrentamiento__equipo">
        <div class="partido-detalles__enfrentamiento__equipo__nombre">{{ equipo2 }}</div>
        <div class="partido-detalles__enfrentamiento__equipo__escudo"><img :src="imagen_equipo2" /></div>
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
      @check="toggleCheckForm" :checkForm="checkForm" :id="id" :deporte="deporte" :fecha="fecha" :hora="hora"
      :jugador1="jugador1" :jugador2="jugador2" :jugador3="jugador3" :jugador4="jugador4" :jugador5="jugador5"
      :jugador6="jugador6" :jugador7="jugador7" :jugador8="jugador8" :jugador9="jugador9" :jugador10="jugador10"
      :imagen1="imagen1" :imagen2="imagen2" :imagen3="imagen3" :imagen4="imagen4" :imagen5="imagen5" :imagen6="imagen6"
      :imagen7="imagen7" :imagen8="imagen8" :imagen9="imagen9" :imagen10="imagen10" :equipo1="equipo1" :equipo2="equipo2">
    </Modificar_evento>
  </div>
  <div v-else>
    <div class="error">Cargando página... Si tarda mucho, puede que se trate de un error, por lo que <RouterLink to="/">
        pulsa aquí</RouterLink> para volver al inicio.</div>
  </div>
</template>
