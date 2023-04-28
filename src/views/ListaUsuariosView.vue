<script setup>
/**
 * @file PartidosUnicosView.vue - Vista de los partidos únicos
 * @author Daniel Mera Sachse
 */
/**
 * @vue-prop {String} results - Resultados rescatados
 * @vue-prop {String} search - Buscador rescatado
 * @vue-prop {String} idUsuario - Id del usuario rescatado
 */
import { ref, onMounted, watch } from 'vue';

const localSearch = ref('');
const dataUsuario = ref([]);

onMounted(conseguirUsuarios);

async function conseguirUsuarios() {
    const responseUsuario = await fetch("http://127.0.0.1:8080/usuario");
    const usuarios = await responseUsuario.json();
    usuarios.shift(); // Eliminar el primer elemento del array de usuarios
    dataUsuario.value = usuarios;
}

async function buscarUsuariosPorNombre() {
    if (localSearch.value !== '') {
        const responseUsuario = await fetch(`http://127.0.0.1:8080/usuario/buscarPorNombre/${localSearch.value}`);
        const usuarios = await responseUsuario.json();
        dataUsuario.value = usuarios;
    } else {
        conseguirUsuarios();
    }
}

watch(localSearch, buscarUsuariosPorNombre);
</script>

<template>
    <main>
        <form class="buscador-usuario" @submit.prevent>
            <input type="text" v-model="localSearch" class="buscador-usuario__caja"
                placeholder="Buscar por nombre de usuario..." />
            <button class="buscador__boton">
                <span class="material-symbols-outlined buscador__boton__icono">search</span>
            </button>
        </form>

        <div class="lista_usuario">
            <ul class="lista_usuario__grupo">
                <li v-for="usuario in dataUsuario" :key="usuario.id">
                    <RouterLink :to="`/perfil/${usuario.id}`" class="lista_usuario__grupo__info">
                        <img :src="usuario.avatar" :alt="usuario.nombre" class="lista_usuario__grupo__info__avatar">
                        <div class="lista_usuario__grupo__info__detalles">
                            <div class="lista_usuario__grupo__info__detalles__nombre">{{ usuario.nombre }}</div>
                            <div class="lista_usuario__grupo__info__detalles__datos">{{ usuario.fechaNacimiento }}</div>
                            <div class="lista_usuario__grupo__info__detalles__datos">{{ usuario.correo }}</div>
                        </div>
                    </RouterLink>
                </li>
            </ul>
        </div>
    </main>
</template>