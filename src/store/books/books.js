import axios from "axios"

const state = {
    products: []
}
const getters = {
    allProducts: state => state.products
}
const actions = {
    async getUsers({commit}){
        const response = await axios.get("http://localhost:3000/products")
        commit("setProducts", response.data)
    },
    async addProduct({ commit }, products) {
        const response = await axios.post("http://localhost:3000/products", products)
        commit("newProduct", response.data)
    },
    async deleteProduct({ commit }, id) {
        await axios.delete(`http://localhost:3000/products/${id}`)
        commit("removeProduct", id)
    },
}
const mutations = {
    setProducts: (state, products) => (state.products = products),
    newProducts: (state, product) => (state.products.unShift(product)),
    removeProduct: (state, id) => (state.products.filter(product => product.id !== id))
}

export default {
    state,
    getters,
    actions,
    mutations
}