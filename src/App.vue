<script setup>
import { withScopeId } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
</script>
<script>
/**
 * @file App.vue - App principal
 * @author Daniel Mera Sachse
 */
/**
 * @vue-data {String} search - Buscador
 * @vue-data {Boolean} cargando - Servidor activo
 * @vue-data {String} API - API
 * @vue-data {Boolean} checkUserServer - Check de si existe el usuario
 * @vue-data {Object} results - Resultados
 * @vue-data {String} idUsuario - ID del usuario
 */
export default {
  data() {
    return {
      search: '',
      cargando: '',
      id: '',
      API_iniciar: "http://127.0.0.1:8080/usuario",
      API: "http://127.0.0.1:8080/evento",
      results: null,
      idUsuario: localStorage.getItem('userId') ?? 0
    }
  },
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
      const response2 = await fetch(this.API_iniciar)
      if (response2.status == 200) {
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

