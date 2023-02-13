<script setup>
import PartidoDetalles from '../components/Partido_detalles.vue'
import PartidoDetalles2 from '../components/Partido_detalles2.vue'
defineProps({
  id: {
    type: Number,
    required: true,
  }
})
</script>

<script>
export default {
  data() {
    return {
      equipos: false,
      results2: null,
      API_partido: "http://127.0.0.1:3001/api/v1/partidos",
    }
  },
  async mounted(){
    await this.llamarApiPartido()
  },
  methods: {
    recibirValores() {
      this.$emit('recibirValores')
    },
    async llamarApiPartido() {
      const response = await fetch(this.API_partido + "/" + this.id)
      const data = await response.json()
      this.results2 = data
      if(this.results2.jugador3){
        this.equipos= true
      }
      
    },
  },
};
</script>
<template>
  <main>    
    <PartidoDetalles2 v-if="equipos" @recibirValores="recibirValores" :id="id"/>
    <PartidoDetalles v-else @recibirValores="recibirValores" :id="id"/>
  </main>
</template>
