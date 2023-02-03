<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
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
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->

    <div class="wrapper">
      <!-- <HelloWorld msg="You did it!" /> -->

      <!-- <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav> -->
    </div>
  </header>

  <RouterView />
</template>

