<script setup>
    import Iniciar from './Iniciar_sesion.vue'
    import Registrar from './Registrar_sesion.vue'
    import Acceso from './Acceso_cuenta.vue'
</script>
<template>
    <div class="encabezado__menu">
        <a @click="toggleMenu"><span class="material-symbols-outlined encabezado__menu__icono">menu</span></a>
        <ul class="encabezado__menu__lista" v-if="showMenu">
            <li @click="toggleInicio">Iniciar sesión</li>
            <li>Item 2</li>
            <li>Item 3</li>
        </ul>
    </div>
    <Iniciar v-if="showInicio" @cerrarTodo="toggleInicio" :showInicio="showInicio" 
    @abrirRegistrar="toggleRegistrar" :showRegistrar="showRegistrar" @accederCuenta="toggleAcceso" :showAcceso="showAcceso"></Iniciar>
    <Registrar v-if="showRegistrar" @cerrarTodo="toggleRegistrar" :showRegistrar="showRegistrar" @abrirIniciar="toggleInicio" :showInicio="showInicio"></Registrar>
    <Acceso v-if="showAcceso" @cerrarTodo="toggleAcceso" :showAcceso="showAcceso"></Acceso>
</template>

<script>
export default {
    data() {
        return {
            showMenu: false,
            showInicio: false,
            showRegistrar: false,
            showAcceso: false
        };
    },
    methods: {
        toggleMenu() {
            this.showMenu = !this.showMenu;
        },
        toggleInicio() {
            this.showInicio = !this.showInicio;
            this.showMenu = false;
            this.showRegistrar = false;
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