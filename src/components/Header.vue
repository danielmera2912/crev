<script setup>
import Menu from './Menu_desplegable.vue'
import Buscador from './Buscador.vue'

defineProps({
  search: {
    type: String,
    required: true
  },
})

</script>
<script>
export default {
  data() {
    return {
      search: ''
    }
  },
  methods: {
    handleChange(event) {
      const {value} = event.target;
      this.search = value;
      this.$emit('inputChange', event)
    }
  },
};
</script>
<template>
    <header class="encabezado">
      <RouterLink to="/"><img class="encabezado__logo" src="../assets/imagenes/crev_logo.png"/></RouterLink>
        
        <nav class="encabezado__navegador">
            <ul class="encabezado__lista">
                <li>
                    <RouterLink active-class="encabezado__lista__enlace--actual" to="/" class="encabezado__lista__enlace">Partidos únicos</RouterLink>
                </li>
                
                <!-- Este código es para el futuro -->
                <!-- <li>
                    <RouterLink active-class="encabezado__lista__enlace--actual" to="/about" class="encabezado__lista__enlace">Ligas</RouterLink>
                </li>
                <li>
                    <div href="#" class="encabezado__lista__enlace">Torneos</div>
                </li> -->

            </ul>
        </nav>
        <Buscador @inputChange="handleChange" :search="search"></Buscador>
        <Menu></Menu>
    </header>
</template>