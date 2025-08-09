<!-- src/App.vue -->
<template>
  <div id="app" class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-md mx-auto">
      <header class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">📝 Vue CI/CD Study</h1>
        <p class="text-gray-600">Projeto para aprender CI/CD com Vue.js</p>
        <div class="mt-4 p-3 bg-blue-50 rounded-lg">
          <p class="text-sm text-blue-700">🎓 <strong>Ambiente:</strong> {{ environment }}</p>
          <p class="text-sm text-blue-700">📦 <strong>Versão:</strong> {{ version }}</p>
          <p class="text-sm text-blue-700">🕒 <strong>Build:</strong> {{ buildTime }}</p>
        </div>
      </header>

      <TodoApp />

      <footer class="mt-8 text-center text-gray-500 text-sm">
        <p>Este projeto simula um pipeline de CI/CD completo!</p>
        <div class="mt-2 space-x-4">
          <button
            @click="simulatePipeline"
            class="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          >
            🚀 Simular Pipeline
          </button>
          <button
            @click="showLogs = !showLogs"
            class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            📊 {{ showLogs ? 'Ocultar' : 'Mostrar' }} Logs
          </button>
        </div>
      </footer>

      <!-- Logs do Pipeline (apenas para demonstração educacional) -->
      <div v-if="showLogs" class="mt-6 p-4 bg-gray-900 text-green-400 rounded-lg font-mono text-xs">
        <h3 class="text-green-300 font-bold mb-2">📊 Logs do Pipeline CI/CD:</h3>
        <div class="space-y-1">
          <div v-for="log in pipelineLogs" :key="log.id" class="opacity-75">
            <span class="text-gray-500">[{{ log.timestamp }}]</span>
            <span :class="getLogColor(log.level)">{{ log.level.toUpperCase() }}:</span>
            <span>{{ log.message }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TodoApp from './components/TodoApp.vue'

const state = reactive({
  showLogs: false,
  pipelineLogs: [],
  environment: process.env.NODE_ENV || 'development',
  version: process.env.VUE_APP_VERSION || '1.0.0-dev',
  buildTime: new Date().toLocaleString('pt-BR'),
})

function simulatePipeline() {
  state.pipelineLogs = []
  addLog('info', '🚀 Iniciando pipeline CI/CD...')

  setTimeout(() => addLog('info', '📦 Instalando dependências...'), 500)
  setTimeout(() => addLog('success', '✅ Dependências instaladas'), 1000)
  setTimeout(() => addLog('info', '🔍 Executando ESLint...'), 1500)
  setTimeout(() => addLog('success', '✅ Código aprovado no lint'), 2000)
  setTimeout(() => addLog('info', '🧪 Executando testes...'), 2500)
  setTimeout(() => addLog('success', '✅ Todos os testes passaram'), 3000)
  setTimeout(() => addLog('info', '🏗️ Fazendo build de produção...'), 3500)
  setTimeout(() => addLog('success', '✅ Build concluído'), 4000)
  setTimeout(() => addLog('info', '🚀 Fazendo deploy...'), 4500)
  setTimeout(() => addLog('success', '🎉 Deploy concluído com sucesso!'), 5000)

  state.showLogs = true
}

function addLog(level, message) {
  state.pipelineLogs.push({
    id: Date.now() + Math.random(),
    timestamp: new Date().toLocaleTimeString(),
    level,
    message,
  })
}

function getLogColor(level) {
  const colors = {
    info: 'text-blue-400',
    success: 'text-green-400',
    warning: 'text-yellow-400',
    error: 'text-red-400',
  }
  return colors[level] || 'text-gray-400'
}
</script>

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

<script>
import TodoItem from './TodoItem.vue'

export default {
  name: 'TodoApp',
  components: {
    TodoItem,
  },
  data() {
    return {
      newTodo: '',
      currentFilter: 'all',
      todos: [
        { id: 1, text: 'Entender conceitos de CI/CD', completed: true },
        { id: 2, text: 'Configurar GitHub Actions', completed: false },
        { id: 3, text: 'Escrever testes para componentes', completed: false },
      ],
      filters: [
        { key: 'all', label: '📋 Todas' },
        { key: 'active', label: '⏳ Pendentes' },
        { key: 'completed', label: '✅ Concluídas' },
      ],
    }
  },
  computed: {
    filteredTodos() {
      switch (this.currentFilter) {
        case 'active':
          return this.todos.filter((todo) => !todo.completed)
        case 'completed':
          return this.todos.filter((todo) => todo.completed)
        default:
          return this.todos
      }
    },
    completedCount() {
      return this.todos.filter((todo) => todo.completed).length
    },
  },
  methods: {
    addTodo() {
      const text = this.newTodo.trim()
      if (!text) return

      this.todos.push({
        id: Date.now(),
        text,
        completed: false,
      })
      this.newTodo = ''
    },

    toggleTodo(id) {
      const todo = this.todos.find((t) => t.id === id)
      if (todo) {
        todo.completed = !todo.completed
      }
    },

    deleteTodo(id) {
      const index = this.todos.findIndex((t) => t.id === id)
      if (index > -1) {
        this.todos.splice(index, 1)
      }
    },
  },
}
</script>

<!-- src/components/TodoItem.vue -->
<template>
  <div
    class="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
    :class="{ 'opacity-60': todo.completed }"
  >
    <input
      type="checkbox"
      :checked="todo.completed"
      @change="$emit('toggle', todo.id)"
      class="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
      :data-testid="`todo-${todo.id}-checkbox`"
    />

    <span
      class="flex-1 text-gray-800"
      :class="{ 'line-through text-gray-500': todo.completed }"
      :data-testid="`todo-${todo.id}-text`"
    >
      {{ todo.text }}
    </span>

    <button
      @click="$emit('delete', todo.id)"
      class="p-1 text-gray-400 hover:text-red-500 transition-colors"
      :data-testid="`todo-${todo.id}-delete`"
      title="Deletar tarefa"
    >
      🗑️
    </button>
  </div>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    todo: {
      type: Object,
      required: true,
      validator(todo) {
        return todo && typeof todo.id !== 'undefined' && typeof todo.text === 'string'
      },
    },
  },
  emits: ['toggle', 'delete'],
}
</script>

<!-- tests/unit/TodoItem.spec.js -->
import { mount } from '@vue/test-utils' import TodoItem from '@/components/TodoItem.vue'
describe('TodoItem.vue', () => { const mockTodo = { id: 1, text: 'Test todo', completed: false }
it('renders todo text', () => { const wrapper = mount(TodoItem, { props: { todo: mockTodo } })
expect(wrapper.text()).toContain('Test todo') }) it('emits toggle event when checkbox is clicked',
async () => { const wrapper = mount(TodoItem, { props: { todo: mockTodo } }) await
wrapper.find('[data-testid="todo-1-checkbox"]').trigger('change')
expect(wrapper.emitted('toggle')).toBeTruthy() expect(wrapper.emitted('toggle')[0]).toEqual([1]) })
it('emits delete event when delete button is clicked', async () => { const wrapper = mount(TodoItem,
{ props: { todo: mockTodo } }) await wrapper.find('[data-testid="todo-1-delete"]').trigger('click')
expect(wrapper.emitted('delete')).toBeTruthy() expect(wrapper.emitted('delete')[0]).toEqual([1]) })
it('applies completed styling when todo is completed', () => { const completedTodo = { ...mockTodo,
completed: true } const wrapper = mount(TodoItem, { props: { todo: completedTodo } }) const
textElement = wrapper.find('[data-testid="todo-1-text"]')
expect(textElement.classes()).toContain('line-through') }) })
