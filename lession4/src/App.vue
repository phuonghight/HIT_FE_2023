<template lang="">
  <input type="text" v-model.number="input" />
  <h1>{{ input }}</h1>
</template>

<script setup>
import { ref } from "vue";
const input = ref("hello");
</script>

<style lang=""></style>
