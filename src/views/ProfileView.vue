<script setup>
import Profile from '../components/Profile.vue'
defineProps({
  idUsuario : {
    type: String,
    required: true
  }
})
</script>

<template>
  <main>
    <Profile :idUsuario="idUsuario" :search="search"/>
  </main>
</template>
