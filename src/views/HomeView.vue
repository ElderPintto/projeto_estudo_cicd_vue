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

<script setup lang="ts">
import { ref } from 'vue'
import TodoApp from '../components/TodoApp.vue'

const environment = import.meta.env.MODE || 'development'
const version = import.meta.env.VITE_APP_VERSION || '1.0.0-dev'
const buildTime = new Date().toLocaleString('pt-BR')
const showLogs = ref(false)
const pipelineLogs = ref([])

function simulatePipeline() {
  pipelineLogs.value = []
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

  showLogs.value = true
}

function addLog(level, message) {
  pipelineLogs.value.push({
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
