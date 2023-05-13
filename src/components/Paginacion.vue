
<script>
export default {
    props: {
        paginaActual: {
            type: Number,
            required: true,
        },
        totalPaginas: {
            type: Number,
            required: true,
        },
        paginaAnterior: {
            type: Function,
            required: true,
        },
        paginaSiguiente: {
            type: Function,
            required: true,
        },
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