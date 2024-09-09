<template>
  <div>
    <Header />

    <Sidebar />

    <div class="layout">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.layout {
  height: calc(100vh - $header-height);
  padding: calc($header-height + 3rem) 5rem 0 8rem;
  background-color: $body-color;
}
</style>