<template>
<p>Hello</p>
{{ printHello }}
</template>
<script setup>
import {  onMounted, ref } from 'vue';

const printHello = ref('hello---')

onMounted(() => {
    console.log('hello', printHello.value)
})
</script>