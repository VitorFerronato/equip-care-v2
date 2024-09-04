<template>
  <v-btn v-bind="$attrs" :color="color" class="text-capitalize">
    {{ title }}
  </v-btn>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: false,
    default: "#1e3363",
  },
});
</script>

 