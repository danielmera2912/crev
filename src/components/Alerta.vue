<script>
/**
* Componente de notificación.
*
* @component
* @example
* // Uso del componente:
* <notification message="Mensaje de ejemplo"></notification>
*
* @props {string} message - El mensaje de la notificación.
*/
export default {
  /**
     * El mensaje de la notificación.
     *
     * @type {string}
     * @required
     */
  props: {
    message: {
      type: String,
      required: true
    }
  }
};
</script>
<template>
    <div class="alerta">
      <div class="alerta-box">
        <p>{{ message }}</p>
      </div>
    </div>
  </template>
  
