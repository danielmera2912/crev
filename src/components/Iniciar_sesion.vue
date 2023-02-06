<template>
    
      <div>
      <div class="fondo" @click="$emit('cerrarTodo')"></div>
       <form className="iniciar_sesion">
      <a href="#" ><span className="material-symbols-outlined iniciar_sesion__cerrar" @click="$emit('cerrarTodo')">close</span></a>
      <tittle className="iniciar_sesion__titulo">Iniciar sesión</tittle>
      
      <section className="iniciar_sesion__caja">
          <div className="iniciar_sesion__caja__informativo1--visible" >{error}</div>
          <input className="iniciar_sesion__caja__elemento"  type="text" placeholder="Usuario..."/> 
          <input className="iniciar_sesion__caja__elemento"  type="password" placeholder="Contraseña..."/> 
          <label className="iniciar_sesion__caja__recordar"><input type="checkbox" id="check" value="check" /> Recordar Cuenta</label>
      </section>
      <section className="iniciar_sesion__boton">
          <a className="iniciar_sesion__boton__opcion iniciar_sesion__boton__opcion--entrar" @click="$emit('accederCuenta')">Entrar</a>
          <p>o</p>
          <a className="iniciar_sesion__boton__opcion iniciar_sesion__boton__opcion--registrar" @click="$emit('abrirRegistrar')">Regístrate</a>
      </section>
  </form>
  </div>
  
</template>