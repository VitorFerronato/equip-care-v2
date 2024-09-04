<template>
  <v-checkbox
    :label="title"
    color="#1e3363"
    density="compact"
    hide-details
    class="ma-0 pa-0 ml-n1"
  ></v-checkbox>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
