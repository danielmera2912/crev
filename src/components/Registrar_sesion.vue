<template>
     <div>
        <div className="fondo" @click="$emit('cerrarTodo')"></div>
        <form className="registrar">
            <a href="#" ><span className="material-symbols-outlined iniciar_sesion__cerrar" @click="$emit('cerrarTodo')">close</span></a>
            <tittle className="registrar__titulo">Registrar</tittle>
            <section className="registrar__caja">
            <div className="registrar__caja__informativo1--visible" >{errorRegistro}</div>
                <input className="registrar__caja__elemento" type="text" placeholder="Usuario..."/>
                <input className="registrar__caja__elemento"  type="email" placeholder="Correo electrónico..."/> 
                <input className="registrar__caja__elemento"  type="password" placeholder="Contraseña..."/> 
                <input className="registrar__caja__elemento" type="date"/>
            </section>
            <section className="registrar__boton">
                <a className="registrar__boton__opcion registrar__boton__opcion--registrar" @click="$emit('abrirIniciar')">Registrar</a>
                <p>o</p>
                <a className="registrar__boton__opcion registrar__boton__opcion--iniciar" @click="$emit('abrirIniciar')">Identíficate aquí</a>
            </section>
        </form>
      </div>

    

    <!-- {
    
    }

    {
      <div>
        <div className="fondo" ></div>
        <div className="perfil">
            <a href="#" ><img className="perfil__cerrar" /></a>
            <tittle className="perfil__titulo">Perfil</tittle>
            <section className="perfil__avatar">
                <img className="perfil__avatar__imagen" src={Avatar}/>
            </section>
            <form className="perfil__boton">
                <Link to="/perfil" className="perfil__boton__opcion">Acceder al perfil</Link>
                <a href="/"  className="perfil__boton__opcion">Cerrar sesión</a>
            </form>
        </div>
      </div>
    } -->

</template>