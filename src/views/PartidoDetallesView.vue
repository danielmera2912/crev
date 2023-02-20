<script setup>
import PartidoDetalles from '../components/Partido_detalles.vue'
import PartidoDetalles2 from '../components/Partido_detalles2.vue'
defineProps({
  idUsuario : {
    type: String,
    required: true
  }
})
</script>

<script>
export default {
  data() {
    return {
      equipos: false,
      results2: null,
      API_partido: "https://crev-server.onrender.com/api/v1/partidos",
      id: ''
    }
  },
  async mounted(){
    this.id = this.$router.currentRoute.value.params.id;
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
      if(this.results2.equipo1){
        this.equipos= true
      }
      
    },
  },
};
</script>
<template>
  <main>    
    <PartidoDetalles2 v-if="equipos" @recibirValores="recibirValores" :search="search" :id="id" :idUsuario="idUsuario"/>
    <PartidoDetalles v-else @recibirValores="recibirValores" :search="search" :id="id" :idUsuario="idUsuario"/>
  </main>
</template>
