<script setup>
import axios from 'axios';
/**
 * @file Modificar_cuenta.vue - Componente para modificar cuenta
 * @author Daniel Mera Sachse
 */
/**
 * @vue-prop {String} nombre - Rescata el texto del nombre
 * @vue-prop {String} correo - Rescata el texto del correo
 * @vue-prop {String} fecha_nacimiento - Rescata el texto del fecha_nacimiento
 * @vue-prop {String} avatar - Rescata el texto del avatar
 * @vue-prop {String} search - Rescata el texto del search
 * @vue-data {String} idUsuario - Texto del nombre del Usuario
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
    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    fecha_nacimiento: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
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
            textPass: "",
            textCorreo: this.correo,
            textFecha: this.fecha_nacimiento,
            expresionUsuario: /^[a-zA-Z]((\.|_|-)?[a-zA-Z0-9]+){3}$/,
            expresionPass: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
            expresionCorreo: /^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}$/,
            passValido: false,
            correoValido: true,
            fechaValida: true,
            mensajeError1: "Necesitas tener más de 4 caracteres y sin espacios",
            mensajeError2: "Se necesita entre 8-16 caracteres, mínimo un dígito, mayúscula y minúscula",
            mensajeError3: "Necesitas tener un patrón correcto (ej: usuario@gmail.com)",
            mensajeError4: "Se necesita una fecha válida y ser mayor de 13 años",
            hayErrores: false,
            inputType: "password",
            icon: "visibility",
            formData: {
                id: '',
                name: '',
                password: "",
                fecha_nacimiento: '',
                email: "",
                avatar: '',
            }
        }
    },
    methods: {
        cambiarTextoPass(e) {
            this.textPass = e.target.value
            if (this.expresionPass.test(this.textPass)) {
                this.passValido = true
            } else {
                this.passValido = false
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
            if (this.passValido && this.fechaValida && this.correoValido) {
                this.$emit('check')
                this.lanzar_modificar_cuenta()
            }
        },
        modificar() {
            this.check()
            this.$emit('modificar')
            if (!this.passValido || !this.correoValido || !this.fechaValida) {
                this.hayErrores = true
            }
        },
        async lanzar_modificar_cuenta() {
            this.formData = {
                name: this.nombre,
                password: this.textPass,
                email: this.correo,
                fecha_nacimiento: this.textFecha,
                avatar: this.avatar,
                id: this.idUsuario

            };
            const encoder = new TextEncoder();
            const data = encoder.encode(this.formData.password);
            const digest = await crypto.subtle.digest('SHA-1', data);
            const hash = Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('');
            this.formData.password = hash
            try {
                const response = await axios.put("http://127.0.0.1:3001/api/v1/autorizacion/users/" + this.formData.id, this.formData, {
                    withCredentials: true
                });
                window.location.reload()
            } catch (error) {
                console.error(error);
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
    <div>
        <div className="fondo" @click="$emit('cerrar')"></div>
        <form className="modificar" @submit.prevent="modificar">
            <a href="#"><span className="material-symbols-outlined iniciar_sesion__cerrar"
                    @click="$emit('cerrar')">close</span></a>
            <tittle className="modificar__titulo">Modificar</tittle>
            <section className="modificar__caja">
                <div className="modificar__avatar">
                    <img className="modificar__avatar__imagen" v-bind:src="avatar" />
                    <!-- <input class="modificar__avatar__file" type="file" id="avatar" name="avatar"
                                accept="image/png, image/jpeg"> -->
                </div>

                <input :type="inputType" @input="cambiarTextoPass" class="modificar__caja__elemento"
                    placeholder="Contraseña..." :value="textPass" />
                <span class="material-symbols-outlined" @click="toggleVisibility">{{ icon }}</span>
                <div v-if="!passValido && hayErrores" className="modificar__caja__informativo1--visible">{{
                    mensajeError2
                }}</div>

                <input v-on:input="cambiarTextoFecha" className="modificar__caja__elemento" type="date"
                    :value="textFecha" />
                <div v-if="!fechaValida && hayErrores" className="modificar__caja__informativo1--visible">{{
                    mensajeError4
                }}</div>
            </section>
            <section className="modificar__boton">
                <input type="submit" className="modificar__boton__opcion modificar__boton__opcion--modificar"
                    value="Modificar" readonly />

            </section>
        </form>
    </div>
</template>