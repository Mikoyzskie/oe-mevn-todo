<script setup>
  import axios from 'axios';
  import { ref, onMounted } from 'vue';

  const isLoading = ref(false)
  const todoList = ref([])
  const getTodoList = async () => {
    
     try {
      const response = await axios.get('http://localhost:5000/api/todos');
      todoList.value = [...response.data]; // Store the actual data
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  }

  onMounted(() => {
    getTodoList();
  });
</script>

<template>
  <div class="about">
    <p v-if="isLoading">Loading...</p>
    <ul v-else>
      <li v-for="(todo, index) in todoList" :key="index">{{ JSON.stringify(todo) }}</li>
    </ul>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

