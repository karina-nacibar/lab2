<template>
  <div class="container">
    <h1>Gestor de Tareas</h1>

    <input 
      v-model="newTask" 
      placeholder="Escribe el nombre de la tarea" 
      @keyup.enter="addTask" 
    />
    <button @click="addTask">Agregar</button>

    <hr />

    <div v-if="tasks.length > 0" class="kanban">
      <div class="column todo">
        <h2>To do</h2>
        <div 
          v-for="(task, index) in tasks.filter(t => t.status === 'todo')" 
          :key="index" 
          class="task">
          {{ task.name }}
          <button @click="moveTask(task, 'doing')">➡</button>
        </div>
      </div>

      <div class="column doing">
        <h2>Doing</h2>
        <div 
          v-for="(task, index) in tasks.filter(t => t.status === 'doing')" 
          :key="index" 
          class="task">
          {{ task.name }}
          <button @click="moveTask(task, 'done')">➡</button>
        </div>
      </div>

      <div class="column done">
        <h2>Done</h2>
        <div 
          v-for="(task, index) in tasks.filter(t => t.status === 'done')" 
          :key="index" 
          class="task">
          {{ task.name }}

        </div>
      </div>
    </div>

    <div v-else>
      <p>No hay tareas registradas.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const newTask = ref('')
const tasks = ref([])

const addTask = () => {
  const name = newTask.value.trim()
  if (name !== '') {
    tasks.value.push({ name, status: 'todo' })
    newTask.value = ''
  }
}

const moveTask = (task, nextStatus) => {
  task.status = nextStatus
}
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 40px auto;
  font-family: Arial, sans-serif;
  text-align: center;
}

input {
  padding: 8px;
  width: 60%;
}

button {
  margin-left: 8px;
  padding: 6px 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.kanban {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.column {
  flex: 1;
  margin: 0 10px;
  padding: 10px;
  border-radius: 8px;
  background: #f4f4f4;
  min-height: 200px;
}

.todo { background: #e3f2fd; }   
.doing { background: #e8f5e9; } 
.done { background: #ffebee; }  
.task {
  background: white;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
}
</style>