<!-- src/components/TodoApp.vue -->
<template>
  <div class="todo-app">
    <div class="mb-6">
      <div class="flex gap-2">
        <input
          v-model="newTodo"
          @keyup.enter="addTodo"
          placeholder="Digite uma nova tarefa..."
          class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          data-testid="new-todo-input"
        />
        <button
          @click="addTodo"
          :disabled="!newTodo.trim()"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          data-testid="add-todo-button"
        >
          ➕ Adicionar
        </button>
      </div>
    </div>

    <div class="mb-4">
      <div class="flex gap-2 text-sm">
        <button
          v-for="filter in filters"
          :key="filter.key"
          @click="currentFilter = filter.key"
          :class="[
            'px-3 py-1 rounded-full',
            currentFilter === filter.key
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
          ]"
        >
          {{ filter.label }}
        </button>
      </div>
    </div>

    <div class="space-y-2">
      <TodoItem
        v-for="todo in filteredTodos"
        :key="todo.id"
        :todo="todo"
        @toggle="toggleTodo"
        @delete="deleteTodo"
      />

      <div v-if="todos.length === 0" class="text-center py-8 text-gray-500">
        📝 Nenhuma tarefa ainda. Que tal adicionar uma?
      </div>

      <div v-else-if="filteredTodos.length === 0" class="text-center py-4 text-gray-500">
        🎯 Nenhuma tarefa {{ currentFilter === 'completed' ? 'concluída' : 'pendente' }}
      </div>
    </div>

    <div v-if="todos.length > 0" class="mt-6 text-sm text-gray-600 text-center">
      📊 {{ completedCount }}/{{ todos.length }} tarefas concluídas
    </div>
  </div>
</template>

<script setup lang="ts">
import TodoItem from './TodoItem.vue'
import { computed, ref } from 'vue'

const newTodo = ref('')
const currentFilter = ref('all')
const todos = ref([
  { id: 1, text: 'Entender conceitos de CI/CD', completed: true },
  { id: 2, text: 'Configurar GitHub Actions', completed: false },
  { id: 3, text: 'Escrever testes para componentes', completed: false },
])
const filters = ref([
  { key: 'all', label: '📋 Todas' },
  { key: 'active', label: '⏳ Pendentes' },
  { key: 'completed', label: '✅ Concluídas' },
])

const filteredTodos = computed(() => {
  switch (currentFilter.value) {
    case 'active':
      return todos.value.filter((todo) => !todo.completed)
    case 'completed':
      return todos.value.filter((todo) => todo.completed)
    default:
      return todos.value
  }
})

const completedCount = computed(() => {
  return todos.value.filter((todo) => todo.completed).length
})

function addTodo() {
  const text = newTodo.value.trim()
  if (!text) return

  todos.value.push({
    id: Date.now(),
    text,
    completed: false,
  })
  newTodo.value = ''
}

function toggleTodo(id) {
  const todo = todos.value.find((t) => t.id === id)
  if (todo) {
    todo.completed = !todo.completed
  }
}

function deleteTodo(id) {
  const index = todos.value.findIndex((t) => t.id === id)
  if (index > -1) {
    todos.value.splice(index, 1)
  }
}
</script>
