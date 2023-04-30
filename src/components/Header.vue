<script setup>
import Menu from './Menu_desplegable.vue'
import Buscador from './Buscador.vue'
/**
 * @file Header.vue - Componente del encabezado
 * @author Daniel Mera Sachse
 */
/**
 * @vue-prop {String} search - Establece el texto del buscador
 * @vue-prop {String} idUsuario - Establece la id del usuario
 * @vue-data {String} searchTexto - Texto para establecer del buscador
 * @vue-event {String} handleChange - Cambia el valor del buscador por lo que introduce el usuario
 * @vue-event {String} recibirIdUsuario - Modifica la ID del usuario
 */
defineProps({
  idUsuario: {
    type: String,
    required: true
  }
})

</script>
<script>
export default {
  data() {
    return {
      searchTexto: ''
    }
  },
  methods: {
    recibirIdUsuario(id){
      this.$emit('recibirIdUsuario', id)
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
                <li>
                  <RouterLink active-class="encabezado__lista__enlace--actual" to="/busqueda_usuarios" class="encabezado__lista__enlace">Usuarios</RouterLink>
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
        
        <Menu :idUsuario="idUsuario" @recibirIdUsuario="recibirIdUsuario"></Menu>
    </header>
</template>