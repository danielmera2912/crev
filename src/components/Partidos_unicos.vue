<script setup>
import axios from 'axios'
import 'sweetalert2/dist/sweetalert2.css'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Buscador from '../components/Buscador.vue'
import Paginacion from '../components/Paginacion.vue'
import Alerta from './Alerta.vue'
import Crear_evento from './Crear_evento.vue'
import Partido from './Partido.vue'
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
        },
        ciudad: {
          id: 0
        }
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
      eventos: [],
      paginaActual: 0,
      totalPaginas: 0,
      API: "http://127.0.0.1:8080",
    };
  },
  mounted() {
    this.conseguirDeportes();
  },
  created() {
    this.obtenerEventos();
  },
  methods: {
    async obtenerEventos() {
      try {

        const response = await axios.get(this.API+`/evento?page=${this.paginaActual}`);

        this.eventos = response.data.eventos;
        this.totalPaginas = response.data.totalPages;
      } catch (error) {
        console.error(error);
      }
    },
    paginaSiguiente() {
      this.paginaActual++;
      this.obtenerEventos();
    },
    paginaAnterior() {
      this.paginaActual--;
      this.obtenerEventos();
    },
    async conseguirDeportes() {

      const responseDeporte = await fetch(this.API+"/deporte")

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
          const token = localStorage.getItem('tokenjwt');

          const config = {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          };

          this.response = await axios.post(this.API+"/evento", this.formData, config);
          this.formDataJugador1.evento.id = this.response.data.id;
          this.formDataJugador2.evento.id = this.response.data.id;
          const response2 = await axios.post(this.API+"/usuario_evento", this.formDataJugador1, config);
          const response3 = await axios.post(this.API+"/usuario_evento", this.formDataJugador2, config);

          if (this.deporteEquipo) {
            this.inscribirEquipos();
          }
          else {
            await this.$router.push('/partido_detalles/' + this.response.data.id);
          }

        } catch (error) {
          console.error(error);
        }
      }

    },
    async inscribirEquipos() {
      const token = localStorage.getItem('tokenjwt');

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      this.formDataEquipo1.evento.id = this.response.data.id;
      this.formDataEquipo2.evento.id = this.response.data.id;

      const response4 = await axios.post(this.API+"/equipo", this.formDataEquipo1, config);

      const response5 = await axios.post(this.API+"/equipo", this.formDataEquipo2, config);

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

      const responseI1 = await axios.post(this.API+"/usuario_equipo", this.inscripcionJ1, config);
      const responseI2 = await axios.post(this.API+"/usuario_equipo", this.inscripcionJ2, config);
      const responseI3 = await axios.post(this.API+"/usuario_equipo", this.inscripcionJ3, config);
      const responseI4 = await axios.post(this.API+"/usuario_equipo", this.inscripcionJ4, config);
      const responseI5 = await axios.post(this.API+"/usuario_equipo", this.inscripcionJ5, config);
      const responseI6 = await axios.post(this.API+"/usuario_equipo", this.inscripcionJ6, config);
      const responseI7 = await axios.post(this.API+"/usuario_equipo", this.inscripcionJ7, config);
      const responseI8 = await axios.post(this.API+"/usuario_equipo", this.inscripcionJ8, config);
      const responseI9 = await axios.post(this.API+"/usuario_equipo", this.inscripcionJ9, config);
      const responseI10 = await axios.post(this.API+"/usuario_equipo", this.inscripcionJ10, config);

      await this.$router.push('/partido_detalles/' + this.response.data.id);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Evento creado',
        showConfirmButton: false,
        timer: 1500
      })
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
      if (partido.deporteEquipo) {
        this.deporteEquipo = true;
      }
    },
    async llamarApiCiudad() {

      const response = await fetch(this.API+"/evento/busqueda?ciudad=" + this.search)

      const dataCiudad = await response.json()
      this.resultsCiudad = dataCiudad
    },
    async llamarApiDeporte() {
      if (this.filtroSeleccionado != "todos") {

        const response = await fetch(this.API+"/evento/busqueda?deporte=" + this.filtroSeleccionado)

        const dataDeporte = await response.json()
        this.resultsDeporte = dataDeporte
      }

    },
    async llamarApiFiltros() {

      const response = await fetch(this.API+"/evento/busqueda?ciudad=" + this.search + "&deporte=" + this.filtroSeleccionado)

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
  <div class="partidos" v-infinite-scroll="cargarMas" infinite-scroll-distance="10">
    <div class="interfaz">
      <Buscador @inputChange="handleChange" :searchTexto="search"></Buscador>
      <select class="interfaz__filtro" v-model="filtroSeleccionado" name="filtro">
        <option value="todos">Todos</option>
        <option v-for="deporte in dataDeporte" :value="deporte.nombre">{{ deporte.nombre }}</option>
      </select>
      <a v-if="idUsuario != 0" class="boton interfaz__registrar" @click="toggleCrearEvento">Registrar</a>
    </div>
    <template v-if="results && results.estado == 'NOT_FOUND'">
      <div>
        <Alerta :message="mensajeNoContentido"></Alerta>
      </div>
    </template>
    <template v-else-if="filtroSeleccionado == 'todos' && search != '' && resultsCiudad.status == 404">
      <div>
        <Alerta :message="mensajeNoContentido"></Alerta>
      </div>
    </template>
    <template v-else-if="filtroSeleccionado != 'todos' && search == '' && resultsDeporte.status == 404">
      <div>
        <Alerta :message="mensajeNoContentido"></Alerta>
      </div>
    </template>
    <template v-else-if="filtroSeleccionado != 'todos' && search != '' && resultsFiltro.status == 404">
      <div>
        <Alerta :message="mensajeNoContentido"></Alerta>
      </div>
    </template>
    <template v-else-if="search == '' && filtroSeleccionado == 'todos'" v-for="result in eventos">
      <Partido v-if="!result.deporte.equipos" @click="enviarValores(result.id)" :deporte='result.deporte.nombre'
        :fecha='result.fecha' :ciudad='result.ciudad.nombre' :hora='result.hora' :jugador1='result.usuarios[0]?.username'
        :jugador2='result.usuarios[1]?.username' :imagen1='result.usuarios[0]?.avatar'
        :imagen2='result.usuarios[1]?.avatar' :perfil="false" :id="result.id" :puntosLocal="result.puntosLocal"
        :puntosVisitante="result.puntosVisitante" :estado="result.estado">
      </Partido>
      <Partido v-else @click="enviarValores(result.id)" :deporte='result.deporte.nombre' :fecha='result.fecha'
        :ciudad='result.ciudad.nombre' :hora='result.hora' :jugador1='equipoNombre1' :jugador2='equipoNombre2'
        :imagen1='equipoImagen1' :imagen2='equipoImagen2' :perfil="false" :id="result.id"
        :puntosLocal="result.puntosLocal" :puntosVisitante="result.puntosVisitante" :estado="result.estado">
      </Partido>
    </template>

    <template v-else-if="filtroSeleccionado == 'todos' && search != '' && resultsCiudad.length > 0"
      v-for="result in resultsCiudad">
      <Partido v-if="!result.deporte.equipos" @click="enviarValores(result.id)" :deporte='result.deporte.nombre'
        :fecha='result.fecha' :ciudad='result.ciudad.nombre' :hora='result.hora' :jugador1='result.usuarios[0]?.username'
        :jugador2='result.usuarios[1]?.username' :imagen1='result.usuarios[0]?.avatar'
        :imagen2='result.usuarios[1]?.avatar' :perfil="false" :id="result.id" :puntosLocal="result.puntosLocal"
        :puntosVisitante="result.puntosVisitante" :estado="result.estado">
      </Partido>
      <Partido v-else @click="enviarValores(result.id)" :deporte='result.deporte.nombre' :fecha='result.fecha'
        :ciudad='result.ciudad.nombre' :hora='result.hora' :jugador1='equipoNombre1' :jugador2='equipoNombre2'
        :imagen1='equipoImagen1' :imagen2='equipoImagen2' :perfil="false" :id="result.id"
        :puntosLocal="result.puntosLocal" :puntosVisitante="result.puntosVisitante" :estado="result.estado">
      </Partido>
    </template>
    <template v-else-if="filtroSeleccionado != 'todos' && search == '' && resultsDeporte.length > 0"
      v-for="result in resultsDeporte">
      <Partido v-if="!result.deporte.equipos" @click="enviarValores(result.id)" :deporte='result.deporte.nombre'
        :fecha='result.fecha' :ciudad='result.ciudad.nombre' :hora='result.hora' :jugador1='result.usuarios[0]?.username'
        :jugador2='result.usuarios[1]?.username' :imagen1='result.usuarios[0]?.avatar'
        :imagen2='result.usuarios[1]?.avatar' :perfil="false" :id="result.id" :puntosLocal="result.puntosLocal"
        :puntosVisitante="result.puntosVisitante" :estado="result.estado">
      </Partido>
      <Partido v-else @click="enviarValores(result.id)" :deporte='result.deporte.nombre' :fecha='result.fecha'
        :ciudad='result.ciudad.nombre' :hora='result.hora' :jugador1='equipoNombre1' :jugador2='equipoNombre2'
        :imagen1='equipoImagen1' :imagen2='equipoImagen2' :perfil="false" :id="result.id"
        :puntosLocal="result.puntosLocal" :puntosVisitante="result.puntosVisitante" :estado="result.estado">
      </Partido>
    </template>
    <template v-else-if="filtroSeleccionado != 'todos' && search != '' && resultsFiltro.length > 0"
      v-for="result in resultsFiltro">
      <Partido v-if="!result.deporte.equipos" @click="enviarValores(result.id)" :deporte='result.deporte.nombre'
        :fecha='result.fecha' :ciudad='result.ciudad.nombre' :hora='result.hora' :jugador1='result.usuarios[0]?.username'
        :jugador2='result.usuarios[1]?.username' :imagen1='result.usuarios[0]?.avatar'
        :imagen2='result.usuarios[1]?.avatar' :perfil="false" :id="result.id" :puntosLocal="result.puntosLocal"
        :puntosVisitante="result.puntosVisitante" :estado="result.estado">
      </Partido>
      <Partido v-else @click="enviarValores(result.id)" :deporte='result.deporte.nombre' :fecha='result.fecha'
        :ciudad='result.ciudad.nombre' :hora='result.hora' :jugador1='equipoNombre1' :jugador2='equipoNombre2'
        :imagen1='equipoImagen1' :imagen2='equipoImagen2' :perfil="false" :id="result.id"
        :puntosLocal="result.puntosLocal" :puntosVisitante="result.puntosVisitante" :estado="result.estado">
      </Partido>
    </template>

    <template v-else>
      <div>
        <Alerta :message="mensajeNoContentido"></Alerta>
      </div>
    </template>

  </div>
  <Paginacion v-if="search == '' && filtroSeleccionado == 'todos'" :tipo="'evento'" :paginaActual="paginaActual"
    :totalPaginas="totalPaginas" :paginaAnterior="paginaAnterior" :paginaSiguiente="paginaSiguiente" />
</template>
