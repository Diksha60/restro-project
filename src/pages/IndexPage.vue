<template>
<HeaderComponent />
<div class="sect-home">
    <h1>Welcome to the Home Page, {{ name }}</h1>
    <table border="1px" class="table">
        <tr v-if="books.length === 0">
            <td colspan="5">No books available.</td>
        </tr>
        <tr>
            <td>ID</td>
            <td>Title</td>
            <td>Author</td>
            <td>Published Date</td>
            <td>Actions</td>
        </tr>
        <tr v-for="(book, index) in books" :key="book.id">
            <td>{{ index + 1 }}</td>
            <td>{{ book.title }}</td>
            <td>{{ book.author }}</td>
            <td>{{ book.publishedDate }}</td>
            <td class="data">
                <router-link :to="'/update/'+book.id">Update</router-link>
                <button type="button" v-on:click="deleteBook(book.id)">Delete</button>
            </td>
        </tr>

    </table>

</div>
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
    methods: {
        async deleteBook(id) {
            try {
                let result = await axios.delete(`http://localhost:3000/books/${id}`);
                if (result.status === 200) {
                    this.loadData()
                }
            } catch (error) {
                console.error("Error deleting book:", error);
            }
        },
        async loadData() {
            let user = localStorage.getItem('user-info');
            if (!user) {
                this.$router.push({
                    name: 'SignUp'
                });
                return;
            }

            try {
                this.name = JSON.parse(user).name;

                let result = await axios.get("http://localhost:3000/books");
                this.books = result.data;
            } catch (error) {
                console.error("Error loading books:", error);
            }
        }

    },
    mounted() {
        this.loadData()
    },
}
</script>

<style>
.sect-home {
    margin-top: 120px;
}

td {
    width: 250px;
    height: 50px;
}

.table {
    margin-top: 30px;
    margin-left: auto;
    margin-right: auto;
}

.data {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
}
</style>
