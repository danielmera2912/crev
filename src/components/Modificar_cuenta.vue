<script>

export default {
    data() {
        return {
            textPass: '',
            textCorreo: '',
            textFecha: '',
            expresionUsuario: /^[a-zA-Z]((\.|_|-)?[a-zA-Z0-9]+){3}$/,
            expresionPass: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
            expresionCorreo: /^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}$/,
            passValido: false,
            correoValido: false,
            fechaValida: false,
            mensajeError1: "Necesitas tener al menos 4 caracteres",
            mensajeError2: "Se necesita entre 8-16 caracteres, mínimo un dígito, mayúscula y minúscula",
            mensajeError3: "Necesitas tener un patrón correcto (ej: usuario@gmail.com)",
            mensajeError4: "Se necesita una fecha válida y ser mayor de 13 años",
            hayErrores: false,
            inputType: "password",
            icon: "visibility"
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
                console.log("hola?")
                this.$emit('check')
            }
        },
        modificar() {
            this.check()
            this.$emit('modificar')
            if (!this.passValido || !this.correoValido || !this.fechaValida) {
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
    <div>
        <div className="fondo" @click="$emit('cerrar')"></div>
        <form className="modificar">
            <a href="#"><span className="material-symbols-outlined iniciar_sesion__cerrar"
                    @click="$emit('cerrar')">close</span></a>
            <tittle className="modificar__titulo">Modificar</tittle>
            <section className="modificar__caja">
                <div className="modificar__avatar">
                    <img className="modificar__avatar__imagen"
                        src="https://cdn.resfu.com/img_data/players/medium/64734.jpg?size=120x&lossy=1" />
                    <input class="modificar__avatar__file" type="file" id="avatar" name="avatar"
                        accept="image/png, image/jpeg">
                </div>


                <input v-on:input="cambiarTextoCorreo" className="modificar__caja__elemento" type="email"
                    placeholder="Nuevo correo electrónico..." :value="textCorreo" />
                <div v-if="!correoValido && hayErrores" className="modificar__caja__informativo1--visible">{{
                    mensajeError3
                }}</div>
                <input :type="inputType" @input="cambiarTextoPass" class="modificar__caja__elemento"
                    placeholder="Nueva contraseña..." :value="textPass"/>
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
                    @click.prevent="modificar" value="Modificar" readonly />

            </section>
        </form>
    </div>

</template>