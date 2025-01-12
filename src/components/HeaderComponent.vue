<template>
<div class="nav-bar">
    <router-link to="/">Home</router-link>
    <router-link to="add">Add Book</router-link>
    <router-link to="update">Update Book</router-link>
    <a href="#" v-on:click="logout">Logout</a>
</div>
</template>

<script>
export default {
    name: "HeaderComponent",
    methods: {
        logout() {
            localStorage.clear()
            this.$router.push({name: 'LoginComponent'})
        }
    }
}
</script>
<style>
.nav-bar {
    background-color: gray;
    overflow: hidden;
    display: flex;
    justify-content: end;
}
.nav-bar a {
    float: left;
    text-align: center;
    color: white;
    font-weight: 500;
    padding: 16px 16px;
    text-decoration: none;
    font-size: 16px;
    margin-right: 40px;
}
.nav-bar a:hover {
    background-color:aliceblue;
    color: skyblue;
}
</style>
