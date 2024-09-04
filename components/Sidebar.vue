<template>
  <v-layout>
    <v-navigation-drawer class="sidebar bg-second-color" expand-on-hover rail>
      <v-list density="compact" nav>
        <NuxtLink
          v-for="(item, index) in listItem"
          :key="index"
          :to="item.path"
        >
          <v-list-item
            :active="verifyCurrentPath(item.value)"
            :prepend-icon="item.icon"
            :title="item.title"
            :value="item.value"
            class="text-white"
          ></v-list-item>
        </NuxtLink>
      </v-list>
    </v-navigation-drawer>
  </v-layout>
</template>

<script setup>
import { ref } from "vue";

import { useRoute } from "vue-router";
const route = useRoute();

const listItem = ref([
  {
    title: "Home",
    icon: "mdi-home",
    path: "/",
    value: "home",
    adminOnly: false,
  },
  {
    title: "Usuários",
    icon: "mdi-account-group",
    path: "/users",
    value: "users",
    adminOnly: true,
  },
  {
    title: "Log out",
    icon: "mdi-logout",
    path: "/login/sign-out",
    value: "sign-out",
    adminOnly: true,
  },
]);
const verifyCurrentPath = (value) => {
  if (route.path == "/" && value == "home") return true;
  return route.path.includes(value);
};
</script>

<style lang="scss" scoped>
.sidebar {
  top: $header-height !important;
  border-top: 0.1px solid #cccccc8a;
}
</style>

