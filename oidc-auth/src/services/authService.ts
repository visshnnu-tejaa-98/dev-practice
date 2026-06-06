import type { LoginUserType } from '#/types'
import { api } from './api'
import { tokenStore } from './tokenStore'

export const authService = {
  async login({ email, password }: LoginUserType) {
    const { data } = await api.post('/api/auth/login', { email, password })
    tokenStore.set(data)
    return data
  },
}
