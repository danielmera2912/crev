<script setup>
/**
 * @file Crear_evento.vue - Componente crear evento de los partidos únicos
 * @module CrearEvento
 * @vue-prop {String} idUsuario - Establece la ID del usuario
 * @vue-data {String} textDeporte - Texto del deporte
 * @vue-data {String} textHora - Texto de la hora
 * @vue-data {String} textCiudad - Texto de la ciudad
 * @vue-data {String} textFecha - Texto de la fecha
 * @vue-data {RegExp} expresionDeporte - Expresión regular para validar el deporte
 * @vue-data {Boolean} deporteValido - Indica si el deporte es válido
 * @vue-data {Boolean} fechaValida - Indica si la fecha es válida
 * @vue-data {Boolean} ciudadValida - Indica si la ciudad es válida
 * @vue-data {Boolean} horaValida - Indica si la hora es válida
 * @vue-data {String} mensajeError1 - Mensaje de error para el deporte
 * @vue-data {String} mensajeError2 - Mensaje de error para la ciudad
 * @vue-data {String} mensajeError3 - Mensaje de error para la hora
 * @vue-data {String} mensajeError4 - Mensaje de error para la fecha
 * @vue-data {Boolean} hayErrores - Indica si hay errores
 * @vue-data {String} avatar - Avatar
 * @vue-data {String} jugador1N - Nombre del jugador 1
 * @vue-data {String} idJugador1 - ID del jugador 1
 * @vue-data {String} dataDeporte - Datos del deporte
 * @vue-data {String} dataCiudad - Datos de la ciudad
 * @vue-data {Boolean} deporteEquipo - Indica si el deporte es para equipo
 */
defineProps({
    /**
  * Establece la ID del usuario.
  *
  * @type {String}
  * @required
  */
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
            /**
          * Texto del deporte.
          *
          * @type {String}
          */
            textDeporte: 0,
            /**
             * Texto de la hora.
             *
             * @type {String}
             */
            textHora: '',
            /**
             * Texto de la ciudad.
             *
             * @type {String}
             */
            textCiudad: '',
            /**
             * Texto de la fecha.
             *
             * @type {String}
             */
            textFecha: '',
            /**
             * Expresión regular para validar el deporte.
             *
             * @type {RegExp}
             */
            expresionDeporte: /^[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ0-9\s,]{3,}$/,
            /**
             * Indica si el deporte es válido.
             *
             * @type {Boolean}
             */
            deporteValido: false,
            /**
             * Indica si la fecha es válida.
             *
             * @type {Boolean}
             */
            fechaValida: false,
            /**
             * Indica si la ciudad es válida.
             *
             * @type {Boolean}
             */
            ciudadValida: false,
            /**
             * Indica si la hora es válida.
             *
             * @type {Boolean}
             */
            horaValida: false,
            /**
             * Mensaje de error para el deporte.
             *
             * @type {String}
             */
            mensajeError1: "Necesitas seleccionar un deporte",
            /**
             * Mensaje de error para la ciudad.
             *
             * @type {String}
             */
            mensajeError2: "Se necesita escribir una ciudad",
            /**
             * Mensaje de error para la hora.
             *
             * @type {String}
             */
            mensajeError3: "Se necesita insertar una hora",
            /**
             * Mensaje de error para la fecha.
             *
             * @type {String}
             */
            mensajeError4: "Se necesita una fecha válida",
            /**
             * Indica si hay errores.
             *
             * @type {Boolean}
             */
            hayErrores: false,
            /**
             * Avatar.
             *
             * @type {String}
             */
            avatar: '',
            /**
             * Nombre del jugador 1.
             *
             * @type {String}
             */
            jugador1N: '',
            /**
             * ID del jugador 1.
             *
             * @type {String}
             */
            idJugador1: '',
            /**
             * Datos del deporte.
             *
             * @type {String}
             */
            dataDeporte: '',
            /**
             * Datos de la ciudad.
             *
             * @type {String}
             */
            dataCiudad: '',
            /**
             * Indica si el deporte es para equipo.
             *
             * @type {Boolean}
             */
            deporteEquipo: false,
            API_ciudad: "http://127.0.0.1:8080/ciudad",
            API_deporte: "http://127.0.0.1:8080/deporte"
        }
    },
    mounted() {
        this.llamarApiUsuario()
    },
    methods: {
        cambiarTextoDeporte(e) {
            this.textDeporte = e.target.value
            if (this.textDeporte != "") {
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
            if (this.textCiudad != "") {
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
                let fechaLimite = new Date()
                fechaLimite.setFullYear(fechaLimite.getFullYear() + 100)
                if (fechaUsuario >= fechaActual && fechaUsuario <= fechaLimite) {
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


            for (var i = 0; i < this.dataDeporte.length; i++) {
                if (this.dataDeporte[i].id == this.textDeporte) {
                    if (this.dataDeporte[i].equipos == true)
                        this.deporteEquipo = true;
                }
            }

            this.$emit('updatePartido', {
                hora: this.textHora,
                fecha: this.textFecha,
                deporte: this.textDeporte,
                ciudad: this.textCiudad,
                deporteEquipo: this.deporteEquipo

            })
            this.$emit('realizarEvento')
        },
        async llamarApiUsuario() {

            const responseDeporte = await fetch(this.API_deporte)
            this.dataDeporte = await responseDeporte.json()

            const responseCiudad = await fetch(this.API_ciudad)
            this.dataCiudad = await responseCiudad.json()
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
                        <option v-for="deporte in dataDeporte" :value="deporte.id">{{ deporte.nombre }}</option>
                    </select>
                </div>
                <div v-if="!deporteValido && hayErrores" className="crear_evento__caja__informativo1--visible">{{
                    mensajeError1
                }}</div>

                <div class="crear_evento__caja__deporte">
                    <select @input="cambiarTextoCiudad" class="crear_evento__caja__deporte__elemento">
                        <option value="">Elige una provincia</option>
                        <option v-for="ciudad in dataCiudad" :value="ciudad.id">{{ ciudad.nombre }}</option>
                    </select>
                </div>
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