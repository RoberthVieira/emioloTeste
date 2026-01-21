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
    height: 100vh;
    width: 100vw;
    max-width: 700px;
    margin: 0 auto;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    color: #ffe81f;
    font-family: 'Segoe UI', sans-serif;
}

h1 {
    font-size: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 2rem;
    text-align: center;
    border-bottom: 2px solid #ffe81f;
    padding-bottom: 0.5rem;
    text-shadow: 0 0 10px rgba(255, 232, 31, 0.5);
}

.card {
    background: #111;
    padding: 2rem;
    margin-bottom: 2rem;
    border-radius: 4px;
    border: 1px solid #333;
    box-shadow: inset 0 0 20px rgba(255, 232, 31, 0.05), 0 10px 30px rgba(0,0,0,0.5);
    position: relative;
}

.card::before {
    content: "";
    position: absolute;
    top: -1px; left: -1px;
    width: 20px; height: 20px;
    border-top: 3px solid #ffe81f;
    border-left: 3px solid #ffe81f;
}

.card p {
    margin-bottom: 0.8rem;
    font-size: 1rem;
    border-bottom: 1px solid #222;
    padding-bottom: 0.4rem;
    display: flex;
    justify-content: space-between;
}

.card p strong {
    color: #ffe81f;
    text-transform: uppercase;
    font-size: 0.8rem;
    letter-spacing: 1px;
    opacity: 0.8;
}

.card p :not(strong) {
    color: #fff;
}

:deep(.back-btn) {
    align-self: center; 
    min-width: 150px;
}


@media (max-width: 600px) {
    .page {
        padding: 1rem;
    }
    
    .card {
        padding: 1.2rem;
    }
    
    h1 {
        font-size: 1.2rem;
    }
}
</style>