// middleware/auth.js

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();

  if (!userStore.token && to.path == "/") return navigateTo("/login");

  if (to.path == "/login" && userStore.token) return navigateTo("/");
});
