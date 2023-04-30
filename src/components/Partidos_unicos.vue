<script setup>
import Partido from './Partido.vue'
import Crear_evento from './Crear_evento.vue'
import Buscador from '../components/Buscador.vue'
import axios from 'axios';
/**
 * @file Partidos_unicos.vue - Componente de los partidos únicos
 * @author Daniel Mera Sachse
 */
/**
 * @vue-prop {String} idUsuario - Rescata la id del usuario
 * @vue-prop {String} search - Rescata el buscador del usuario
 * @vue-prop {String} results - Rescata los resultados de la API
 * @vue-data {String} idJugador1 - Establece la id del usuario
 * @vue-data {String} idJugador2 - Establece la id del usuario
 * @vue-data {String} idJugador3 - Establece la id del usuario
 * @vue-data {String} idJugador4 - Establece la id del usuario
 * @vue-data {String} idJugador5 - Establece la id del usuario
 * @vue-data {String} idJugador6 - Establece la id del usuario
 * @vue-data {String} idJugador7 - Establece la id del usuario
 * @vue-data {String} idJugador8 - Establece la id del usuario
 * @vue-data {String} idJugador9 - Establece la id del usuario
 * @vue-data {String} idJugador10 - Establece la id del usuario
 * @vue-data {String} deporte - Texto del deporte
 * @vue-data {String} hora - Texto de la hora
 * @vue-data {String} ciudad - Texto de la ciudad
 * @vue-data {String} fecha - Texto de la fecha
 * @vue-data {String} imagen1 - imagen1
 * @vue-data {String} jugador1 - Nombre del jugador
 * @vue-data {String} jugador2 - Nombre del jugador
 * @vue-data {String} jugador3 - Nombre del jugador
 * @vue-data {String} jugador4 - Nombre del jugador
 * @vue-data {String} jugador5 - Nombre del jugador
 * @vue-data {String} jugador6- Nombre del jugador
 * @vue-data {String} jugador7 - Nombre del jugador
 * @vue-data {String} jugador8 - Nombre del jugador
 * @vue-data {String} jugador9 - Nombre del jugador
 * @vue-data {String} jugador10 - Nombre del jugador
 * @vue-data {String} imagen1 - Imagen del jugador
 * @vue-data {String} imagen2 - Imagen del jugador
 * @vue-data {String} imagen3 - Imagen del jugador
 * @vue-data {String} imagen4 - Imagen del jugador
 * @vue-data {String} imagen5 - Imagen del jugador
 * @vue-data {String} imagen6 - Imagen del jugador
 * @vue-data {String} imagen7 - Imagen del jugador
 * @vue-data {String} imagen8 - Imagen del jugador
 * @vue-data {String} imagen9 - Imagen del jugador
 * @vue-data {String} imagen10 - Imagen del jugador
 * @vue-data {Boolean} permisos - Permisos de edición y borrado
 * @vue-data {Boolean} permisoParticipar - Permisos de participaje
 * @vue-data {String} API_partido - Texto de la API
 */
defineProps({
  results: {
    type: Object,
    required: true
  },
  search: {
    type: String,
    required: true
  },
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
      mensajeNoContentido: "No hay contenido",
      searchTexto: '',
      formData: {

        fecha: "",
        hora: "",

        deporte: {
          id: 0
          // id: this.deporteId
        },
        ciudad: {
          id: 0
          //id: this.ciudadId
        }
        // deporte: "",
        // jugador1: "",
        // jugador2: 'ejemplo2',
        // jugador3: null,
        // jugador4: null,
        // jugador5: null,
        // jugador6: null,
        // jugador7: null,
        // jugador8: null,
        // jugador9: null,
        // jugador10: null,
        // ciudad: "",
        // imagen1: "",
        // imagen2: "",
        // imagen3: null,
        // imagen4: null,
        // imagen5: null,
        // imagen6: null,
        // imagen7: null,
        // imagen8: null,
        // imagen9: null,
        // imagen10: null,
        // idJugador1: "",
        // equipo1: null,
        // equipo2: null,
        // imagen_equipo1: null,
        // imagen_equipo2: null
      },
      formDataJugador1: {
        usuario: {
          id: this.idUsuario
        },
        evento: {
          id: 0
        }
      },
      formDataJugador2: {
        usuario: {
          id: 0
        },
        evento: {
          id: 0
        }
      },
      formDataEquipo1: {
        nombre: "Ciervo Verde",
        escudo: "https://i.ibb.co/fYRFPbh/ciervoverde.png",
        evento: {
          id: 0
        }
      },
      formDataEquipo2: {
        nombre: "Ballena Azul",
        escudo: "https://i.ibb.co/k9LNHCX/ballenazul.png",
        evento: {
          id: 0
        }
      },
      inscripcionJ1: {
        usuario: {
          id: 0
        },
        equipo: {
          id: 0
        }
      },
      inscripcionJ2: {
        usuario: {
          id: 0
        },
        equipo: {
          id: 0
        }
      },
      inscripcionJ3: {
        usuario: {
          id: 0
        },
        equipo: {
          id: 0
        }
      },
      inscripcionJ4: {
        usuario: {
          id: 0
        },
        equipo: {
          id: 0
        }
      },
      inscripcionJ5: {
        usuario: {
          id: 0
        },
        equipo: {
          id: 0
        }
      },
      inscripcionJ6: {
        usuario: {
          id: 0
        },
        equipo: {
          id: 0
        }
      },
      inscripcionJ7: {
        usuario: {
          id: 0
        },
        equipo: {
          id: 0
        }
      },
      inscripcionJ8: {
        usuario: {
          id: 0
        },
        equipo: {
          id: 0
        }
      },
      inscripcionJ9: {
        usuario: {
          id: 0
        },
        equipo: {
          id: 0
        }
      },
      inscripcionJ10: {
        usuario: {
          id: 0
        },
        equipo: {
          id: 0
        }
      },
      id: 1,
      crearEvento: false,
      checkForm: false,
      equipoImagen1: "https://i.ibb.co/fYRFPbh/ciervoverde.png",
      equipoImagen2: "https://i.ibb.co/k9LNHCX/ballenazul.png",
      equipoNombre1: "Ciervo Verde",
      equipoNombre2: "Ballena Azul",
      resultsCiudad: "",
      resultsDeporte: "",
      resultsFiltro: "",
      filtroSeleccionado: "todos",
      dataDeporte: "",
      deporteEquipo: false,
      response: "",
    };
  },
  mounted() {
    this.conseguirDeportes();
  },
  methods: {
    async conseguirDeportes() {
      const responseDeporte = await fetch("http://127.0.0.1:8080/deporte")
      this.dataDeporte = await responseDeporte.json()
    },
    recibirValores() {
      this.$emit('recibirValores')
    },
    enviarValores(id) {
      this.$emit('enviarValores', id)
    },
    toggleCrearEvento() {
      this.crearEvento = !this.crearEvento
    },
    async realizarEvento() {
      if (this.checkForm) {
        this.crearEvento = false;
        this.checkForm = false;
        try {
          this.response = await axios.post("http://127.0.0.1:8080/evento", this.formData);
          this.formDataJugador1.evento.id = this.response.data.id;
          this.formDataJugador2.evento.id = this.response.data.id;
          const response2 = await axios.post("http://127.0.0.1:8080/usuario_evento", this.formDataJugador1);
          const response3 = await axios.post("http://127.0.0.1:8080/usuario_evento", this.formDataJugador2);
          if (this.deporteEquipo) {
            this.inscribirEquipos();
          }
          else {
            await this.$router.push('/partido_detalles/' + this.response.data.id);
            window.location.reload()
          }

        } catch (error) {
          console.error(error);
        }
      }

    },
    async inscribirEquipos() {
      this.formDataEquipo1.evento.id = this.response.data.id;
      this.formDataEquipo2.evento.id = this.response.data.id;
      const response4 = await axios.post("http://127.0.0.1:8080/equipo", this.formDataEquipo1);

      const response5 = await axios.post("http://127.0.0.1:8080/equipo", this.formDataEquipo2);
      this.inscripcionJ1.usuario.id = this.idUsuario;
      this.inscripcionJ1.equipo.id = response4.data.id;
      this.inscripcionJ2.equipo.id = response5.data.id;
      this.inscripcionJ3.equipo.id = response4.data.id;
      this.inscripcionJ4.equipo.id = response5.data.id;
      this.inscripcionJ5.equipo.id = response4.data.id;
      this.inscripcionJ6.equipo.id = response5.data.id;
      this.inscripcionJ7.equipo.id = response4.data.id;
      this.inscripcionJ8.equipo.id = response5.data.id;
      this.inscripcionJ9.equipo.id = response4.data.id;
      this.inscripcionJ10.equipo.id = response5.data.id;
      const responseI1 = await axios.post("http://127.0.0.1:8080/usuario_equipo", this.inscripcionJ1);
      const responseI2 = await axios.post("http://127.0.0.1:8080/usuario_equipo", this.inscripcionJ2);
      const responseI3 = await axios.post("http://127.0.0.1:8080/usuario_equipo", this.inscripcionJ3);
      const responseI4 = await axios.post("http://127.0.0.1:8080/usuario_equipo", this.inscripcionJ4);
      const responseI5 = await axios.post("http://127.0.0.1:8080/usuario_equipo", this.inscripcionJ5);
      const responseI6 = await axios.post("http://127.0.0.1:8080/usuario_equipo", this.inscripcionJ6);
      const responseI7 = await axios.post("http://127.0.0.1:8080/usuario_equipo", this.inscripcionJ7);
      const responseI8 = await axios.post("http://127.0.0.1:8080/usuario_equipo", this.inscripcionJ8);
      const responseI9 = await axios.post("http://127.0.0.1:8080/usuario_equipo", this.inscripcionJ9);
      const responseI10 = await axios.post("http://127.0.0.1:8080/usuario_equipo", this.inscripcionJ10);
      await this.$router.push('/partido_detalles/' + this.response.data.id);
      window.location.reload()
    },
    toggleCheckForm() {
      this.checkForm = !this.checkForm
    },
    handleChange(event) {
      const { value } = event.target;
      this.searchTexto = value;
      this.$emit('inputChange', event)
    },
    updateDatosPartido(partido) {
      this.formData.fecha = partido.fecha
      this.formData.hora = partido.hora
      this.formData.deporte.id = partido.deporte
      this.formData.ciudad.id = partido.ciudad
      //this.formData.ciudad = partido.ciudad
      //this.formData.deporte = partido.deporte
      //this.formData.jugador1 = partido.jugador1N
      //this.formData.idJugador1 = partido.idJugador1
      //this.formData.jugador2 = "Plaza vacante"
      if (partido.deporteEquipo) {
        this.deporteEquipo = true;
      }
      // esto se cambiará para el futuro cuando el usuario pueda elegir avatar para su perfil
      //this.formData.imagen1 = "https://images.pexels.com/photos/5609026/pexels-photo-5609026.jpeg?auto=compress&cs=tinysrgb&w=600"
      //this.formData.imagen2 = "https://i.ibb.co/VJy4cXk/defaultimage.png"
    },
    async llamarApiCiudad() {
      const response = await fetch("http://127.0.0.1:8080/evento/busqueda?ciudad=" + this.search)
      const dataCiudad = await response.json()
      this.resultsCiudad = dataCiudad
    },
    async llamarApiDeporte() {
      if (this.filtroSeleccionado != "todos") {
        const response = await fetch("http://127.0.0.1:8080/evento/busqueda?deporte=" + this.filtroSeleccionado)
        const dataDeporte = await response.json()
        this.resultsDeporte = dataDeporte
      }

    },
    async llamarApiFiltros() {
      const response = await fetch("http://127.0.0.1:8080/evento/busqueda?ciudad=" + this.search + "&deporte=" + this.filtroSeleccionado)
      const dataFiltros = await response.json()
      this.resultsFiltro = dataFiltros
    }
  },
  watch: {
    search() {
      if (this.filtroSeleccionado == "todos") {
        this.llamarApiCiudad()
      } else {
        this.llamarApiFiltros()
      }

    },
    filtroSeleccionado() {
      if (this.search == "") {
        this.llamarApiDeporte()
      } else {
        this.llamarApiFiltros()
      }

    }
  }
};
</script>
<template>
   <Crear_evento v-if="crearEvento" @cerrarTodo="toggleCrearEvento" @realizarEvento="realizarEvento"
      @check="toggleCheckForm" :checkForm="checkForm" @updatePartido="updateDatosPartido" :idUsuario="idUsuario">
    </Crear_evento>
  <div class="partidos">
    <div class="interfaz">
      <Buscador @inputChange="handleChange" :searchTexto="search"></Buscador>
      <select class="interfaz__filtro" v-model="filtroSeleccionado" name="filtro">
        <option value="todos">Todos</option>
        <option v-for="deporte in dataDeporte" :value="deporte.nombre">{{ deporte.nombre }}</option>
      </select>
      <a v-if="idUsuario != 0" class="boton interfaz__registrar" @click="toggleCrearEvento">Registrar</a>
    </div>
    <template v-if="results && results.estado == 'NOT_FOUND'">
      <div>{{ mensajeNoContentido }}</div>
    </template>
    <template v-else-if="filtroSeleccionado == 'todos' && search != '' && resultsCiudad.status == 404">
      <div>{{ mensajeNoContentido }}</div>
    </template>
    <template v-else-if="filtroSeleccionado != 'todos' && search == '' && resultsDeporte.status == 404">
      <div>{{ mensajeNoContentido }}</div>
    </template>
    <template v-else-if="filtroSeleccionado != 'todos' && search != '' && resultsFiltro.status == 404">
      <div>{{ mensajeNoContentido }}</div>
    </template>
    <template v-else-if="search == '' && filtroSeleccionado == 'todos'" v-for="result in results">
      <Partido v-if="!result.deporte.equipos" @click="enviarValores(result.id)" :deporte='result.deporte.nombre'
        :fecha='result.fecha' :ciudad='result.ciudad.nombre' :hora='result.hora' :jugador1='result.usuarios[0]?.nombre'
        :jugador2='result.usuarios[1]?.nombre' :imagen1='result.usuarios[0]?.avatar' :imagen2='result.usuarios[1]?.avatar'
        :perfil="false" :id="result.id">
      </Partido>
      <Partido v-else @click="enviarValores(result.id)" :deporte='result.deporte.nombre' :fecha='result.fecha'
        :ciudad='result.ciudad.nombre' :hora='result.hora' :jugador1='equipoNombre1' :jugador2='equipoNombre2'
        :imagen1='equipoImagen1' :imagen2='equipoImagen2' :perfil="false" :id="result.id">
      </Partido>
    </template>

    <template v-else-if="filtroSeleccionado == 'todos' && search != '' && resultsCiudad.length > 0"
      v-for="result in resultsCiudad">
      <Partido v-if="!result.deporte.equipos" @click="enviarValores(result.id)" :deporte='result.deporte.nombre'
        :fecha='result.fecha' :ciudad='result.ciudad.nombre' :hora='result.hora' :jugador1='result.usuarios[0]?.nombre'
        :jugador2='result.usuarios[1]?.nombre' :imagen1='result.usuarios[0]?.avatar' :imagen2='result.usuarios[1]?.avatar'
        :perfil="false" :id="result.id">
      </Partido>
      <Partido v-else @click="enviarValores(result.id)" :deporte='result.deporte.nombre' :fecha='result.fecha'
        :ciudad='result.ciudad.nombre' :hora='result.hora' :jugador1='equipoNombre1' :jugador2='equipoNombre2'
        :imagen1='equipoImagen1' :imagen2='equipoImagen2' :perfil="false" :id="result.id">
      </Partido>
    </template>
    <template v-else-if="filtroSeleccionado != 'todos' && search == '' && resultsDeporte.length > 0"
      v-for="result in resultsDeporte">
      <Partido v-if="!result.deporte.equipos" @click="enviarValores(result.id)" :deporte='result.deporte.nombre'
        :fecha='result.fecha' :ciudad='result.ciudad.nombre' :hora='result.hora' :jugador1='result.usuarios[0]?.nombre'
        :jugador2='result.usuarios[1]?.nombre' :imagen1='result.usuarios[0]?.avatar' :imagen2='result.usuarios[1]?.avatar'
        :perfil="false" :id="result.id">
      </Partido>
      <Partido v-else @click="enviarValores(result.id)" :deporte='result.deporte.nombre' :fecha='result.fecha'
        :ciudad='result.ciudad.nombre' :hora='result.hora' :jugador1='equipoNombre1' :jugador2='equipoNombre2'
        :imagen1='equipoImagen1' :imagen2='equipoImagen2' :perfil="false" :id="result.id">
      </Partido>
    </template>
    <template v-else-if="filtroSeleccionado != 'todos' && search != '' && resultsFiltro.length > 0"
      v-for="result in resultsFiltro">
      <Partido v-if="!result.deporte.equipos" @click="enviarValores(result.id)" :deporte='result.deporte.nombre'
        :fecha='result.fecha' :ciudad='result.ciudad.nombre' :hora='result.hora' :jugador1='result.usuarios[0]?.nombre'
        :jugador2='result.usuarios[1]?.nombre' :imagen1='result.usuarios[0]?.avatar' :imagen2='result.usuarios[1]?.avatar'
        :perfil="false" :id="result.id">
      </Partido>
      <Partido v-else @click="enviarValores(result.id)" :deporte='result.deporte.nombre' :fecha='result.fecha'
        :ciudad='result.ciudad.nombre' :hora='result.hora' :jugador1='equipoNombre1' :jugador2='equipoNombre2'
        :imagen1='equipoImagen1' :imagen2='equipoImagen2' :perfil="false" :id="result.id">
      </Partido>
    </template>
    <template v-else>
      <div>{{ mensajeNoContentido }}</div>
    </template>

  </div>
</template>
