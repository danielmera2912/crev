<script>
</script>
<template>
    <header class="encabezado">
        <div class="encabezado__logo"><a href="index.html">Logo</a></div>
        <nav class="encabezado__navegador">
            <ul class="encabezado__lista">
                <li>
                    <RouterLink active-class="encabezado__lista__enlace--actual" to="/" class="encabezado__lista__enlace">Partidos únicos</RouterLink>
                </li>
                <li>
                    <RouterLink active-class="encabezado__lista__enlace--actual" to="/about" class="encabezado__lista__enlace">Ligas</RouterLink>
                </li>
                <li>
                    <div href="#" class="encabezado__lista__enlace">Torneos</div>
                </li>

            </ul>
        </nav>
        <form :v-model="search" class="buscador-encabezado">
            <input type="text" class="buscador-encabezado__caja" placeholder="Buscar..." @input="(event) => this.$emit('inputChange', event)" /> 
            <button class="buscador__boton"><span class="material-symbols-outlined">search</span></button>
        </form>
        <a class="encabezado__menu"><span class="material-symbols-outlined">menu</span></a>
        <nav style="display: none;">
            <ul>
                <li>Opción 1</li>
                <li>Opción 2</li>
                <li>Opción 3</li>
            </ul>
        </nav>
    </header>
</template>