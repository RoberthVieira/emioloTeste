<script setup>
  import { useRoute } from 'vue-router'
  import { ref, onMounted } from 'vue'

  import BackButton from '~/components/BackButton.vue'

  const route = useRoute()
  const planet = ref(null)

  onMounted(async () => {
    const res = await fetch(`https://swapi.py4e.com/api/planets/${route.params.id}`)
    planet.value = await res.json()
  })
</script>

<template>
  <main class="page">
    <h1>Planeta</h1>

    <div v-if="planet" class="card">
      <p><strong>Nome:</strong> {{ planet.name }}</p>
      <p><strong>Clima:</strong> {{ planet.climate }}</p>
      <p><strong>População:</strong> {{ planet.population }}</p>
    </div>

    <BackButton></BackButton>
  </main>
</template>

<style scoped>
  .page {
    max-width: 700px;
    margin: 0 auto;
    padding: 2rem;
  }

  h1 {
    margin-bottom: 1.5rem;
  }

  .card {
    background: white;
    padding: 1.5rem;
    margin-bottom: 15px;
    border-radius: 10px;
    box-shadow: 0 6px 15px rgba(0,0,0,0.08);
  }

  .card p {
    margin-bottom: 0.5rem;
  }
</style>