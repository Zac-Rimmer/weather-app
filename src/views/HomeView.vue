<template>
  <div class="home">
    <section class="mb-3">
      <form @submit.prevent class="d-flex">
        <input
          class="location-input col"
          type="text"
          placeholder="Search by location or postcode"
          v-model="weatherSearch"
        />
        <button class="search-button" @click="setWeather">Search</button>
      </form>

      <div
        v-if="inputMissing"
        class="alert alert-danger p-1 mt-1 text-center"
        role="alert"
      >
        Please enter a location or postcode.
      </div>
      <div
        v-if="locationError"
        class="alert alert-danger p-1 mt-1 text-center"
        role="alert"
      >
        Invalid location. Please try again.
      </div>
    </section>
    <weatherCard />
  </div>
</template>

<script>
// @ is an alias to /src
import weatherCard from "../components/weatherCard";
import weatherscript from "../scripts/getWeather";
import { EventBus } from "../scripts/eventBus";

export default {
  name: "HomeView",
  mixins: [weatherscript],
  components: {
    weatherCard,
  },
  data() {
    return {
      weatherSearch: "",
      inputMissing: false,
      locationError: false,
    };
  },
  methods: {
    setWeather() {
      EventBus.$emit("SetNewLocation", this.weatherSearch);
      this.weatherSearch = "";
    },
    setMissingInput(value) {
      this.inputMissing = value;
    },
    setLocationError(value) {
      this.locationError = value;
    },
  },
  mounted() {
    EventBus.$on("inputMissing", this.setMissingInput);
    EventBus.$on("locationError", this.setLocationError);
  },
  destroyed() {
    EventBus.$off("inputMissing", this.setMissingInput);
    EventBus.$off("locationError", this.setLocationError);
  },
};
</script>

<style lang="scss" scoped>
.location-input {
  border-top-left-radius: 3px;
  border: 1px solid #8f8f8f;
  border-bottom-left-radius: 3px;
  border-right: 0;
}
.search-button {
  border: 1px solid #8f8f8f;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  border-left: 0;
}
</style>
