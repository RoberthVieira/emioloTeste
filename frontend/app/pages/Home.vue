<script setup>
    import { useRouter, useRoute } from 'vue-router';
    import { computed } from 'vue';

    const router = useRouter();
    const route = useRoute();

    const logout = () => {
        router.push('/')
    }

    // Em vez de buscar no servidor, pegamos direto da URL que o Nest enviou
    const user = computed(() => {
        if (route.query.name && route.query.email) {
            return {
                name: route.query.name,
                email: route.query.email
            }
        }
        return null;
    });
</script>

<template>
    <main class="home">
        <header class="header">
            <h1>Bem-vindo</h1>
            <button @click="logout">Sair</button>
        </header>

        <section v-if="user">
            <div>
                <strong>{{ user.name }}</strong>
                <p>{{ user.email }}</p>
            </div>
        </section>

        <nav class="menu">
            <NuxtLink to="/users">👥 Usuários</NuxtLink>
            <NuxtLink to="/swapi/people">🌌 Star Wars</NuxtLink>
            <NuxtLink to="/swapi/planets">🪐 Planets</NuxtLink>
        </nav>
    </main>
</template>

<style>
    .home {
        max-width: 900px;
        margin: 0 auto;
        padding: 1.5rem;
    }

    .header{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .header button {
        background: #ef4444;
        color: white;
        border: none;
        padding: .5rem 1rem;
        border-radius: 6px;
        cursor: pointer;
    }

    .profile {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin: 2rem 0;
    }

    .profile img {
        width: 96px;
        height: 96px;
        border-radius: 50%;
    }

    .menu {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 1rem;
    }

    .menu a {
        background: #f1f5f9;
        padding: 1rem;
        border-radius: 8px;
        text-align: center;
        font-weight: 600;
        text-decoration: none;
        color: #0f172a;
    }

    .menu a:hover {
        background: #e2e8f0;
    }
</style>