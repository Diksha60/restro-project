<template>
    <HeaderComponent />
    <h1>Add Book Page</h1>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';


export default {
    name: "AddBook",
    components: {
        HeaderComponent,
    },
    mounted() {
        let user = localStorage.getItem('user-info')
        if (!user) {
            this.$router.push({name: 'SignUp'})
        }
    }
}
</script>