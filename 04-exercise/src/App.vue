<script setup>
import { watchEffect, ref } from "vue";
import WeatherCityItem from "./components/WeatherCityItem.vue";
import API_KEY from "./API_KEY";

const GEO_API =
  "https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API key}";

const data = ref({});
const city = ref("hanoi");
const errMess = ref("");

watchEffect(async () => {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${API_KEY}`
    );
    if (!res.ok) throw new Error("City is not found");
    data.value = await res.json();
    errMess.value = "";
    console.log(data.value);
  } catch (error) {
    errMess.value = error;
  }
});
</script>

<template>
  <div>
    <select name="" id="" v-model="city">
      <option value="hanoi">Ha Noi - Viet Nam</option>
      <option value="saigon">Ho Chi Minh City - Viet Nam</option>
      <option value="beijing">Beijing - China</option>
      <option value="tokyo">Tokyo - Japan</option>
      <option value="seoul">Seoul - Korean</option>
      <option value="moskva">Moskva - Russia</option>
      <option value="london">London - England</option>
      <option value="abcxyz">Invalid City</option>
    </select>
    <h1 v-if="errMess">{{ errMess }}</h1>
    <weather-city-item
      v-else-if="Object.keys(data).length !== 0"
      :weather-data="data"
    />
  </div>
</template>

<style scoped></style>
