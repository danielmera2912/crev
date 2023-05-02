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
 * @vue-data {String} expresionDeporte - Expresión regular del deporte
 * @vue-data {Boolean} deporteValido - Deporte válido
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
    }
})
</script>
<script>
export default {
    data() {
        return {
            formData: {
                fecha: '',
                hora: '',
                ciudad: {
                    id: 0
                },
                deporte: {
                    id: 0
                },
                puntosLocal: "",
                puntosVisitante: "",
                estado: "FINALIZADO"
            },
            API_partido: "http://127.0.0.1:8080/evento",
            dataCiudad: '',
            textDeporte: '',
            resultadoLocal: 0,
            resultadoVisitante: 0,
            textCiudad: '',
            expresionDeporte: /^[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ0-9\s,]{3,}$/,
            deporteValido: false,
            ciudadValida: true,
            horaValida: true,
            mensajeError1: "Necesitas seleccionar un deporte",
            mensajeError2: "Se necesita seleccionar una ciudad",
            mensajeError3: "Se necesita insertar una hora",
            hayErrores: false,
            valorCiudad: '',
        }
    },
    methods: {
        async establecerCiudades() {
            const responseCiudad = await fetch("http://127.0.0.1:8080/ciudad")
            this.dataCiudad = await responseCiudad.json()
        },
        cambiarResultado1(e) {
            this.resultadoLocal = e.target.value
        },
        cambiarResultado2(e) {
            this.resultadoVisitante = e.target.value
        },
        check() {
            this.updatePartido()

        },
        ejecutarEvento() {
            this.check()
            this.$emit('realizarEvento')
        },
        async updatePartido() {
            
            const response = await fetch(this.API_partido + "/" + this.id)
            const data = await response.json()
            this.formData.puntosLocal = this.resultadoLocal
            this.formData.puntosVisitante = this.resultadoVisitante
            this.formData.hora = data.hora
            this.formData.fecha = data.fecha
            this.formData.deporte.id = data.deporte.id
            this.formData.ciudad.id = data.ciudad.id
            console.log(this.formData)
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
        <form className="anadir_resultado">
            <a href="#"><span className="material-symbols-outlined iniciar_sesion__cerrar"
                    @click="$emit('cerrarTodo')">close</span></a>
            <tittle className="anadir_resultado__titulo">Añadir resultado</tittle>
            <section className="anadir_resultado__caja">
                <div className="anadir_resultado__caja__grupo">
                    <label for="resultadoLocal" className="anadir_resultado__caja__etiqueta">Local</label>
                    <div className="anadir_resultado__caja__input">
                        <input v-on:input="cambiarResultado1" v-bind:value="resultadoLocal" id="resultadoLocal"
                            className="anadir_resultado__caja__elemento" type="number" placeholder="Resultado local"
                            required />
                    </div>
                </div>
                <div className="anadir_resultado__caja__grupo">
                    <label for="resultadoVisitante" className="anadir_resultado__caja__etiqueta">Visitante</label>
                    <div className="anadir_resultado__caja__input">
                        <input v-on:input="cambiarResultado2" v-bind:value="resultadoVisitante" id="resultadoVisitante"
                            className="anadir_resultado__caja__elemento anadir_resultado__caja__elemento--visitante"
                            type="number" placeholder="Resultado visitante" required />
                    </div>
                </div>
                <div v-if="!horaValida && hayErrores" className="anadir_resultado__caja__informativo1--visible">{{
                    mensajeError3
                }}</div>
            </section>
            <section className="crear_evento__boton">
                <input type="submit" className="crear_evento__boton__opcion crear_evento__boton__opcion--iniciar"
                    @click.prevent="updatePartido" value="Guardar" />
            </section>
        </form>
    </div>
</template>