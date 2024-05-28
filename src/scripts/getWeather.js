import { EventBus } from "../scripts/eventBus";
import config from "../config/keys";

export default {
  data() {
    return {
      backupWeather: null,
    };
  },
  methods: {
    async getWeather(location) {
      if (location.length == 0) {
        EventBus.$emit("inputMissing", true);
        setTimeout(() => {
          EventBus.$emit("inputMissing", false);
        }, 5000);
        return this.backupWeather;
      }

      const response = await fetch(
        "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
          location +
          "?unitGroup=uk&key=" +
          config.apiKey +
          "&contentType=json",
        {
          method: "GET",
          headers: {},
        }
      );

      if (response.status == 200) {
        const res = await response.json();
        this.backupWeather = res;
        return res;
      }

      if (response.status == 400) {
        EventBus.$emit("locationError", true);
        setTimeout(() => {
          EventBus.$emit("locationError", false);
        }, 5000);
        return this.backupWeather;
      }
    },
    setWeatherIcon(condition) {
      let icon;
      switch (condition) {
        case "partly-cloudy-day":
        case "cloudy":
          icon = "wi-cloudy";
          break;
        case "rain":
          icon = "wi-rain";
          break;
        default:
          icon = "wi-day-sunny";
      }
      return icon;
    },
  },
};
