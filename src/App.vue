<template>
  <div id="app">
    <header>
      <Nav />
    </header>

    <main class="pt-5">
      <router-view />
    </main>

    <footer></footer>
  </div>
</template>
<script>
import Nav from "./components/partials/Nav.vue";

export default {
  name: "app",
  components: {
    Nav,
  },
};
</script>