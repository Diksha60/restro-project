import { createRouter, createWebHistory } from "vue-router";
import IndexPage from "./pages/IndexPage.vue";
import SignUpPage from "./pages/SignUpPage.vue";
import LoginPage from "./pages/LoginPage.vue";
import AddBookPage from "./pages/AddBookPage.vue";
import UpdateBookPage from "./pages/UpdateBookPage.vue";
// import HomeComponent from "./components/HomeComponent.vue";


const routes = [
    {
        name: "Home",
        component: IndexPage,
        path: '/'
    },
    {
        name: "SignUp",
        component: SignUpPage,
        path: '/sign-up'
    },
    {
        name: "LoginComponent",
        component: LoginPage,
        path: '/login'
    },
    {
        name: "AddBook",
        component: AddBookPage,
        path: '/add'
    },
    {
        name: "UpdateBook",
        component: UpdateBookPage,
        path: '/update/:id'
    },
]

const Router =createRouter ({
    history: createWebHistory(),
    routes: routes
})

export default Router