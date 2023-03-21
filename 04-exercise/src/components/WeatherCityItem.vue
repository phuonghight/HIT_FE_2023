<script setup>
const props = defineProps({
  weatherData: Object,
});
</script>
<template>
  <div class="weather-city">
    <h1>City: {{ weatherData.name }}</h1>
    <h2>
      Main weather:
      <img
        :src="`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`"
        alt=""
      />
      {{ weatherData.weather[0].main }},
      {{ weatherData.weather[0].description }}
    </h2>
    <h2>
      Temperature: {{ (weatherData.main.temp - 272.15).toFixed(0) }}°C, feels
      like: {{ (weatherData.main.feels_like - 272.15).toFixed(0) }}°C
    </h2>
    <h2>
      Atmospheric pressure on the sea level:
      {{ weatherData.main.pressure }} hPa
    </h2>
    <h2>Humidity (độ ẩm): {{ weatherData.main.humidity }}%</h2>
    <h2>
      Wind: {{ weatherData.wind.speed }} met/sec, direction:
      {{ weatherData.wind.deg }}
    </h2>
  </div>
</template>
<style scoped>
.weather-city img {
  width: 50px;
}
</style>
