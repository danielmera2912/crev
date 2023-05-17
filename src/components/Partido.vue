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
<script>
export default {
  data() {
    return {
      balonFutbol: "https://images.vexels.com/media/users/3/158409/isolated/preview/b0af06a4c1a8e7a31ce379250130d26c-pelota-de-futbol-pentagono-silueta.png",
      balonBaloncesto: "https://images.vexels.com/media/users/3/139646/isolated/preview/c365f14205e2c1f9830d25c919f28561-silueta-de-icono-de-pelota-de-baloncesto.png",
      balonPadel: "https://images.vexels.com/media/users/3/206721/isolated/lists/194b08f6d1e2f8d6fc7dea50e01b1544-pelota-de-padel-pickleball-negra.png",
      balonTenis: "https://cdn-icons-png.flaticon.com/512/8/8331.png?w=360",
    }
  },
};
</script>
<template>
  <RouterLink :to="`/partido_detalles/${id}`" class="partido">
    <div class="partido__deporte">
      {{ deporte }}
    </div>
    <div class="partido__datos">
      <div class="partido__datos__rival">
        <div class="partido__datos__rival__nombre partido__datos__rival__nombre--responsivo">{{ jugador1 }}</div>
        <div class="partido__datos__rival__nombre">{{ jugador1 }}</div>
        <img class="partido__datos__rival__imagen" :src="imagen1" />
      </div>
      <div class="partido__datos__detalles">
        <div class="partido__datos__detalles__fecha">{{ fecha }}</div>
        <div class="partido__datos__detalles__hora">{{ hora }}</div>
        <div class="partido__datos__detalles__ciudad">{{ ciudad }}</div>
      </div>
      <div class="partido__datos__rival">
        <div class="partido__datos__rival__nombre partido__datos__rival__nombre--responsivo">{{ jugador2 }}</div>
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
    <div class="partido__estado partido__estado__imagenDeporte" v-if="deporte=='Fútbol Sala'">
      <img :src="balonFutbol"/>
    </div>
    <div class="partido__estado partido__estado__imagenDeporte" v-if="deporte=='Baloncesto'">
      <img :src="balonBaloncesto"/>
    </div>
    <div class="partido__estado partido__estado__imagenDeporte" v-if="deporte=='Padel'">
      <img :src="balonPadel"/>
    </div>
    <div class="partido__estado partido__estado__imagenDeporte" v-if="deporte=='Tenis'">
      <img :src="balonTenis"/>
    </div>
  </RouterLink>
</template>
