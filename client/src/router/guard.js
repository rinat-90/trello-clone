import store from "@/store";

export default (to, from, next) => {
  store.dispatch('auth/authenticate')
    .then(() => {
      next('/boards')
    })
    .catch(() => {
      next('/signin')
    })
}