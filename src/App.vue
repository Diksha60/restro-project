<template>
    <router-view></router-view>
</template>

<script>

export default {
    name: 'App',
}
</script>

<style>
body {
    padding: 0;
    margin: 0;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
.sect, .sect-login, .sect-add, .sect-update {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
}

.logo {
    width: 100px;
}

.register input, .login input, .add input, .update input {
    width: 350px;
    height: 40px;
    padding: 16px;
    border: 2px solid;
    display: block;
    margin-left: auto;
    margin-right: auto;
}

.register button, .login button, .add button, .update button {
    width: 385px;
    height: 65px;
    border: 1px solid deepskyblue;
    background: deepskyblue;
    color: white;
    cursor: pointer;
    font-size: 20px;
    font-weight: 600;
}

</style>
