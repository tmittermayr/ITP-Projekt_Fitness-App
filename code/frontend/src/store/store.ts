import { createStore } from 'vuex'

export const store = createStore({
    state () {
      return {
        isActive: true,
        trainingsInformation: Object,
      }
    },
    mutations: {
      change(state, value) {
        state.isActive = value
      },
      write(state, value) {
        state.trainingsInformation = value
      }
    }
  })

  export default store