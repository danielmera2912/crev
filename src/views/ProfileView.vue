<script setup>
import Profile from '../components/Profile.vue';
/**
 * @file ProfileView.vue - Vista del perfil
 * @author Daniel Mera Sachse
 */
/**
 * @vue-prop {String} idUsuario - Texto del nombre del Usuario
 */
defineProps({
  idUsuario : {
    type: String,
    required: true
  }
})
</script>

<template>
  <main>
    <Profile :idUsuario="idUsuario"/>
  </main>
</template>
