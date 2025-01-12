<template>
    <HeaderComponent />
    <h1>Update Book Page</h1>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';


export default {
    name: "UpdateBook",
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