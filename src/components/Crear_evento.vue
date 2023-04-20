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
            textDeporte: 0,
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
            dataDeporte: '',
            dataCiudad: '',
            deporteEquipo: false,
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

            // const responseUsuario = await fetch("http://127.0.0.1:3001/api/v1/users/" + this.idUsuario)
            // const dataUsuario = await responseUsuario.json()
            // this.resultsUsuario = dataUsuario
            // this.jugador1N = this.resultsUsuario.name
            // this.avatar = this.resultsUsuario.avatar

            const responseDeporte = await fetch("http://127.0.0.1:8080/deporte")
            this.dataDeporte = await responseDeporte.json()

            const responseCiudad = await fetch("http://127.0.0.1:8080/ciudad")
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
                        <option value="">Elige una ciudad</option>
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