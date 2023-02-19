<script setup>
import { withScopeId } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
</script>
<script>
export default {
  data() {
    return {
      search: '',
      cargando: '',
      id: '',
      //id: sessionStorage.getItem("sesion"),
      API : "http://127.0.0.1:3001/api/v1/partidos",
      results : null,
      idUsuario : localStorage.getItem('userId'),
    }
  },
  mounted(){
    this.llamarApi()
  },
  methods: {
    handleChange(event) {
      const {value} = event.target;
      this.search = value;
    },
    recibirValores(){
      console.log("ejemplo")
    },
    enviarValores(n) {
      //sessionStorage.setItem('sesion', n);
      //this.id = sessionStorage.getItem("sesion")
    },
    recibirIdUsuario(id){
      localStorage.setItem('userId', id);
      this.idUsuario= id
    },
    async llamarApi(){
      this.cargando = false
      const response = await fetch(this.API)
      if(response.status == 200){
        this.cargando = true
      }
      const data = await response.json()
      this.results = data
    }
}
}
</script>
<template>
  <Header v-if="cargando" @inputChange="handleChange" :search="search" @recibirIdUsuario="recibirIdUsuario" :idUsuario="idUsuario"></Header>
  <RouterView v-if="cargando" :search="search" @recibirValores="recibirValores" @enviarValores="enviarValores" :id="id" :results="results" :idUsuario="idUsuario" />
  <div v-else>
    <div>Esperando respuesta del servidor</div>
  </div>
</template>

