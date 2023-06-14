<script setup>
import axios from 'axios';
import 'sweetalert2/dist/sweetalert2.css';
import Swal from 'sweetalert2/dist/sweetalert2.js';
/**
 * @file Iniciar_sesion.vue - Componente para iniciar sesión
 * @author Daniel Mera Sachse
 */
/**
 * @vue-data {String} textUser - Texto del nombre del Usuario
 * @vue-data {String} idUsuario - Id del usuario
 * @vue-data {String} textPass - Texto de la contraseña
 * @vue-data {String} textFecha - Texto de la fecha
 * @vue-data {String} expresionUsuario - Expresión regular del usuario
 * @vue-data {String} expresionPass - Expresión regular de la contraseña
 * @vue-data {Boolean} userValido - Usuario válido
 * @vue-data {Boolean} passValido -  Contraseña válida
 * @vue-data {String} mensajeError1 - Mensaje de error 1
 * @vue-data {String} mensajeError2 - Mensaje de error 2
 * @vue-data {String} mensajeError3 - Mensaje de error 3
 * @vue-data {String} mensajeError4 - Mensaje de error 4
 * @vue-data {Boolean} hayErrores - Errores
 * @vue-data {Boolean} errorIniciar - Error al iniciar
 * @vue-data {String} avatar - Avatar
 * @vue-data {String} inputType - Tipo del input
 * @vue-data {String} icon - Icono para el input
 */
 defineProps({
    cambioSesion: {
        type: Function,
        required: true
    }
})
</script>
<script>
export default {
    data() {
        return {
            textUser: '',
            idUsuario: '',
            textPass: '',
            expresionUsuario: /^[a-zA-Z]((\.|_|-)?[a-zA-Z0-9]+){3}$/,
            expresionPass: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
            userValido: false,
            passValido: false,
            mensajeError1: "Usuario incorrecto",
            mensajeError2: "Contraseña incorrecta",
            mensajeError3: "Usuario o contraseña incorrectos",
            hayErrores: false,
            errorIniciar: false,
            inputType: "password",
            icon: "visibility",
            resultsUsuario: '',
            formData: {
                clave: "",
                correo: ""
            },
            API: "https://crevserverspring-production.up.railway.app"

        }
    },
    methods: {
        cambiarTextoUsuario(e) {
            this.textUser = e.target.value
            if (this.expresionUsuario.test(this.textUser)) {
                this.userValido = true

            } else {
                this.userValido = false
            }
        },
        cambiarTextoPass(e) {
            this.textPass = e.target.value
            if (this.expresionPass.test(this.textPass)) {
                this.passValido = true

            } else {
                this.passValido = false
            }
        },
        check() {
            if (this.passValido && this.userValido) {
                this.login()
            }
        },
        iniciar() {
            this.check()
            if (!this.passValido || !this.userValido) {
                this.hayErrores = true
            }
        },

        async login() {
            await axios.post(this.API+"/auth/login", {
                username: this.textUser.trim(),
                password: this.textPass.trim()
            }, { withCredentials: true })
                .then(response => {
                    localStorage.setItem('tokenjwt', response.data.token);
                    localStorage.setItem('username', response.data.username);
                    localStorage.setItem('avatar', response.data.avatar);
                    localStorage.setItem('userId', response.data.id);
                    this.trasIniciar()

                })
                .catch(error => {
                    this.errorIniciar = true;
                })
        },
        recibirIdUsuario(id) {
            this.$emit('recibirIdUsuario', id)
        },
        ejecutarInicioSesion(nueva_id) {
            this.cambioSesion(nueva_id)
        },
        async trasIniciar() {
            await this.$router.push('/perfil/' + localStorage.getItem('userId'))
            this.$emit('cerrarTodo')
            this.$emit('iniciarSesion')
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Sesión iniciada',
                showConfirmButton: false,
                timer: 1500
            })
            this.recibirIdUsuario(localStorage.getItem('userId'))
            this.ejecutarInicioSesion(localStorage.getItem('userId'));
        },
        async lanzarIniciarSesion() {
            this.formData = {
                correo: this.textUser.trim(),
                clave: this.textPass.trim()
            };

            try {
                this.errorIniciar = false;

                const responseUsuario = await fetch(this.API+`/usuario/buscarPorNombre/${encodeURIComponent(this.formData.correo)}`);

                const dataUsuario = await responseUsuario.json();

                let usuarioEncontrado = true;
                if (dataUsuario.length == 0) {
                    usuarioEncontrado = false;
                    this.errorIniciar = true;
                }

                if (usuarioEncontrado) {
                    this.resultsUsuario[0] = dataUsuario.id;
                    this.idUsuario = this.resultsUsuario[0];
                    this.recibirIdUsuario(this.resultsUsuario[0]);
                }
            } catch (error) {
                this.errorIniciar = true;
            }
        },




        toggleVisibility() {
            this.inputType = this.inputType === "password" ? "text" : "password";
            this.icon = this.icon === "visibility" ? "visibility_off" : "visibility";
        }
    }
}
</script>

<template>
    <div class="fondo" @click="$emit('cerrarTodo')"></div>
    <div className="iniciar_sesion">
        <a href="#"><span className="material-symbols-outlined iniciar_sesion__cerrar"
                @click="$emit('cerrarTodo')">close</span></a>
        <tittle className="iniciar_sesion__titulo">Iniciar sesión</tittle>

        <form className="iniciar_sesion__caja" @submit.prevent="iniciar">
            <input @input="cambiarTextoUsuario" className="iniciar_sesion__caja__elemento" type="text"
                placeholder="Nombre de usuario..." />
            <label v-if="!userValido && hayErrores" className="iniciar_sesion__caja__informativo1--visible">{{
                mensajeError1
            }}</label>

            <input :type="inputType" @input="cambiarTextoPass" class="iniciar_sesion__caja__elemento"
                placeholder="Contraseña..." />
            <span class="material-symbols-outlined" @click="toggleVisibility">{{ icon }}</span>
            <div v-if="!passValido && hayErrores" className="iniciar_sesion__caja__informativo1--visible">{{
                mensajeError2
            }}
            </div>
            <div v-if="errorIniciar" className="iniciar_sesion__caja__informativo1--visible">{{
                mensajeError3
            }}
            </div>
            <section className="iniciar_sesion__boton">
                <input type="submit" className="iniciar_sesion__boton__opcion iniciar_sesion__boton__opcion--entrar"
                    value="Entrar" />
                <p>o</p>
                <a className="iniciar_sesion__boton__opcion iniciar_sesion__boton__opcion--registrar"
                    @click="$emit('abrirRegistrar')">Regístrate</a>
            </section>
        </form>

    </div>
</template>