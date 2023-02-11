<script setup>
import Crear_evento from './Crear_evento.vue'
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
      jugador1: 'Juan',
      jugador2: 'Pepe',
      deporte: "Tenis",
      fecha: "20/04/2023",
      hora: '20:20',
      ciudad: 'Pamplona',
      imagen1: 'https://cdn.resfu.com/img_data/players/medium/1004380.jpg?size=120x&lossy=1',
      imagen2: 'https://cdn.resfu.com/img_data/players/medium/427788.jpg?size=120x&lossy=1',
      creacion: false,
      API : "http://127.0.0.1:3001/api/v1/partidos",
      result : null
    }
  },
  methods: {
    recibirValores() {
      this.$emit('recibirValores')
    },
    toggleCreacion() {
      this.creacion = !this.creacion
    },
    async llamarApi(){
      
      const response = await fetch(this.API+"/"+this.id)
      const data = await response.json()
      this.results = data
    }

  },
};
</script>
<template>
<!-- {{ id }} -->
  <div to="/partido_detalles" class="partido-detalles">
    <div class="partido-detalles__enfrentamiento">
      <div class="partido-detalles__enfrentamiento__jugador">
        <div class="partido-detalles__enfrentamiento__jugador__texto">Jugador 1</div>
        <div class="partido-detalles__enfrentamiento__jugador__nombre">{{ jugador1 }}</div>
        <img class="partido-detalles__enfrentamiento__jugador__avatar" :src="imagen1" alt="Avatar del jugador 1" />
      </div>
      <div class="partido-detalles__enfrentamiento__duelo">VS</div>
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
    <Crear_evento  @cerrarTodo="toggleCreacion" v-if="creacion"></Crear_evento>
  </div>
</template>
