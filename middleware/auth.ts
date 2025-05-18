export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useState('auth', () => false);
  const token = useCookie('auth_token');

  if (process.client) {
    if (!auth.value) {
      return navigateTo('/login');
    }
  }

  if (process.server) {
    if (!token.value) {
      return navigateTo('/login');
    }
    auth.value = true;
  }
});
