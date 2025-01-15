<template>
<HeaderComponent />
<div class="sect-add">
    <h1>Add Book Page</h1>

    <form class="add">
        <input type="text" v-model="books.title" placeholder="Enter name of Book">
        <input type="text" v-model="books.author" placeholder="Enter name of Author">
        <input type="text" v-model="books.publishedDate" placeholder="Enter date of Publishment">

        <button type="button" v-on:click="addBook">Add New Book</button>
    </form>
</div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import axios from 'axios';

export default {
    name: "AddBook",
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
            hasTit: false,
            hasAut: false,
            hasDate: false
        }
    },
    methods: {
        async addBook() {
            this.hasTit = this.books.title.length >= 3;
            this.hasAut = this.books.author.length >= 3;
            this.hasDate = this.books.publishedDate.length >= 3;

            if (this.hasTit && this.hasAut && this.hasDate) {
                try {
                    let result = await axios.post("http://localhost:3000/books", {
                        title: this.books.title,
                        author: this.books.author,
                        publishedDate: this.books.publishedDate,
                    });
                    if (result.status === 201) {
                        alert("Book added successfully");
                        localStorage.setItem("user-info", JSON.stringify(result.data));
                        this.$router.push({
                            name: 'Home'
                        });
                    }
                } catch (error) {
                    console.error("Error adding book:", error);
                }
            } else {
                alert("Please correct the highlighted fields.");
            }
        }

    },
    mounted() {
        let user = localStorage.getItem('user-info')
        if (!user) {
            this.$router.push({
                name: 'SignUp'
            })
        }
    },
}
</script>

<style>
.add button,
.add input {
    margin-top: 40px;
}
</style>
