<script setup>
import { RouterView } from 'vue-router';
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';
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
      cargando: '',
      id: '',
      API_iniciar: "https://crevserverspring-production.up.railway.app/usuario",
      API: "https://crevserverspring-production.up.railway.app/evento",
      results: null,
      idUsuario: localStorage.getItem('userId') ?? 0
    }
  },
  mounted() {
    this.llamarApi()
  },
  methods: {
    cambioSesion(nueva_id) {
      this.idUsuario = nueva_id
    },
    recibirIdUsuario(id) {
      localStorage.setItem('userId', id);
      this.idUsuario = id
    },
    async llamarApi() {
      this.cargando = false
      try {
        const response2 = await fetch(this.API_iniciar);

        if (response2.status == 200) {
          this.cargando = true;
        }
      } catch (error) {
        setTimeout(() => {
          this.llamarApi();
        }, 5000);
      }
    }
  }
}
</script>
<template>
  <Header v-if="cargando" :cambioSesion="cambioSesion" :idUsuario="idUsuario"></Header>
  <RouterView v-if="cargando" :search="search" :cambioSesion="cambioSesion" :id="id"
    :idUsuario="idUsuario" />
  <Footer v-if="cargando"></Footer>
  <div v-else class="servidor">
    <img class="servidor__logo" src="./assets/imagenes/crev_logo.png" alt="Logo de CREV" />
    <div class="servidor__texto">Esperando respuesta del servidor</div>
  </div>
</template>

