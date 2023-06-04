<script setup>
/**
 * @file NotFoundView.vue - Vista de error, página no encontrada (404)
 * @module NotFoundView
 * @author Daniel Mera Sachse
 */
</script>
<template>
    <div class="no-encontrado">
        <div class="no-encontrado__imagen"></div>
        <div class="no-encontrado__contenido">
            <div class="no-encontrado__contenido__titulo">404 - Página no encontrada</div>
            <div class="no-encontrado__contenido__descripcion">La página que estás buscando no existe.</div>
            <router-link to="/" class="no-encontrado__boton boton">Volver al inicio</router-link>
        </div>
    </div>
</template>
  
  