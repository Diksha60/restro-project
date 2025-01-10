<template>
<div class="sect">
    <img class="logo" src="../assets/logo.png" alt="">
    <h1>Sign Up</h1>

    <div class="register">
        <div>
            <label for="Name">Name: </label>
            <input type="text" name="Name" placeholder="Enter Your Name" id="Name" v-model="name">
            <br><br>
        </div>

        <div>
            <label for="Email">Email: </label>
            <input type="text" name="Email" placeholder="Enter Your Email" id="Email" v-model="email">
            <br><br>
        </div>

        <div>
            <label for="Password">Password: </label>
            <input type="password" name="Password" placeholder="Enter Your Password" id="Email" v-model="password">
            <br><br>
        </div>
        <button v-on:click="signUp">Sign Up</button>
    </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
    name: "SignUp",
    data() {
        return {
            name: '',
            email: '',
            password: '',
        }
    },
    methods: {
        async signUp() {
            let register = await axios.post("http://localhost:3000/user", {
                email: this.email,
                password: this.password,
                name: this.name
            })
            if(register.status===201) {
                alert("Sign Up done successfully")
                localStorage.setItem("user-info",JSON.stringify(register.data))
            }
        }
    }
}
</script>

<style>
.sect {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    margin-top: 200px;
}

.logo {
    width: 100px;
}

.register input {
    width: 250px;
    height: 20px;
    padding: 8px;
    margin-left: 4px;
    border: 2px solid;
    display: block;
    margin-top: 8px;
}

.register label {
    font-size: large;
    font-weight: 600;
}

.register button {
    width: 270px;
    height: 50px;
    border: 1px solid deepskyblue;
    background: deepskyblue;
    color: white;
    cursor: pointer;
    font-size: 17px;
    font-weight: 600;
}
</style>
