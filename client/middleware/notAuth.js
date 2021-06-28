import axios from 'axios'
import settings from "@/nuxt.config";

export default async function({store, redirect}) {
  if (store.getters['hasToken']) {
    try {
      await axios.get(
        `${settings.axios.baseURL}auth/check_auth`,
        {
          headers: {
            'Authorization': `Bearer ${store?.getters['token']}`
          }
        }
      )
      redirect('/')
    } catch (e) {}
  }
}
