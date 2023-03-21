<script setup>
import { ref, computed } from "vue";
const isDisable = ref(false);
const mess = computed(() => (isDisable.value ? "Loading" : "Submit"));
console.log(mess);
</script>

<template>
  <div>
    <button :disabled="isDisable" @click="isDisable = !isDisable">
      {{ mess }}
    </button>
  </div>
</template>

<style scoped></style>
