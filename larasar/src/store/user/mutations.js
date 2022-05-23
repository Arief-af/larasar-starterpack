import { api } from 'boot/axios'
export function increment (state) {
    state.totalLikes++
}

export function setToken (state, token) {
    state.token = token
}


