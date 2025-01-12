<template>
<HeaderComponent />
<h1>Welcome to the Home Page, {{ name }}</h1>
<table border="1px">
    <tr>
        <td>ID</td>
        <td>Title</td>
        <td>Author</td>
        <td>Published Date</td>
    </tr>
    <tr v-for="book in books" :key="book.id">
        <td>{{ book.id }}</td>
        <td>{{ book.title }}</td>
        <td>{{ book.author }}</td>
        <td>{{ book.publishedDate }}</td>
    </tr>
</table>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import axios from 'axios';

export default {
    name: "HomeComponent",
    data() {
        return {
            name: '',
            books: [],
        }
    },
    components: {
        HeaderComponent,
    },
    async mounted() {
        let user = localStorage.getItem('user-info')
        this.name = JSON.parse(user).name
        if (!user) {
            this.$router.push({
                name: 'SignUp'
            })
        }
        let result = await axios.get("http://localhost:3000/books")
        console.log(result)
        this.books = result.data
    }
}
</script>

<style>
td {
    width: 250px;
    height: 50px;
}
</style>
