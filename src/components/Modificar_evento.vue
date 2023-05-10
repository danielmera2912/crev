<script setup>
import axios from 'axios';
/**
 * @file Modificar_evento.vue - Componente modificar evento de partido detalles
 * @author Daniel Mera Sachse
 */
/**
 * @vue-prop {String} id - Rescata la id del usuario
 * @vue-prop {String} ciudad - Rescata la ciudad
 * @vue-prop {String} deporte - Rescata el deporte
 * @vue-prop {String} fecha - Rescata la fecha
 * @vue-prop {String} hora - Rescata la hora
 * @vue-prop {String} jugador1 - Rescata el nombre del jugador
 * @vue-prop {String} jugador2 - Rescata el nombre del jugador
 * @vue-prop {String} jugador3 - Rescata el nombre del jugador
 * @vue-prop {String} jugador4 - Rescata el nombre del jugador
 * @vue-prop {String} jugador5 - Rescata el nombre del jugador
 * @vue-prop {String} jugador6 - Rescata el nombre del jugador
 * @vue-prop {String} jugador7 - Rescata el nombre del jugador
 * @vue-prop {String} jugador8 - Rescata el nombre del jugador
 * @vue-prop {String} jugador9 - Rescata el nombre del jugador
 * @vue-prop {String} jugador10 - Rescata el nombre del jugador
 * @vue-prop {String} imagen1 - Rescata el imagen del jugador
 * @vue-prop {String} imagen2 - Rescata el imagen del jugador
 * @vue-prop {String} imagen3 - Rescata el imagen del jugador
 * @vue-prop {String} imagen4 - Rescata el imagen del jugador
 * @vue-prop {String} imagen5 - Rescata el imagen del jugador
 * @vue-prop {String} imagen6 - Rescata el imagen del jugador
 * @vue-prop {String} imagen7 - Rescata el imagen del jugador
 * @vue-prop {String} imagen8 - Rescata el imagen del jugador
 * @vue-prop {String} imagen9 - Rescata el imagen del jugador
 * @vue-prop {String} imagen10 - Rescata el imagen del jugador
 * @vue-prop {String} idJugador1 - Rescata el id del jugador
 * @vue-prop {String} idJugador2 - Rescata el id del jugador
 * @vue-prop {String} idJugador3 - Rescata el id del jugador
 * @vue-prop {String} idJugador4 - Rescata el id del jugador
 * @vue-prop {String} idJugador5 - Rescata el id del jugador
 * @vue-prop {String} idJugador6 - Rescata el id del jugador
 * @vue-prop {String} idJugador7 - Rescata el id del jugador
 * @vue-prop {String} idJugador8 - Rescata el id del jugador
 * @vue-prop {String} idJugador9 - Rescata el id del jugador
 * @vue-prop {String} idJugador10 - Rescata el id del jugador
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
    id: {
        type: String,
        required: true
    },
    ciudad: {
        type: String,
        required: true
    },
    idCiudad: {
        type: String,
        required: true
    },
    deporte: {
        type: String,
        required: true
    },
    fecha: {
        type: String,
        required: true
    },
    hora: {
        type: String,
        required: true
    },
    jugador1: {
        type: String,
        required: true
    },
    jugador2: {
        type: String,
        required: true
    },
    jugador3: {
        type: String,
        required: false
    },
    jugador4: {
        type: String,
        required: false
    },
    jugador5: {
        type: String,
        required: false
    },
    jugador6: {
        type: String,
        required: false
    },
    jugador7: {
        type: String,
        required: false
    },
    jugador8: {
        type: String,
        required: false
    },
    jugador9: {
        type: String,
        required: false
    },
    jugador10: {
        type: String,
        required: false
    },
    imagen1: {
        type: String,
        required: true
    },
    imagen2: {
        type: String,
        required: true
    },
    imagen3: {
        type: String,
        required: false
    },
    imagen4: {
        type: String,
        required: false
    },
    imagen5: {
        type: String,
        required: false
    },
    imagen6: {
        type: String,
        required: false
    },
    imagen7: {
        type: String,
        required: false
    },
    imagen8: {
        type: String,
        required: false
    },
    imagen9: {
        type: String,
        required: false
    },
    imagen10: {
        type: String,
        required: false
    },
    equipo1: {
        type: String,
        required: false
    },
    equipo2: {
        type: String,
        required: false
    },
    idJugador1: {
        type: String,
        required: false
    },
    idJugador2: {
        type: String,
        required: false
    },
    idJugador3: {
        type: String,
        required: false
    },
    idJugador4: {
        type: String,
        required: false
    },
    idJugador5: {
        type: String,
        required: false
    },
    idJugador6: {
        type: String,
        required: false
    },
    idJugador7: {
        type: String,
        required: false
    },
    idJugador8: {
        type: String,
        required: false
    },
    idJugador9: {
        type: String,
        required: false
    },
    idJugador10: {
        type: String,
        required: false
    },
})
</script>
<script>
export default {
    data() {
        return {
            dataCiudad: '',
            textDeporte: '',
            textHora: '',
            textCiudad: '',
            textFecha: '',
            expresionDeporte: /^[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ0-9\s,]{3,}$/,
            deporteValido: false,
            fechaValida: true,
            ciudadValida: true,
            horaValida: true,
            mensajeError1: "Necesitas seleccionar un deporte",
            mensajeError2: "Se necesita seleccionar una ciudad",
            mensajeError3: "Se necesita insertar una hora",
            mensajeError4: "Se necesita una fecha válida",
            hayErrores: false,
            valorCiudad: '',
            formData: {
                fecha: '',
                hora: '',
                ciudad: {
                    id: 0
                },
                deporte: {
                    id: 0
                }
            },
        }
    },
    mounted() {
        this.textCiudad = this.idCiudad
        this.textFecha = this.fecha
        this.textHora = this.hora
        this.valorCiudad = this.ciudad
        this.establecerCiudades()
    },
    methods: {
        async establecerCiudades() {
            const responseCiudad = await fetch("http://127.0.0.1:8080/ciudad")
            this.dataCiudad = await responseCiudad.json()
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
            if (this.textCiudad!="") {
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
            if (this.ciudadValida && this.horaValida && this.fechaValida) {
                this.$emit('check')
                this.updatePartido()
            }
        },
        ejecutarEvento() {
            this.check()
            this.$emit('realizarEvento')
            if (!this.ciudadValida || !this.horaValida || !this.fechaValida) {
                this.hayErrores = true
            }
        },
        async updatePartido() {
            this.formData.fecha = this.textFecha
            this.formData.hora = this.textHora
            this.formData.ciudad.id = this.textCiudad
            try {
                const response = await axios.put("http://127.0.0.1:8080/evento/" + this.id, this.formData);
                window.location.reload()
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
        <form className="crear_evento">
            <a href="#"><span className="material-symbols-outlined iniciar_sesion__cerrar"
                    @click="$emit('cerrarTodo')">close</span></a>
            <tittle className="crear_evento__titulo">Modificar evento</tittle>
            <section className="crear_evento__caja">
                <!-- <input className="crear_evento__caja__elemento" type="text" placeholder="Ciudad" v-bind:value="textCiudad"
                        v-on:input="cambiarTextoCiudad" /> -->
                <div class="crear_evento__caja__deporte">
                    <select @input="cambiarTextoCiudad" class="crear_evento__caja__deporte__elemento">
                        <option value="">Elige una ciudad</option>
                        <option v-for="ciudad in dataCiudad" :value="ciudad.id" :selected="ciudad.id === idCiudad">{{ ciudad.nombre }}</option>
                    </select>
                </div>
                <div v-if="!ciudadValida && hayErrores" className="crear_evento__caja__informativo1--visible">{{
                    mensajeError2
                }}</div>
                <input v-on:input="cambiarTextoFecha" v-bind:value="textFecha" className="crear_evento__caja__elemento"
                    type="date" />
                <div v-if="!fechaValida && hayErrores" className="crear_evento__caja__informativo1--visible">{{
                    mensajeError4
                }}</div>

                <input v-on:input="cambiarTextoHora" v-bind:value="textHora" className="crear_evento__caja__elemento"
                    type="time" placeholder="Hora exacta" required />
                <div v-if="!horaValida && hayErrores" className="crear_evento__caja__informativo1--visible">{{
                    mensajeError3
                }}</div>
            </section>



            <section className="crear_evento__boton">
                <input type="submit" className="crear_evento__boton__opcion crear_evento__boton__opcion--iniciar"
                    @click.prevent="ejecutarEvento" value="Modificar" />
            </section>
        </form>
    </div>
</template>