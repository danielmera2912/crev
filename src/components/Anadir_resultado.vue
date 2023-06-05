<script setup>
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.css'
/**
 * @file Añadir_resultado.vue - Componente para añadir un resultado
 * @module Añadir_resultado
 * @author Daniel Mera Sachse
 * @vue-prop {String} id - La ID del usuario
 * @vue-prop {Function} cambiosRealizados - Función para los cambios realizados
 * @example
 * // Uso del componente:
 * <Añadir_resultado :id="userId" :cambiosRealizados="handleChanges"></Añadir_resultado>
 */
 defineProps({
  /**
   * La ID del usuario.
   *
   * @type {String}
   * @required
   */
  id: {
    type: String,
    required: true,
  },
  /**
   * Función para los cambios realizados.
   *
   * @type {Function}
   * @required
   */
  cambiosRealizados: {
    type: Function,
    required: true,
  },
});

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
            resultadoLocal: 0,
            resultadoVisitante: 0,
            mensajeError1: "No se pueden introducir decimales ni negativos",
            hayErrores: false,
            resultadoLocalValido: false,
            resultadoVisitanteValido: false
        }
    },
    methods: {
        cambiarResultadoLocal(e) {
            this.resultadoLocal = parseInt(e.target.value, 10);
        },
        llamarCambiosRealizados(){
            this.$emit('cerrarTodo')
            this.cambiosRealizados();
        },
        cambiarResultadoVisitante(e) {
            this.resultadoVisitante = parseInt(e.target.value, 10);
        },

        check() {
            this.updatePartido()

        },
        ejecutarEvento() {
            this.check()
            this.$emit('realizarEvento')
        },
        async updatePartido() {
            if (this.resultadoLocal >= 0 && Number.isInteger(this.resultadoLocal)) {
                this.resultadoLocalValido = true;
            } else {
                this.resultadoLocalValido = false;
            }
            if (this.resultadoVisitante >= 0 && Number.isInteger(this.resultadoVisitante)) {
                this.resultadoVisitanteValido = true;
            } else {
                this.resultadoVisitanteValido = false;
            }

            if (!this.resultadoLocalValido || !this.resultadoVisitanteValido) {
                this.hayErrores = true;
            }
            else {
                const token = localStorage.getItem('tokenjwt');
                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                };
                this.hayErrores = false;
                const response = await fetch(this.API_partido + "/" + this.id)
                const data = await response.json()
                this.formData.puntosLocal = this.resultadoLocal
                this.formData.puntosVisitante = this.resultadoVisitante
                this.formData.hora = data.hora
                this.formData.fecha = data.fecha
                this.formData.deporte.id = data.deporte.id
                this.formData.ciudad.id = data.ciudad.id
                try {
                    const response = await axios.put("http://127.0.0.1:8080/evento/" + this.id, this.formData, config);
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Resultado añadido',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.llamarCambiosRealizados()
                } catch (error) {
                    console.error(error);
                }
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
                        <input v-on:input="cambiarResultadoLocal" v-bind:value="resultadoLocal" id="resultadoLocal"
                            className="anadir_resultado__caja__elemento" type="number" step="1"
                            placeholder="Resultado local" required />
                    </div>
                </div>
                <div className="anadir_resultado__caja__grupo">
                    <label for="resultadoVisitante" className="anadir_resultado__caja__etiqueta">Visitante</label>
                    <div className="anadir_resultado__caja__input">
                        <input v-on:input="cambiarResultadoVisitante" v-bind:value="resultadoVisitante"
                            id="resultadoVisitante" class="anadir_resultado__caja__elemento" type="number" step="1"
                            placeholder="Resultado visitante" required />
                    </div>
                </div>
                <div v-if="hayErrores" className="anadir_resultado__caja__informativo1--visible">{{
                    mensajeError1
                }}</div>
            </section>
            <section className="crear_evento__boton">
                <input type="submit" className="crear_evento__boton__opcion crear_evento__boton__opcion--iniciar"
                    @click.prevent="updatePartido" value="Guardar" />
            </section>
        </form>
    </div>
</template>