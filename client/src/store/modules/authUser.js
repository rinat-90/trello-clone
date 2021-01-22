import router from '@/router'
import { models } from "feathers-vuex";
const actions = {
  async signIn ({ dispatch }, payload ){
    try {
      await dispatch('auth/authenticate', {
        strategy: 'local',
        ...payload
      }, { root: true })
      await router.push('/boards')
    } catch (e) {
      console.log(e)
    }
  },

  async signUp({ dispatch }, payload) {
    try {
      const user = new models.api.User(payload)
      await user.save()
      await router.push('/boards')
    } catch (e) {
      console.log(e)
    }
  },

  async signOut({ dispatch }) {
    try {
      await dispatch('auth/logout', {}, { root: true})
      await router.push('/signin')
    }catch (e) {
      console.log(e)
    }
  }
}


export default {
  namespaced: true,
  actions
}
