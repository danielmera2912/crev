<script setup>
    import Iniciar from './Iniciar_sesion.vue'
    import Registrar from './Registrar_sesion.vue'
    import Acceso from './Acceso_cuenta.vue'
</script>
<template>
    <div class="encabezado__menu">
        <a @click="toggleMenu"><span class="material-symbols-outlined encabezado__menu__icono">menu</span></a>
        <ul class="encabezado__menu__lista" v-if="showMenu">
            <li @click="toggleInicio">Acceder</li>
            <li @click="toggleRegistrar">Crear cuenta</li>
        </ul>
        <ul class="encabezado__menu__lista" v-if="showIniciado">
            <li><RouterLink class="encabezado__menu__lista__elemento" to="/perfil" @click="toggleMenu">Perfil</RouterLink></li>
            <li><RouterLink class="encabezado__menu__lista__elemento" to="/" @click="toggleIniciado">Cerrar sesión</RouterLink></li>
        </ul>
    </div>
    <Iniciar v-if="showInicio" @cerrarTodo="toggleInicio" :showInicio="showInicio" 
    @abrirRegistrar="toggleRegistrar" :showRegistrar="showRegistrar" :showAcceso="showAcceso" 
    @iniciarSesion="accederPerfilconIniciar" :sesionIniciada="sesionIniciada"></Iniciar>
    <Registrar v-if="showRegistrar" @cerrarTodo="toggleRegistrar" :showRegistrar="showRegistrar" @abrirIniciar="toggleInicio" :showInicio="showInicio"></Registrar>
    <Acceso v-if="showAcceso" @cerrarTodo="toggleAcceso" :showAcceso="showAcceso" ></Acceso>
</template>

<script>
export default {
    data() {
        return {
            showMenu: false,
            showIniciado: false,
            sesionIniciada: false,
            showInicio: false,
            showRegistrar: false,
            showAcceso: false
        };
    },
    methods: {
        toggleMenu() {

            if(this.sesionIniciada==false){
                this.showMenu = !this.showMenu;
            }
            else{
                this.showIniciado = !this.showIniciado;
                
            }
            
        },
        toggleIniciado() {
            this.sesionIniciada = !this.sesionIniciada;
            this.showIniciado = false;
            this.showMenu = false;
        },
        toggleInicio() {
            this.showInicio = !this.showInicio;
            this.showMenu = false;
            this.showRegistrar = false;
        },
        accederPerfilconIniciar(){
            this.toggleIniciado();
            this.toggleAcceso();
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
        }

    }
};
</script>