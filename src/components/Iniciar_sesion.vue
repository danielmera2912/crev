<script>

export default {
    data() {
        return {
            textUser: '',
            textPass: '',
            expresionUsuario: /^[a-zA-Z]((\.|_|-)?[a-zA-Z0-9]+){3}$/,
            expresionPass: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
            userValido: false,
            passValido: false,
            mensajeError1: "Usuario incorrecto",
            mensajeError2: "Contraseña incorrecta",
            hayErrores: false,
            inputType: "password",
            icon: "visibility"

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
                this.$emit('check')
            }
        },
        iniciar() {
            this.check()
            this.$emit('iniciarSesion')
            if (!this.passValido || !this.userValido) {
                this.hayErrores = true
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

        <form className="iniciar_sesion__caja">
            <input @input="cambiarTextoUsuario" className="iniciar_sesion__caja__elemento" type="text"
                placeholder="Usuario..." />
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
            <label className="iniciar_sesion__caja__recordar"><input type="checkbox" id="check" value="check" />
                Recordar Cuenta</label>
            <section className="iniciar_sesion__boton">
                <input type="submit" className="iniciar_sesion__boton__opcion iniciar_sesion__boton__opcion--entrar"
                    @click.prevent="iniciar" value="Entrar" />
                <p>o</p>
                <a className="iniciar_sesion__boton__opcion iniciar_sesion__boton__opcion--registrar"
                    @click="$emit('abrirRegistrar')">Regístrate</a>
            </section>
        </form>

    </div>


</template>