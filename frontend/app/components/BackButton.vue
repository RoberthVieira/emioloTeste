<script setup>
    import { useRouter } from 'vue-router'

    const router = useRouter()

    const goBack = () => {
        router.back()
    }
</script>

<template>
    <button @click="goBack" class="back-btn">
        Voltar
    </button>
</template>

<style scoped>
    .back-btn{
        background: #ef4444;
        color: white;
        border: none;
        padding: .5rem 1rem;
        border-radius: 6px;
        cursor: pointer;
    }
</style>