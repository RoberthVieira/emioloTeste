<script setup>
    import PlayerFake from '~/components/PlayerFake.vue';
    import ListaEventos from '~/components/ListaEventos.vue';
</script>

<template>
    <main class="container">
        <h1>Inferência em Tempo Real</h1>

        <p class="subtitle">
            Simulação de processamento de IA com eventos em tempo real
        </p>

        <section class="content">
            <PlayerFake />
            <ListaEventos />
        </section>
    </main>
</template>

<style scoped>
    .container{
        max-width: 900px;
        margin: 0 auto;
        padding: 1.5rem;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
    }

    h1{
        font-size: 2rem;
        margin-bottom: 0.5rem;
    }

    .subtitle{
        color: #555;
        margin-bottom: 2rem;
        font-size: 1rem;
    }

    .content{
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    /* Mobile */
    @media (max-width: 600px){
        h1{
            font-size: 1.6rem;
        }

        .container{
            padding: 1rem;
        }
    }

    /* Telas grandes */
    @media (min-width: 1024px) {
        .content{
            gap: 2rem;
        }
    }
</style>