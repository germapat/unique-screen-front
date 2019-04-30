export function colorCCC ({ commit }) {
  commit('style/setColorTratemiento', 'red-4', { root: true })
}

export function colorDanioAbierto ({ commit }) {
  commit('style/setColorTratemiento', 'orange-4', { root: true })
}

export function colorCambioWifi ({ commit }) {
  commit('style/setColorTratemiento', 'green-4', { root: true })
}

export function colorClienteSuspendido ({ commit }) {
  commit('style/setColorTratemiento', 'deep-purple-4', { root: true })
}

export function colorDefault ({ commit }) {
  commit('style/setColorTratemiento', 'white', { root: true })
}
