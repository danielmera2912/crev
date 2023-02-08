<script>

export default {
    data() {
        return {
            textUser: '',
            textPass: '',
            textCorreo: '',
            textFecha: '',
            expresionUsuario: /^[a-zA-Z]((\.|_|-)?[a-zA-Z0-9]+){3}$/,
            expresionPass: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
            expresionCorreo: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
            userValido: false,
            passValido: false,
            correoValido: false,
            fechaValida: false,
            mensajeError1: "Usuario incorrecto, necesitas tener al menos 4 caracteres",
            mensajeError2: "Contraseña incorrecta, necesitas tener entre 8 a 16 caracteres, al menos un dígito, mayúscula y minúscula",
            mensajeError3: "Correo electronico incorrecto, necesitas tener un patrón correcto, como: usuario@gmail.com",
            mensajeError4: "Fecha incorrecta, comprueba que hayas puesto una fecha de nacimiento válida y además, ser mayor de 13 años",
            hayErrores : false
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
            if(this.passValido && this.userValido && this.fechaValida && this.correoValido){
                this.$emit('check')
            }
        },
        registrar() {
            this.check()
            this.$emit('abrirIniciar')
            if(!this.passValido || !this.userValido || !this.correoValido || !this.fechaValida){
                this.hayErrores = true
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
                <div v-if="!userValido && hayErrores" className="registrar__caja__informativo1--visible">{{ mensajeError1 }}</div>
                <input v-on:input="cambiarTextoUsuario" className="registrar__caja__elemento" type="text"
                    placeholder="Usuario..." />
                <div v-if="!correoValido && hayErrores" className="registrar__caja__informativo1--visible">{{ mensajeError3 }}</div>
                <input v-on:input="cambiarTextoCorreo" className="registrar__caja__elemento" type="email"
                    placeholder="Correo electrónico..." />
                <div v-if="!passValido && hayErrores" className="registrar__caja__informativo1--visible">{{ mensajeError2 }}</div>
                <input v-on:input="cambiarTextoPass" className="registrar__caja__elemento" type="password"
                    placeholder="Contraseña..." />
                <div v-if="!fechaValida && hayErrores" className="registrar__caja__informativo1--visible">{{ mensajeError4 }}</div>
                <input v-on:input="cambiarTextoFecha" className="registrar__caja__elemento" type="date" />
            </section>
            <section className="registrar__boton">
                <input type="text" className="registrar__boton__opcion registrar__boton__opcion--registrar"
                    @click="registrar" value="Registrar" readonly/>
                <p>o</p>
                <a className="registrar__boton__opcion registrar__boton__opcion--iniciar"
                    @click="$emit('abrirIniciar')">Identíficate aquí</a>
            </section>
        </form>
    </div>

</template>