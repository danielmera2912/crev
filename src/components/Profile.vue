<script setup>
import Modificar from './Modificar_cuenta.vue'
import Partido from './Partido.vue'
/**
 * @file Iniciar_sesion.vue - Componente para iniciar sesión
 * @author Daniel Mera Sachse
 */
/**
 * @vue-prop {String} idUsuario - Id del usuario
 * @vue-data {String} nombre - Texto del nombre
 * @vue-data {String} fecha_nacimiento - Texto de la fecha
 * @vue-data {String} avatar - Avatar de la fecha
 * @vue-data {String} idUsuarioActual - Id del usuario actual
 */
defineProps({
    idUsuario: {
        type: String,
        required: true
    }
})
</script>
<script>

export default {
    data() {
        return {
            modificar: false,
            checkForm: false,
            mostrarPartidos: false,
            nombre: "",
            avatar: "https://images.pexels.com/photos/5609026/pexels-photo-5609026.jpeg?auto=compress&cs=tinysrgb&w=600",
            correo: "",
            fecha_nacimiento: "",
            idUsuarioActual: "",
            cambios: false,
        }
    },
    mounted() {
        this.llamarApiUsuario()
    },
    // watch: {
    //     modificar() {
    //         if(this.modificar == true) {
    //             this.llamarApiUsuario()
    //         }

    //     }
    // },
    methods: {
        producirCambios(){
            this.cambios = !this.cambios
        },
        cambiarModificar() {
            this.modificar = !this.modificar
        },
        toggleCheck() {
            this.checkForm = !this.checkForm;
        },
        guardarModificado() {
            if (this.checkForm) {
                this.modificar = false;
                this.checkForm = false;
            }
        },
        toggleMostrarPartidos() {
            this.mostrarPartidos = !this.mostrarPartidos
        },
        async llamarApiUsuario() {
            this.idUsuarioActual = this.$route.params.id;
            const responseUsuario = await fetch("http://127.0.0.1:8080/usuario/" + this.idUsuarioActual)
            const dataUsuario = await responseUsuario.json()
            this.resultsUsuario = dataUsuario
            this.nombre = this.resultsUsuario.nombre
            this.correo = this.resultsUsuario.correo
            this.fecha_nacimiento = this.resultsUsuario.fechaNacimiento

        }
    }
}
</script>
<template>
    <main v-if="nombre" class="cuerpo cuerpo--perfil">
        <section class="cuerpo--perfil__avatar">
            <img class="cuerpo--perfil__avatar__imagen" v-bind:src="avatar" />
            <a v-if="idUsuario==idUsuarioActual" @click="cambiarModificar" class="cuerpo--perfil__avatar__editar">
                Editar Perfil
            </a>
        </section>

        <section class="cuerpo--perfil__nombre">
            <div class="cuerpo--perfil__nombre__respuesta">@{{ nombre }}</div>
        </section>

        <section class="cuerpo--perfil__correo">
            <div class="cuerpo--perfil__correo__pregunta">Correo Electrónico</div>
            <div class="cuerpo--perfil__correo__respuesta">{{ correo }}</div>
        </section>

        <section class="cuerpo--perfil__fecha">
            <div class="cuerpo--perfil__fecha__pregunta">Fecha de nacimiento</div>
            <div class="cuerpo--perfil__fecha__respuesta">{{ fecha_nacimiento }}</div>
        </section>
        <button @click=toggleMostrarPartidos class="boton boton--ancho">Mostrar todos los partidos participados</button>
            <div cuerpo--perfil__partidos v-if="mostrarPartidos">
                <ul>
                    <Partido v-for="i in 5" :deporte='"Tenis"' :fecha='"20/04/2011"' :ciudad='"Pamplona"' :hora='"20:20"'
                        :jugador1='"Pepe"' :jugador2='"Juan"'
                        :imagen1='"https://cdn.resfu.com/img_data/players/medium/1004380.jpg?size=120x&lossy=1"'
                        :imagen2='"https://cdn.resfu.com/img_data/players/medium/427788.jpg?size=120x&lossy=1"' :perfil="true">
                    </Partido>
                </ul>
            </div>
        <Modificar v-if="modificar && idUsuario==idUsuarioActual" @cerrar="cambiarModificar" :modificar="modificar" @check="toggleCheck"
            :checkForm="checkForm" @modificar="guardarModificado" :correo="correo" :nombre="nombre"
            :fecha_nacimiento="fecha_nacimiento" :avatar="avatar" :idUsuario="idUsuario" @cambiar="producirCambios"></Modificar>
    </main>
    <main v-else>
        No se ha encontrado el usuario.
    </main>
</template>