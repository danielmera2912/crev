<script setup>
    import Modificar from './Modificar_cuenta.vue'
</script>
<script>

export default {
    data() {
        return {
            modificar: false,
            checkForm: false,
        }
    },
    methods: {
        cambiarModificar(){
            this.modificar = !this.modificar
        },
        toggleCheck(){
            this.checkForm = !this.checkForm;
        },
        guardarModificado(){
            if(this.checkForm){
                this.modificar = false;
                this.checkForm = false;
                alert("Modificado correctamente")
            }
        }
    }
}
</script>
<template>
    <main class="cuerpo cuerpo--perfil">
    <section class="cuerpo--perfil__avatar">
        <img class="cuerpo--perfil__avatar__imagen" src="https://cdn.resfu.com/img_data/players/medium/64734.jpg?size=120x&lossy=1"/>
        <a @click="cambiarModificar" class="cuerpo--perfil__avatar__editar">
            Editar Perfil
        </a>
    </section>

    <section class="cuerpo--perfil__nombre">
            <div class="cuerpo--perfil__nombre__respuesta">@Juanito</div>
    </section>

    <section class="cuerpo--perfil__correo">
        <div class="cuerpo--perfil__correo__pregunta">Correo Electrónico</div>
        <div class="cuerpo--perfil__correo__respuesta">juanito@gmail.com</div>
    </section>

    <section class="cuerpo--perfil__fecha">
        <div class="cuerpo--perfil__fecha__pregunta">Fecha de nacimiento</div>
        <div class="cuerpo--perfil__fecha__respuesta">2010-10-10</div>
    </section>
    <Modificar v-if="modificar" @cerrar="cambiarModificar" :modificar="modificar" 
    @check="toggleCheck" :checkForm="checkForm" 
    @modificar="guardarModificado"></Modificar>
</main>
</template>