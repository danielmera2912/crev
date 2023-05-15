<script>
import axios from 'axios';
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
export default {
    data() {
        return {
            textUser: '',
            idUsuario: '',
            textPass: '',
            expresionUsuario: /^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}$/,
            expresionPass: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
            userValido: false,
            passValido: false,
            mensajeError1: "Correo incorrecto",
            mensajeError2: "Contraseña incorrecta",
            mensajeError3: "Correo o contraseña incorrectos",
            hayErrores: false,
            errorIniciar: false,
            inputType: "password",
            icon: "visibility",
            resultsUsuario: '',
            formData: {
                clave: "",
                correo: ""
            }

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
                this.lanzarIniciarSesion()
            }
        },
        iniciar() {
            this.check()
            //this.$emit('iniciarSesion')
            if (!this.passValido || !this.userValido) {
                this.hayErrores = true
            }
        },
        recibirIdUsuario(id) {
            this.$emit('recibirIdUsuario', id)
        },
        async trasIniciar() {
            //this.$emit('check')
            await this.$router.push('/perfil/' + this.idUsuario)
            this.$emit('cerrarTodo')
            this.$emit('iniciarSesion')
            window.location.reload()
        },
        async lanzarIniciarSesion() {
            this.formData = {
                correo: this.textUser.trim(),
                clave: this.textPass.trim()
            };

            try {
                this.errorIniciar = false;

                const responseUsuario = await fetch(`http://localhost:8080/usuario/buscarPorCorreo/${encodeURIComponent(this.formData.correo)}`);
                const dataUsuario = await responseUsuario.json();

                let usuarioEncontrado = true;
                if (dataUsuario.estado === "NOT_FOUND") {
                    usuarioEncontrado = false;
                    this.errorIniciar = true;
                }

                if (usuarioEncontrado) {
                    this.resultsUsuario = dataUsuario.id;
                    this.idUsuario = this.resultsUsuario;
                    this.recibirIdUsuario(this.resultsUsuario);

                    const responseLogin = await fetch(`http://localhost:8080/usuario/login?correo=${encodeURIComponent(this.formData.correo)}&clave=${encodeURIComponent(this.formData.clave)}`);
                    const dataLogin = await responseLogin.json();

                    if (dataLogin === true) {
                        this.trasIniciar();
                    } else {
                        this.errorIniciar = true;
                    }
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
                placeholder="Correo electrónico..." />
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