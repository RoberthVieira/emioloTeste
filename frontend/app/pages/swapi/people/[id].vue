<script setup>
  import { useRoute } from 'vue-router'
  import { ref, onMounted } from 'vue'

  import BackButton from '~/components/BackButton.vue'

  const route = useRoute()
  const person = ref(null)

  onMounted(async () => {
    const res = await fetch(`https://swapi.py4e.com/api/people/${route.params.id}`)
    person.value = await res.json()
  })
</script>

<template>
  <main class="page">
    <h1>Detalhes do Personagem</h1>

    <div v-if="person" class="card">
      <p><strong>Nome:</strong> {{ person.name }}</p>
      <p><strong>Altura:</strong> {{ person.height }} cm</p>
      <p><strong>Peso:</strong> {{ person.mass }} kg</p>
      <p><strong>Gênero:</strong> {{ person.gender }}</p>
      <p><strong>Ano de nascimento:</strong> {{ person.birth_year }}</p>
      <p><strong>Cor do cabelo:</strong> {{ person.hair_color }}</p>
      <p><strong>Cor da pele:</strong> {{ person.skin_color }}</p>
      <p><strong>Cor dos olhos:</strong> {{ person.eye_color }}</p>
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
