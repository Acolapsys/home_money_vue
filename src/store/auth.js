import firebase from 'firebase/app'

export default {
  actions: {
    async login({ commit }, { email, password }) {
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            commit('SET_PROCESSING', false)
          })
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    async register({ dispatch }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = dispatch('getUid')
        await firebase.database.ref(`/users/${uid}/info`).set({
          bill: 10000,
          name
        })
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    async logout() {
      await firebase.auth().signOut()
    },
    getUid() {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    }
  },
  state: {
    processing: false, // процесс загрузки
    error: false // флаг ошибок
  },
  mutations: {
    SET_PROCESSING(state, payload) {
      state.processing = payload
    },
    SET_ERROR(state, payload) {
      state.error = payload
    },
    CLEAR_ERROR(state) {
      state.error = null
    }
  },
  getters: {
    getProcessing: state => {
      return state.processing
    },
    getError: state => {
      return state.error
    }
  }
}
