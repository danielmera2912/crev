<script setup>
import Alerta from './Alerta.vue';
import Modificar from './Modificar_cuenta.vue';
import Partido from './Partido.vue';
/**
 * @file Perfil.vue - Componente para el perfil
 * @module Profile
 * @author Daniel Mera Sachse
 * @vue-prop {String} idUsuario - La ID del usuario
 * @example
 * // Uso del componente:
 * <Profile :idUsuario="idUsuario"></Profile>
 */
 defineProps({
  /**
   * La ID del usuario.
   *
   * @type {String}
   * @required
   */
  idUsuario: {
    type: String,
    required: true,
  },
});

</script>
<script>

export default {
    data() {
        return {
            modificar: false,
            checkForm: false,
            mostrarPartidos: false,
            nombre: "",
            avatar: "",
            correo: "",
            fecha_nacimiento: "",
            idUsuarioActual: "",
            cambios: false,
            resultsEventos: '',
            equipoImagen1: "https://i.ibb.co/fYRFPbh/ciervoverde.png",
            equipoImagen2: "https://i.ibb.co/k9LNHCX/ballenazul.png",
            equipoNombre1: "Ciervo Verde",
            equipoNombre2: "Ballena Azul",
            API: "https://crevserverspring-production.up.railway.app",
        }
    },
    mounted() {
        this.llamarApiUsuario();
    },

    watch: {
        '$route.params.id': {
            immediate: true,
            handler() {
                this.llamarApiUsuario();
            },
        },
        cambios: {
            immediate: true,
            handler(newVal) {
                if (newVal) {
                    this.llamarApiUsuario();
                }
            },
        },
    },


    methods: {
        producirCambios() {
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

            const responseUsuario = await fetch(this.API+"/usuario/" + this.idUsuarioActual)

            const dataUsuario = await responseUsuario.json()
            this.resultsUsuario = dataUsuario
            this.nombre = this.resultsUsuario.username
            this.correo = this.resultsUsuario.correo
            this.avatar = this.resultsUsuario.avatar
            this.fecha_nacimiento = this.resultsUsuario.fechaNacimiento
            this.llamarEventos()
        },
        async llamarEventos() {

            const responseEvento = await fetch(this.API+"/usuarios/" + this.idUsuarioActual + "/eventos")

            const dataEvento = await responseEvento.json()
            this.resultsEventos = dataEvento
        },

        handleCambiosRealizados() {
            this.llamarApiUsuario()
        }
    }
}
</script>
<template>
    <main v-if="nombre != null && idUsuarioActual != 0" class="cuerpo cuerpo--perfil">
        <section class="cuerpo--perfil__avatar">
            <img class="cuerpo--perfil__avatar__imagen" v-bind:src="avatar" alt="avat del usuario"/>
            <a v-if="idUsuario == idUsuarioActual" @click="cambiarModificar" class="cuerpo--perfil__avatar__editar">
                <span class="material-symbols-outlined encabezado__menu__icono">edit</span>
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
        <button @click=toggleMostrarPartidos class="boton boton--ancho">Mostrar partidos</button>
        <div cuerpo--perfil__partidos v-if="mostrarPartidos">
            <template v-if="resultsEventos.length > 0" v-for="result in resultsEventos">
                <Partido v-if="!result.deporte.equipos" @click="enviarValores(result.id)" :deporte='result.deporte.nombre'
                    :fecha='result.fecha' :ciudad='result.ciudad.nombre' :hora='result.hora'
                    :jugador1='result.usuarios[0]?.username' :jugador2='result.usuarios[1]?.username'
                    :imagen1='result.usuarios[0]?.avatar' :imagen2='result.usuarios[1]?.avatar' :perfil="false"
                    :id="result.id">
                </Partido>
                <Partido v-else @click="enviarValores(result.id)" :deporte='result.deporte.nombre' :fecha='result.fecha'
                    :ciudad='result.ciudad.nombre' :hora='result.hora' :jugador1='equipoNombre1' :jugador2='equipoNombre2'
                    :imagen1='equipoImagen1' :imagen2='equipoImagen2' :perfil="false" :id="result.id">
                </Partido>
            </template>
            <template v-else>
                Aún no ha participado en ningún evento.
            </template>
        </div>
        <Modificar v-if="modificar && idUsuario == idUsuarioActual" @cerrar="cambiarModificar" :modificar="modificar"
            @check="toggleCheck" :checkForm="checkForm" @modificar="guardarModificado" :correo="correo" :nombre="nombre"
            :fecha_nacimiento="fecha_nacimiento" :avatar="avatar" :idUsuario="idUsuario" @cambiar="producirCambios"
            :cambiosRealizados="handleCambiosRealizados"></Modificar>
    </main>
    <main v-else-if="idUsuarioActual == 0">
        <Alerta message="'Plaza vacante' no es un usuario común y corriente, si has llegado hasta aquí desde un evento, significa que aún
        falta al menos un usuario para completar el evento, ¡Y estás invitado a ser tú! ¡Solo tienes que pulsar en
        'Participar' tras iniciar sesión!"></Alerta>
        
    </main>
    <main v-else>
        <Alerta message="No se ha encontrado el usuario"></Alerta>
    </main>
</template>