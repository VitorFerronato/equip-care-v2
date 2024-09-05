<template>
  <div>
    <label for="" class="text-body-2">{{ title }}</label>
    <v-combobox
      v-bind="$attrs"
      :items="items"
      :item-title="itemText"
      :item-value="itemValue"
      variant="outlined"
      density="comfortable"
      hide-details="auto"
      class="mt-1"
    ></v-combobox>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
  },
  items: {
    type: Array,
  },
  itemText: {
    type: String,
    default: "text",
  },
  itemValue: {
    type: String,
    default: "value",
  },
});
</script>
