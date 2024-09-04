<template>
  <div class="w-screen h-screen bg-primary-color-dark">
    <div class="div-center">
      <div class="text-h4 font-weight-bold text-center">
        <p class="text-white">
          EquipCare<span class="text-secondary-color"> PRO</span>
        </p>
        <p class="text-h6 text-white">LOG IN</p>
      </div>

      <Login-sign-in-form />

      <p class="mt-6 text-opacity text-center font-12">
        ® Coppi 2024. Todos os direitos reservados.
      </p>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "EQUIPCARE | SIGN IN",
});
definePageMeta({
  layout: "",
});
</script>

<style lang="scss" scoped>
a {
  list-style-type: none;
}
</style>