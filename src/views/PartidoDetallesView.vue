<script setup>
import PartidoDetalles from '../components/Partido_detalles.vue'
defineProps({
  id: {
    type: Number,
    required: true
  }
})
</script>

<script>
export default {
  
  methods: {
    recibirValores() {
      this.$emit('recibirValores')
    }
  },
};
</script>
<template>
  <main>    
    <PartidoDetalles @recibirValores="recibirValores" :id="id"/>
  </main>
</template>
