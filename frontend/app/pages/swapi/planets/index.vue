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
    max-width: 900px;
    margin: 0 auto;
    padding: 1.5rem;
  }

  .header h1 {
    font-size: 1.8rem;
    margin-bottom: 0.25rem;
  }

  .header p {
    color: #555;
    margin-bottom: 1.5rem;
  }

  .status {
    font-size: 0.95rem;
    color: #555;
  }

  .status.error {
    color: #b91c1c;
  }

  .list {
    list-style: none;
    padding: 0;
    margin: 0;
    margin-bottom: 15px;
    display: grid;
    gap: 0.75rem;
  }

  .card {
    background: white;
    padding: 1rem;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    border: 1px solid #eee;
    transition: all 0.2s ease;
  }

  .card:hover {
    background: #f9fafb;
    transform: translateY(-2px);
  }

  .name {
    font-weight: 600;
  }

  .arrow {
    font-size: 1.2rem;
    color: #666;
  }

  /* Responsivo */
  @media (max-width: 600px) {
    .header h1 {
      font-size: 1.5rem;
    }

    .card {
      padding: 0.85rem;
    }
  }
</style>