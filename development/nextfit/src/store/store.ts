import { createStore } from 'vuex'

export const store = createStore({
    state () {
      return {
        isActive: true 
      }
    },
    mutations: {
      change(state, value) {
        state.isActive = value
      }
    }
  })

  export default store