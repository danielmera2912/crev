<script setup>
import axios from 'axios';
defineProps({
    id: {
        type: Number,
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
            expresionDeporte: /^[a-zA-ZÀ-ÿ\s,]{4,}$/,
            deporteValido: false,
            fechaValida: false,
            ciudadValida: false,
            horaValida: false,
            mensajeError1: "Necesitas seleccionar un deporte",
            mensajeError2: "Se necesita escribir una ciudad",
            mensajeError3: "Se necesita insertar una hora",
            mensajeError4: "Se necesita una fecha válida",
            hayErrores: false,
            formData: {
                id: this.id,
                deporte: this.deporte,
                jugador1: 'ejemplo1',
                jugador2: 'ejemplo2',
                ciudad: '',
                fecha: '',
                hora: ''
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
            this.formData.ciudad = this.textCiudad
            this.formData.fecha = this.textFecha
            this.formData.hora = this.textHora
            try {
                const response = await axios.put("http://127.0.0.1:3001/api/v1/partidos/" + this.id, this.formData);
                console.log(response.data);
                this.$router.push('/');
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