<script setup>
defineProps({
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
  }
})

</script>
<template>
  <a class="partido">
    <button class="boton partido__resultado">Añadir resultado</button>
    <div class="partido__deporte">
      {{ deporte }}
    </div>
    <div class="partido__datos">
      <div class="partido__datos__rival">
        <div class="partido__datos__rival__nombre">{{ jugador1 }}</div>
        <img class="partido__datos__rival__imagen" :src="imagen1"/>
      </div>
      <div class="partido__datos__detalles">
        <div class="partido__datos__detalles__fecha">{{ fecha }}</div>
        <div class="partido__datos__detalles__hora">{{ hora }}</div>
        <div class="partido__datos__detalles__ciudad">{{ ciudad }}</div>
      </div>
      <div class="partido__datos__rival">
        <img class="partido__datos__rival__imagen" :src="imagen2"/>
        <div class="partido__datos__rival__nombre">{{ jugador2 }}</div>
      </div>
    </div>
  </a>
</template>
