import axios from "axios"

const state = {
    users: null,
    error: null
}
const mutations = {
    setUsers: (state, users) => (state.users = users),
    setError: (state, error) => (state.error = error)
}
const actions = {
    async signUp({ commit }, userData) {
        try {
            let response = await axios.post("http://localhost:3000/user", userData);
            commit('setUsers', response.data);
            localStorage.setItem("user-info", JSON.stringify(response.data));
            return response;
        } catch (error) {
            commit('setError', error.response ? error.response.data : "Sign-up failed");
            throw error;
        }
    },
    async loginUser({ commit }, credentials) {
        try {
            // Fetch user with provided email and password
            const response = await axios.get(
                `http://localhost:3000/user?email=${credentials.email}&password=${credentials.password}`
            );

            if (response.data.length === 0) {
                throw new Error("Invalid email or password");
            }

            const user = response.data[0];
            commit('setUsers', user);
            localStorage.setItem("user-info", JSON.stringify(user));

            return user;
        } catch (error) {
            commit('setError', error.message || "Login failed");
            throw error;
        }
    }
}
const getters = {
    getUsers: state => state.users,
    getError: state => state.error
}
export default {
    state,
    getters,
    actions,
    mutations,
}