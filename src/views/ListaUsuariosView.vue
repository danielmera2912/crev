<script setup>
/**
 * @file ListaUsuariosView.vue - Vista de la lista de Usuarios
 * @module ListaUsuariosView
 * @author Daniel Mera Sachse
 */
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import Paginacion from '../components/Paginacion.vue'
import Alerta from '../components/Alerta.vue';
const localSearch = ref('');
const dataUsuario = ref([]);
let paginaActual = 0;
let totalPaginas = 0;
const API =  "http://127.0.0.1:8080";
const router = useRouter();

onMounted(conseguirUsuarios);

async function conseguirUsuarios() {

    const responseUsuario = await fetch(API+`/usuario?page=${paginaActual}`);

    const arrayUsuarios = await responseUsuario.json();
    const usuarios = arrayUsuarios.usuarios;
    totalPaginas = arrayUsuarios.totalPages;
    dataUsuario.value = usuarios;
}

async function buscarUsuariosPorNombre() {
    if (localSearch.value !== '') {

        const responseUsuario = await fetch(API+`/usuario/buscarPorNombre/${localSearch.value}`);

        const usuarios = await responseUsuario.json();
        dataUsuario.value = usuarios;
    } else {
        conseguirUsuarios();
    }
}

watch(localSearch, buscarUsuariosPorNombre);

function paginaAnterior() {
    if (paginaActual > 0) {
        paginaActual--;
        conseguirUsuarios();
        router.push({ query: { page: paginaActual } });
    }
}

function paginaSiguiente() {
    if (paginaActual < totalPaginas - 1) {
        paginaActual++;
        conseguirUsuarios();
        router.push({ query: { page: paginaActual } });
    }
}

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

        <div v-if="dataUsuario.length>0" class="lista_usuario">
            <ul class="lista_usuario__grupo">
                <li v-for="usuario in dataUsuario" :key="usuario.id">
                    <RouterLink :to="`/perfil/${usuario.id}`" class="lista_usuario__grupo__info">
                        <img alt="avatar del usuario" :src="usuario.avatar" :alt="usuario.username" class="lista_usuario__grupo__info__avatar">
                        <div class="lista_usuario__grupo__info__detalles">
                            <div class="lista_usuario__grupo__info__detalles__nombre">{{ usuario.username }}</div>
                            <div class="lista_usuario__grupo__info__detalles__datos">{{ usuario.fechaNacimiento }}</div>
                            <div class="lista_usuario__grupo__info__detalles__datos">{{ usuario.correo }}</div>
                        </div>
                    </RouterLink>
                </li>
            </ul>
        </div>
        <div v-else class="lista_usuario">
            <Alerta message="No hay usuarios con esta combinación de caracteres"></Alerta>
        </div>
        <Paginacion v-if="localSearch == ''" :tipo="'usuario'" :paginaActual="paginaActual" :totalPaginas="totalPaginas"
            :paginaAnterior="paginaAnterior" :paginaSiguiente="paginaSiguiente" />


    </main>
</template>