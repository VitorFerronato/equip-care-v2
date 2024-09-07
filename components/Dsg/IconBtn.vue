<template>
  <div>
    <v-btn  size="x-small" :color="btnColor" icon>
      <v-icon :color="iconColor">{{ iconName }}</v-icon>
    </v-btn>
  </div>
</template>

<script setup>
const props = defineProps({
  btnColor: {
    type: String,
    default: "#1e3363",
  },
  iconColor: {
    type: String,
    default: "#fff",
  },
  iconName: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
</style>