<script setup>
import Iniciar from './Iniciar_sesion.vue'
import Registrar from './Registrar_sesion.vue'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.css'
/**
 * @file Menu_desplegable.vue - Componente del menú desplegable
 * @author Daniel Mera Sachse
 */
/**
 * @vue-prop {String} idUsuario - Id del usuario
 */
defineProps({
    idUsuario: {
        type: String,
        required: true
    },
    sesionCerrada: {
        type: Function,
        required: true
    }
})
</script>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            showMenu: false,
            showIniciado: false,
            sesionIniciada: false,
            showInicio: false,
            showRegistrar: false,
            showAcceso: false,
            checkForm: false,
            checkRegistro: false,
            avatarUsuario: '',
            idUsuarioActivo: 0,
        };
    },
    mounted() {
        if (this.idUsuario != 0) {
            this.idUsuarioActivo = localStorage.getItem('userId');
            this.sesionIniciada = true;
        }
        else {
            this.sesionIniciada = false;
        }
        this.conseguirDatosUsuario()
    },
    computed: {
        avatarUsuario() {
            return localStorage.getItem('avatar');
        }
    },
    watch: {
        idUsuario(newValue) {
            this.idUsuarioActivo = newValue;
        }
    },


    methods: {
        async conseguirDatosUsuario() {
            const usuario = await fetch("http://127.0.0.1:8080/usuario/" + this.idUsuarioActivo)
            const dataUsuario = await usuario.json()
            this.avatarUsuario = dataUsuario.avatar
        },
        toggleMenu() {

            if (this.sesionIniciada == false) {
                this.showMenu = !this.showMenu;
            }
            else {
                this.showIniciado = !this.showIniciado;

            }

        },
        async cerrarSesion() {
            this.sesionIniciada = false;
            this.showIniciado = false;
            this.showAcceso = false;
            try {
                await localStorage.removeItem('userId');
                await localStorage.removeItem('tokenjwt');
                await localStorage.removeItem('username');
                await localStorage.removeItem('avatar');
                this.sesionCerrada();
                this.$router.push('/');
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Sesión cerrada',
                    showConfirmButton: false,
                    timer: 1500
                })
            } catch (error) {
                console.error(error);
            }
        },
        toggleIniciado() {
            this.sesionIniciada = !this.sesionIniciada;
            this.showIniciado = false;
            this.showMenu = false;
            if (this.sesionIniciada == false) {
                this.checkForm = false;

            }
        },
        toggleInicio() {
            this.showInicio = !this.showInicio;
            this.showMenu = false;
            this.showRegistrar = false;

        },
        toggleInicioDesdeRegistro() {
            if (this.checkRegistro) {
                this.showInicio = !this.showInicio;
                this.showMenu = false;
                this.showRegistrar = false;
                this.checkRegistro = false;
            }


        },
        accederPerfilconIniciar() {

            this.sesionIniciada = true


        },
        toggleRegistrar() {
            this.showRegistrar = !this.showRegistrar;
            this.showMenu = false;
            this.showInicio = false;
        },
        toggleAcceso() {
            this.showAcceso = !this.showAcceso;
            this.showMenu = false;
            this.showInicio = false;
        },
        toggleCheck() {
            this.checkForm = !this.checkForm;
        },
        toggleCheck2() {
            this.checkRegistro = !this.checkRegistro;
        },
        recibirIdUsuario(id) {
            this.$emit('recibirIdUsuario', id)
        }

    }
};
</script>
<template>
    <div class="encabezado__menu">
        <a @click="toggleMenu" v-if="!sesionIniciada"><span
                class="material-symbols-outlined encabezado__menu__icono">menu</span></a>
        <a @click="toggleMenu" v-else>
            <img :src="avatarUsuario" alt="Avatar de usuario" class="encabezado__menu__avatar">
        </a>


        <ul class="encabezado__menu__lista" v-if="showMenu">
            <li @click="toggleInicio">Acceder</li>
            <li @click="toggleRegistrar">Crear cuenta</li>
        </ul>
        <ul class="encabezado__menu__lista encabezado__menu__lista--movil" v-if="showMenu">
            <li>
                <RouterLink to="/">Partidos únicos</RouterLink>
            </li>
            <li>
                <RouterLink to="/busqueda_usuarios">Usuarios</RouterLink>
            </li>
            <li @click="toggleInicio">Acceder</li>
            <li @click="toggleRegistrar">Crear cuenta</li>
        </ul>
        <ul class="encabezado__menu__lista" v-if="showIniciado">
            <li class="encabezado__menu__lista__elemento">
                <RouterLink :to="`/perfil/${idUsuarioActivo}`" @click="toggleMenu">Perfil</RouterLink>
            </li>
            <li class="encabezado__menu__lista__elemento">
                <RouterLink to="/" @click="cerrarSesion">Cerrar sesión
                </RouterLink>
            </li>
        </ul>
        <ul class="encabezado__menu__lista encabezado__menu__lista--movil" v-if="showIniciado">
            <li>
                <RouterLink to="/">Partidos únicos</RouterLink>
            </li>
            <li>
                <RouterLink to="/busqueda_usuarios">Usuarios</RouterLink>
            </li>
            <li class="encabezado__menu__lista__elemento">
                <RouterLink :to="`/perfil/${idUsuarioActivo}`" @click="toggleMenu">Perfil</RouterLink>
            </li>
            <li class="encabezado__menu__lista__elemento">
                <RouterLink to="/" @click="cerrarSesion">Cerrar sesión
                </RouterLink>
            </li>

        </ul>
    </div>
    <Iniciar v-if="showInicio" @cerrarTodo="toggleInicio" :showInicio="showInicio" @abrirRegistrar="toggleRegistrar"
        :showRegistrar="showRegistrar" :showAcceso="showAcceso" @iniciarSesion="accederPerfilconIniciar"
        :sesionIniciada="sesionIniciada" @check="toggleCheck" :checkForm="checkForm" @recibirIdUsuario="recibirIdUsuario">
    </Iniciar>
    <Registrar v-if="showRegistrar" @cerrarTodo="toggleRegistrar" :showRegistrar="showRegistrar"
        @abrirIniciar="toggleInicioDesdeRegistro" :showInicio="showInicio" @check="toggleCheck2" :checkForm="checkRegistro"
        @abrirIniciarSinRegistrar="toggleInicio"></Registrar>
    <Acceso v-if="showAcceso" @cerrarTodo="toggleAcceso" :showAcceso="showAcceso" @cerrarSesion="cerrarSesion"></Acceso>
</template>