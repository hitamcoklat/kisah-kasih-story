export const state = () => ({
    dataUser: []
})

export const mutations = {
    add(state, text) {
        state.dataUser = text
    },
    remove(state) {
        state.dataUser = []
    }
}