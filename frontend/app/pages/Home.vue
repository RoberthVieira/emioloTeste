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
            <NuxtLink to="/dashboard">Inferência em Tempo Real</NuxtLink>
        </nav>
    </main>
</template>

<style>
    *{
        margin: 0;
        padding: 0;
        background: #0a0a0a
    }
    .home {
        height: 100vh;
        width: 100vw;
        box-sizing: border-box;
        max-width: 900px;
        margin: 0 auto;
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        font-family: 'Segoe UI', Roboto, sans-serif;
        color: #ffe81f; 
    }

    .header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #333;
        padding-bottom: 1rem;
    }

    .header h1 {
        font-size: 1.5rem;
        text-transform: uppercase;
        letter-spacing: 2px;
        text-shadow: 0 0 5px rgba(255, 232, 31, 0.3);
    }

    .header button {
        background: transparent;
        color: #ef4444; /* Vermelho para o Sair (Lado Sombrio) */
        border: 1px solid #ef4444;
        padding: .4rem .8rem;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
        text-transform: uppercase;
        font-size: 0.8rem;
        transition: all 0.2s;
    }

    .header button:hover {
        background: rgba(239, 68, 68, 0.1);
        box-shadow: 0 0 10px rgba(239, 68, 68, 0.3);
    }

    section {
        background: rgba(255, 232, 31, 0.05);
        padding: 1rem;
        border-left: 3px solid #ffe81f;
        border-radius: 4px;
    }

    section strong {
        font-size: 1.1rem;
        display: block;
    }

    section p {
        color: #888;
        font-size: 0.9rem;
    }

    .menu {
        display: grid;
        grid-template-columns: repeat(2, 1fr); 
        gap: 1rem;
        flex-grow: 1;
    }

    .menu a {
        background: #111;
        border: 1px solid #333;
        padding: 0;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        text-decoration: none;
        color: #ffe81f;
        text-transform: uppercase;
        font-size: 0.85rem;
        letter-spacing: 1px;
        transition: all 0.2s ease;
        text-align: center;
    }

    .menu a:hover {
        border-color: #ffe81f;
        background: rgba(255, 232, 31, 0.1);
        box-shadow: 0 0 15px rgba(255, 232, 31, 0.15);
        transform: translateY(-2px);
    }

    @media (max-height: 500px) {
        .home {
            padding: 0.5rem;
            gap: 0.5rem;
        }
        .menu {
            gap: 0.5rem;
        }
    }
</style>