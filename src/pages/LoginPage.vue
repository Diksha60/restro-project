<!-- <template>
<div class="sect-login">
    <img class="logo" src="../assets/logo.png" alt="">
    <h1>Login</h1>
    <div class="login">
        <input type="text" placeholder="Enter Your Email" v-model="email">
        <span v-if="error.email">{{ error.email }}</span>
        <br><br>

        <input type="password" placeholder="Enter Your Password" v-model="password">
        <span v-if="error.password">{{ error.password }}</span>
        <br><br>

        <button @click="loginUser">Login</button>
        <p>
            <router-link to="/sign-up">Sign Up</router-link>
        </p>
    </div>
</div>
</template>

<script>
    import {
        mapActions,
        mapState
    } from 'vuex';

    export default {
        name: "LoginComponent",
        data() {
            return {
                email: '',
                password: '',
                error: {},
            }
        },
        computed: {
            ...mapState(['error']),
        },
        methods: {
            ...mapActions(['loginUser']),
            async loginUser() {
                this.error = {};

                // Input validation
                if (!this.email.includes('@') || !this.email.includes(".com")) {
                    this.error.email = 'Invalid email format';
                }

                if (!this.password) {
                    this.error.password = 'Password is required.';
                } else if (this.password.length < 8) {
                    this.error.password = 'Password must be at least 8 characters.';
                } else if (!/[A-Z]/.test(this.password)) {
                    this.error.password = 'Password must contain at least one uppercase letter.';
                }

                if (Object.keys(this.error).length) return;

                try {
                    await this.loginUser({
                        email: this.email,
                        password: this.password
                    });
                    this.$router.push({
                        name: 'Home'
                    });
                } catch (error) {
                    alert(this.error || "Login failed.");
                }
            }
        },
        mounted() {
            if (localStorage.getItem('user-info')) {
                this.$router.push({
                    name: 'Home'
                });
            }
        }
    }
</script> -->

<template>
    <div class="sect-login">
        <img class="logo" src="../assets/logo.png" alt="">
        <h1>Login</h1>
        <div class="login">

            <input type="text" name="email" placeholder="Enter Your Email" id="Email" v-model="email">
            <span v-if="error.email">{{ error.email }}</span>
            <br><br>

            <input type="password" name="password" placeholder="Enter Your Password" id="Password" v-model="password">
            <span v-if="error.password">{{ error.password }}</span>
            <br>
            <p v-if="errorMessage">{{ errorMessage }}</p>
             <!-- <span v-if="errorMessage">{{ errorMessage }} <br></span> -->
             <br>
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
                errorMessage: ''
            }
        },
        methods: {
            async login() {
                this.error = {}
                this.errorMessage = ''
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
    
                if(Object.keys(this.error).length) return

                // let result = await axios.get(
                //     `http://localhost:3000/user?email=${this.email}&password=${this.password}`, 
                //     )
                // console.log(result)
                // if (result.status === 200 && result.data.length>0) {
                //     localStorage.setItem("user-info", JSON.stringify(result.data[0]))
                //     this.$router.push({name: 'Home'})
                // }
                // else {
                //     alert("Incorrect email and password")
                // }

                try {
                    let response = await axios.get(
                    `http://localhost:3000/user?email=${this.email}&password=${this.password}`, 
                    )

                    // const response = await axios.post('http://localhost:3000/user/login', {
                    //     email: this.email,
                    //     password: this.password
                    // });

                    if (response.status === 200 && response.data.length>0) {
                        alert('Login successful!');
                        localStorage.setItem('user-info', JSON.stringify(response.data[0]));
                        this.$router.push({ name: 'Home' });
                    }
                } catch (error) {
                    console.error("Error during login:", error);
                    // Check if it's an Axios error with response
                    if (error.response) {
                        this.errorMessage = error.response.status === 404
                            ? 'Invalid email or password.'
                            : 'An error occurred.';
                    } else {
                        // If it's a network error or other non-Axios error
                        this.errorMessage = error.message || 'Network error. Please check your connection.';
                    }
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
