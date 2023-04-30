<script setup>
import Partidos from '../components/Partidos_unicos.vue'

/**
 * @file PartidosUnicosView.vue - Vista de los partidos únicos
 * @author Daniel Mera Sachse
 */
/**
 * @vue-prop {String} results - Resultados rescatados
 * @vue-prop {String} search - Buscador rescatado
 * @vue-prop {String} idUsuario - Id del usuario rescatado
 */
defineProps({
  results: {
    type: Object,
    required: true
  },
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
      id: 1,
      search: '',
    };
  },
  methods: {
    enviarValores(id) {
      this.$emit('enviarValores', id)
    },
    handleChange(event) {
      const { value } = event.target;
      this.search = value;
    },
  },
};
</script>
<template>
  <main>
    <Partidos @inputChange="handleChange" :search="search" @enviarValores="enviarValores" :results="results" :idUsuario="idUsuario"/>
  </main>
</template>
