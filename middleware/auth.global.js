// middleware/auth.js

export default defineNuxtRouteMiddleware((to, from) => {
  const AuthenticationStore = useAuthenticationStore();

  if (!AuthenticationStore.token && to.path == "/") return navigateTo("/login");

  if (to.path == "/login" && AuthenticationStore.token) return navigateTo("/");
});
