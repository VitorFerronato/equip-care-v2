<template>
  <div>
    <label for="" class="text-body-2">{{ title }}</label>
    <v-text-field
      v-bind="$attrs"
      variant="outlined"
      density="comfortable"
      :hide-details="hideDetails"
      single-line
      class="mt-1"
    >
      <template v-if="appendIcon" v-slot:append>
        <v-icon
          :color="iconColor"
          :size="iconSize"
          @click="$emit('clickAppend')"
          >{{ appendIcon }}</v-icon
        >
      </template>
    </v-text-field>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
  },
  appendIcon: {
    type: [String, Boolean],
    required: false,
    default: "",
  },
  iconColor: {
    type: String,
    required: false,
    default: "#3C5CA7",
  },
  iconSize: {
    type: String,
    required: false,
    default: "24px",
  },
  hideDetails: {
    required: false,
    default: 'auto',
  },
});
</script>

