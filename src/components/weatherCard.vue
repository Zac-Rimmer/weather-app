<template>
  <div v-if="weather" class="weather-card card">
    <div class="card-body text-center">
      <h5 class="current-date mb-0">{{ currentDate }}</h5>
      <span class="header-icon"
        ><i
          class="wi"
          :class="[setWeatherIcon(weather.currentConditions.icon)]"
        ></i
      ></span>
      <h3 class="location mb-1">{{ weather.address }}</h3>
      <h4 class="temp">
        {{ weather.currentConditions.temp }}<i class="wi wi-celsius"></i>
      </h4>

      <template v-if="weather.alerts">
        <div
          v-for="(alert, index) in weather.alerts"
          :key="index"
          class="alert alert-warning p-1 weather-alerts"
          role="alert"
        >
          <p class="m-0">{{ alert.event }}</p>
        </div>
      </template>

      <ul class="list-unstyled">
        <li>Sunrise: {{ weather.currentConditions.sunrise }}</li>
        <li>Sunset: {{ weather.currentConditions.sunset }}</li>
        <li>Windspeed: {{ weather.currentConditions.windspeed }}mph</li>
        <li></li>
      </ul>

      <div class="accordion accordion-flush" id="forcastAccordion">
        <div class="accordion-item bg-transparent">
          <div class="accordion-header">
            <button
              class="accordion-button bg-transparent py-2 px-0 collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#accordion-one"
              aria-expanded="false"
              aria-controls="accordion-one"
            >
              7 Day Forecast
            </button>
          </div>
          <div
            id="accordion-one"
            class="accordion-collapse collapse"
            data-bs-parent="#forcastAccordion"
          >
            <div class="accordion-body overflow-auto p-2">
              <div class="row m-0 forecast-container">
                <div
                  v-for="(forecast, index) in weather.days.slice(1, 8)"
                  :key="index"
                  class="col d-flex flex-column forecast-item p-0"
                >
                  <span class="forecast-icon d-block mb-1"
                    ><i class="wi" :class="[setWeatherIcon(forecast.icon)]"></i
                  ></span>
                  <span>{{ forecast.datetime }}</span>
                  <span>{{ forecast.temp }}<i class="wi wi-celsius"></i></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import weatherscript from "../scripts/getWeather";
import { EventBus } from "../scripts/eventBus";

export default {
  name: "WeatherCard",
  mixins: [weatherscript],
  data() {
    return {
      weather: null,
    };
  },
  async created() {
    this.weather = await this.getWeather("Manchester, UK");
  },
  mounted() {
    EventBus.$on("SetNewLocation", this.setWeather);
  },
  destroyed() {
    EventBus.$off("SetNewLocation", this.setWeather);
  },
  methods: {
    async setWeather(location) {
      this.weather = await this.getWeather(location);
    },
  },
  computed: {
    currentDate() {
      const current = new Date();
      const currentDate = current.getDate();
      const currentMonth = current.getMonth();
      const currentYear = current.getFullYear();

      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      return (
        currentDate.toString() +
        " " +
        monthNames[currentMonth] +
        " " +
        currentYear.toString()
      );
    },
  },
};
</script>

<style scoped lang="scss">
.weather-card {
  background: rgba(255, 255, 255, 0.6);
  font-size: 16px;
  width: 350px;

  .card-body {
    > * {
      margin-bottom: 10px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .current-date {
      font-size: 12px;
    }

    .header-icon {
      font-size: 40px;
    }

    .location {
      font-size: 22px;
    }

    .temp {
      font-size: 16px;
      font-weight: 400;
    }

    .weather-alerts {
      font-size: 12px;
    }

    #forcastAccordion {
      .accordion-header {
        border-top: 1px solid #8f8f8f;
        border-bottom: 1px solid #8f8f8f;
      }

      .forecast-container {
        max-width: 300px;
        flex-wrap: nowrap;

        .forecast-item {
          flex-basis: 60%;
          border-right: 1px solid #8f8f8f;

          &:last-child {
            border-right: 0;
          }

          .forecast-icon {
            font-size: 22px;
          }
        }
      }
    }
  }
}
</style>
