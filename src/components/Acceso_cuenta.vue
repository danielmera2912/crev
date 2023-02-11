<template>
    <div>
        <div className="fondo" @click="$emit('cerrarTodo')"></div>
        <div className="perfil">
            <a href="#" ><span className="material-symbols-outlined iniciar_sesion__cerrar" @click="$emit('cerrarTodo')">close</span></a>
            <tittle className="perfil__titulo">Perfil</tittle>
            <section className="perfil__avatar">
                <img className="perfil__avatar__imagen" src="https://cdn.resfu.com/img_data/players/medium/64734.jpg?size=120x&lossy=1"/>
            </section>
            <form className="perfil__boton">
                <RouterLink to="/perfil" @click="$emit('cerrarTodo')" className="perfil__boton__opcion" >Acceder perfil</RouterLink>
                <RouterLink to="/"  className="perfil__boton__opcion">Cerrar sesión</RouterLink>
            </form>
        </div>
      </div>
      
</template>