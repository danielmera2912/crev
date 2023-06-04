<script setup>
import Menu from './Menu_desplegable.vue'
import Buscador from './Buscador.vue'
/**
 * @file Header.vue - Componente del encabezado
 * @module Header
 * @vue-prop {String} idUsuario - Establece la ID del usuario
 * @vue-data {String} searchTexto - Texto para establecer en el buscador
 * @vue-event {String} recibirIdUsuario - Evento emitido al modificar la ID del usuario
 */
 defineProps({
  /**
   * Establece la ID del usuario.
   *
   * @type {String}
   * @required
   */
  idUsuario: {
    type: String,
    required: true,
  },
});



</script>
<script>
export default {
  data() {
    return {
      /**
       * Texto para establecer en el buscador.
       *
       * @type {String}
       */
      searchTexto: '',
    };
  },
  methods: {
    /**
     * Modifica la ID del usuario y emite el evento correspondiente.
     *
     * @param {String} id - La nueva ID del usuario
     */
    recibirIdUsuario(id) {
      this.$emit('recibirIdUsuario', id);
    },
  },
};
</script>
<template>
  <header class="encabezado">
    <RouterLink to="/"><img class="encabezado__logo" src="../assets/imagenes/crev_logo.png" alt="Logo de CREV"/></RouterLink>

    <nav class="encabezado__navegador">
      <ul class="encabezado__lista">
        <li>
          <RouterLink active-class="encabezado__lista__enlace--actual" to="/" class="encabezado__lista__enlace">Partidos
            únicos</RouterLink>
        </li>
        <li>
          <RouterLink active-class="encabezado__lista__enlace--actual" to="/busqueda_usuarios"
            class="encabezado__lista__enlace">Usuarios</RouterLink>
        </li>

      </ul>
    </nav>

    <Menu :idUsuario="idUsuario" @recibirIdUsuario="recibirIdUsuario"></Menu>
  </header>
</template>