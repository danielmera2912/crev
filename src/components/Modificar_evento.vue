<script setup>
import axios from 'axios';
defineProps({
    id: {
        type: String,
        required: true
    },
    ciudad: {
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
            mensajeError2: "Se necesita escribir una ciudad",
            mensajeError3: "Se necesita insertar una hora",
            mensajeError4: "Se necesita una fecha válida",
            hayErrores: false,
            formData: {
                id: this.id,
                idJugador1: '',
                idJugador2: '',
                idJugador3: null,
                idJugador4: null,
                idJugador5: null,
                idJugador6: null,
                idJugador7: null,
                idJugador8: null,
                idJugador9: null,
                idJugador10: null,
                deporte: this.deporte,
                equipo1: this.equipo1,
                equipo2: this.equipo2,
                imagen1: this.imagen1,
                imagen2: this.imagen2,
                imagen3: this.imagen3,
                imagen4: this.imagen4,
                imagen5: this.imagen5,
                imagen6: this.imagen6,
                imagen7: this.imagen7,
                imagen8: this.imagen8,
                imagen9: this.imagen9,
                imagen10: this.imagen10,
                jugador1: this.jugador1,
                jugador2: this.jugador2,
                jugador3: this.jugador3,
                jugador4: this.jugador4,
                jugador5: this.jugador5,
                jugador6: this.jugador6,
                jugador7: this.jugador7,
                jugador8: this.jugador8,
                jugador9: this.jugador9,
                jugador10: this.jugador10,
                ciudad: '',
                fecha: '',
                hora: '',
                equipo1: this.equipo1,
                equipo2: this.equipo2
            },
        }
    },
    mounted() {
        this.textCiudad = this.ciudad
        this.textFecha = this.fecha
        this.textHora = this.hora
    },
    methods: {
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
            this.formData.idJugador1=this.idJugador1
            this.formData.idJugador2=this.idJugador2
            this.formData.idJugador3=this.idJugador3
            this.formData.idJugador4=this.idJugador4
            this.formData.idJugador5=this.idJugador5
            this.formData.idJugador6=this.idJugador6
            this.formData.idJugador7=this.idJugador7
            this.formData.idJugador8=this.idJugador8
            this.formData.idJugador9=this.idJugador9
            this.formData.idJugador10=this.idJugador10
            this.formData.ciudad = this.textCiudad
            this.formData.fecha = this.textFecha
            this.formData.hora = this.textHora
            try {
                const response = await axios.put("https://crev-server.onrender.com/api/v1/autorizacion/partidos/" + this.id, this.formData, {
                    withCredentials: true
                });
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
                <input className="crear_evento__caja__elemento" type="text" placeholder="Ciudad"
                    v-bind:value="textCiudad" v-on:input="cambiarTextoCiudad" />
                <div v-if="!ciudadValida && hayErrores" className="crear_evento__caja__informativo1--visible">{{
                    mensajeError2
                }}</div>
                <input v-on:input="cambiarTextoFecha" v-bind:value="textFecha" className="crear_evento__caja__elemento" type="date" />
                <div v-if="!fechaValida && hayErrores" className="crear_evento__caja__informativo1--visible">{{
                    mensajeError4
                }}</div>

                <input v-on:input="cambiarTextoHora" v-bind:value="textHora" className="crear_evento__caja__elemento" type="time"
                    placeholder="Hora exacta" required />
                <div v-if="!horaValida && hayErrores" className="crear_evento__caja__informativo1--visible">{{
                    mensajeError3
                }}</div>
            </section>



            <section className="crear_evento__boton">
                <input type="submit" className="crear_evento__boton__opcion crear_evento__boton__opcion--iniciar"
                    @click.prevent="ejecutarEvento" value="Modificar evento" />
            </section>
        </form>
    </div>

</template>