import { message } from 'ant-design-vue'

import { useStore } from './store.js'
import { routeNames } from './constants'

const store = useStore()

export const authGuard = async (to, from, next) => {
  const { signIn } = routeNames

  if (to.meta.isAuthOptional) {
    next()
  } else {
    if (store.user) {
      next()
    } else {
      message.warn('You need to login to access this page.')
      await next({ name: signIn })
    }
  }
}
