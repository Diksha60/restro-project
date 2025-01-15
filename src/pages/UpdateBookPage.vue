<template>
<HeaderComponent />
<div class="sect-update">
    <h1>Update Book Page</h1>

    <form class="update">
        <input type="text" name="name" v-model="books.title" id="name" placeholder="Enter name of Book">
        <input type="text" name="author" v-model="books.author" id="author" placeholder="Enter name of Author">
        <input type="text" name="publishedDate" v-model="books.publishedDate" id="publishedDate" placeholder="Enter date of Publishment">
        <button type="button" v-on:click="updateBook">Update Book</button>
    </form>
</div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import axios from 'axios';

export default {
    name: "UpdateBook",
    components: {
        HeaderComponent,
    },
    data() {
        return {
            books: {
                title: '',
                author: '',
                publishedDate: ''
            },
            errors: {

            }
        }
    },
    async mounted() {
        const result = await axios.get("http://localhost:3000/books/" + this.$route.params.id)
        this.books = result.data

        let user = localStorage.getItem('user-info')
        if (!user) {
            this.$router.push({
                name: 'SignUp'
            })
        }
    },
    methods: {
        async updateBook() {
            let result = await axios.put("http://localhost:3000/books/"+this.$route.params.id, {
                title: this.books.title,
                author: this.books.author,
                publishedDate: this.books.publishedDate,
            });
            if (result.status === 200) {
                this.$router.push({name: 'Home'})
            }
        }
    },
}
</script>

<style>
.update button,
.update input {
    margin-top: 40px;
}
</style>
