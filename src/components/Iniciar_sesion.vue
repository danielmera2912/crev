<script>
import axios from 'axios';
export default {
    data() {
        return {
            textUser: '',
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
                password: "",
                email: ""
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
            console.log("primer control")
            console.log(id)
            this.$emit('recibirIdUsuario', id)
        },
        trasIniciar() {
            //this.$emit('check')
            this.$router.push('/perfil')
            this.$emit('cerrarTodo')
            this.$emit('iniciarSesion')
        },
        async lanzarIniciarSesion() {
            this.formData = {
                email: this.textUser,
                password: this.textPass
            };
            const encoder = new TextEncoder();
            const data = encoder.encode(this.formData.password);
            const digest = await crypto.subtle.digest('SHA-1', data);
            const hash = Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('');
            this.formData.password = hash
            try {
                const response2 = await axios.post("http://127.0.0.1:3001/api/v1/autorizacion", this.formData, {
                    withCredentials: true
                });
                console.log(response2);
                this.errorIniciar = false;
                console.log(response2.data);
                console.log("logueo correcto");
                const responseUsuario = await fetch("http://127.0.0.1:3001/api/v1/users/emailBuscar/" + this.formData.email)
                const dataUsuario = await responseUsuario.json()
                this.resultsUsuario = dataUsuario[0].id
                this.recibirIdUsuario(this.resultsUsuario)
                this.trasIniciar()

            } catch (error) {
                console.error(error)
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
            <label className="iniciar_sesion__caja__recordar"><input type="checkbox" id="check" value="check" />
                Recordar Cuenta</label>
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