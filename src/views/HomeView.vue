<template>
  <div class="home d-flex">
    <template v-for="index in elements">
      <weatherContainer :key="index" :class="{ 'me-3': elements > 1 }" />
    </template>
  </div>
</template>

<script>
import weatherContainer from "../components/weatherContainer";

export default {
  name: "HomeView",
  components: {
    weatherContainer,
  },
  data() {
    return {
      elements: 2,
    };
  },
};
</script>
