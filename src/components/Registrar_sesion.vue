<script>
import axios from 'axios';
/**
 * @file Registrar_sesion.vue - Componente para registrar sesión
 * @author Daniel Mera Sachse
 */
/**
 * @vue-data {String} textUser - Texto del nombre del Usuario
 * @vue-data {String} idUsuario - Id del usuario
 * @vue-data {String} textPass - Texto de la contraseña
 * @vue-data {String} textFecha - Texto de la fecha
 * @vue-data {String} expresionUsuario - Expresión regular del usuario
 * @vue-data {String} expresionPass - Expresión regular de la contraseña
 * @vue-data {String} expresionCorreo - Expresión regular del correo
 * @vue-data {Boolean} userValido - Usuario válido
 * @vue-data {Boolean} passValido -  Contraseña válida
 * @vue-data {String} mensajeError1 - Mensaje de error 1
 * @vue-data {String} mensajeError2 - Mensaje de error 2
 * @vue-data {String} mensajeError3 - Mensaje de error 3
 * @vue-data {String} mensajeError4 - Mensaje de error 4
 * @vue-data {String} mensajeError5 - Mensaje de error 5
 * @vue-data {String} mensajeError6 - Mensaje de error 6
 * @vue-data {String} mensajeError7 - Mensaje de error 7
 * @vue-data {Boolean} hayErrores - Errores
 * @vue-data {Boolean} errorIniciar - Error al iniciar
 * @vue-data {Boolean} checkEmailServer - Check de si existe el email
 * @vue-data {Boolean} checkUserServer - Check de si existe el usuario
 * @vue-data {String} avatar - Avatar
 * @vue-data {String} inputType - Tipo del input
 * @vue-data {String} inputType2 - Tipo del input2
 * @vue-data {String} icon - Icono para el input
 * @vue-data {String} icon - Icono para el input2
 */
export default {
    data() {
        return {
            textUser: '',
            textPass: '',
            textPass2: '',
            textCorreo: '',
            textFecha: '',
            expresionUsuario: /^[a-zA-Z]((\.|_|-)?[a-zA-Z0-9]+){3}$/,
            expresionPass: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
            expresionCorreo: /^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}$/,
            userValido: false,
            userValidoServer: true,
            passValido: false,
            passValido2: false,
            correoValido: false,
            correoValidoServer: true,
            fechaValida: false,
            mensajeError1: "Necesitas tener más de 4 caracteres y sin espacios",
            mensajeError2: "Se necesita entre 8-16 caracteres, mínimo un dígito, mayúscula y minúscula",
            mensajeError3: "Necesitas tener un patrón correcto (ej: usuario@gmail.com)",
            mensajeError4: "Se necesita una fecha válida y ser mayor de 13 años",
            mensajeError5: "La contraseña no coincide",
            mensajeError6: "El nombre de usuario ya existe",
            mensajeError7: "El email de usuario ya existe",
            hayErrores: false,
            inputType: "password",
            inputType2: "password",
            icon: "visibility",
            icon2: "visibility",
            checkEmailServer: false,
            checkUserServer: false,
            formData: {
                name: "",
                password: "",
                fecha_nacimiento: '',
                email: "",
                avatar: "https://images.pexels.com/photos/5609026/pexels-photo-5609026.jpeg?auto=compress&cs=tinysrgb&w=600"
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
        cambiarTextoPass2(e) {
            this.textPass2 = e.target.value
            if (this.expresionPass.test(this.textPass2)) {
                if (this.textPass == this.textPass2) {
                    this.passValido2 = true
                } else {
                    this.passValido2 = false
                }

            } else {
                this.passValido2 = false
            }
        },
        cambiarTextoCorreo(e) {
            this.textCorreo = e.target.value
            if (this.expresionCorreo.test(this.textCorreo)) {
                this.correoValido = true
            } else {
                this.correoValido = false
            }
        },
        cambiarTextoFecha(e) {
            this.textFecha = e.target.value
            if (this.textFecha) {
                let fecha = new Date();
                let anio = fecha.getFullYear()
                let fechaUser = this.textFecha.substr(0, 4)
                let edadUsuario = anio - fechaUser
                if (edadUsuario > 13 && edadUsuario <= 120) {
                    this.fechaValida = true
                } else {
                    this.fechaValida = false
                }

            } else {
                this.fechaValida = false
            }
        },
        check() {
            if (this.passValido && this.passValido2 && this.userValido && this.fechaValida && this.correoValido) {
                this.crearUsuario()
            }
        },
        registrar() {
            this.check()
            if (!this.passValido || !this.passValido || !this.userValido || !this.correoValido || !this.fechaValida) {
                this.hayErrores = true
            }
        },
        toggleVisibility() {
            this.inputType = this.inputType === "password" ? "text" : "password";
            this.icon = this.icon === "visibility" ? "visibility_off" : "visibility";
        },
        toggleVisibility2() {
            this.inputType2 = this.inputType2 === "password" ? "text" : "password";
            this.icon2 = this.icon2 === "visibility" ? "visibility_off" : "visibility";
        },
        async crearUsuario() {
            this.formData = {
                correo: this.textCorreo.trim(),
                nombre: this.textUser.trim(),
                clave: this.textPass.trim(),
                fechaNacimiento: this.textFecha,
                avatar: "https://images.pexels.com/photos/5609026/pexels-photo-5609026.jpeg?auto=compress&cs=tinysrgb&w=600"
            };
            try {
                const response = await fetch("http://127.0.0.1:8080/usuario/existeCorreo?correo=" + this.formData.correo)
                const data = await response.json()
                this.checkEmailServer = data
                const response2 = await fetch("http://127.0.0.1:8080/usuario/existeNombre?nombre=" + this.formData.nombre)
                const data2 = await response2.json()
                this.checkUserServer = data2
                if (!this.checkEmailServer && !this.checkUserServer) {
                    const encoder = new TextEncoder();
                    const data = encoder.encode(this.formData.clave);
                    const digest = await crypto.subtle.digest('SHA-1', data);
                    const hash = Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('');
                    this.formData.clave = hash
                    const responsePost = await axios.post("http://127.0.0.1:8080/usuario", this.formData);
                    this.$emit('check')
                    this.$emit('abrirIniciar')
                } else {
                    this.hayErrores = true
                    if (this.checkEmailServer) {
                        this.correoValidoServer = false
                    }
                    else {
                        this.correoValidoServer = true
                    }
                    if (this.checkUserServer) {
                        this.userValidoServer = false
                    }
                    else {
                        this.userValidoServer = true
                    }
                }

            } catch (error) {
                console.error(error);
            }
        }
    }
}
</script>
<template>
    <div>
        <div className="fondo" @click="$emit('cerrarTodo')"></div>
        <form className="registrar">
            <a href="#"><span className="material-symbols-outlined iniciar_sesion__cerrar"
                    @click="$emit('cerrarTodo')">close</span></a>
            <tittle className="registrar__titulo">Registrar</tittle>
            <section className="registrar__caja">
                <input v-on:input="cambiarTextoUsuario" className="registrar__caja__elemento" type="text"
                    placeholder="Usuario..." />
                <div v-if="!userValido && hayErrores" className="registrar__caja__informativo1--visible">{{
                    mensajeError1
                }}</div>
                <div v-else-if="!userValidoServer && hayErrores" className="registrar__caja__informativo1--visible">{{
                    mensajeError6
                }}</div>
                <input v-on:input="cambiarTextoCorreo" className="registrar__caja__elemento" type="email"
                    placeholder="Correo electrónico..." />
                <div v-if="!correoValido && hayErrores" className="registrar__caja__informativo1--visible">{{
                    mensajeError3
                }}</div>
                <div v-else-if="!correoValidoServer && hayErrores" className="registrar__caja__informativo1--visible">{{
                    mensajeError7
                }}</div>
                <input :type="inputType" @input="cambiarTextoPass" class="registrar__caja__elemento"
                    placeholder="Contraseña..." />
                <span class="material-symbols-outlined icon1" @click="toggleVisibility">{{ icon }}</span>
                <div v-if="!passValido && hayErrores" className="registrar__caja__informativo1--visible">{{
                    mensajeError2
                }}</div>
                <input :type="inputType2" @input="cambiarTextoPass2" className="registrar__caja__elemento"
                    placeholder="Repite la contraseña..." />
                <span class="material-symbols-outlined icon2" @click="toggleVisibility2">{{ icon2 }}</span>
                <div v-if="!passValido2 && hayErrores" className="registrar__caja__informativo1--visible">{{
                    mensajeError5
                }}</div>
                <input v-on:input="cambiarTextoFecha" className="registrar__caja__elemento" type="date" />
                <div v-if="!fechaValida && hayErrores" className="registrar__caja__informativo1--visible">{{
                    mensajeError4
                }}</div>
            </section>
            <section className="registrar__boton">
                <input type="submit" className="registrar__boton__opcion registrar__boton__opcion--registrar"
                    @click.prevent="registrar" value="Registrar" readonly />
                <div class="registrar__boton__condicion">o</div>
                <a className="registrar__boton__opcion registrar__boton__opcion--iniciar"
                    @click="$emit('abrirIniciarSinRegistrar')">Identíficate aquí</a>
            </section>
        </form>
    </div>
</template>