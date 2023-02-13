<script>
export default {
    data() {
        return {
            textDeporte: '',
            textHora: '',
            textCiudad: '',
            textFecha: '',
            expresionDeporte: /^[a-zA-ZÀ-ÿ\s,]{4,}$/,
            deporteValido: false,
            fechaValida: false,
            ciudadValida: false,
            horaValida: false,
            mensajeError1: "Necesitas seleccionar un deporte",
            mensajeError2: "Se necesita escribir una ciudad",
            mensajeError3: "Se necesita insertar una hora",
            mensajeError4: "Se necesita una fecha válida",
            hayErrores: false
        }
    },
    methods: {
        cambiarTextoDeporte(e) {
            this.textDeporte = e.target.value
            if (this.expresionDeporte.test(this.textDeporte)) {
                this.deporteValido = true
            } else {
                this.deporteValido = false
            }
        },
        cambiarTextoHora(e) {
            this.textHora = e.target.value
            if (this.textHora.length > 0) {
                this.horaValida = true
            } else {
                this.horaValida = false
            }
        },
        cambiarTextoCiudad(e) {
            this.textCiudad = e.target.value
            if (this.expresionDeporte.test(this.textCiudad)) {
                this.ciudadValida = true
            } else {
                this.ciudadValida = false
            }


        },
        cambiarTextoFecha(e) {
            this.textFecha = e.target.value
            if (this.textFecha) {
                let fecha = new Date();
                let anio = fecha.getFullYear()
                let fechaUser = this.textFecha.substr(0, 4)
                let tiempoRestante = anio - fechaUser
                if (tiempoRestante <= 0) {
                    this.fechaValida = true

                } else {
                    this.fechaValida = false
                }

            } else {
                this.fechaValida = false
            }
        },
        check() {
            if (this.ciudadValida && this.horaValida && this.deporteValido && this.fechaValida) {
                this.$emit('check')
                this.submitPartido()
            }
        },
        ejecutarEvento() {
            this.check()
            if (!this.ciudadValida || !this.horaValida || !this.deporteValido || !this.fechaValida) {
                this.hayErrores = true
            }
        },
        submitPartido() {
            this.$emit('updatePartido', {
                deporte: this.textDeporte,
                hora: this.textHora,
                ciudad: this.textCiudad,
                fecha: this.textFecha
            })
            this.$emit('realizarEvento')
        }
    }
}
</script>
<template>
    <div>
        <div className="fondo" @click="$emit('cerrarTodo')"></div>
        <form className="crear_evento">
            <a href="#"><span className="material-symbols-outlined iniciar_sesion__cerrar"
                    @click="$emit('cerrarTodo')">close</span></a>
            <tittle className="crear_evento__titulo">Crear evento</tittle>
            <section className="crear_evento__caja">
                <div class="crear_evento__caja__deporte">
                    <select v-on:input="cambiarTextoDeporte" class="crear_evento__caja__deporte__elemento">
                        <option value="">Elige un deporte</option>
                        <option value="futbol">Fútbol</option>
                        <option value="baloncesto">Baloncesto</option>
                    </select>
                </div>
                <div v-if="!deporteValido && hayErrores" className="crear_evento__caja__informativo1--visible">{{
                    mensajeError1
                }}</div>

                <input v-on:input="cambiarTextoCiudad" className="crear_evento__caja__elemento" type="text"
                    placeholder="Ciudad" />
                <div v-if="!ciudadValida && hayErrores" className="crear_evento__caja__informativo1--visible">{{
                    mensajeError2
                }}</div>
                <input v-on:input="cambiarTextoFecha" className="crear_evento__caja__elemento" type="date" />
                <div v-if="!fechaValida && hayErrores" className="crear_evento__caja__informativo1--visible">{{
                    mensajeError4
                }}</div>

                <input v-on:input="cambiarTextoHora" className="crear_evento__caja__elemento" type="time"
                    placeholder="Hora exacta" required />
                <div v-if="!horaValida && hayErrores" className="crear_evento__caja__informativo1--visible">{{
                    mensajeError3
                }}</div>
            </section>



            <section className="crear_evento__boton">
                <input type="submit" className="crear_evento__boton__opcion crear_evento__boton__opcion--iniciar"
                    @click.prevent="ejecutarEvento" value="Crear evento" />
            </section>
        </form>
    </div>

</template>