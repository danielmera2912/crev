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
      API: "https://crev-server.onrender.com/api/v1/partidos",
      results: null,
      idUsuario: localStorage.getItem('userId'),
      route: this.$route.path
    }
  },
  // watch: {
  //   '$route.path': function () {
  //     this.search = '';
  //   }
  // },
  mounted() {
    this.llamarApi()
  },
  methods: {
    handleChange(event) {
      const { value } = event.target;
      this.search = value;
    },
    recibirValores() {
      //
    },
    recibirIdUsuario(id) {
      localStorage.setItem('userId', id);
      this.idUsuario = id
    },
    async llamarApi() {
      this.cargando = false
      const response = await fetch(this.API)
      if (response.status == 200) {
        this.cargando = true
      }
      const data = await response.json()
      this.results = data
    }
  }
}
</script>
<template>
  <Header v-if="cargando" @inputChange="handleChange" :search="search" @recibirIdUsuario="recibirIdUsuario"
    :idUsuario="idUsuario"></Header>
  <RouterView v-if="cargando" :search="search" @recibirValores="recibirValores" :id="id"
    :results="results" :idUsuario="idUsuario" />
  <div v-else class="servidor">
      <img class="servidor__logo" src="./assets/imagenes/crev_logo.png"/>
      <div class="servidor__texto">Esperando respuesta del servidor</div>
  </div>
</template>

