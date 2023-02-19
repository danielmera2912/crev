<script setup>
import Iniciar from './Iniciar_sesion.vue'
import Registrar from './Registrar_sesion.vue'
import Acceso from './Acceso_cuenta.vue'
defineProps({
    idUsuario: {
        type: String,
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
            checkRegistro: false
        };
    },
    mounted() {
        if (this.idUsuario != null) {
            this.sesionIniciada = true;
        }
        else {
            this.sesionIniciada = false;
        }
    },
    methods: {
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
                await axios.delete("http://127.0.0.1:3001/api/v1/autorizacion/sessions/" + this.idUsuario, {
                    withCredentials: true
                });
                this.$router.push('/');
                localStorage.removeItem('userId');
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
            // this.toggleAcceso();


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
        <a @click="toggleMenu"><span class="material-symbols-outlined encabezado__menu__icono">menu</span></a>
        <ul class="encabezado__menu__lista" v-if="showMenu">
            <li @click="toggleInicio">Acceder</li>
            <li @click="toggleRegistrar">Crear cuenta</li>
        </ul>
        <ul class="encabezado__menu__lista" v-if="showIniciado">
            <li class="encabezado__menu__lista__elemento">
                <RouterLink  :to="`/perfil/${idUsuario}`" @click="toggleMenu">Perfil</RouterLink>
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