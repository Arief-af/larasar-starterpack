export function increment (state) {
    state.totalLikes++
}

export function setUser(state, user) {
    state.user = user
}

export function logout(state) {
    state.user = null
}

export function darkMode(state, value) {
    state.dark = value
}


