<template>
  <div class="d-flex justify-center">
    <v-progress-circular size="50" :color="color" indeterminate>
    </v-progress-circular>
  </div>
</template>

<script setup>
const props = defineProps({
  color: {
    type: String,
    default: "#1e3363",
  },
});
</script>


