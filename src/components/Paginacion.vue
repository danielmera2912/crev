
<script>
/**
 * Componente de paginación.
 *
 * @component
 * @example
 * // Uso del componente:
 * <Pagination
 *   :paginaActual="currentPage"
 *   :totalPaginas="totalPages"
 *   :paginaAnterior="previousPage"
 *   :paginaSiguiente="nextPage"
 *   :tipo="type"
 * ></Pagination>
 *
 * @props {number} paginaActual - El número de página actual.
 * @props {number} totalPaginas - El total de páginas.
 * @props {Function} paginaAnterior - La función para ir a la página anterior.
 * @props {Function} paginaSiguiente - La función para ir a la página siguiente.
 * @props {string} tipo - El tipo de paginación.
 */
 export default {
  props: {
    /**
     * El número de página actual.
     *
     * @type {number}
     * @required
     */
    paginaActual: {
      type: Number,
      required: true,
    },
    /**
     * El total de páginas.
     *
     * @type {number}
     * @required
     */
    totalPaginas: {
      type: Number,
      required: true,
    },
    /**
     * La función para ir a la página anterior.
     *
     * @type {Function}
     * @required
     */
    paginaAnterior: {
      type: Function,
      required: true,
    },
    /**
     * La función para ir a la página siguiente.
     *
     * @type {Function}
     * @required
     */
    paginaSiguiente: {
      type: Function,
      required: true,
    },
    /**
     * El tipo de paginación.
     *
     * @type {string}
     * @required
     */
    tipo: {
      type: String,
      required: true,
    },
  },
};

</script>
<template>
    <div v-if="tipo === 'usuario'" class="paginacion paginacion--usuarios">
        <button class="boton paginacion__boton" @click="paginaAnterior" :disabled="paginaActual === 0">
            &lt;
        </button>
        <button class="boton paginacion__boton">{{ paginaActual + 1 }}</button>
        <button class="boton paginacion__boton" @click="paginaSiguiente" :disabled="paginaActual >= totalPaginas - 1">
            &gt;
        </button>
    </div>
    <div v-else class="paginacion">
        <button class="boton paginacion__boton" @click="paginaAnterior" :disabled="paginaActual === 0">
            &lt;
        </button>
        <button class="boton paginacion__boton">{{ paginaActual + 1 }}</button>
        <button class="boton paginacion__boton" @click="paginaSiguiente" :disabled="paginaActual >= totalPaginas - 1">
            &gt;
        </button>
    </div>
</template>