<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
</script>
<script>
export default {
  data() {
    return {
      search: ''
    }
  },
  methods: {
    handleChange(event) {
      const {value} = event.target;
      this.search = value;
    }
}
}
</script>
<template>
  <Header @inputChange="handleChange" :search="search"></Header>
  <header>

    <div class="wrapper">
    </div>
  </header>

  <RouterView />
</template>

