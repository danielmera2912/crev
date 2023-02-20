<script setup>
/**
 * @file Crear_evento.vue - Componente crear evento de los partidos únicos
 * @author Daniel Mera Sachse
 */
/**
 * @vue-prop {String} idUsuario - Establece la id del usuario
 * @vue-data {String} textDeporte - Texto del deporte
 * @vue-data {String} textHora - Texto de la hora
 * @vue-data {String} textCiudad - Texto de la ciudad
 * @vue-data {String} textFecha - Texto de la fecha
 * @vue-data {String} expresionDeporte - Expresión regular del deporte
 * @vue-data {Boolean} deporteValido - Deporte válido
 * @vue-data {Boolean} fechaValida - Fecha válida
 * @vue-data {Boolean} ciudadValida - Ciudad válida
 * @vue-data {Boolean} horaValida -  Hora válida
 * @vue-data {String} mensajeError1 - Mensaje de error 1
 * @vue-data {String} mensajeError2 - Mensaje de error 2
 * @vue-data {String} mensajeError3 - Mensaje de error 3
 * @vue-data {String} mensajeError4 - Mensaje de error 4
 * @vue-data {Boolean} hayErrores - Errores
 * @vue-data {String} avatar - Avatar
 * @vue-data {String} jugador1N - Nombre del jugador1
 * @vue-data {String} idJugador1 - id del Jugador 1
 */
defineProps({

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
            textDeporte: '',
            textHora: '',
            textCiudad: '',
            textFecha: '',
            expresionDeporte: /^[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ0-9\s,]{3,}$/,
            deporteValido: false,
            fechaValida: false,
            ciudadValida: false,
            horaValida: false,
            mensajeError1: "Necesitas seleccionar un deporte",
            mensajeError2: "Se necesita escribir una ciudad",
            mensajeError3: "Se necesita insertar una hora",
            mensajeError4: "Se necesita una fecha válida",
            hayErrores: false,
            avatar: '',
            jugador1N: '',
            idJugador1: '',

        }
    },
    mounted() {
        this.llamarApiUsuario()
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
                let fechaActual = new Date()
                fechaActual.setHours(0, 0, 0, 0)
                let fechaUsuario = new Date(this.textFecha)
                if (fechaUsuario >= fechaActual) {
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
            if (this.textDeporte == "Baloncesto" || this.textDeporte == "Fútbol Sala") {
                this.$emit('updatePartido', {
                    deporte: this.textDeporte,
                    hora: this.textHora,
                    ciudad: this.textCiudad,
                    fecha: this.textFecha,
                    jugador1N: this.jugador1N,
                    idJugador1: this.idUsuario,
                    imagen_equipo1: "../src/assets/imagenes/ciervoverde.png",
                    imagen_equipo2: "../src/assets/imagenes/ballenazul.png",
                    equipo1: "Ciervo Verde",
                    equipo2: "Ballenas azules",
                })
            } else {
                this.$emit('updatePartido', {
                    deporte: this.textDeporte,
                    hora: this.textHora,
                    ciudad: this.textCiudad,
                    fecha: this.textFecha,
                    jugador1N: this.jugador1N,
                    idJugador1: this.idUsuario
                })
            }

            this.$emit('realizarEvento')
        },
        async llamarApiUsuario() {

            const responseUsuario = await fetch("https://crev-server.onrender.com/api/v1/users/" + this.idUsuario)
            const dataUsuario = await responseUsuario.json()
            this.resultsUsuario = dataUsuario
            this.jugador1N = this.resultsUsuario.name
            this.avatar = this.resultsUsuario.avatar

        }
    }
}
</script>
<template>
    <div>
        <div className="fondo" @click="$emit('cerrarTodo')"></div>
        <form className="crear_evento" @submit.prevent="ejecutarEvento">
            <a href="#"><span className="material-symbols-outlined iniciar_sesion__cerrar"
                    @click="$emit('cerrarTodo')">close</span></a>
            <tittle className="crear_evento__titulo">Crear evento</tittle>
            <section className="crear_evento__caja">
                <div class="crear_evento__caja__deporte">
                    <select @input="cambiarTextoDeporte" class="crear_evento__caja__deporte__elemento">
                        <option value="">Elige un deporte</option>
                        <option value="Fútbol Sala">Fútbol Sala</option>
                        <option value="Baloncesto">Baloncesto</option>
                        <option value="Tenis">Tenis</option>
                        <option value="Esgrima">Esgrima</option>
                        <option value="Padel">Padel</option>
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
                    value="Crear evento" />
            </section>
        </form>
    </div>
</template>