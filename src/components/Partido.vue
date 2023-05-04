<script setup>
import { RouterLink, RouterView } from 'vue-router'
/**
 * @file Partido.vue - Componente del partido
 * @author Daniel Mera Sachse
 */
/**
 * @vue-prop {String} id - Rescata la id del partido
 * @vue-prop {String} deporte - Rescata la deporte del partido
 * @vue-prop {String} fecha - Rescata la fecha del partido
 * @vue-prop {String} ciudad - Rescata la ciudad del partido
 * @vue-prop {String} hora - Rescata la hora del partido
 * @vue-prop {String} jugador1 - Rescata la jugador1 del partido
 * @vue-prop {String} jugador2 - Rescata la jugador2 del partido
 * @vue-prop {String} imagen1 - Rescata la imagen1 del partido
 * @vue-prop {String} imagen2 - Rescata la imagen2 del partido
 */
defineProps({
  id: {
    type: String,
    required: true
  },
  deporte: {
    type: String,
    required: true
  },
  fecha: {
    type: String,
    required: true
  },
  ciudad: {
    type: String,
    required: true
  },
  hora: {
    type: String,
    required: true
  },
  jugador1: {
    type: String,
    required: true
  },
  jugador2: {
    type: String,
    required: true
  },
  imagen1: {
    type: String,
    required: true
  },
  imagen2: {
    type: String,
    required: true
  },
  puntosLocal: {
    type: String,
    required: true
  },
  puntosVisitante: {
    type: String,
    required: true
  },
  estado: {
    type: String,
    required: true
  }
  // ,
  // perfil: {
  //   type: Boolean,
  //   required: true
  // }
})

</script>
<template>
  <RouterLink :to="`/partido_detalles/${id}`" class="partido">
    <div class="partido__deporte">
      {{ deporte }}
    </div>
    <div class="partido__datos">
      <div class="partido__datos__rival">
        <div class="partido__datos__rival__nombre">{{ jugador1 }}</div>
        <img class="partido__datos__rival__imagen" :src="imagen1" />
      </div>
      <div class="partido__datos__detalles">
        <div class="partido__datos__detalles__fecha">{{ fecha }}</div>
        <div class="partido__datos__detalles__hora">{{ hora }}</div>
        <div class="partido__datos__detalles__ciudad">{{ ciudad }}</div>
      </div>
      <div class="partido__datos__rival">
        <img class="partido__datos__rival__imagen" :src="imagen2" />
        <div class="partido__datos__rival__nombre">{{ jugador2 }}</div>
      </div>
    </div>
    <div class="partido__estado">
      <div v-if="estado == 'FINALIZADO'" class="partido__estado partido__estado__resultadoLocal"> {{ puntosLocal }}</div>
      <div v-if="estado == 'EN CURSO'" class="partido__estado partido__estado__encurso">{{ estado }}</div>
      <div v-if="estado == 'FINALIZADO'" class="partido__estado partido__estado__finalizado">{{ estado }}</div>
      <div v-if="estado == 'FINALIZADO'" class="partido__estado partido__estado__resultadoVisitante"> {{ puntosVisitante }}</div>
    </div>
  </RouterLink>
</template>
