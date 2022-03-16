<!-- fichier central de l'application Vue -->
<script>
import NavLink from "./components/NavLink";

export default {
  name: "App",
  components: {
    NavLink
  }
}
</script>

<template>
  <div id="app">
    <NavLink></NavLink>
    <router-view></router-view>
  </div>
</template>

<style>
body {
  background: linear-gradient(90deg, #da2d0f 0%, #da0f60 100%);
}
</style>
