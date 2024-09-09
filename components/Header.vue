<template>
  <header
    class="header d-flex align-center justify-space-between bg-second-color px-6"
  >
    <NuxtLink to="/">
      <p class="text-h5 text-white font-weight-bold">
        EquipCare<span class="text-secondary-color"> PRO</span>
      </p>
    </NuxtLink>
  </header>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100000;
  height: $header-height;
}
</style>