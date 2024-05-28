<template>
  <div id="app" class="d-flex align-items-center justify-content-center">
    <nav></nav>
    <router-view />
  </div>
</template>

<style lang="scss">
@import "bootstrap/dist/css/bootstrap.min.css";
@import "assets/fonts/weather-icons/weather-icons.min.css";

#app {
  background-color: lightblue;
  height: 100vh;
}
</style>
