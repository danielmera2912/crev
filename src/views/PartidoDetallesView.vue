<script setup>
import PartidoDetalles from '../components/Partido_detalles.vue'
import PartidoDetalles2 from '../components/Partido_detalles2.vue'
/**
 * @file PartidoDetallesView.vue - Vista del detalle de los partidos
 * @author Daniel Mera Sachse
 */
/**
 * @vue-prop {String} idUsuario - Texto del nombre del Usuario
 * @vue-data {Boolean} equipos - Es equipo o no
 * @vue-data {Object} results2 - Objeto de los resultados
 * @vue-data {String} API_partido - Texto de la API
 * @vue-data {String} id - ID del partido
 */
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
      API_partido: "https://crevserverspring-production.up.railway.app/evento",
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
      if(this.results2.deporte.equipos){
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
