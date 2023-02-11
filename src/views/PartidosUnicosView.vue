<script setup>
import Partidos from '../components/Partidos_unicos.vue'
defineProps({
  results: {
    type: Object,
    required: true
  }
})
</script>
<script>
export default {
  data() {
    return {
      id: 1,
    };
  },
  methods: {
    enviarValores(id) {
      this.$emit('enviarValores', id)
    }
  },
};
</script>
<template>
  <main>
    <Partidos @enviarValores="enviarValores" :results="results"/>
  </main>
</template>
