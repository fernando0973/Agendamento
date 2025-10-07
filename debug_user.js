// Debug script para testar estado do usuário no browser
// Cole no console do navegador:

console.log('=== DEBUG USER STATE ===');
console.log('Current URL:', window.location.href);

// Tenta acessar o estado do Pinia
if (window.$nuxt) {
  const app = window.$nuxt;
  const stores = app.$pinia._s;
  
  console.log('Available stores:', Object.keys(stores));
  
  if (stores.has('user')) {
    const userStore = stores.get('user');
    console.log('User Store State:', {
      profile: userStore.profile,
      loading: userStore.loading, 
      error: userStore.error,
      isLoggedIn: userStore.isLoggedIn,
      userName: userStore.userName,
      userRole: userStore.userRole,
      isAdmin: userStore.isAdmin,
      isManager: userStore.isManager
    });
  } else {
    console.log('User store not found');
  }
} else {
  console.log('Nuxt app not available');
}