<template>
    <div class="notification">
      <div class="notification-box">
        <p>{{ message }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      message: {
        type: String,
        required: true
      }
    }
  };
  </script>