<script setup lang="ts">
    import { computed } from 'vue'
    import UserCard from '~/components/UserCard.vue'
    import BackButton from '~/components/BackButton.vue'

    type User = {
        _id: string
        name: string
        email: string
        avatar?: string
    }

    const { data, pending, error } = useFetch<User[]>(
        'http://localhost:3000/users',
        { credentials: 'include', server: false}
    )   

    const users = computed(() => data.value ?? [])
</script>

<template>
    <main class="users-page">
        <h1>Usuários cadastrados</h1>

        <p v-if="pending">Carregando usuários...</p>
        <p v-else-if="error">Erro ao carregar usuários</p>

        <div v-else class="list">
            <UserCard
                v-for="user in users"
                :key="user._id"
                :user="{
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar
                }"
            />
        </div>

        <BackButton></BackButton>
    </main>
</template>

<style scoped>
    .users-page {
        max-width: 800px;
        margin: 0 auto;
        padding: 1.5rem;
    }

    h1 {
        margin-bottom: 1rem;
    }

    .list {
        display: grid;
        gap: 0.75rem;
        margin-bottom: 15px;
    }

    /* Desktop */
    @media (min-width: 768px) {
        .list {
            grid-template-columns: repeat(2, 1fr);
        }
    }
</style>