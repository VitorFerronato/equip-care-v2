<template>
  <div>
    <label for="" class="text-body-2">{{ title }}</label>
    <v-text-field
      v-bind="$attrs"
      hide-details="auto"
      variant="outlined"
      density="comfortable"
      single-line
      class="mt-1"
    >
      <template v-if="appendIcon" v-slot:append-inner>
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
    required: true,
  },
  color: {
    type: String,
    required: false,
    default: "#1e3363",
  },

  appendIcon: {
    type: [String, Boolean],
    required: false,
    default: "",
  },
  iconColor: {
    type: String,
    required: false,
    default: "#fff",
  },
  iconSize: {
    type: String,
    required: false,
    default: "24px",
  },
});
</script>

 