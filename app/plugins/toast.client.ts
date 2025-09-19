import Toast, { POSITION, type PluginOptions } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

export default defineNuxtPlugin((nuxtApp) => {
  const options: PluginOptions = {
    position: POSITION.TOP_RIGHT,
    timeout: 5000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: 'button',
    icon: true,
    rtl: false,
    // Estilos customizados para integrar com nosso design system
    toastClassName: "custom-toast",
    bodyClassName: ["custom-toast-body"],
    // Container personalizado
    container: document.body,
    // Configurações por tipo
    toastDefaults: {
      success: {
        timeout: 4000,
        closeButton: false,
      },
      error: {
        timeout: 0, // Não fecha automaticamente para erros
        closeButton: true,
      },
      warning: {
        timeout: 6000,
      },
      info: {
        timeout: 5000,
      }
    }
  }

  nuxtApp.vueApp.use(Toast, options)
})