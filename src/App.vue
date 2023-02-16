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
      id: '',
      //id: sessionStorage.getItem("sesion"),
      API : "http://127.0.0.1:3001/api/v1/partidos",
      results : null
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
    async llamarApi(){
      
      const response = await fetch(this.API)
      const data = await response.json()
      this.results = data
    }
}
}
</script>
<template>
  <Header @inputChange="handleChange" :search="search"></Header>
  <RouterView :search="search" @recibirValores="recibirValores" @enviarValores="enviarValores" :id="id" :results="results"/>
</template>

