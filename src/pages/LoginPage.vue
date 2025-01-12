<template>
    <div class="sect-login">
        <img class="logo" src="../assets/logo.png" alt="">
        <h1>Login</h1>
        <div class="login">
    
            <input type="text" name="Email" placeholder="Enter Your Email" id="Email" v-model="email">
            <span v-if="error.email">{{ error.email }}</span>
            <br><br>
    
            <input type="password" name="Password" placeholder="Enter Your Password" id="Email" v-model="password">
            <span v-if="error.password">{{ error.password }}</span>
    
            <br><br>
            <button v-on:click="login">Login</button>
            <p>
                <router-link to="/sign-up">Sign Up</router-link>
            </p>
        </div>
    </div>
    </template>
    
    <script>
    import axios from 'axios';
    
    export default {
        name: "LoginComponent",
        data() {
            return {
                email: '',
                password: '',
                error: {},
            }
        },
        methods: {
            async login() {
                this.error = {}
                if (!this.email.includes('@')) {
                    this.error.email = 'Invalid email';
                } else if (!this.email.includes(".com")) {
                    this.error.email = 'Invalid email format'
                }
                if (!this.password) {
                    this.error.password = 'Password is required.';
                } else if (this.password.length < 8) {
                    this.error.password = 'Password must be at least 8 characters.';
                } else if (!/[A-Z]/.test(this.password)) {
                    this.error.password = 'Password must contain at least one uppercase letter.';
                }
    
                let result = await axios.get(
                    `http://localhost:3000/user?email=${this.email}&password=${this.password}`, 
                    )
                console.log(result)
                if (result.status === 200 && result.data.length>0) {
                    localStorage.setItem("user-info", JSON.stringify(result.data[0]))
                    this.$router.push({name: 'Home'})
                }
            }
        },
        mounted() {
            let user = localStorage.getItem('user-info')
            if (user) {
                this.$router.push({name: 'Home'})
            }
        }
    }
    </script>
    