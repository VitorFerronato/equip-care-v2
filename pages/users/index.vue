<template>
  <div>
    <p class="text-h4">Usuários</p>
    <div class="d-flex justify-end my-6">
      <Dsg-btn :title="'Criar usuário'" />
    </div>

    <Users-List-Table />
  </div>
</template>

<script setup>
useHead({
  title: "EQUIPCARE | USUÁRIOS",
});
</script>

<style lang="scss" scoped>
</style>