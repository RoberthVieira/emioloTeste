<script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'

  import BackButton from '~/components/BackButton.vue';

  const router = useRouter()
  const planets = ref([])
  const loading = ref(true)

  onMounted(async () => {
    const res = await fetch('https://swapi.py4e.com/api/planets')
    const json = await res.json()

    planets.value = json.results.map(p => ({
      name: p.name,
      id: p.url.split('/').filter(Boolean).pop()
    }))

    loading.value = false
  })

  const goToPlanet = (id) => {
    router.push(`/swapi/planets/${id}`)
  }
</script>

<template>
  <main class="page">
    <header class="header">
      <h1>Planetas</h1>
      <p>Explore os planetas do universo Star Wars</p>
    </header>

    <p v-if="pending" class="status">Carregando planetas...</p>
    <p v-else-if="error" class="status error">
      Erro ao carregar dados da SWAPI
    </p>

    <ul v-else class="list">
      <li v-for="planet in planets" :key="planet.id" class="card" @click="goToPlanet(planet.id)">
        <span class="name">{{ planet.name }}</span>
        <span class="arrow">→</span>
      </li>
    </ul>

    <BackButton></BackButton>
  </main>
</template>

<style scoped>
  .page {
    height: 100vh;
    width: 100vw;
    max-width: 900px;
    margin: 0 auto;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    color: #ffe81f; /* Amarelo Star Wars */
    font-family: 'Segoe UI', sans-serif;
}

.header h1 {
    font-size: 1.6rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 0.25rem;
    text-shadow: 0 0 8px rgba(255, 232, 31, 0.4);
}

.header p {
    color: #888;
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
}

.status {
    font-size: 0.95rem;
    color: #ffe81f;
    text-align: center;
    margin-top: 2rem;
}

.status.error {
    color: #ef4444;
}

.list {
    flex: 1;
    overflow-y: auto;
    list-style: none;
    padding: 0 0.5rem 0 0;
    margin: 0 0 1.5rem 0;
    display: grid;
    gap: 0.75rem;
}

.list::-webkit-scrollbar {
    width: 5px;
}
.list::-webkit-scrollbar-track {
    background: #111;
}
.list::-webkit-scrollbar-thumb {
    background: #ffe81f;
    border-radius: 10px;
}

.card {
    background: #151515;
    padding: 1rem;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    border: 1px solid #333;
    transition: all 0.2s ease;
}

.card:hover {
    border-color: #ffe81f;
    background: rgba(255, 232, 31, 0.05);
    transform: translateX(5px);
}

.name {
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.arrow {
    font-size: 1.2rem;
    color: #ffe81f;
}

:deep(.back-btn) {
    align-self: flex-start;
}

@media (max-width: 600px) {
    .header h1 {
        font-size: 1.3rem;
    }

    .card {
        padding: 0.85rem;
    }
}
</style>